'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Search, Brain, BookMarked, Star, ArrowRight, BookOpen } from 'lucide-react';
import { legalFields, mockMaxims } from '@/data/mockData';
import Sidebar from '@/components/layout/Sidebar';
import MaximCard from '@/components/maxim/MaximCard';
import { useVeriLexStore } from '@/lib/useStore';

export default function HomepageClient() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const { favorites } = useVeriLexStore();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/cari?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const featuredMaxim = mockMaxims[0];
  const listMaxims = mockMaxims.slice(1, 4);

  return (
    <div className="container-page" style={{ display: 'flex', gap: '1rem' }}>
      
      {/* ── Left Sidebar (Wikipedia Style) ── */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* ── Main Panel (Wikipedia main page style) ── */}
      <main
        style={{
          flex: 1,
          minWidth: 0,
          backgroundColor: '#FFFFFF',
          borderLeft: '1px solid #A2A9B1',
          padding: '1.25rem 1.5rem 3rem',
          minHeight: 'calc(100vh - 46px)',
        }}
      >
        {/* ── Wikipedia Vector Navigation Tabs ── */}
        <div className="vector-tabs-container">
          <div className="vector-tabs-group">
            <span className="vector-tab-item active">Halaman Utama</span>
            <span className="vector-tab-item disabled">Pembicaraan</span>
          </div>
          <div className="vector-tabs-group">
            <span className="vector-tab-item active">Baca</span>
            <span className="vector-tab-item disabled">Lihat sumber</span>
            <span className="vector-tab-item disabled">Lihat riwayat</span>
          </div>
        </div>

        {/* ── Wikipedia Style Welcome Banner ── */}
        <section
          style={{
            backgroundColor: '#F8F9FA',
            border: '1px solid #A2A9B1',
            padding: '1.5rem',
            marginBottom: '1.5rem',
            textAlign: 'center',
            position: 'relative',
          }}
        >
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 400,
            fontSize: '1.75rem',
            color: '#000000',
            margin: '0 0 0.5rem',
            border: 'none',
            padding: 0
          }}>
            Selamat datang di VeriLex,
          </h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: '#54595D', margin: '0 0 1.25rem' }}>
            ensiklopedia bebas maksim hukum Latin terintegrasi dengan {mockMaxims.length} entri aktif.
          </p>

          {/* Search Form */}
          <form onSubmit={handleSearch} style={{ display: 'flex', gap: '0.375rem', maxWidth: '540px', margin: '0 auto' }} role="search">
            <div style={{ position: 'relative', flex: 1 }}>
              <label htmlFor="homepage-search-bar" className="sr-only">Cari VeriLex</label>
              <input
                type="search"
                id="homepage-search-bar"
                placeholder="Cari dalam VeriLex..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-text"
                style={{ height: '34px', fontSize: '0.875rem', borderRadius: '2px' }}
              />
            </div>
            <button type="submit" className="btn-primary" style={{ height: '34px', padding: '0 1.25rem' }}>
              Cari
            </button>
          </form>
        </section>

        {/* ── Two Column Wikipedia Portal Layout ── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.25rem' }} className="md:grid-cols-2">

          {/* ── Left Column: Featured & History ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* Featured Article Card */}
            <div style={{ border: '1px solid #A2A9B1', borderRadius: '0', backgroundColor: '#FFFFFF' }}>
              <h2 style={{
                backgroundColor: '#EAF3FF',
                color: '#000000',
                fontSize: '0.875rem',
                fontFamily: 'var(--font-body)',
                fontWeight: 700,
                margin: 0,
                padding: '0.5rem 0.75rem',
                borderBottom: '1px solid #A2A9B1'
              }}>
                Artikel pilihan hari ini
              </h2>
              <div style={{ padding: '1rem' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.25rem', margin: '0 0 0.5rem' }}>
                  <Link href={`/maksim/${featuredMaxim.id}`} className="wiki-link">
                    {featuredMaxim.latinPhrase}
                  </Link>
                </h3>
                <p style={{ fontSize: '0.8125rem', color: '#54595D', fontStyle: 'italic', margin: '0 0 0.75rem' }}>
                  &ldquo;{featuredMaxim.literalTranslation}&rdquo;
                </p>
                <p style={{ margin: '0 0 1rem', lineHeight: 1.5 }}>
                  {featuredMaxim.legalMeaning.split('\n\n')[0]?.substring(0, 240)}...
                </p>
                <Link href={`/maksim/${featuredMaxim.id}`} className="wiki-link" style={{ fontSize: '0.8125rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                  Selengkapnya... <ArrowRight size={12} />
                </Link>
              </div>
            </div>

            {/* List entries */}
            <div style={{ border: '1px solid #A2A9B1', borderRadius: '0', backgroundColor: '#FFFFFF' }}>
              <h2 style={{
                backgroundColor: '#EAF3FF',
                color: '#000000',
                fontSize: '0.875rem',
                fontFamily: 'var(--font-body)',
                fontWeight: 700,
                margin: 0,
                padding: '0.5rem 0.75rem',
                borderBottom: '1px solid #A2A9B1'
              }}>
                Entri maksim populer
              </h2>
              <div style={{ padding: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {listMaxims.map(maxim => (
                  <MaximCard key={maxim.id} maxim={maxim} compact />
                ))}
              </div>
            </div>
          </div>

          {/* ── Right Column: Learning & Categories ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* Learning tools */}
            <div style={{ border: '1px solid #A2A9B1', borderRadius: '0', backgroundColor: '#FFFFFF' }}>
              <h2 style={{
                backgroundColor: '#F8F9FA',
                color: '#000000',
                fontSize: '0.875rem',
                fontFamily: 'var(--font-body)',
                fontWeight: 700,
                margin: 0,
                padding: '0.5rem 0.75rem',
                borderBottom: '1px solid #A2A9B1'
              }}>
                Modul Pembelajaran
              </h2>
              <div style={{ padding: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                {[
                  { href: '/quiz', icon: Brain, label: 'Quiz Interaktif', desc: 'Uji wawasan maksim secara acak' },
                  { href: '/flashcard', icon: BookMarked, label: 'Flashcard SRA', desc: 'Latihan mengingat dengan sistem flip 3D' },
                  { href: '/favorit', icon: Star, label: `Favorit Saya (${favorites.length})`, desc: 'Kumpulan maksim yang Anda simpan' },
                ].map((item, idx) => (
                  <Link
                    key={idx}
                    href={item.href}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      padding: '0.5rem',
                      textDecoration: 'none',
                      borderBottom: idx === 2 ? 'none' : '1px solid #EAECF0',
                    }}
                    className="interactive-card"
                  >
                    <div style={{ color: 'var(--navy)' }}><item.icon size={18} /></div>
                    <div>
                      <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#0645AD' }} className="wiki-link">{item.label}</div>
                      <div style={{ fontSize: '0.75rem', color: '#54595D' }}>{item.desc}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Portal Bidang Hukum */}
            <div style={{ border: '1px solid #A2A9B1', borderRadius: '0', backgroundColor: '#FFFFFF' }}>
              <h2 style={{
                backgroundColor: '#F8F9FA',
                color: '#000000',
                fontSize: '0.875rem',
                fontFamily: 'var(--font-body)',
                fontWeight: 700,
                margin: 0,
                padding: '0.5rem 0.75rem',
                borderBottom: '1px solid #A2A9B1'
              }}>
                Portal bidang hukum
              </h2>
              <div style={{ padding: '0.5rem 0' }}>
                {legalFields.map(field => (
                  <Link
                    key={field.id}
                    href={`/cari?bidang=${field.id}`}
                    style={{ display: 'flex', justifyContent: 'space-between', padding: '0.375rem 0.75rem', fontSize: '0.8125rem', textDecoration: 'none' }}
                    onMouseEnter={e => ((e.currentTarget as HTMLElement).style.backgroundColor = '#F8F9FA')}
                    onMouseLeave={e => ((e.currentTarget as HTMLElement).style.backgroundColor = 'transparent')}
                  >
                    <span className="wiki-link" style={{ fontWeight: 500 }}>{field.label}</span>
                    <span style={{ fontSize: '0.75rem', color: '#72777D', fontFamily: 'var(--font-mono)' }}>{field.count} entri</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

        </div>
      </main>

    </div>
  );
}
