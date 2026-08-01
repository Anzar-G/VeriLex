import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { requireApiActor } from '@/lib/api-auth';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { data, error } = await supabase
    .from('maxim_sources')
    .select('*')
    .eq('maxim_id', id)
    .order('trust_level')
    .order('year', { ascending: false });

  if (error) return NextResponse.json([], { status: 500 });
  return NextResponse.json(data ?? []);
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireApiActor(req, 'editor');
  if (auth.response) return auth.response;
  const { id } = await params;
  let body: Record<string, unknown>;
  try { body = await req.json(); }
  catch { return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 }); }

  const { data, error } = await supabase.from('maxim_sources').insert({
    maxim_id:    id,
    trust_level: body.trust_level,
    source_type: body.source_type,
    title:       body.title,
    author:      body.author ?? null,
    year:        body.year ?? null,
    url:         body.url ?? null,
    description: body.description ?? null,
    created_by: auth.actor!.id,
  }).select().single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}
