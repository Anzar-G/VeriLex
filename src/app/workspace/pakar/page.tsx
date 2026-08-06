'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Sidebar from '@/components/layout/Sidebar';
import { Award, BookOpen, Flag, Search, ArrowRight } from 'lucide-react';
import { useVeriLexStore } from '@/lib/useStore';
import { apiFetch } from '@/lib/api-fetch';

type MaximItem = { id: string; latin_phrase: string; indonesian_meaning: string; legal_fields: string[] };

const fieldLabels: Record<string, string> = {
  umum: 'Asas Umum', pidana: 'Pidana', perdata: 'Perdata', properti: 'Hak Milik',
  keluarga: 'Waris & Keluarga', bisnis: 'Dagang', internasional: 'Internasional',
  'tata-negara': 'Tata Negara', acara: 'Acara', 'lain-lain': 'Filosofis', administrasi: 'Administrasi',
};

export default function PakarWorkspacePage() {
  const { authUser } = useVeriLexStore();
  const [maxims, setMaxims] = useState<MaximItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (!authUser) return;
    apiFetch('/api/maxims?limit=50')
      .then(r => r.json())
      .then(d => {
        const mapped = (d.data ?? []).map((row: Record<string, unknown>) => ({
          id: row.id,
          latin_phrase: row.latin_phrase,
          indonesian_meaning: row.indonesian_meaning,
          legal_fields: row.legal_fields ?? [],
        }));
        setMaxims(mapped);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [authUser]);

  if (!authUser || authUser.role !== 'subject_expert') {
    return (
      <>
        <Header />
        <main style={{ padding: '3rem 2rem', textAlign: 'center' }}>
          <p>Halaman ini hanya untuk <strong>Pakar Bidang (Subject Expert)</strong>.</p>
        </main>
        <Footer />
      </>
    );
  }

  const filtered = maxims.filter(m =>
    m.latin_phrase.toLowerCase().includes(search.toLowerCase()) ||
    m.indonesian_meaning.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Header />
      <div style={{ display: 'flex', minHeight: 'calc(100vh - 46px)', backgroundColor: '#F8FAFC' }}>
        <div className="hidden lg:block"><Sidebar /></div>
        <main style={{ flex: 1, minWidth: 0, padding: '2rem 1.5rem' }}>
          <div style={{ maxWidth: '1080px', margin: '0 auto' }}>

            <div className="page-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ width: '40px', height: '40px', backgroundColor: '#FDF4FF', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Award size={20} color="#7C3AED" />
                </div>
                <div>
                  <h1 style={{ margin: 0 }}>Workspace Pakar Bidang</h1>
                  <p style={{ margin: 0 }}>Tinjau dan validasi keakuratan konten substantif sesuai bidang keahlian hukum Anda.</p>
                </div>
              </div>
            </div>

            {/* Role Guidance Callout */}
            <div className="notice-purple" style={{ backgroundColor: '#FAF5FF', border: '1px solid #F3E8FF', color: '#6B21A8', padding: '1.125rem 1.375rem', borderRadius: '10px', marginBottom: '1.5rem' }}>
              <h3 style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.875rem', color: '#6B21A8', marginTop: 0, marginBottom: '0.5rem', border: 'none', padding: 0, display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                <Award size={15} /> Peran Utama Pakar Bidang
              </h3>
              <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.8125rem', color: '#6B21A8', lineHeight: 1.75 }}>
                <li>Tinjau keakuratan substantif entri maksim pada bidang keahlian Anda</li>
                <li>Berikan masukan akademis melalui tab Diskusi pada setiap halaman maksim</li>
                <li>Laporkan ketidakakuratan substantif via tombol <Flag size={11} style={{ verticalAlign: 'middle' }} /> Laporkan</li>
                <li>Koordinasikan revisi besar dengan Senior Editor</li>
              </ul>
            </div>

            {/* Searchable Maxim List */}
            <div className="wiki-card">
              <h2 className="wiki-card-header">Telusuri Maksim untuk Ditinjau</h2>
              <div style={{ position: 'relative', marginBottom: '1.25rem' }}>
                <Search size={16} style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
                <input
                  type="search"
                  placeholder="Cari frase Latin atau terjemahan maksim..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="input-text"
                  style={{ paddingLeft: '2.5rem', fontSize: '0.875rem', borderRadius: '8px', border: '1px solid #E2E8F0', padding: '0.625rem 0.875rem 0.625rem 2.5rem', width: '100%', outline: 'none' }}
                />
              </div>
              {loading ? (
                <div className="skeleton" style={{ height: '200px', width: '100%' }} />
              ) : (
                <div style={{ display: 'grid', gap: '0.625rem', maxHeight: '520px', overflowY: 'auto' }}>
                  {filtered.slice(0, 30).map(m => (
                    <div key={m.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', padding: '0.875rem 1.125rem', border: '1px solid #E2E8F0', borderRadius: '10px', backgroundColor: '#FFFFFF' }} className="wiki-card-hover">
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontWeight: 700, fontSize: '0.9375rem', color: '#0F172A', margin: '0 0 0.125rem', fontFamily: 'var(--font-display)' }}>{m.latin_phrase}</p>
                        <p style={{ fontSize: '0.8125rem', color: '#64748B', margin: 0 }}>{m.indonesian_meaning}</p>
                      </div>
                      <div style={{ display: 'flex', gap: '0.375rem', alignItems: 'center', flexShrink: 0 }}>
                        {(m.legal_fields as string[]).slice(0, 2).map((f: string) => (
                          <span key={f} className="badge badge-info">
                            {fieldLabels[f] ?? f}
                          </span>
                        ))}
                        <Link href={`/maksim/${m.id}`} style={{ fontSize: '0.8125rem', color: '#2563EB', fontWeight: 600, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.25rem', marginLeft: '0.5rem' }}>
                          <BookOpen size={14} /> Tinjau <ArrowRight size={13} />
                        </Link>
                      </div>
                    </div>
                  ))}
                  {filtered.length === 0 && (
                    <p style={{ color: '#64748B', fontSize: '0.875rem', textAlign: 'center', padding: '2rem' }}>Tidak ada hasil untuk "{search}"</p>
                  )}
                </div>
              )}
            </div>

          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}
