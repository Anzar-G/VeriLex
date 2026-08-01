import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { requireApiActor } from '@/lib/api-auth';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// ── PATCH /api/proposals/[id] — update status ──────────────────────────
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireApiActor(req, 'reviewer');
  if (auth.response) return auth.response;
  const { id } = await params;

  let body: { status: string; reviewer_note?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const validStatuses = ['pending', 'under_review', 'approved', 'rejected'];
  if (!validStatuses.includes(body.status)) {
    return NextResponse.json({ error: 'Status tidak valid' }, { status: 400 });
  }

  const updates: Record<string, unknown> = {
    status:      body.status,
    updated_at:  new Date().toISOString(),
  };

  if (body.reviewer_note) updates['reviewer_note'] = body.reviewer_note;
  updates['reviewer_id'] = auth.actor!.id;
  if (body.status === 'approved' || body.status === 'rejected') {
    updates['reviewed_at'] = new Date().toISOString();
  }

  const { data, error } = await supabase
    .from('edit_proposals')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // If approved, apply the proposed_data to the maxim
  if (body.status === 'approved' && data?.proposed_data && data?.maxim_id) {
    const proposedData = data.proposed_data as Record<string, unknown>;

    // Apply via the existing PUT route logic
    await supabase
      .from('maxims')
      .update({
        latin_phrase:        proposedData['latin_phrase'] ?? proposedData['latinPhrase'],
        indonesian_meaning:  proposedData['indonesian_meaning'] ?? proposedData['indonesianMeaning'],
        literal_translation: proposedData['literal_translation'] ?? proposedData['literalTranslation'],
        pronunciation_guide: proposedData['pronunciation_guide'] ?? proposedData['pronunciationGuide'],
        legal_fields:        proposedData['legal_fields'] ?? proposedData['legalFields'],
        legal_meaning:       proposedData['legal_meaning'] ?? proposedData['legalMeaning'],
        history:             proposedData['history'],
        data:                proposedData,
        updated_at:          new Date().toISOString(),
      })
      .eq('id', data.maxim_id);
  }

  return NextResponse.json(data);
}

// ── GET /api/proposals/[id] — get single proposal ─────────────────────
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireApiActor(_req, 'reviewer');
  if (auth.response) return auth.response;
  const { id } = await params;

  const { data, error } = await supabase
    .from('edit_proposals')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !data) return NextResponse.json(null, { status: 404 });
  return NextResponse.json(data);
}
