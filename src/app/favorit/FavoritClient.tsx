'use client';

import { useEffect, useState } from 'react';
import { useVeriLexStore } from '@/lib/useStore';
import MaximCard from '@/components/maxim/MaximCard';
import Link from 'next/link';
import { Star, BookOpen } from 'lucide-react';
import type { Maxim } from '@/types';

export default function FavoritClient() {
  const { favorites } = useVeriLexStore();
  const [maxims, setMaxims] = useState<Maxim[]>([]);

  useEffect(() => {
    if (!favorites.length) { queueMicrotask(() => setMaxims([])); return; }
    void fetch('/api/maxims?limit=100').then(response => response.json()).then(payload => {
      const rows = (payload.data ?? []).filter((row: Record<string, unknown>) => favorites.includes(row.id as string));
      setMaxims(rows.map((row: Record<string, unknown>) => ({
        id: row.id, latinPhrase: row.latin_phrase, indonesianMeaning: row.indonesian_meaning,
        literalTranslation: row.literal_translation, pronunciationGuide: row.pronunciation_guide,
        legalFields: row.legal_fields, legalMeaning: row.legal_meaning, history: row.history,
        wordByWord: (row.data as Record<string, unknown>)?.wordByWord ?? [], relations: [], caseExamples: [],
        isActive: row.is_active, createdAt: row.created_at, updatedAt: row.updated_at,
      })) as Maxim[]);
    });
  }, [favorites]);

  const favoriteMaxims = maxims;

  return (
    <main style={{ padding: '2rem' }}>
      <div style={{ marginBottom: '1.5rem', borderBottom: '1px solid #A2A9B1', paddingBottom: '0.75rem' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.75rem', color: 'var(--navy)', margin: 0, border: 'none' }}>
          Maksim Favorit Saya ({favoriteMaxims.length})
        </h1>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'var(--steel-muted)', margin: '0.25rem 0 0' }}>
          Daftar maksim hukum Latin yang disukai dan disimpan untuk pembelajaran instan.
        </p>
      </div>

      {favoriteMaxims.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
          {favoriteMaxims.map((maxim) => (
            <MaximCard key={maxim.id} maxim={maxim} />
          ))}
        </div>
      ) : (
        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #A2A9B1', borderRadius: '2px', padding: '3rem 2rem', textAlign: 'center' }}>
          <Star size={40} color="#A2A9B1" style={{ margin: '0 auto 1rem' }} />
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', color: 'var(--navy)', margin: '0 0 0.5rem', border: 'none' }}>
            Belum ada maksim favorit yang disimpan
          </h2>
          <p style={{ fontSize: '0.875rem', color: 'var(--steel-muted)', marginBottom: '1.5rem' }}>
            Klik ikon bintang (<Star size={14} style={{ display: 'inline' }} />) pada kartu maksim mana saja untuk menyimpannya di sini.
          </p>
          <Link href="/cari" className="btn-primary" style={{ fontSize: '0.875rem' }}>
            <BookOpen size={16} /> Jelajahi Indeks Maksim
          </Link>
        </div>
      )}
    </main>
  );
}
