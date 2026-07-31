import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page  = parseInt(searchParams.get('page') ?? '1');
  const limit = 50;
  const from  = (page - 1) * limit;

  const { data, count, error } = await supabase
    .from('activity_logs')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(from, from + limit - 1);

  if (error) return NextResponse.json({ logs: [], total: 0 }, { status: 500 });
  return NextResponse.json({ logs: data ?? [], total: count ?? 0 });
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try { body = await req.json(); }
  catch { return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 }); }

  const { error } = await supabase.from('activity_logs').insert(body);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true }, { status: 201 });
}
