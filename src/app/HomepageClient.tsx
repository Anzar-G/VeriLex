'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Search, Brain, BookMarked, Star, ArrowRight } from 'lucide-react';
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

      {/* ── Top Search Portal Bar ─────────────────────────── */}
      <section style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid #A2A9B1', padding: '1.25rem 0' }}>
        <div className="container-page">

          {/* Title row */}
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', marginBottom: '0.875rem', flexWrap: 'wrap' }}>
            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: '1.625rem',
              color: 'var(--navy)',
              margin: 0,
              border: 'none',
              padding: 0,
            }}>
              VeriLex
            </h1>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: '#54595D', borderLeft: '1px solid #A2A9B1', paddingLeft: '0.75rem' }}>
              Ensiklopedia Maksim Hukum Latin — {mockMaxims.length} entri dikurasi
            </span>
          </div>

          {/* Search Form */}
          <form onSubmit={handleSearch} style={{ display: 'flex', gap: '0.5rem', maxWidth: '580px', marginBottom: '1rem' }}>
            <div style={{ position: 'relative', flex: 1 }}>
              <input
                type="search"
                placeholder='Cari maksim (misal: "Lex Posterior", "Nullum Crimen"...)'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-text"
                style={{ paddingLeft: '2.25rem', backgroundColor: '#F8F9FA' }}
              />
              <Search size={15} style={{ position: 'absolute', left: '0.625rem', top: '50%', transform: 'translateY(-50%)', color: '#72777D', pointerEvents: 'none' }} />
            </div>
            <button type="submit" className="btn-primary" style={{ whiteSpace: 'nowrap', padding: '0 1.125rem', fontSize: '0.875rem' }}>
              Cari
            </button>
          </form>

          {/* Alphabetical Index */}
          <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '0.25rem' }}>
            <span style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.75rem', color: '#54595D', marginRight: '0.375rem', whiteSpace: 'nowrap' }}>
              Indeks A–Z:
            </span>
            {ALPHABET.map((letter) => (
              <Link
                key={letter}
                href={`/cari?q=${letter}`}
                className="wiki-link"
                title={`Lihat maksim diawali ${letter}`}
                style={{
                  padding: '0.125rem 0.3125rem',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #EAECF0',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  lineHeight: 1.5,
                  display: 'inline-block',
                  transition: 'background 100ms',
                }}
              >
                {letter}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Main Two-Column Portal ───────────────────────── */}
      <div className="container-page" style={{ marginTop: '1.5rem', paddingBottom: '3rem' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 340px',
          gap: '1.5rem',
          alignItems: 'start',
        }}>

          {/* ── Left Column ─────────────────────── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

            {/* Featured Article */}
            <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #A2A9B1' }}>
              <div style={{ padding: '0.5rem 1rem', borderBottom: '1px solid #EAECF0', backgroundColor: '#F8F9FA', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.8125rem', color: 'var(--navy)' }}>
                  ★ Artikel Pilihan
                </span>
                <Link href="/cari" className="wiki-link" style={{ fontSize: '0.75rem' }}>
                  Lihat semua →
                </Link>
              </div>
              <div style={{ padding: '1.25rem 1.5rem' }}>
                <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.375rem', color: 'var(--navy)', margin: '0 0 0.25rem', border: 'none', padding: 0 }}>
                  <Link href={`/maksim/${featuredMaxim.id}`} className="wiki-link" style={{ color: 'var(--navy)' }}>
                    {featuredMaxim.latinPhrase}
                  </Link>
                </h2>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#72777D', marginBottom: '0.75rem' }}>
                  {featuredMaxim.pronunciationGuide}
                </p>

                {/* Infobox terintegrasi */}
                <table style={{ float: 'right', width: '210px', margin: '0 0 0.75rem 1.25rem', border: '1px solid #A2A9B1', fontSize: '0.75rem', borderCollapse: 'collapse' }}>
                  <tbody>
                    <tr>
                      <td colSpan={2} style={{ backgroundColor: 'var(--navy)', color: '#FFF', padding: '0.375rem 0.625rem', fontWeight: 700, textAlign: 'center', fontFamily: 'var(--font-body)' }}>
                        Infobox Maksim
                      </td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #EAECF0' }}>
                      <td style={{ padding: '0.3125rem 0.625rem', fontWeight: 700, color: '#54595D', width: '40%' }}>Bidang</td>
                      <td style={{ padding: '0.3125rem 0.625rem', color: '#202122' }}>
                        {featuredMaxim.legalFields.map(f => ({
                          pidana: 'Pidana', perdata: 'Perdata', 'tata-negara': 'Tata Negara', internasional: 'Internasional', administrasi: 'Administrasi',
                        }[f] || f)).join(', ')}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ padding: '0.3125rem 0.625rem', fontWeight: 700, color: '#54595D' }}>Tradisi</td>
                      <td style={{ padding: '0.3125rem 0.625rem', color: '#202122' }}>Hukum Romawi</td>
                    </tr>
                  </tbody>
                </table>

                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem', color: '#202122', lineHeight: 1.65, marginBottom: '0.875rem' }}>
                  <strong>{featuredMaxim.latinPhrase}</strong> — {featuredMaxim.legalMeaning.split('\n\n')[0]?.substring(0, 280)}...
                </p>
                <div style={{ clear: 'both' }} />
                <Link href={`/maksim/${featuredMaxim.id}`} className="wiki-link" style={{ fontWeight: 600, fontSize: '0.875rem', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                  Baca artikel lengkap <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            {/* Entri Terkini */}
            <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #A2A9B1' }}>
              <div style={{ padding: '0.5rem 1rem', borderBottom: '1px solid #EAECF0', backgroundColor: '#F8F9FA' }}>
                <span style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.8125rem', color: 'var(--navy)' }}>
                  Entri Terkini dalam Ensiklopedia
                </span>
              </div>
              <div style={{ padding: '0.75rem 1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {recentMaxims.map(maxim => (
                  <MaximCard key={maxim.id} maxim={maxim} compact />
                ))}
                <Link href="/cari" className="btn-secondary" style={{ marginTop: '0.5rem', width: 'fit-content', fontSize: '0.8125rem' }}>
                  Jelajahi semua maksim →
                </Link>
              </div>
            </div>

          </div>

          {/* ── Right Sidebar Column ──────────────────────── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

            {/* Modul Pembelajaran */}
            <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #A2A9B1' }}>
              <div style={{ padding: '0.5rem 1rem', borderBottom: '1px solid #EAECF0', backgroundColor: '#F8F9FA' }}>
                <span style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.8125rem', color: 'var(--navy)' }}>
                  Modul Pembelajaran
                </span>
              </div>
              <div style={{ padding: '0.875rem 1rem', display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                {[
                  { href: '/quiz', icon: Brain, label: 'Quiz Interaktif', sub: 'Uji kompetensi, 5 soal/sesi' },
                  { href: '/flashcard', icon: BookMarked, label: 'Flashcard SRA', sub: 'Spaced Repetition Algorithm' },
                  { href: '/favorit', icon: Star, label: `Favorit Saya (${favorites.length})`, sub: 'Akses cepat ke maksim simpanan' },
                ].map(item => (
                  <Link
                    key={item.href}
                    href={item.href}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      padding: '0.625rem 0.75rem',
                      backgroundColor: '#F8F9FA',
                      border: '1px solid #EAECF0',
                      textDecoration: 'none',
                      transition: 'border-color 100ms, background 100ms',
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--navy)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = '#EAECF0'; }}
                  >
                    <item.icon size={20} color="var(--navy)" />
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--navy)', fontFamily: 'var(--font-body)' }}>{item.label}</div>
                      <div style={{ fontSize: '0.75rem', color: '#72777D' }}>{item.sub}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Portal Bidang Hukum */}
            <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #A2A9B1' }}>
              <div style={{ padding: '0.5rem 1rem', borderBottom: '1px solid #EAECF0', backgroundColor: '#F8F9FA' }}>
                <span style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.8125rem', color: 'var(--navy)' }}>
                  Portal Bidang Hukum
                </span>
              </div>
              <div style={{ padding: '0.25rem 0' }}>
                {legalFields.map(field => (
                  <Link
                    key={field.id}
                    href={`/cari?bidang=${field.id}`}
                    style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 1rem', textDecoration: 'none', borderBottom: '1px solid #EAECF0' }}
                    onMouseEnter={e => ((e.currentTarget as HTMLElement).style.backgroundColor = '#F8F9FA')}
                    onMouseLeave={e => ((e.currentTarget as HTMLElement).style.backgroundColor = 'transparent')}
                  >
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'var(--wiki-blue)' }}>
                      {field.label}
                    </span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#72777D', backgroundColor: '#EAECF0', padding: '0.0625rem 0.375rem', borderRadius: '2px' }}>
                      {field.count}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Statistik */}
            <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #A2A9B1', padding: '0.875rem 1rem', fontSize: '0.8125rem', color: '#54595D', fontFamily: 'var(--font-body)', lineHeight: 1.8 }}>
              <strong style={{ display: 'block', color: 'var(--navy)', marginBottom: '0.375rem' }}>Statistik VeriLex</strong>
              Entri Maksim: <strong>{mockMaxims.length}</strong><br />
              Bidang Hukum: <strong>5</strong><br />
              Contoh Putusan: <strong>{mockMaxims.reduce((n, m) => n + m.caseExamples.length, 0)}</strong><br />
              Tersimpan di Favorit Anda: <strong>{favorites.length}</strong>
            </div>

          </div>
        </div>
      </div>

    </main>
  );
}
