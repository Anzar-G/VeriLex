'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Search, Menu, X, BookOpen, Star } from 'lucide-react';
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

  // Hide the header search bar on the homepage to avoid redundancy
  const isHomepage = pathname === '/';

  return (
    <header
      style={{
        backgroundColor: '#FFFFFF',
        height: '60px',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        borderBottom: '1px solid #A2A9B1',
        boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
      }}
    >
      <div
        className="container-page"
        style={{
          display: 'flex',
          alignItems: 'center',
          height: '100%',
          gap: '1.25rem',
        }}
      >
        {/* Mobile menu toggle */}
        <button
          className="lg:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{ color: 'var(--navy)', background: 'none', border: 'none', cursor: 'pointer', padding: '0.25rem', display: 'flex', alignItems: 'center' }}
          aria-label="Buka menu navigasi"
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        {/* Brand Logo */}
        <Link
          href="/"
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: '1.25rem',
            color: 'var(--navy)',
            letterSpacing: '0.02em',
            textDecoration: 'none',
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
          aria-label="VeriLex Beranda"
        >
          <img src="/verilex-logo.png" alt="VeriLex Logo" style={{ height: '28px', width: 'auto', borderRadius: '4px' }} />
          VeriLex
          <span style={{ fontSize: '0.6875rem', fontWeight: 600, color: 'var(--steel-muted)', border: '1px solid #EAECF0', padding: '0.125rem 0.375rem', borderRadius: '2px', fontFamily: 'var(--font-body)' }} className="hidden sm:inline-block">
            Ensiklopedia
          </span>
        </Link>

        {/* Search Bar - hidden on homepage */}
        {!isHomepage && (
          <form
            onSubmit={handleSearchSubmit}
            style={{ flex: 1, maxWidth: '420px' }}
            role="search"
          >
            <div style={{ position: 'relative', width: '100%' }}>
              <label htmlFor="header-search" className="sr-only">Cari maksim hukum</label>
              <input
                type="search"
                id="header-search"
                placeholder="Cari maksim..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-text"
                style={{
                  paddingRight: '2.5rem',
                  fontSize: '0.875rem',
                  backgroundColor: '#F8F9FA',
                  height: '36px',
                  paddingTop: 0,
                  paddingBottom: 0,
                }}
              />
              <button
                type="submit"
                style={{
                  position: 'absolute',
                  right: '0.5rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: 'var(--navy)',
                  cursor: 'pointer',
                  padding: '0.25rem',
                  display: 'flex',
                }}
                aria-label="Kirim pencarian"
              >
                <Search size={15} />
              </button>
            </div>
          </form>
        )}

        {/* Spacer */}
        <div style={{ flex: 1 }} className="hidden lg:block" />

        {/* Navigation Links */}
        <nav className="hidden lg:flex" style={{ gap: '1.25rem', alignItems: 'center' }}>
          <Link href="/cari" className="wiki-link" style={{ fontSize: '0.875rem', fontWeight: 500 }}>
            Jelajahi Indeks
          </Link>
          <Link href="/quiz" className="wiki-link" style={{ fontSize: '0.875rem', fontWeight: 500 }}>
            Quiz
          </Link>
          <Link href="/flashcard" className="wiki-link" style={{ fontSize: '0.875rem', fontWeight: 500 }}>
            Flashcard
          </Link>
          <Link
            href="/favorit"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.375rem',
              color: 'var(--navy)',
              fontSize: '0.875rem',
              fontWeight: 600,
              textDecoration: 'none',
              backgroundColor: '#F8F9FA',
              border: '1px solid #A2A9B1',
              padding: '0.3125rem 0.75rem',
              borderRadius: '2px',
            }}
          >
            <Star size={14} fill={favorites.length > 0 ? 'var(--bronze)' : 'none'} color="var(--bronze)" />
            Favorit ({favorites.length})
          </Link>
        </nav>
      </div>

      {/* Mobile Drawer (Responsive overlay slide-down) */}
      {mobileMenuOpen && (
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderBottom: '2px solid var(--navy)',
            position: 'absolute',
            top: '60px',
            left: 0,
            right: 0,
            boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
            zIndex: 99,
          }}
          className="lg:hidden"
        >
          {[
            { href: '/cari', label: 'Jelajahi Indeks Maksim' },
            { href: '/favorit', label: `Favorit Saya (${favorites.length})` },
            { href: '/quiz', label: 'Quiz Interaktif' },
            { href: '/flashcard', label: 'Flashcard SRA' },
            { href: '/dashboard', label: 'Dashboard Progres' },
            { href: '/panduan', label: 'Panduan Penggunaan' },
            { href: '/faq', label: 'Pertanyaan Umum (FAQ)' },
            { href: '/tentang', label: 'Tentang VeriLex' },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: 'block',
                padding: '0.75rem 1.5rem',
                color: 'var(--steel)',
                fontFamily: 'var(--font-body)',
                fontSize: '0.9375rem',
                textDecoration: 'none',
                borderBottom: '1px solid #EAECF0',
                transition: 'background 100ms',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = '#F8F9FA'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent'; }}
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
