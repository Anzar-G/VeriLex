'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Search, Brain, BookMarked, Star, ArrowRight, Library } from 'lucide-react';
import { legalFields, mockMaxims } from '@/data/mockData';
import MaximCard from '@/components/maxim/MaximCard';
import { useVeriLexStore } from '@/lib/useStore';

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

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
  const recentMaxims = mockMaxims.slice(1, 5);

  return (
    <main style={{ backgroundColor: '#F8F9FA', minHeight: 'calc(100vh - 60px)' }}>

      {/* ── Top Portal Section (Wikipedia Hero Style with Subtle Pattern) ── */}
      <section 
        style={{ 
          backgroundColor: '#FFFFFF', 
          borderBottom: '1px solid #A2A9B1', 
          padding: '2.5rem 0 2rem',
          backgroundImage: 'radial-gradient(rgba(15, 27, 60, 0.03) 1px, transparent 0)',
          backgroundSize: '24px 24px'
        }}
      >
        <div className="container-page">
          {/* Main Title Portal */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
            <div style={{ 
              backgroundColor: 'var(--navy)', 
              color: '#FFFFFF', 
              padding: '0.625rem', 
              borderRadius: '2px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center' 
            }}>
              <Library size={32} />
            </div>
            <div>
              <h1 style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: '2rem',
                color: 'var(--navy)',
                margin: 0,
                border: 'none',
                padding: 0,
                lineHeight: 1.2
              }}>
                Selamat Datang di VeriLex
              </h1>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: '#54595D', margin: '0.25rem 0 0' }}>
                Ensiklopedia Maksim Hukum Latin Terintegrasi — {mockMaxims.length} Entri Akademik Dikurasi
              </p>
            </div>
          </div>

          {/* Search Form (Primary Search) */}
          <form onSubmit={handleSearch} style={{ display: 'flex', gap: '0.5rem', maxWidth: '640px', marginBottom: '1.5rem' }} role="search">
            <div style={{ position: 'relative', flex: 1 }}>
              <label htmlFor="main-search-input" className="sr-only">Cari frase Latin atau arti Indonesia</label>
              <input
                type="search"
                id="main-search-input"
                placeholder='Cari maksim (misal: "Lex Posterior", "Nullum Crimen"...)'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-text"
                style={{ paddingLeft: '2.5rem', backgroundColor: '#F8F9FA', height: '44px', fontSize: '0.9375rem' }}
              />
              <Search size={18} style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', color: '#72777D', pointerEvents: 'none' }} />
            </div>
            <button type="submit" className="btn-primary" style={{ whiteSpace: 'nowrap', padding: '0 1.5rem', fontSize: '0.9375rem', height: '44px' }}>
              Cari Maksim
            </button>
          </form>

          {/* Alphabetical Index */}
          <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '0.3125rem' }}>
            <span style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.8125rem', color: '#54595D', marginRight: '0.5rem', whiteSpace: 'nowrap' }}>
              Indeks Alfabetis A–Z:
            </span>
            {ALPHABET.map((letter) => (
              <Link
                key={letter}
                href={`/cari?q=${letter}`}
                className="wiki-link"
                title={`Lihat maksim diawali ${letter}`}
                style={{
                  padding: '0.25rem 0.5rem',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #A2A9B1',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.8125rem',
                  fontWeight: 600,
                  lineHeight: 1,
                  display: 'inline-block',
                  transition: 'all 100ms',
                  borderRadius: '2px'
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--navy)';
                  (e.currentTarget as HTMLElement).style.backgroundColor = '#F8F9FA';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = '#A2A9B1';
                  (e.currentTarget as HTMLElement).style.backgroundColor = '#FFFFFF';
                }}
              >
                {letter}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Main Two-Column Portal Layout ── */}
      <div className="container-page" style={{ marginTop: '1.75rem', paddingBottom: '4rem' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '1.75rem',
        }} className="lg:grid-cols-[1fr_340px]">

          {/* ── Left Column: Content ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>

            {/* Featured Article Card */}
            <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #A2A9B1', borderRadius: '2px' }} className="interactive-card">
              <div style={{ padding: '0.625rem 1.25rem', borderBottom: '1px solid #EAECF0', backgroundColor: '#F8F9FA', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <h2 style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.875rem', color: 'var(--navy)', margin: 0, border: 'none', padding: 0 }}>
                  ★ Artikel Maksim Pilihan Hari Ini
                </h2>
                <Link href="/cari" className="wiki-link" style={{ fontSize: '0.8125rem', fontWeight: 500 }}>
                  Jelajahi Semua Maksim →
                </Link>
              </div>
              <div style={{ padding: '1.5rem' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.5rem', color: 'var(--navy)', margin: '0 0 0.25rem', border: 'none', padding: 0 }}>
                  <Link href={`/maksim/${featuredMaxim.id}`} className="wiki-link" style={{ color: 'var(--navy)' }}>
                    {featuredMaxim.latinPhrase}
                  </Link>
                </h3>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8125rem', color: '#72777D', marginBottom: '1rem' }}>
                  {featuredMaxim.pronunciationGuide}
                </p>

                {/* Embedded Infobox table */}
                <table style={{ float: 'right', width: '220px', margin: '0 0 1rem 1.5rem', border: '1px solid #A2A9B1', fontSize: '0.8125rem', borderCollapse: 'collapse', backgroundColor: '#F8F9FA' }} className="hidden sm:table">
                  <tbody>
                    <tr>
                      <td colSpan={2} style={{ backgroundColor: 'var(--navy)', color: '#FFF', padding: '0.5rem', fontWeight: 700, textAlign: 'center', fontFamily: 'var(--font-body)' }}>
                        Informasi Singkat
                      </td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #EAECF0' }}>
                      <td style={{ padding: '0.375rem 0.5rem', fontWeight: 700, color: '#54595D', width: '45%' }}>Bidang</td>
                      <td style={{ padding: '0.375rem 0.5rem', color: '#202122' }}>
                        {featuredMaxim.legalFields.map(f => ({
                          pidana: 'Pidana', perdata: 'Perdata', 'tata-negara': 'Tata Negara', internasional: 'Internasional', administrasi: 'Administrasi',
                        }[f] || f)).join(', ')}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ padding: '0.375rem 0.5rem', fontWeight: 700, color: '#54595D' }}>Asal Tradisi</td>
                      <td style={{ padding: '0.375rem 0.5rem', color: '#202122' }}>Hukum Romawi</td>
                    </tr>
                  </tbody>
                </table>

                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem', color: '#202122', lineHeight: 1.7, marginBottom: '1rem' }}>
                  <strong>{featuredMaxim.latinPhrase}</strong> — {featuredMaxim.legalMeaning.split('\n\n')[0]?.substring(0, 320)}...
                </p>
                <div style={{ clear: 'both' }} />
                <Link href={`/maksim/${featuredMaxim.id}`} className="wiki-link" style={{ fontWeight: 600, fontSize: '0.875rem', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                  Baca artikel selengkapnya <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            {/* Recent Additions Card */}
            <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #A2A9B1', borderRadius: '2px' }}>
              <div style={{ padding: '0.625rem 1.25rem', borderBottom: '1px solid #EAECF0', backgroundColor: '#F8F9FA' }}>
                <h2 style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.875rem', color: 'var(--navy)', margin: 0 }}>
                  Entri Maksim Terkini
                </h2>
              </div>
              <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {recentMaxims.map(maxim => (
                  <MaximCard key={maxim.id} maxim={maxim} compact />
                ))}
                <Link href="/cari" className="btn-secondary" style={{ marginTop: '0.5rem', width: 'fit-content', fontSize: '0.8125rem', alignSelf: 'center' }}>
                  Lihat Semua Daftar Maksim →
                </Link>
              </div>
            </div>

          </div>

          {/* ── Right Column: Sidebar ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

            {/* Learning Modules */}
            <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #A2A9B1', borderRadius: '2px' }}>
              <div style={{ padding: '0.625rem 1.25rem', borderBottom: '1px solid #EAECF0', backgroundColor: '#F8F9FA' }}>
                <h2 style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.875rem', color: 'var(--navy)', margin: 0 }}>
                  Modul Pembelajaran Interaktif
                </h2>
              </div>
              <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {[
                  { href: '/quiz', icon: Brain, label: 'Quiz Interaktif', sub: 'Uji kompetensi asas dengan 5 soal acak' },
                  { href: '/flashcard', icon: BookMarked, label: 'Flashcard SRA', sub: 'Pelajari asas secara bertahap & persisten' },
                  { href: '/favorit', icon: Star, label: `Favorit Saya (${favorites.length})`, sub: 'Maksim penting yang Anda simpan' },
                ].map(item => (
                  <Link
                    key={item.href}
                    href={item.href}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.875rem',
                      padding: '0.75rem 1rem',
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #EAECF0',
                      textDecoration: 'none',
                      transition: 'all 150ms ease-in-out',
                      borderRadius: '2px',
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.borderColor = 'var(--navy)';
                      (e.currentTarget as HTMLElement).style.backgroundColor = '#F8F9FA';
                      (e.currentTarget as HTMLElement).style.transform = 'translateX(2px)';
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.borderColor = '#EAECF0';
                      (e.currentTarget as HTMLElement).style.backgroundColor = '#FFFFFF';
                      (e.currentTarget as HTMLElement).style.transform = 'none';
                    }}
                  >
                    <div style={{
                      backgroundColor: 'rgba(15, 27, 60, 0.05)',
                      padding: '0.5rem',
                      borderRadius: '2px',
                      display: 'flex',
                      alignItems: 'center'
                    }}>
                      <item.icon size={20} color="var(--navy)" />
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--navy)', fontFamily: 'var(--font-body)' }}>{item.label}</div>
                      <div style={{ fontSize: '0.75rem', color: '#72777D' }}>{item.sub}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Legal Field Portal Links */}
            <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #A2A9B1', borderRadius: '2px' }}>
              <div style={{ padding: '0.625rem 1.25rem', borderBottom: '1px solid #EAECF0', backgroundColor: '#F8F9FA' }}>
                <h2 style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.875rem', color: 'var(--navy)', margin: 0 }}>
                  Portal Bidang Hukum
                </h2>
              </div>
              <div style={{ padding: '0.25rem 0' }}>
                {legalFields.map(field => (
                  <Link
                    key={field.id}
                    href={`/cari?bidang=${field.id}`}
                    style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.625rem 1.25rem', textDecoration: 'none', borderBottom: '1px solid #EAECF0' }}
                    onMouseEnter={e => ((e.currentTarget as HTMLElement).style.backgroundColor = '#F8F9FA')}
                    onMouseLeave={e => ((e.currentTarget as HTMLElement).style.backgroundColor = 'transparent')}
                  >
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'var(--wiki-blue)', fontWeight: 500 }}>
                      {field.label}
                    </span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#72777D', backgroundColor: '#EAECF0', padding: '0.125rem 0.5rem', borderRadius: '2px' }}>
                      {field.count}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Encyclopedia Stats */}
            <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #A2A9B1', borderRadius: '2px', padding: '1rem', fontSize: '0.8125rem', color: '#54595D', fontFamily: 'var(--font-body)', lineHeight: 1.8 }}>
              <h2 style={{ fontWeight: 700, color: 'var(--navy)', fontSize: '0.875rem', margin: '0 0 0.5rem', border: 'none', padding: 0 }}>
                Statistik VeriLex
              </h2>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #EAECF0', paddingBottom: '0.25rem', marginBottom: '0.25rem' }}>
                <span>Jumlah Maksim:</span>
                <strong>{mockMaxims.length} entri</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #EAECF0', paddingBottom: '0.25rem', marginBottom: '0.25rem' }}>
                <span>Kategori Hukum:</span>
                <strong>5 Bidang</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #EAECF0', paddingBottom: '0.25rem', marginBottom: '0.25rem' }}>
                <span>Contoh Putusan Kasus:</span>
                <strong>{mockMaxims.reduce((n, m) => n + m.caseExamples.length, 0)} kasus</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Favorit Tersimpan:</span>
                <strong>{favorites.length} entri</strong>
              </div>
            </div>

          </div>
        </div>
      </div>

    </main>
  );
}
