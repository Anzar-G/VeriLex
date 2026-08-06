import { NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase-server';

export const revalidate = 1800; // 30 minutes

export async function GET(request: Request) {
  const supabase = createServerClient();
  const { searchParams } = new URL(request.url);
  const limit  = Math.min(parseInt(searchParams.get('limit') ?? '5'), 20);
  const days   = Math.min(parseInt(searchParams.get('days')  ?? '7'), 30);

  // Sum views over the last N days
  const since = new Date();
  since.setDate(since.getDate() - days);
  const sinceStr = since.toISOString().split('T')[0];

  const { data: views, error: ve } = await supabase
    .from('maxim_views')
    .select('maxim_id, view_count')
    .gte('view_date', sinceStr);

  if (ve) return NextResponse.json([], { status: 500 });

  // Aggregate by maxim_id
  const totals: Record<string, number> = {};
  for (const v of views ?? []) {
    totals[v.maxim_id] = (totals[v.maxim_id] ?? 0) + v.view_count;
  }

  const topIds = Object.entries(totals)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([id]) => id);

  if (topIds.length === 0) {
    // Fallback: return most recently updated
    const { data } = await supabase
      .from('maxims')
      .select('id, latin_phrase, indonesian_meaning, legal_fields, updated_at')
      .eq('is_active', true)
      .order('updated_at', { ascending: false })
      .limit(limit);
    return NextResponse.json(data ?? []);
  }

  const { data: maxims } = await supabase
    .from('maxims')
    .select('id, latin_phrase, indonesian_meaning, literal_translation, legal_fields, updated_at')
    .in('id', topIds);

  // Reorder to match topIds ranking
  const ordered = topIds
    .map(id => maxims?.find(m => m.id === id))
    .filter(Boolean);

  return NextResponse.json(ordered);
}
