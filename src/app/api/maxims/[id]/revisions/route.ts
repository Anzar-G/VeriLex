import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// ── GET /api/maxims/[id]/revisions ───────────────────────────────────────
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const { data, error } = await supabase
    .from('maxim_revisions')
    .select('id, revision_number, editor_name, edit_reason, change_basis, change_basis_detail, diff_summary, is_rollback, created_at')
    .eq('maxim_id', id)
    .order('revision_number', { ascending: false });

  if (error) return NextResponse.json([], { status: 500 });
  return NextResponse.json(data ?? []);
}
