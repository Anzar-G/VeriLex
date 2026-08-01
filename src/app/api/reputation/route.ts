import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// GET /api/reputation?user_id=xxx  OR  /api/reputation?leaderboard=1
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('user_id');
  const leaderboard = searchParams.get('leaderboard');

  if (leaderboard) {
    // Return top contributors (join with profiles if needed)
    const { data, error } = await supabase
      .from('editor_reputation')
      .select('user_id, score, edits_accepted, edits_rejected, references_added, reports_valid, updated_at')
      .order('score', { ascending: false })
      .limit(20);

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ data });
  }

  if (!userId) {
    return NextResponse.json({ error: 'user_id is required' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('editor_reputation')
    .select('*')
    .eq('user_id', userId)
    .maybeSingle();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data });
}

// POST /api/reputation — upsert reputation event
// Body: { user_id, event: 'edit_accepted' | 'edit_rejected' | 'reference_added' | 'report_valid' }
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  if (!body || !body.user_id || !body.event) {
    return NextResponse.json({ error: 'user_id and event are required' }, { status: 400 });
  }

  const eventScores: Record<string, { score: number; field: string }> = {
    edit_accepted:   { score: 10, field: 'edits_accepted' },
    edit_rejected:   { score: -2, field: 'edits_rejected' },
    reference_added: { score: 5,  field: 'references_added' },
    report_valid:    { score: 3,  field: 'reports_valid' },
  };

  const ev = eventScores[body.event];
  if (!ev) {
    return NextResponse.json({ error: 'Unknown event type' }, { status: 400 });
  }

  // Use raw SQL via rpc for atomic upsert
  const { data: existing } = await supabase
    .from('editor_reputation')
    .select('*')
    .eq('user_id', body.user_id)
    .maybeSingle();

  if (!existing) {
    // Insert
    const newRow: Record<string, unknown> = {
      user_id: body.user_id,
      score: Math.max(0, ev.score),
      [ev.field]: 1,
    };
    const { data, error } = await supabase
      .from('editor_reputation')
      .insert(newRow)
      .select()
      .single();
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ data });
  } else {
    // Update
    const updates: Record<string, unknown> = {
      score: Math.max(0, (existing.score || 0) + ev.score),
      [ev.field]: ((existing[ev.field] as number) || 0) + 1,
      updated_at: new Date().toISOString(),
    };
    const { data, error } = await supabase
      .from('editor_reputation')
      .update(updates)
      .eq('user_id', body.user_id)
      .select()
      .single();
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ data });
  }
}
