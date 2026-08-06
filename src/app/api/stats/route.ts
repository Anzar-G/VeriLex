import { NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase-server';

export async function GET() {
  const supabase = createServerClient();
  try {
    // Run all queries in parallel
    const [
      maximsRes,
      usersRes,
      viewsRes,
      discussionsRes,
      editCountRes,
    ] = await Promise.all([
      supabase
        .from('maxims')
        .select('id, legal_fields, is_active', { count: 'exact', head: false })
        .eq('is_active', true),
      supabase
        .from('profiles')
        .select('id', { count: 'exact', head: true }),
      supabase
        .from('maxim_views')
        .select('view_count'),
      supabase
        .from('discussions')
        .select('id', { count: 'exact', head: true })
        .eq('is_deleted', false),
      supabase
        .from('edit_proposals')
        .select('id', { count: 'exact', head: true }),
    ]);

    // Total articles
    const totalArticles = maximsRes.data?.length ?? 0;

    // Total views
    const totalViews = (viewsRes.data || []).reduce(
      (sum, row) => sum + (row.view_count || 0),
      0
    );

    // Total registered users
    const totalUsers = usersRes.count ?? 0;

    // Total discussions
    const totalDiscussions = discussionsRes.count ?? 0;

    // Total edits/proposals
    const totalEdits = editCountRes.count ?? 0;

    // Articles by field
    const byField: Record<string, number> = {};
    (maximsRes.data || []).forEach((m) => {
      (m.legal_fields as string[] || []).forEach((f: string) => {
        byField[f] = (byField[f] || 0) + 1;
      });
    });

    return NextResponse.json({
      totalArticles,
      totalViews,
      totalUsers,
      totalDiscussions,
      totalEdits,
      byField,
      generatedAt: new Date().toISOString(),
    });
  } catch (err) {
    return NextResponse.json(
      { error: 'Failed to load statistics', details: String(err) },
      { status: 500 }
    );
  }
}
