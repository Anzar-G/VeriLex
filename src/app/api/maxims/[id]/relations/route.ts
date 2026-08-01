import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { requireApiActor } from '@/lib/api-auth';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// ── GET /api/maxims/[id]/relations ────────────────────────────────────────
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  // Get both directions: from and to this maxim
  const [fromRes, toRes] = await Promise.all([
    supabase.from('maxim_relations')
      .select('id, to_maxim_id, relation_type, description, maxims!to_maxim_id(id, latin_phrase, indonesian_meaning, legal_fields, difficulty)')
      .eq('from_maxim_id', id),
    supabase.from('maxim_relations')
      .select('id, from_maxim_id, relation_type, description, maxims!from_maxim_id(id, latin_phrase, indonesian_meaning, legal_fields, difficulty)')
      .eq('to_maxim_id', id),
  ]);

  const outgoing = (fromRes.data ?? []).map(r => ({
    id: r.id, direction: 'outgoing', relation_type: r.relation_type,
    description: r.description, maxim: r.maxims,
  }));

  const incoming = (toRes.data ?? []).map(r => ({
    id: r.id, direction: 'incoming', relation_type: r.relation_type,
    description: r.description, maxim: r.maxims,
  }));

  return NextResponse.json([...outgoing, ...incoming]);
}

// ── POST /api/maxims/[id]/relations — tambah relasi ───────────────────────
export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireApiActor(req, 'editor');
  if (auth.response) return auth.response;
  const { id } = await params;
  let body: { to_maxim_id: string; relation_type: string; description?: string };
  try { body = await req.json(); }
  catch { return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 }); }

  const { data, error } = await supabase.from('maxim_relations').insert({
    from_maxim_id: id,
    to_maxim_id:   body.to_maxim_id,
    relation_type: body.relation_type,
    description:   body.description ?? null,
    created_by:    auth.actor!.id,
  }).select().single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}

// ── DELETE /api/maxims/[id]/relations?relation_id=xxx ─────────────────────
export async function DELETE(
  req: Request,
  _ctx: { params: Promise<{ id: string }> }
) {
  const auth = await requireApiActor(req, 'editor');
  if (auth.response) return auth.response;
  const { searchParams } = new URL(req.url);
  const relation_id = searchParams.get('relation_id');
  if (!relation_id) return NextResponse.json({ error: 'relation_id required' }, { status: 400 });

  const { error } = await supabase.from('maxim_relations').delete().eq('id', relation_id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
