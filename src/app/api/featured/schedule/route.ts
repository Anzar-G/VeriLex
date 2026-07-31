import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// ── GET /api/featured/schedule — lihat jadwal 30 hari ke depan ───────────
export async function GET() {
  const today = new Date().toISOString().split('T')[0];
  const in30  = new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0];

  const { data, error } = await supabase
    .from('featured_maxim')
    .select('feature_date, maxim_id, notes, maxims(latin_phrase, indonesian_meaning)')
    .gte('feature_date', today)
    .lte('feature_date', in30)
    .order('feature_date', { ascending: true });

  if (error) return NextResponse.json([], { status: 500 });
  return NextResponse.json(data ?? []);
}

// ── POST /api/featured/schedule — set artikel pilihan untuk tanggal tertentu
export async function POST(req: Request) {
  let body: { feature_date: string; maxim_id: string; notes?: string };
  try { body = await req.json(); }
  catch { return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 }); }

  const { data, error } = await supabase
    .from('featured_maxim')
    .upsert({
      feature_date: body.feature_date,
      maxim_id:     body.maxim_id,
      notes:        body.notes ?? 'Dijadwalkan manual oleh Admin',
    }, { onConflict: 'feature_date' })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
