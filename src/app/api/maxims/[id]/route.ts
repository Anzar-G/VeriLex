import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const TOP_LEVEL_COLS = new Set([
  'latin_phrase', 'indonesian_meaning', 'literal_translation',
  'pronunciation_guide', 'legal_fields', 'legal_meaning',
  'history', 'is_active', 'status', 'difficulty',
]);

// ── GET /api/maxims/[id] ─────────────────────────────────────────────────
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { data, error } = await supabase
    .from('maxims')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !data) return NextResponse.json(null, { status: 404 });
  return NextResponse.json(data);
}

// ── PUT /api/maxims/[id] — global edit with revision tracking ────────────
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  // Validate required fields for revision tracking
  const editReason      = body['edit_reason']         as string | undefined;
  const changeBasis     = body['change_basis']         as string | undefined;
  const changeBasisDetail = body['change_basis_detail'] as string | undefined;
  const editorId        = body['editor_id']            as string | undefined;
  const editorName      = body['editor_name']          as string | undefined;

  if (!editReason?.trim()) {
    return NextResponse.json({ error: 'edit_reason wajib diisi' }, { status: 400 });
  }

  // 1. Fetch current snapshot before overwriting
  const { data: existing, error: fetchErr } = await supabase
    .from('maxims')
    .select('*')
    .eq('id', id)
    .single();

  if (fetchErr || !existing) {
    return NextResponse.json({ error: 'Maksim tidak ditemukan' }, { status: 404 });
  }

  // 2. Build column updates
  const colUpdates: Record<string, unknown> = {};
  const dataUpdates: Record<string, unknown> = {};

  // Strip revision-tracking fields from the data payload
  const SKIP_FIELDS = new Set(['edit_reason', 'change_basis', 'change_basis_detail', 'editor_id', 'editor_name']);

  for (const [key, value] of Object.entries(body)) {
    if (SKIP_FIELDS.has(key)) continue;
    if (TOP_LEVEL_COLS.has(key)) {
      colUpdates[key] = value;
    } else {
      dataUpdates[key] = value;
    }
  }

  if (Object.keys(dataUpdates).length > 0) {
    colUpdates['data'] = {
      ...(existing.data as object ?? {}),
      ...dataUpdates,
    };
  }

  // Increment version
  const newVersion = (existing.version_number ?? 0) + 1;
  colUpdates['version_number'] = newVersion;

  // 3. Save revision snapshot (current state BEFORE the update)
  const revisionNumber = await supabase
    .rpc('next_revision_number', { p_maxim_id: id })
    .then(r => r.data as number);

  const { data: revisionData, error: revErr } = await supabase
    .from('maxim_revisions')
    .insert({
      maxim_id:            id,
      revision_number:     revisionNumber,
      editor_id:           editorId ?? null,
      editor_name:         editorName ?? 'Anonim',
      edit_reason:         editReason,
      change_basis:        changeBasis ?? null,
      change_basis_detail: changeBasisDetail ?? null,
      snapshot:            existing,                    // full snapshot before change
      diff_summary:        `Versi ${newVersion} — ${editReason}`,
      is_rollback:         false,
    })
    .select('id')
    .single();

  if (revErr) {
    console.error('[PUT /api/maxims] revision error:', revErr);
    // Don't fail the whole request for revision errors
  }

  // 4. Point current_revision_id to the NEW revision
  if (revisionData?.id) {
    colUpdates['current_revision_id'] = revisionData.id;
  }

  if (Object.keys(colUpdates).length === 0) {
    return NextResponse.json({ error: 'No valid fields to update' }, { status: 400 });
  }

  // 5. Apply the update
  const { data, error } = await supabase
    .from('maxims')
    .update(colUpdates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('[PUT /api/maxims]', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
