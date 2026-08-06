'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Sidebar from '@/components/layout/Sidebar';
import { Award, BookOpen, Flag, Search } from 'lucide-react';
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
      <div style={{ display: 'flex', minHeight: 'calc(100vh - 46px)' }}>
        <div className="hidden lg:block"><Sidebar /></div>
        <main style={{ flex: 1, minWidth: 0, backgroundColor: '#F8F9FA', padding: '2rem' }}>
          <div style={{ maxWidth: '900px' }}>

            <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #A2A9B1', padding: '1.5rem 2rem', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ width: '36px', height: '36px', backgroundColor: '#FDF4FF', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Award size={18} color="#6B21A8" />
                </div>
                <div>
                  <h1 style={{ margin: 0, border: 'none', padding: 0, fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.375rem', color: '#0F1B3C' }}>
                    Workspace Pakar Bidang
                  </h1>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: '#54595D' }}>
                    Tinjau dan validasi konten sesuai bidang keahlian hukum Anda.
                  </p>
                </div>
              </div>
            </div>

            {/* Panduan */}
            <div style={{ backgroundColor: '#FDF4FF', border: '1px solid #E9D5FF', padding: '1.25rem 1.5rem', marginBottom: '1.5rem' }}>
              <h3 style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.875rem', color: '#6B21A8', marginTop: 0, marginBottom: '0.5rem', border: 'none', padding: 0 }}>
                <Award size={14} style={{ verticalAlign: 'middle', marginRight: '0.375rem' }} />
                Peran Pakar Bidang
              </h3>
              <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.8125rem', color: '#6B21A8', lineHeight: 1.75 }}>
                <li>Tinjau keakuratan substantif entri maksim di bidang keahlian Anda</li>
                <li>Berikan komentar akademis melalui tab Diskusi pada setiap halaman maksim</li>
                <li>Laporkan ketidakakuratan melalui tombol <Flag size={11} style={{ verticalAlign: 'middle' }} /> Laporkan di halaman detail</li>
                <li>Koordinasi dengan Senior Editor untuk artikel yang memerlukan revisi besar</li>
              </ul>
            </div>

            {/* Search */}
            <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #A2A9B1', padding: '1.5rem 2rem' }}>
              <h2 style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '1rem', color: '#0F1B3C', margin: '0 0 1rem', border: 'none', padding: 0 }}>
                Telusuri Maksim untuk Ditinjau
              </h2>
              <div style={{ position: 'relative', marginBottom: '1rem' }}>
                <Search size={14} style={{ position: 'absolute', left: '0.625rem', top: '50%', transform: 'translateY(-50%)', color: '#72777D' }} />
                <input
                  type="search"
                  placeholder="Cari frase Latin atau terjemahan…"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="input-text"
                  style={{ paddingLeft: '2rem', fontSize: '0.875rem' }}
                />
              </div>
              {loading ? (
                <p style={{ color: '#72777D', fontSize: '0.875rem' }}>Memuat daftar maksim…</p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: '500px', overflowY: 'auto' }}>
                  {filtered.slice(0, 30).map(m => (
                    <div key={m.id} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.625rem 0.75rem', border: '1px solid #EAECF0', backgroundColor: '#FAFBFC' }}>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontWeight: 700, fontSize: '0.875rem', color: '#0F1B3C', margin: '0 0 0.125rem', fontFamily: 'var(--font-display)' }}>{m.latin_phrase}</p>
                        <p style={{ fontSize: '0.8rem', color: '#54595D', margin: 0 }}>{m.indonesian_meaning}</p>
                      </div>
                      <div style={{ display: 'flex', gap: '0.25rem', flexWrap: 'wrap', justifyContent: 'flex-end', flexShrink: 0 }}>
                        {(m.legal_fields as string[]).slice(0, 2).map((f: string) => (
                          <span key={f} style={{ fontSize: '0.7rem', padding: '0.125rem 0.375rem', backgroundColor: '#EFF6FF', color: '#1E40AF', border: '1px solid #BFDBFE' }}>
                            {fieldLabels[f] ?? f}
                          </span>
                        ))}
                      </div>
                      <Link href={`/maksim/${m.id}`} style={{ flexShrink: 0, fontSize: '0.75rem', color: '#0645AD', fontWeight: 600, textDecoration: 'none', whiteSpace: 'nowrap' }}>
                        <BookOpen size={13} style={{ verticalAlign: 'middle', marginRight: '0.25rem' }} />
                        Tinjau
                      </Link>
                    </div>
                  ))}
                  {filtered.length === 0 && (
                    <p style={{ color: '#72777D', fontSize: '0.875rem', textAlign: 'center', padding: '1.5rem' }}>Tidak ada hasil untuk "{search}"</p>
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
