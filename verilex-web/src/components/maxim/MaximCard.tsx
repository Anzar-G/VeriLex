'use client';

import Link from 'next/link';
import type { Maxim } from '@/types';
import { Star, ArrowRight } from 'lucide-react';
import { useVeriLexStore } from '@/lib/useStore';

interface MaximCardProps {
  maxim: Maxim;
  compact?: boolean;
}

const fieldColors: Record<string, string> = {
  'pidana': '#C85A54',
  'perdata': '#5B7A94',
  'tata-negara': '#6B8E71',
  'internasional': '#A67C52',
  'administrasi': '#7B68AA',
};

const fieldLabels: Record<string, string> = {
  'pidana': 'Pidana',
  'perdata': 'Perdata',
  'tata-negara': 'Tata Negara',
  'internasional': 'Internasional',
  'administrasi': 'Administrasi',
};

export default function MaximCard({ maxim, compact = false }: MaximCardProps) {
  const { favorites, toggleFavorite } = useVeriLexStore();
  const isFav = favorites.includes(maxim.id);

  return (
    <article style={{
      display: 'grid',
      gridTemplateColumns: '1fr auto',
      gap: '0 0.75rem',
      backgroundColor: '#FFFFFF',
      border: '1px solid #A2A9B1',
      borderLeft: `3px solid ${fieldColors[maxim.legalFields[0]] || 'var(--navy)'}`,
      padding: compact ? '0.875rem 1rem' : '1rem 1.25rem',
      transition: 'background-color 100ms',
    }}
      onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#F8F9FA')}
      onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#FFFFFF')}
    >
      {/* Left: Content */}
      <Link href={`/maksim/${maxim.id}`} style={{ textDecoration: 'none', gridColumn: 1 }}>
        {/* Latin phrase */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '0.25rem' }}>
          <span style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: compact ? '0.9375rem' : '1.0625rem',
            color: 'var(--navy)',
            lineHeight: 1.3,
          }}>
            {maxim.latinPhrase}
          </span>
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.6875rem',
            color: '#72777D',
            whiteSpace: 'nowrap',
          }}>
            {maxim.pronunciationGuide}
          </span>
        </div>

        {/* Indonesian meaning */}
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.875rem',
          color: '#54595D',
          lineHeight: 1.55,
          margin: '0 0 0.5rem',
          fontStyle: 'italic',
        }}>
          &ldquo;{maxim.indonesianMeaning}&rdquo;
        </p>

        {/* Preview snippet */}
        {!compact && (
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.8125rem',
            color: '#72777D',
            lineHeight: 1.5,
            margin: '0 0 0.625rem',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}>
            {maxim.legalMeaning.split('\n\n')[0]?.substring(0, 180)}...
          </p>
        )}

        {/* Tags + Read more */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          {maxim.legalFields.map((field) => (
            <span
              key={field}
              style={{
                display: 'inline-block',
                fontSize: '0.6875rem',
                fontWeight: 600,
                color: fieldColors[field] || 'var(--navy)',
                backgroundColor: `${fieldColors[field]}18` || '#F8F9FA',
                border: `1px solid ${fieldColors[field]}40` || '1px solid #EAECF0',
                padding: '0.125rem 0.5rem',
                borderRadius: '2px',
              }}
            >
              {fieldLabels[field] || field}
            </span>
          ))}
          <span style={{
            marginLeft: 'auto',
            color: 'var(--wiki-blue)',
            fontSize: '0.8125rem',
            fontWeight: 500,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.2rem',
          }}>
            Baca <ArrowRight size={12} />
          </span>
        </div>
      </Link>

      {/* Right: Favorite toggle */}
      <button
        onClick={(e) => {
          e.preventDefault();
          toggleFavorite(maxim.id);
        }}
        aria-label={isFav ? 'Hapus dari favorit' : 'Tambah ke favorit'}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: isFav ? 'var(--bronze)' : '#C8CCD1',
          padding: '0.125rem',
          display: 'flex',
          alignItems: 'flex-start',
          paddingTop: '0.25rem',
          alignSelf: 'start',
          transition: 'color 150ms',
        }}
        title={isFav ? 'Tersimpan di Favorit' : 'Tambah ke Favorit'}
      >
        <Star size={16} fill={isFav ? 'var(--bronze)' : 'none'} />
      </button>
    </article>
  );
}
