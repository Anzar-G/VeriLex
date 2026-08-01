'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer
      className="site-footer"
      style={{
        backgroundColor: '#F8F9FA',
        color: 'var(--steel-muted)',
        borderTop: '1px solid #A2A9B1',
        padding: '1.5rem 0',
        marginTop: 'auto',
        fontSize: '0.8125rem',
      }}
    >
      <div className="container-page">
        <div className="footer-grid">
          {/* Brand & Description */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <img src="/verilex-logo.png" alt="VeriLex" style={{ height: '20px', width: 'auto', borderRadius: '2px' }} />
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--navy)', fontSize: '0.9375rem' }}>
                VeriLex
              </span>
            </div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem', lineHeight: 1.5, margin: 0, maxWidth: '360px', wordBreak: 'break-word' }}>
              Platform referensi independen untuk mahasiswa, akademisi, dan praktisi hukum di Indonesia.
            </p>
          </div>

          {/* Navigation links */}
          <nav className="footer-nav">
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

        <div className="footer-bottom">
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', margin: 0 }}>
            Teks tersedia di bawah lisensi terbuka referensi hukum Indonesia.
          </p>
          <div className="footer-bottom-links">
            <Link href="/tentang" className="wiki-link" style={{ fontSize: '0.75rem' }}>Tentang</Link>
            <Link href="/faq" className="wiki-link" style={{ fontSize: '0.75rem' }}>Penyangkalan</Link>
            <Link href="/panduan" className="wiki-link" style={{ fontSize: '0.75rem' }}>Panduan</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
