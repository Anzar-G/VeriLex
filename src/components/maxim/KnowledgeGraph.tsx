'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowLeft, ArrowLeftRight } from 'lucide-react';

interface RelationNode {
  id: string;
  direction: 'outgoing' | 'incoming';
  relation_type: string;
  description: string | null;
  maxim: {
    id: string;
    latin_phrase: string;
    indonesian_meaning: string;
    legal_fields: string[];
    difficulty: string;
  };
}

const RELATION_CONFIG: Record<string, { label: string; color: string; bg: string; border: string }> = {
  sinonim:    { label: 'Sejenis',     color: '#065F46', bg: '#ECFDF5', border: '#A7F3D0' },
  antonim:    { label: 'Berlawanan',  color: '#991B1B', bg: '#FEF2F2', border: '#FECACA' },
  hierarkis:  { label: 'Hierarki',    color: '#1E40AF', bg: '#EFF6FF', border: '#BFDBFE' },
  turunan:    { label: 'Turunan',     color: '#6B21A8', bg: '#FDF4FF', border: '#E9D5FF' },
  berlawanan: { label: 'Berlawanan',  color: '#92400E', bg: '#FFFBEB', border: '#FDE68A' },
  terkait:    { label: 'Terkait',     color: '#134E4A', bg: '#F0FDFA', border: '#99F6E4' },
};

const DIFFICULTY_CONFIG: Record<string, { label: string; color: string }> = {
  dasar:    { label: 'Dasar',    color: '#065F46' },
  menengah: { label: 'Menengah', color: '#92400E' },
  lanjutan: { label: 'Lanjutan', color: '#991B1B' },
};

interface Props {
  maximId: string;
  maximLatinPhrase: string;
}

export default function KnowledgeGraph({ maximId, maximLatinPhrase }: Props) {
  const [relations, setRelations] = useState<RelationNode[]>([]);
  const [loading,   setLoading]   = useState(true);

  useEffect(() => {
    fetch(`/api/maxims/${maximId}/relations`)
      .then(r => r.json())
      .then(data => setRelations(data))
      .finally(() => setLoading(false));
  }, [maximId]);

  if (loading) return (
    <div style={{ padding: '1rem', textAlign: 'center', color: '#72777D', fontSize: '0.8125rem' }}>
      Memuat knowledge graph...
    </div>
  );

  if (relations.length === 0) return (
    <div style={{ padding: '1rem', color: '#72777D', fontSize: '0.875rem', fontStyle: 'italic' }}>
      Belum ada hubungan antar maksim yang terdaftar untuk artikel ini.
    </div>
  );

  // Group by relation type
  const grouped = relations.reduce<Record<string, RelationNode[]>>((acc, r) => {
    if (!acc[r.relation_type]) acc[r.relation_type] = [];
    acc[r.relation_type].push(r);
    return acc;
  }, {});

  return (
    <div style={{ margin: '0.5rem 0 1.25rem' }}>
      {/* Visual graph representation */}
      <div style={{ border: '1px solid #EAECF0', padding: '1.25rem', backgroundColor: '#FAFAFA', marginBottom: '1rem' }}>
        {/* Center node */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '1.5rem' }}>
          <div style={{
            backgroundColor: '#0F1B3C', color: '#FFFFFF',
            padding: '0.625rem 1.25rem', fontFamily: 'var(--font-display)',
            fontStyle: 'italic', fontSize: '0.9375rem', fontWeight: 700,
            border: '2px solid #0F1B3C', maxWidth: '300px', textAlign: 'center',
          }}>
            {maximLatinPhrase}
          </div>
          <div style={{ fontSize: '0.6875rem', color: '#72777D', marginTop: '0.25rem' }}>
            (artikel ini)
          </div>
        </div>

        {/* Relations grouped */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {Object.entries(grouped).map(([relType, nodes]) => {
            const cfg = RELATION_CONFIG[relType] ?? RELATION_CONFIG.terkait;
            return (
              <div key={relType}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <div style={{ height: '1px', flex: 1, backgroundColor: cfg.border }} />
                  <span style={{ fontSize: '0.6875rem', fontWeight: 700, padding: '0.125rem 0.5rem', backgroundColor: cfg.bg, color: cfg.color, border: `1px solid ${cfg.border}`, whiteSpace: 'nowrap' }}>
                    {cfg.label}
                  </span>
                  <div style={{ height: '1px', flex: 1, backgroundColor: cfg.border }} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '0.5rem' }}>
                  {nodes.map(node => {
                    const diff = DIFFICULTY_CONFIG[node.maxim.difficulty] ?? DIFFICULTY_CONFIG.menengah;
                    return (
                      <Link key={node.id} href={`/maksim/${node.maxim.id}`} style={{ textDecoration: 'none' }}>
                        <div style={{
                          border: `1px solid ${cfg.border}`,
                          backgroundColor: cfg.bg,
                          padding: '0.625rem 0.875rem',
                          transition: 'box-shadow 150ms',
                          cursor: 'pointer',
                        }}
                          onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)')}
                          onMouseLeave={e => (e.currentTarget.style.boxShadow = 'none')}
                        >
                          {/* Direction indicator */}
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', marginBottom: '0.375rem' }}>
                            {node.direction === 'outgoing'
                              ? <ArrowRight size={12} style={{ color: cfg.color }} />
                              : node.direction === 'incoming'
                              ? <ArrowLeft size={12} style={{ color: cfg.color }} />
                              : <ArrowLeftRight size={12} style={{ color: cfg.color }} />
                            }
                            <span style={{ fontSize: '0.625rem', color: cfg.color, fontWeight: 600 }}>
                              {node.direction === 'outgoing' ? 'Menuju' : 'Dari'}
                            </span>
                            <span style={{ marginLeft: 'auto', fontSize: '0.625rem', color: diff.color, fontWeight: 700 }}>
                              ● {diff.label}
                            </span>
                          </div>

                          <p style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 700, fontSize: '0.875rem', color: '#0F1B3C', margin: '0 0 0.25rem', lineHeight: 1.3 }}>
                            {node.maxim.latin_phrase}
                          </p>
                          <p style={{ fontSize: '0.75rem', color: '#54595D', margin: 0, lineHeight: 1.4,
                            display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden'
                          }}>
                            {node.maxim.indonesian_meaning}
                          </p>
                          {node.description && (
                            <p style={{ fontSize: '0.6875rem', color: cfg.color, margin: '0.375rem 0 0', fontStyle: 'italic' }}>
                              {node.description}
                            </p>
                          )}
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <p style={{ fontSize: '0.75rem', color: '#72777D', margin: 0 }}>
        {relations.length} hubungan terdaftar · Klik kartu untuk membaca artikel terkait
      </p>
    </div>
  );
}
