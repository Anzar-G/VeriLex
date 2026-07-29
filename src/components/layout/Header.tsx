'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Search, Menu, X } from 'lucide-react';
import { useVeriLexStore } from '@/lib/useStore';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { favorites } = useVeriLexStore();
  const pathname = usePathname();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/cari?q=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  const isHomepage = pathname === '/';

  return (
    <header
      style={{
        backgroundColor: '#F6F6F6', /* Grey header matching Vector */
        height: '46px', /* Vector header is very compact */
        position: 'relative',
        zIndex: 50,
        borderBottom: 'none',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <div
        className="container-page"
        style={{
          display: 'flex',
          alignItems: 'center',
          height: '100%',
          width: '100%',
          gap: '1.5rem',
        }}
      >
        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{ color: '#202122', background: 'none', border: 'none', cursor: 'pointer', padding: '0.25rem', display: 'flex', alignItems: 'center' }}
          aria-label="Buka menu navigasi"
        >
          {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>

        {/* Brand Logo - Top Left placeholder */}
        <div style={{ width: '180px', flexShrink: 0 }} className="hidden lg:block">
          <Link
            href="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.375rem',
              textDecoration: 'none',
            }}
          >
            <img src="/verilex-logo.png" alt="VeriLex Logo" style={{ height: '24px', width: 'auto', borderRadius: '2px' }} />
            <span style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 400,
              fontSize: '1rem',
              color: '#000000',
              letterSpacing: '0.02em',
            }}>
              VeriLex
            </span>
          </Link>
        </div>

        {/* Search Bar - centered and flat */}
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          {!isHomepage && (
            <form
              onSubmit={handleSearchSubmit}
              style={{ width: '100%', maxWidth: '360px' }}
              role="search"
            >
              <div style={{ position: 'relative', width: '100%' }}>
                <label htmlFor="header-search-input" className="sr-only">Cari maksim hukum</label>
                <input
                  type="search"
                  id="header-search-input"
                  placeholder="Cari VeriLex"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input-text"
                  style={{
                    paddingRight: '2rem',
                    fontSize: '0.8125rem',
                    backgroundColor: '#FFFFFF',
                    height: '28px',
                    borderColor: '#A2A9B1',
                    borderRadius: '2px',
                  }}
                />
                <button
                  type="submit"
                  style={{
                    position: 'absolute',
                    right: '0.375rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    color: '#72777D',
                    cursor: 'pointer',
                    padding: '0.125rem',
                    display: 'flex',
                  }}
                  aria-label="Kirim pencarian"
                >
                  <Search size={13} />
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Vector User Utility Menu (Top Right) */}
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', fontSize: '0.75rem', fontFamily: 'var(--font-body)' }} className="hidden md:flex">
          <span style={{ color: '#72777D' }}>Belum masuk log</span>
          <Link href="/faq" className="wiki-link" style={{ color: '#0645AD' }}>Pembicaraan</Link>
          <Link href="/dashboard" className="wiki-link" style={{ color: '#0645AD' }}>Kontribusi</Link>
          <Link href="/favorit" className="wiki-link" style={{ color: '#0645AD', fontWeight: 600 }}>
            Favorit ({favorites.length})
          </Link>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderBottom: '1px solid #A2A9B1',
            position: 'absolute',
            top: '46px',
            left: 0,
            right: 0,
            boxShadow: '0 4px 8px rgba(0,0,0,0.08)',
            zIndex: 99,
          }}
          className="lg:hidden"
        >
          {[
            { href: '/', label: 'Halaman Utama' },
            { href: '/cari', label: 'Jelajahi Indeks Maksim' },
            { href: '/favorit', label: `Favorit Saya (${favorites.length})` },
            { href: '/quiz', label: 'Quiz Interaktif' },
            { href: '/flashcard', label: 'Flashcard SRA' },
            { href: '/dashboard', label: 'Dashboard Progres' },
            { href: '/panduan', label: 'Panduan Penggunaan' },
            { href: '/faq', label: 'FAQ & Penyangkalan' },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: 'block',
                padding: '0.625rem 1.25rem',
                color: '#0645AD',
                fontFamily: 'var(--font-body)',
                fontSize: '0.8125rem',
                textDecoration: 'none',
                borderBottom: '1px solid #EAECF0',
              }}
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
