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
  const stableOnly = searchParams.get('stable') === 'true';
  const from = (page - 1) * limit;

  const supabase = createServerClient();
  let query = supabase
    .from('maxims')
    .select('id, latin_phrase, indonesian_meaning, literal_translation, pronunciation_guide, legal_fields, legal_meaning, history, status, difficulty, version_number, is_active, created_at, updated_at, data', { count: 'exact' })
    .eq('is_active', true)
    .order(sort, { ascending: sort === 'latin_phrase' })
    .range(from, from + limit - 1);

  if (stableOnly) query = query.in('status', ['stable', 'featured']);
  if (fields.length) query = query.overlaps('legal_fields', fields);
  if (q) query = query.or(`latin_phrase.ilike.%${q}%,indonesian_meaning.ilike.%${q}%,legal_meaning.ilike.%${q}%`);

  const { data, error, count } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data: data ?? [], total: count ?? 0, page, limit });
}
