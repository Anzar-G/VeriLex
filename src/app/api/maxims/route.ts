import { NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase-server';

/** Public, paginated article index used by search, flashcards, and dashboards. */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = (searchParams.get('q') ?? '').trim().replace(/[,%()]/g, '');
  const fields = (searchParams.get('fields') ?? '').split(',').filter(Boolean);
  const sort = searchParams.get('sort') === 'alpha' ? 'latin_phrase' : 'updated_at';
  const page = Math.max(1, Number(searchParams.get('page') ?? 1));
  const limit = Math.min(100, Math.max(1, Number(searchParams.get('limit') ?? 24)));
  const requestedOffset = searchParams.get('offset');
  const offset = requestedOffset === null ? (page - 1) * limit : Math.max(0, Number(requestedOffset));
  const initial = (searchParams.get('initial') ?? '').trim().slice(0, 1).replace(/[%_]/g, '');
  const requestedSelect = searchParams.get('select');
  const allowedSelects: Record<string, string> = {
    'id,latin_phrase,indonesian_meaning,status,difficulty': 'id, latin_phrase, indonesian_meaning, status, difficulty',
  };
  const select = requestedSelect ? allowedSelects[requestedSelect] : undefined;
  const stableOnly = searchParams.get('stable') === 'true';
  const supabase = createServerClient();
  let query = supabase
    .from('maxims')
    .select(select ?? 'id, latin_phrase, indonesian_meaning, literal_translation, pronunciation_guide, legal_fields, legal_meaning, history, status, difficulty, version_number, is_active, created_at, updated_at, data', { count: 'exact' })
    .eq('is_active', true)
    .order(sort, { ascending: sort === 'latin_phrase' })
    .range(offset, offset + limit - 1);

  if (stableOnly) query = query.in('status', ['stable', 'featured']);
  if (fields.length) query = query.overlaps('legal_fields', fields);
  if (q) query = query.or(`latin_phrase.ilike.%${q}%,indonesian_meaning.ilike.%${q}%,legal_meaning.ilike.%${q}%`);
  if (initial) query = query.ilike('latin_phrase', `${initial}%`);

  const { data, error, count } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data: data ?? [], total: count ?? 0, page: Math.floor(offset / limit) + 1, limit, offset });
}
