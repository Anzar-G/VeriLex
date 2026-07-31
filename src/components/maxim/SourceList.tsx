'use client';

import { useEffect, useState } from 'react';
import { ExternalLink } from 'lucide-react';

interface Source {
  id: string;
  trust_level: 'primer' | 'doktrin' | 'pendapat_ahli' | 'pendukung';
  source_type: string;
  title: string;
  author?: string;
  year?: number;
  url?: string;
  description?: string;
}

const TRUST_CONFIG = {
  primer: {
    label: '🟢 Sumber Primer',
    desc: 'UU, Putusan Pengadilan, Peraturan resmi',
    color: '#065F46', bg: '#ECFDF5', border: '#A7F3D0',
    order: 0,
  },
  doktrin: {
    label: '🟡 Doktrin',
    desc: 'Buku, Disertasi, Jurnal Ilmiah',
    color: '#92400E', bg: '#FFFBEB', border: '#FDE68A',
    order: 1,
  },
  pendapat_ahli: {
    label: '🔵 Pendapat Ahli',
    desc: 'Pandangan pakar hukum terkemuka',
    color: '#1E40AF', bg: '#EFF6FF', border: '#BFDBFE',
    order: 2,
  },
  pendukung: {
    label: '🟣 Referensi Pendukung',
    desc: 'Artikel ilmiah, Website resmi',
    color: '#6B21A8', bg: '#FDF4FF', border: '#E9D5FF',
    order: 3,
  },
};

const SOURCE_TYPE_LABELS: Record<string, string> = {
  uu: 'Undang-Undang', putusan: 'Putusan', buku: 'Buku',
  jurnal: 'Jurnal', artikel: 'Artikel', website: 'Website', lainnya: 'Lainnya',
};

export default function SourceList({ maximId }: { maximId: string }) {
  const [sources,  setSources]  = useState<Source[]>([]);
  const [loading,  setLoading]  = useState(true);

  useEffect(() => {
    fetch(`/api/maxims/${maximId}/sources`)
      .then(r => r.json())
      .then(data => setSources(data))
      .finally(() => setLoading(false));
  }, [maximId]);

  if (loading) return <p style={{ fontSize: '0.875rem', color: '#72777D', fontStyle: 'italic' }}>Memuat referensi...</p>;
  if (sources.length === 0) return <p style={{ fontSize: '0.875rem', color: '#72777D', fontStyle: 'italic' }}>Belum ada referensi terverifikasi untuk artikel ini.</p>;

  // Group by trust level
  const grouped = sources.reduce<Record<string, Source[]>>((acc, s) => {
    if (!acc[s.trust_level]) acc[s.trust_level] = [];
    acc[s.trust_level].push(s);
    return acc;
  }, {});

  const sortedGroups = Object.entries(grouped).sort(
    ([a], [b]) => TRUST_CONFIG[a as keyof typeof TRUST_CONFIG].order - TRUST_CONFIG[b as keyof typeof TRUST_CONFIG].order
  );

  return (
    <div style={{ margin: '0.5rem 0 1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {sortedGroups.map(([level, items]) => {
        const cfg = TRUST_CONFIG[level as keyof typeof TRUST_CONFIG];
        return (
          <div key={level}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', padding: '0.375rem 0.625rem', backgroundColor: cfg.bg, border: `1px solid ${cfg.border}` }}>
              <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: cfg.color }}>{cfg.label}</span>
              <span style={{ fontSize: '0.6875rem', color: cfg.color, opacity: 0.8 }}>— {cfg.desc}</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem', paddingLeft: '0.5rem' }}>
              {items.map(src => (
                <div key={src.id} style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start', padding: '0.5rem 0.75rem', backgroundColor: '#FFFFFF', border: '1px solid #EAECF0', borderLeft: `3px solid ${cfg.border}` }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                      <span style={{ fontSize: '0.6875rem', fontWeight: 700, padding: '0.1rem 0.375rem', backgroundColor: cfg.bg, color: cfg.color, border: `1px solid ${cfg.border}` }}>
                        {SOURCE_TYPE_LABELS[src.source_type] || src.source_type}
                      </span>
                      {src.year && <span style={{ fontSize: '0.6875rem', color: '#72777D', fontFamily: 'var(--font-mono)' }}>{src.year}</span>}
                    </div>
                    <p style={{ fontSize: '0.875rem', fontWeight: 600, color: '#202122', margin: '0.25rem 0 0', lineHeight: 1.3 }}>
                      {src.title}
                    </p>
                    {src.author && (
                      <p style={{ fontSize: '0.75rem', color: '#54595D', margin: '0.125rem 0 0' }}>
                        {src.author}
                      </p>
                    )}
                    {src.description && (
                      <p style={{ fontSize: '0.75rem', color: '#72777D', margin: '0.25rem 0 0', fontStyle: 'italic' }}>
                        {src.description}
                      </p>
                    )}
                  </div>
                  {src.url && (
                    <a href={src.url} target="_blank" rel="noopener noreferrer"
                      style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#0645AD', fontSize: '0.75rem', textDecoration: 'none', flexShrink: 0, marginTop: '0.25rem' }}>
                      <ExternalLink size={12} /> Buka
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
