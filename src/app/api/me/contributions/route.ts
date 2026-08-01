import { NextResponse } from 'next/server';
import { requireApiActor } from '@/lib/api-auth';
import { createServerClient } from '@/lib/supabase-server';

export async function GET(req: Request) {
  const auth = await requireApiActor(req);
  if (auth.response) return auth.response;
  const supabase = createServerClient();
  const userId = auth.actor!.id;
  const [proposals, revisions, reports, reputation] = await Promise.all([
    supabase.from('edit_proposals').select('id, maxim_id, status, change_summary, created_at, reviewed_at, reviewer_note').eq('proposer_id', userId).order('created_at', { ascending: false }),
    supabase.from('maxim_revisions').select('id, maxim_id, revision_number, edit_reason, created_at, is_rollback').eq('editor_id', userId).order('created_at', { ascending: false }),
    supabase.from('reports').select('id, maxim_id, category, status, created_at').eq('reporter_id', userId).order('created_at', { ascending: false }),
    supabase.from('editor_reputation').select('*').eq('user_id', userId).maybeSingle(),
  ]);
  if (proposals.error || revisions.error || reports.error) return NextResponse.json({ error: 'Gagal memuat kontribusi' }, { status: 500 });
  return NextResponse.json({ proposals: proposals.data ?? [], revisions: revisions.data ?? [], reports: reports.data ?? [], reputation: reputation.data ?? null });
}
