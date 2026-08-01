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

  // Upsert: increment view_count for today.
  // The increment_view RPC may not be provisioned on every environment, so on
  // any RPC error we fall back to a manual read-then-write upsert.
  const rpcRes = await supabase.rpc('increment_view', {
    p_maxim_id: id,
    p_date: today,
  });

  if (rpcRes.error) {
    const existing = await supabase
      .from('maxim_views')
      .select('view_count')
      .eq('maxim_id', id)
      .eq('view_date', today)
      .maybeSingle();

    if (existing.data) {
      const { error: updErr } = await supabase
        .from('maxim_views')
        .update({ view_count: existing.data.view_count + 1 })
        .eq('maxim_id', id)
        .eq('view_date', today);
      if (updErr) return NextResponse.json({ ok: false }, { status: 500 });
    } else {
      // No row yet for today — try to insert. A concurrent request may have
      // created one in the meantime (unique violation), in which case re-read
      // and increment so this view is still counted.
      const { error: insErr } = await supabase
        .from('maxim_views')
        .insert({ maxim_id: id, view_date: today, view_count: 1 });
      if (insErr) {
        const { data: cur, error: selErr } = await supabase
          .from('maxim_views')
          .select('view_count')
          .eq('maxim_id', id)
          .eq('view_date', today)
          .maybeSingle();
        if (selErr || !cur) return NextResponse.json({ ok: false }, { status: 500 });
        const { error: updErr } = await supabase
          .from('maxim_views')
          .update({ view_count: cur.view_count + 1 })
          .eq('maxim_id', id)
          .eq('view_date', today);
        if (updErr) return NextResponse.json({ ok: false }, { status: 500 });
      }
    }
  }

  return NextResponse.json({ ok: true });
}
