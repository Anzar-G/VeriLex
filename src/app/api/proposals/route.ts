import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// ── POST /api/proposals — Contributor submits an edit proposal ─────────────
export async function POST(req: Request) {
  let body: { maxim_id: string; change_summary?: string; proposed_data: Record<string, unknown> };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  if (!body.maxim_id || !body.proposed_data) {
    return NextResponse.json({ error: 'maxim_id and proposed_data are required' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('edit_proposals')
    .insert({
      maxim_id:       body.maxim_id,
      change_summary: body.change_summary ?? 'Revisi oleh kontributor',
      proposed_data:  body.proposed_data,
      status:         'pending',
    })
    .select()
    .single();

  if (error) {
    console.error('[POST /api/proposals]', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}

// ── GET /api/proposals — list pending proposals (for review queue) ─────────
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const status   = searchParams.get('status')   ?? 'pending';
  const maxim_id = searchParams.get('maxim_id') ?? undefined;

  let query = supabase
    .from('edit_proposals')
    .select('id, maxim_id, status, change_summary, created_at, updated_at')
    .eq('status', status)
    .order('created_at', { ascending: false });

  if (maxim_id) query = query.eq('maxim_id', maxim_id);

  const { data, error } = await query;

  if (error) return NextResponse.json([], { status: 500 });
  return NextResponse.json(data ?? []);
}
