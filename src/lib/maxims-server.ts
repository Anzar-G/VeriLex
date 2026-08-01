import { cache } from 'react';
import { createServerClient } from './supabase-server';
import type { MaximRow } from './supabase';
import type { Maxim } from '@/types';

// ── Map a flat DB row (columns + `data` jsonb) to the Maxim domain type ──────
export function rowToMaxim(row: MaximRow): Maxim {
  const d = (row.data ?? {}) as Record<string, unknown>;
  return {
    id: row.id,
    latinPhrase: row.latin_phrase,
    indonesianMeaning: row.indonesian_meaning,
    literalTranslation: row.literal_translation,
    pronunciationGuide: row.pronunciation_guide,
    legalFields: row.legal_fields as Maxim['legalFields'],
    legalMeaning: row.legal_meaning,
    history: row.history,
    wordByWord: (d.wordByWord as Maxim['wordByWord']) ?? [],
    relations: (d.relations as Maxim['relations']) ?? [],
    caseExamples: (d.caseExamples as Maxim['caseExamples']) ?? [],
    isActive: row.is_active,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    ...(d as object),
  } as Maxim;
}

// ── Fetch a single maxim by id from the database ────────────────────────────
// Memoised per request with React `cache()` so generateMetadata and the page
// component share a single DB round-trip.
export const getMaximByIdFromDB = cache(async (id: string): Promise<Maxim | null> => {
  const supabase = createServerClient();
  const { data } = await supabase
    .from('maxims')
    .select('*')
    .eq('id', id)
    .single();

  if (!data) return null;
  return rowToMaxim(data as MaximRow);
});
