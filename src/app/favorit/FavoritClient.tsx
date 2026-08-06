'use client';

import { useEffect, useState } from 'react';
import { useVeriLexStore } from '@/lib/useStore';
import MaximCard from '@/components/maxim/MaximCard';
import Link from 'next/link';
import { Star, BookOpen, Loader2 } from 'lucide-react';
import type { Maxim } from '@/types';

export default function FavoritClient() {
  const { favorites } = useVeriLexStore();
  const [maxims, setMaxims] = useState<Maxim[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let ignore = false;

    if (!favorites.length) {
      queueMicrotask(() => {
        if (!ignore) {
          setMaxims([]);
          setLoading(false);
        }
      });
      return () => { ignore = true; };
    }

    const ids = favorites.join(',');
    const fetchData = async () => {
      // Async state update avoids synchronous cascading render warning
      await Promise.resolve();
      if (ignore) return;
      setLoading(true);

      try {
        const res = await fetch(`/api/maxims?ids=${ids}&limit=${favorites.length}`);
        const payload = await res.json();
        if (!ignore) {
          const rows = (payload.data ?? []) as Record<string, unknown>[];
          setMaxims(rows.map(row => ({
            id: row.id, latinPhrase: row.latin_phrase, indonesianMeaning: row.indonesian_meaning,
            literalTranslation: row.literal_translation, pronunciationGuide: row.pronunciation_guide,
            legalFields: row.legal_fields, legalMeaning: row.legal_meaning, history: row.history,
            wordByWord: Array.isArray((row.data as Record<string, unknown>)?.wordByWord) ? (row.data as Record<string, unknown>).wordByWord : [],
            relations: [], caseExamples: [],
            isActive: row.is_active, createdAt: row.created_at, updatedAt: row.updated_at,
          })) as unknown as Maxim[]);
        }
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    void fetchData();

    return () => { ignore = true; };
  }, [favorites]);

  return (
    <main style={{ padding: '2rem' }}>
      {/* Page Header */}
      <div style={{ marginBottom: '1.75rem', borderBottom: '1px solid #A2A9B1', paddingBottom: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.75rem', color: 'var(--navy)', margin: 0, border: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Star size={22} color="var(--bronze)" style={{ flexShrink: 0 }} />
            Maksim Favorit Saya
          </h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'var(--steel-muted)', margin: '0.25rem 0 0' }}>
            {favorites.length} maksim hukum Latin yang disimpan untuk pembelajaran instan.
          </p>
        </div>
        {maxims.length > 0 && (
          <Link href="/cari" className="btn-secondary" style={{ fontSize: '0.8125rem', display: 'inline-flex', alignItems: 'center', gap: '0.375rem' }}>
            <BookOpen size={14} /> Tambah Lebih Banyak
          </Link>
        )}
      </div>

      {/* Loading skeleton */}
      {loading && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
          {[...Array(Math.min(favorites.length, 3))].map((_, i) => (
            <div key={i} className="skeleton" style={{ height: '90px', borderRadius: '4px' }} />
          ))}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', color: '#72777D', fontSize: '0.84375rem', padding: '1rem 0' }}>
            <Loader2 size={15} style={{ animation: 'spin 1s linear infinite' }} />
            Memuat {favorites.length} maksim favorit…
          </div>
        </div>
      )}

      {/* Maxim list */}
      {!loading && maxims.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
          {maxims.map((maxim) => (
            <MaximCard key={maxim.id} maxim={maxim} />
          ))}
        </div>
      )}

      {/* Empty state */}
      {!loading && favorites.length === 0 && (
        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #A2A9B1', borderRadius: '4px', padding: '4rem 2rem', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', padding: '1.25rem', backgroundColor: 'rgba(212, 165, 116, 0.1)', borderRadius: '50%', marginBottom: '1.25rem' }}>
            <Star size={44} color="var(--bronze)" />
          </div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.375rem', color: 'var(--navy)', margin: '0 0 0.625rem', border: 'none' }}>
            Belum ada maksim favorit
          </h2>
          <p style={{ fontSize: '0.9375rem', color: 'var(--steel-muted)', marginBottom: '2rem', lineHeight: 1.6, maxWidth: '400px', margin: '0 auto 2rem' }}>
            Klik ikon bintang (<Star size={14} style={{ display: 'inline', verticalAlign: 'middle' }} />) pada kartu maksim mana saja untuk menyimpannya di sini dan mempelajarinya sewaktu-waktu.
          </p>
          <Link href="/cari" className="btn-primary" style={{ fontSize: '0.9rem' }}>
            <BookOpen size={16} /> Jelajahi Indeks Maksim
          </Link>
        </div>
      )}
    </main>
  );
}
