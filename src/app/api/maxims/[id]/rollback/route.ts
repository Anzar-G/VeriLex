import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { requireApiActor, actorDisplayName } from '@/lib/api-auth';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// ── POST /api/maxims/[id]/rollback ───────────────────────────────────────
// Body: { revision_id: string, editor_id?: string, editor_name?: string }
export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireApiActor(req, 'senior_editor');
  if (auth.response) return auth.response;
  const actor = auth.actor!;
  const { id } = await params;

  let body: { revision_id: string; editor_name?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  if (!body.revision_id) {
    return NextResponse.json({ error: 'revision_id diperlukan' }, { status: 400 });
  }

  // 1. Fetch the target revision snapshot
  const { data: revision, error: revErr } = await supabase
    .from('maxim_revisions')
    .select('*')
    .eq('id', body.revision_id)
    .eq('maxim_id', id)
    .single();

  if (revErr || !revision) {
    return NextResponse.json({ error: 'Revisi tidak ditemukan' }, { status: 404 });
  }

  // 2. Snapshot of current state before rollback
  const { data: current, error: curErr } = await supabase
    .from('maxims')
    .select('*')
    .eq('id', id)
    .single();

  if (curErr || !current) {
    return NextResponse.json({ error: 'Artikel tidak ditemukan' }, { status: 404 });
  }

  // 3. Create revision record for this rollback
  const revisionNumber = await supabase
    .rpc('next_revision_number', { p_maxim_id: id })
    .then(r => r.data as number);

  await supabase.from('maxim_revisions').insert({
    maxim_id:        id,
    revision_number: revisionNumber,
    editor_id:       actor.id,
    editor_name:     actorDisplayName(actor, body.editor_name),
    edit_reason:     `Rollback ke Revisi #${revision.revision_number}`,
    change_basis:    'rollback',
    snapshot:        current,
    diff_summary:    `Rollback ke versi ${revision.revision_number} oleh ${actorDisplayName(actor, body.editor_name)}`,
    is_rollback:     true,
    rolled_back_from: body.revision_id,
  });

  // 4. Restore snapshot data (the revision.snapshot was state BEFORE that edit,
  //    so rolling back to revision N means restoring snapshot from revision N+1 if available,
  //    OR more precisely: restore the snapshot stored IN that revision)
  const snap = revision.snapshot as Record<string, unknown>;

  const { data: updated, error: updateErr } = await supabase
    .from('maxims')
    .update({
      latin_phrase:        snap['latin_phrase'],
      indonesian_meaning:  snap['indonesian_meaning'],
      literal_translation: snap['literal_translation'],
      pronunciation_guide: snap['pronunciation_guide'],
      legal_fields:        snap['legal_fields'],
      legal_meaning:       snap['legal_meaning'],
      history:             snap['history'],
      data:                snap['data'],
      version_number:      (current.version_number ?? 1) + 1,
    })
    .eq('id', id)
    .select()
    .single();

  if (updateErr) {
    return NextResponse.json({ error: updateErr.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, maxim: updated, rolled_back_to_revision: revision.revision_number });
}
