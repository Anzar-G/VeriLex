import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Sidebar from '@/components/layout/Sidebar';
import { createServerClient } from '@/lib/supabase-server';
import { siteUrl } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Kategori Maksim Hukum — VeriLex',
  description: 'Jelajahi maksim hukum Latin berdasarkan bidang hukum: Pidana, Perdata, Tata Negara, dan lainnya.',
  alternates: { canonical: `${siteUrl}/kategori` },
};

const categories: { id: string; label: string; icon: string; desc: string }[] = [
  { id: 'umum',          label: 'Asas Umum & Penafsiran', icon: '⚖️', desc: 'Prinsip fundamental yang berlaku lintas bidang hukum' },
  { id: 'pidana',        label: 'Hukum Pidana & Acara',   icon: '🔒', desc: 'Asas dalam hukum pidana dan hukum acara pidana' },
  { id: 'perdata',       label: 'Hukum Perdata & Kontrak', icon: '📄', desc: 'Prinsip perjanjian, kontrak, dan kewajiban perdata' },
  { id: 'properti',      label: 'Hak Milik & Benda',       icon: '🏛️', desc: 'Asas kepemilikan, benda, dan hak kebendaan' },
  { id: 'keluarga',      label: 'Waris & Hukum Keluarga',  icon: '👨‍👩‍👧', desc: 'Maksim tentang warisan, keluarga, dan perkawinan' },
  { id: 'bisnis',        label: 'Dagang & Korporasi',       icon: '💼', desc: 'Asas dalam hukum bisnis, dagang, dan korporasi' },
  { id: 'internasional', label: 'Internasional & HAM',      icon: '🌍', desc: 'Prinsip hukum internasional dan hak asasi manusia' },
  { id: 'tata-negara',   label: 'Administrasi & Tata Negara', icon: '🏛', desc: 'Asas hukum administrasi negara dan tata negara' },
  { id: 'acara',         label: 'Hukum Acara Perdata',      icon: '📋', desc: 'Prinsip prosedur dan pembuktian dalam persidangan' },
  { id: 'administrasi',  label: 'Hukum Administrasi',       icon: '📁', desc: 'Asas dalam hubungan pemerintah dengan warga negara' },
  { id: 'lain-lain',     label: 'Lain-lain & Filosofis',    icon: '💡', desc: 'Maksim filosofis dan asas yang tidak terkategori' },
];

export default async function CategoryPage() {
  const supabase = createServerClient();
  const { data } = await supabase
    .from('maxims')
    .select('legal_fields')
    .eq('is_active', true);

  const counts: Record<string, number> = {};
  for (const row of data ?? []) {
    for (const field of (row.legal_fields ?? []) as string[]) {
      counts[field] = (counts[field] ?? 0) + 1;
    }
  }

  const total = Object.values(counts).reduce((a, b) => a + b, 0);

  return (
    <>
      <Header />
      <div style={{ display: 'flex', minHeight: 'calc(100vh - 46px)' }}>
        <div className="hidden lg:block">
          <Sidebar />
        </div>
        <main style={{ flex: 1, minWidth: 0, backgroundColor: '#F8F9FA', padding: '2rem' }}>
          <div style={{ maxWidth: '900px' }}>

            {/* Header */}
            <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #A2A9B1', padding: '1.5rem 2rem', marginBottom: '1.5rem' }}>
              <h1 style={{ margin: '0 0 0.375rem', border: 'none', padding: 0, fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.5rem', color: '#0F1B3C' }}>
                Kategori Maksim Hukum
              </h1>
              <p style={{ margin: 0, fontSize: '0.875rem', color: '#54595D' }}>
                {total} entri tersebar dalam {categories.length} bidang hukum.
                Lihat juga <Link href="/indeks" style={{ color: '#0645AD' }}>Indeks A–Z</Link> untuk penelusuran alfabetis.
              </p>
            </div>

            {/* Category grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
              {categories.map(cat => {
                const count = counts[cat.id] ?? 0;
                return (
                  <Link
                    key={cat.id}
                    href={`/cari?bidang=${cat.id}`}
                    style={{
                      display: 'flex', flexDirection: 'column', gap: '0.75rem',
                      padding: '1.25rem 1.25rem 1rem',
                      backgroundColor: '#FFFFFF', border: '1px solid #EAECF0',
                      textDecoration: 'none', transition: 'border-color 120ms, box-shadow 120ms',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                      <span style={{ fontSize: '1.5rem', lineHeight: 1, flexShrink: 0 }}>{cat.icon}</span>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.9rem', color: '#0F1B3C', margin: '0 0 0.25rem', lineHeight: 1.3 }}>
                          {cat.label}
                        </p>
                        <p style={{ fontSize: '0.8rem', color: '#72777D', margin: 0, lineHeight: 1.4 }}>
                          {cat.desc}
                        </p>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #EAECF0', paddingTop: '0.75rem', marginTop: 'auto' }}>
                      <span style={{
                        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                        padding: '0.125rem 0.625rem',
                        backgroundColor: count > 0 ? '#EAF3FF' : '#F8F9FA',
                        color: count > 0 ? '#0645AD' : '#A2A9B1',
                        border: `1px solid ${count > 0 ? '#BFDBFE' : '#EAECF0'}`,
                        fontSize: '0.8rem', fontWeight: 700,
                      }}>
                        {count} maksim
                      </span>
                      <span style={{ fontSize: '0.75rem', color: '#0645AD', fontWeight: 600 }}>
                        Jelajahi →
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>

          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}
