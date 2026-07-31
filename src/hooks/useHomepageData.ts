'use client';

import { useEffect, useState } from 'react';
import type { Maxim } from '@/types';

// Lightweight shape returned by /api/popular and /api/recent
export interface MaximSummary {
  id: string;
  latin_phrase: string;
  indonesian_meaning: string;
  literal_translation: string;
  legal_fields: string[];
  updated_at: string;
}

// Full row from /api/featured (mirrors MaximRow + data jsonb)
export interface FeaturedRow {
  id: string;
  latin_phrase: string;
  indonesian_meaning: string;
  literal_translation: string;
  pronunciation_guide: string;
  legal_fields: string[];
  legal_meaning: string;
  history: string;
  updated_at: string;
  data: Partial<Omit<Maxim, 'id' | 'latinPhrase' | 'indonesianMeaning' | 'legalFields' | 'legalMeaning' | 'history'>>;
}

// ── Map a DB row → Maxim-compatible object for rendering ──────────────────
export function rowToMaxim(row: FeaturedRow): Maxim {
  return {
    id: row.id,
    latinPhrase: row.latin_phrase,
    indonesianMeaning: row.indonesian_meaning,
    literalTranslation: row.literal_translation,
    pronunciationGuide: row.pronunciation_guide,
    legalFields: row.legal_fields as Maxim['legalFields'],
    legalMeaning: row.legal_meaning,
    history: row.history,
    wordByWord: (row.data?.wordByWord as Maxim['wordByWord']) ?? [],
    relations: (row.data?.relations as Maxim['relations']) ?? [],
    caseExamples: (row.data?.caseExamples as Maxim['caseExamples']) ?? [],
    isActive: true,
    createdAt: row.updated_at,
    updatedAt: row.updated_at,
    ...(row.data as object),
  };
}

// ── useFeatured ─────────────────────────────────────────────────────────────
export function useFeatured() {
  const [data,    setData]    = useState<FeaturedRow | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/featured')
      .then(r => r.ok ? r.json() : null)
      .then(json => setData(json))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading };
}

// ── usePopular ──────────────────────────────────────────────────────────────
export function usePopular(limit = 5) {
  const [data,    setData]    = useState<MaximSummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/popular?limit=${limit}&days=7`)
      .then(r => r.ok ? r.json() : [])
      .then(json => setData(json))
      .finally(() => setLoading(false));
  }, [limit]);

  return { data, loading };
}

// ── useRecent ───────────────────────────────────────────────────────────────
export function useRecent(limit = 6) {
  const [data,    setData]    = useState<MaximSummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/recent?limit=${limit}`)
      .then(r => r.ok ? r.json() : [])
      .then(json => setData(json))
      .finally(() => setLoading(false));
  }, [limit]);

  return { data, loading };
}
