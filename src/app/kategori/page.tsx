import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Sidebar from '@/components/layout/Sidebar';
import { createServerClient } from '@/lib/supabase-server';
import { siteUrl } from '@/lib/site';
import { ArrowRight, Grid } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Kategori Maksim Hukum — VeriLex',
  description: 'Jelajahi maksim hukum Latin berdasarkan bidang hukum: Pidana, Perdata, Tata Negara, dan lainnya.',
  alternates: { canonical: `${siteUrl}/kategori` },
};

const categories: { id: string; label: string; icon: string; desc: string; bg: string }[] = [
  { id: 'umum',          label: 'Asas Umum & Penafsiran',   icon: '⚖️', desc: 'Prinsip fundamental yang berlaku lintas bidang hukum', bg: '#EFF6FF' },
  { id: 'pidana',        label: 'Hukum Pidana & Acara',     icon: '🔒', desc: 'Asas dalam hukum pidana dan prosedur peradilan pidana', bg: '#FEF2F2' },
  { id: 'perdata',       label: 'Hukum Perdata & Kontrak',   icon: '📄', desc: 'Prinsip perjanjian, kontrak, dan kewajiban perdata', bg: '#ECFDF5' },
  { id: 'properti',      label: 'Hak Milik & Benda',         icon: '🏛️', desc: 'Asas kepemilikan, benda, dan hak kebendaan', bg: '#FFFBEB' },
  { id: 'keluarga',      label: 'Waris & Hukum Keluarga',    icon: '👨‍👩‍👧', desc: 'Maksim tentang warisan, keluarga, dan perkawinan', bg: '#FDF4FF' },
  { id: 'bisnis',        label: 'Dagang & Korporasi',         icon: '💼', desc: 'Asas dalam hukum bisnis, dagang, dan korporasi', bg: '#F0F9FF' },
  { id: 'internasional', label: 'Internasional & HAM',        icon: '🌍', desc: 'Prinsip hukum internasional dan hak asasi manusia', bg: '#F5F3FF' },
  { id: 'tata-negara',   label: 'Administrasi & Tata Negara', icon: '🏛',  desc: 'Asas hukum administrasi negara dan tata negara', bg: '#F0FDF4' },
  { id: 'acara',         label: 'Hukum Acara Perdata',        icon: '📋', desc: 'Prinsip prosedur dan pembuktian dalam persidangan', bg: '#FFF7ED' },
  { id: 'administrasi',  label: 'Hukum Administrasi',         icon: '📁', desc: 'Asas dalam hubungan pemerintah dengan warga negara', bg: '#F1F5F9' },
  { id: 'lain-lain',     label: 'Lain-lain & Filosofis',      icon: '💡', desc: 'Maksim filosofis dan asas yang tidak terkategori', bg: '#FEF3C7' },
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
      <div style={{ display: 'flex', minHeight: 'calc(100vh - 46px)', backgroundColor: '#F8FAFC' }}>
        <div className="hidden lg:block">
          <Sidebar />
        </div>
        <main style={{ flex: 1, minWidth: 0, padding: '2rem 1.5rem' }}>
          <div style={{ maxWidth: '1080px', margin: '0 auto' }}>

            {/* Page Header */}
            <div className="page-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '0.375rem' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Grid size={20} color="#2563EB" />
                </div>
                <h1 style={{ margin: 0 }}>Kategori Maksim Hukum</h1>
              </div>
              <p style={{ marginTop: '0.25rem' }}>
                {total} entri maksim terstruktur dalam {categories.length} portal bidang hukum.{' '}
                Lihat juga <Link href="/indeks" style={{ color: '#2563EB', fontWeight: 600 }}>Indeks Lengkap A–Z</Link> untuk penelusuran alfabetis.
              </p>
            </div>

            {/* Category Cards Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
              {categories.map(cat => {
                const count = counts[cat.id] ?? 0;
                return (
                  <Link
                    key={cat.id}
                    href={`/cari?bidang=${cat.id}`}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      padding: '1.5rem',
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #E2E8F0',
                      borderRadius: '12px',
                      textDecoration: 'none',
                      boxShadow: '0 4px 15px -2px rgba(15, 23, 42, 0.03)',
                      transition: 'all 200ms ease',
                    }}
                    className="wiki-card-hover"
                  >
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '1rem' }}>
                      <div style={{
                        width: '48px', height: '48px', borderRadius: '10px',
                        backgroundColor: cat.bg, display: 'flex',
                        alignItems: 'center', justifyContent: 'center',
                        fontSize: '1.5rem', flexShrink: 0,
                      }}>
                        {cat.icon}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <h2 style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.9375rem', color: '#0F172A', margin: '0 0 0.375rem', lineHeight: 1.35, border: 'none', padding: 0 }}>
                          {cat.label}
                        </h2>
                        <p style={{ fontSize: '0.8125rem', color: '#64748B', margin: 0, lineHeight: 1.5 }}>
                          {cat.desc}
                        </p>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #F1F5F9', paddingTop: '0.875rem', marginTop: 'auto' }}>
                      <span className={`badge ${count > 0 ? 'badge-info' : 'badge-neutral'}`}>
                        {count} maksim
                      </span>
                      <span style={{ fontSize: '0.8125rem', color: '#2563EB', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                        Jelajahi <ArrowRight size={14} />
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
