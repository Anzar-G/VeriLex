import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { actorDisplayName, requireApiActor } from '@/lib/api-auth';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// GET /api/discussions?maxim_id=xxx
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const maximId = searchParams.get('maxim_id');
  if (!maximId) {
    return NextResponse.json({ error: 'maxim_id is required' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('discussions')
    .select('id, maxim_id, parent_id, author_id, author_name, content, is_deleted, created_at, updated_at')
    .eq('maxim_id', maximId)
    .order('created_at', { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ data });
}

// POST /api/discussions
export async function POST(req: NextRequest) {
  const auth = await requireApiActor(req);
  if (auth.response) return auth.response;
  const body = await req.json().catch(() => null);
  if (!body || !body.maxim_id || !body.content) {
    return NextResponse.json({ error: 'maxim_id and content are required' }, { status: 400 });
  }

  const { maxim_id, parent_id = null, author_name, content } = body;

  const { data, error } = await supabase
    .from('discussions')
    .insert({ maxim_id, parent_id, author_id: auth.actor!.id, author_name: actorDisplayName(auth.actor!, author_name), content })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ data }, { status: 201 });
}

// PATCH /api/discussions — soft-delete
export async function PATCH(req: NextRequest) {
  const auth = await requireApiActor(req);
  if (auth.response) return auth.response;
  const body = await req.json().catch(() => null);
  if (!body || !body.id) {
    return NextResponse.json({ error: 'id is required' }, { status: 400 });
  }

  const existing = await supabase.from('discussions').select('author_id').eq('id', body.id).maybeSingle();
  if (!existing.data || (existing.data.author_id !== auth.actor!.id && !['editor', 'senior_editor', 'administrator'].includes(auth.actor!.role))) {
    return NextResponse.json({ error: 'Tidak berwenang menghapus diskusi ini' }, { status: 403 });
  }
  const { data, error } = await supabase
    .from('discussions')
    .update({ is_deleted: true, deleted_by: auth.actor!.id, updated_at: new Date().toISOString() })
    .eq('id', body.id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ data });
}
