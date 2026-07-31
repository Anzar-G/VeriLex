import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export const revalidate = 3600; // revalidate every hour

export async function GET() {
  const today = new Date().toISOString().split('T')[0];

  // 1. Cek jadwal hari ini
  const { data: featured } = await supabase
    .from('featured_maxim')
    .select('maxim_id')
    .eq('feature_date', today)
    .single();

  const targetId = featured?.maxim_id;

  if (targetId) {
    const { data: maxim } = await supabase
      .from('maxims')
      .select('*')
      .eq('id', targetId)
      .single();

    if (maxim) return NextResponse.json(maxim);
  }

  // 2. Fallback: ambil maxim aktif secara acak dengan konten paling lengkap
  // (prioritaskan yang punya legal_meaning panjang)
  const { data: fallback } = await supabase
    .from('maxims')
    .select('*')
    .eq('is_active', true)
    .order('updated_at', { ascending: false })
    .limit(10);

  if (fallback && fallback.length > 0) {
    // Pilih yang punya legal_meaning terpanjang dari 10 terbaru
    const best = fallback.sort(
      (a, b) => (b.legal_meaning?.length ?? 0) - (a.legal_meaning?.length ?? 0)
    )[0];
    return NextResponse.json(best);
  }

  return NextResponse.json(null);
}
