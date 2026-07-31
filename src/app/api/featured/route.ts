import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Server-side client using anon key (featured_maxim is publicly readable)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export const revalidate = 3600; // revalidate every hour (ISR)

export async function GET() {
  const today = new Date().toISOString().split('T')[0];

  // 1. Look up today's featured maxim id
  const { data: featured, error: fe } = await supabase
    .from('featured_maxim')
    .select('maxim_id')
    .eq('feature_date', today)
    .single();

  if (fe || !featured?.maxim_id) {
    // Fallback: return the most recently updated maxim
    const { data: fallback } = await supabase
      .from('maxims')
      .select('*')
      .eq('is_active', true)
      .order('updated_at', { ascending: false })
      .limit(1)
      .single();
    return NextResponse.json(fallback ?? null);
  }

  // 2. Fetch the full maxim row
  const { data: maxim, error: me } = await supabase
    .from('maxims')
    .select('*')
    .eq('id', featured.maxim_id)
    .single();

  if (me) return NextResponse.json(null, { status: 404 });
  return NextResponse.json(maxim);
}
