'use client';

import Link from 'next/link';
import { BookOpen } from 'lucide-react';

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: '#F8F9FA',
        color: 'var(--steel-muted)',
        borderTop: '1px solid #A2A9B1',
        padding: '2rem 0',
        marginTop: '4rem',
        fontSize: '0.8125rem',
      }}
    >
      <div
        className="container-page"
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            gap: '1.5rem',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <BookOpen size={16} color="var(--navy)" strokeWidth={2} />
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--navy)', fontSize: '0.9375rem' }}>
                VeriLex — Ensiklopedia Maksim Hukum Latin
              </span>
            </div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem', lineHeight: 1.5, maxWidth: '420px', margin: 0 }}>
              Platform referensi independen untuk mahasiswa, akademisi, dan praktisi hukum di Indonesia. Didesain dengan asas keterbacaan tinggi dan keakuratan sumber ilmiah.
            </p>
          </div>

          <nav style={{ display: 'flex', gap: '2.5rem', flexWrap: 'wrap' }}>
            <div>
              <p style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.8125rem', color: 'var(--navy)', marginBottom: '0.5rem' }}>Navigasi</p>
              {[
                { label: 'Indeks Maksim', href: '/cari' },
                { label: 'Favorit Saya', href: '/favorit' },
                { label: 'Quiz Interaktif', href: '/quiz' },
                { label: 'Flashcard SRA', href: '/flashcard' },
              ].map(link => (
                <Link key={link.href} href={link.href} className="wiki-link" style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.8125rem' }}>
                  {link.label}
                </Link>
              ))}
            </div>
            <div>
              <p style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.8125rem', color: 'var(--navy)', marginBottom: '0.5rem' }}>Bantuan</p>
              {[
                { label: 'Panduan Penggunaan', href: '/panduan' },
                { label: 'FAQ', href: '/faq' },
                { label: 'Tentang Platform', href: '/tentang' },
              ].map(link => (
                <Link key={link.href} href={link.href} className="wiki-link" style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.8125rem' }}>
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>
        </div>

        <hr className="divider-h" style={{ margin: '0.75rem 0' }} />

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '0.75rem',
          }}
        >
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', margin: 0 }}>
            Teks tersedia di bawah lisensi terbuka referensi hukum Indonesia. Hak cipta milik kontributor.
          </p>
          <div style={{ display: 'flex', gap: '1.25rem' }}>
            <Link href="/tentang" className="wiki-link" style={{ fontSize: '0.75rem' }}>Tentang VeriLex</Link>
            <Link href="/faq" className="wiki-link" style={{ fontSize: '0.75rem' }}>Penyangkalan Hukum</Link>
            <Link href="/panduan" className="wiki-link" style={{ fontSize: '0.75rem' }}>Panduan</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
