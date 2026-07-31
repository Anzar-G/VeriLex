import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Use service role for upsert (RLS would block anon insert without extra policy)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const today   = new Date().toISOString().split('T')[0];

  // Upsert: increment view_count for today
  const { error } = await supabase.rpc('increment_view', {
    p_maxim_id: id,
    p_date: today,
  }).then(async (res) => {
    // rpc might not exist yet — fallback to manual upsert
    if (res.error?.message?.includes('does not exist')) {
      const existing = await supabase
        .from('maxim_views')
        .select('view_count')
        .eq('maxim_id', id)
        .eq('view_date', today)
        .single();

      if (existing.data) {
        return supabase
          .from('maxim_views')
          .update({ view_count: existing.data.view_count + 1 })
          .eq('maxim_id', id)
          .eq('view_date', today);
      } else {
        return supabase
          .from('maxim_views')
          .insert({ maxim_id: id, view_date: today, view_count: 1 });
      }
    }
    return res;
  });

  if (error) return NextResponse.json({ ok: false }, { status: 500 });
  return NextResponse.json({ ok: true });
}
