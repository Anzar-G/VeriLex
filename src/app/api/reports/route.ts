import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// ── POST /api/reports ─────────────────────────────────────────────────────
export async function POST(req: Request) {
  let body: {
    maxim_id: string;
    category: string;
    description: string;
    reporter_id?: string;
    reporter_name?: string;
  };
  try { body = await req.json(); }
  catch { return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 }); }

  if (!body.maxim_id || !body.category || !body.description?.trim()) {
    return NextResponse.json({ error: 'maxim_id, category, dan description wajib diisi' }, { status: 400 });
  }

  const { data, error } = await supabase.from('reports').insert({
    maxim_id:      body.maxim_id,
    category:      body.category,
    description:   body.description,
    reporter_id:   body.reporter_id ?? null,
    reporter_name: body.reporter_name ?? 'Anonim',
    status:        'menunggu',
  }).select().single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}

// ── GET /api/reports ──────────────────────────────────────────────────────
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const status   = searchParams.get('status') ?? 'menunggu';
  const maxim_id = searchParams.get('maxim_id');

  let query = supabase.from('reports')
    .select('*')
    .eq('status', status)
    .order('created_at', { ascending: false });

  if (maxim_id) query = query.eq('maxim_id', maxim_id);

  const { data, error } = await query;
  if (error) return NextResponse.json([], { status: 500 });
  return NextResponse.json(data ?? []);
}
