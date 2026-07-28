'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Search, Menu, X, BookOpen, Star, HelpCircle } from 'lucide-react';
import { useVeriLexStore } from '@/lib/useStore';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { favorites } = useVeriLexStore();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/cari?q=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

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
          style={{ color: 'var(--navy)', background: 'none', border: 'none', cursor: 'pointer', padding: '0.25rem' }}
          aria-label="Toggle navigation menu"
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
        >
          <BookOpen size={20} color="var(--navy)" strokeWidth={2} />
          VeriLex
          <span style={{ fontSize: '0.6875rem', fontWeight: 600, color: 'var(--steel-muted)', border: '1px solid #EAECF0', padding: '0.125rem 0.375rem', borderRadius: '2px', fontFamily: 'var(--font-body)' }}>
            Ensiklopedia Maksim
          </span>
        </Link>

        {/* Search Bar */}
        <form
          onSubmit={handleSearchSubmit}
          style={{ flex: 1, maxWidth: '520px' }}
        >
          <div style={{ position: 'relative', width: '100%' }}>
            <input
              type="search"
              placeholder="Cari maksim (misal: Lex Posterior, Nullum Crimen...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-text"
              style={{
                paddingRight: '2.5rem',
                fontSize: '0.875rem',
                backgroundColor: '#F8F9FA',
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
              }}
              aria-label="Search"
            >
              <Search size={16} />
            </button>
          </div>
        </form>

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

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderBottom: '1px solid #A2A9B1',
            padding: '0.5rem 0',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
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
                padding: '0.625rem 1.25rem',
                color: 'var(--navy)',
                fontFamily: 'var(--font-body)',
                fontSize: '0.875rem',
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
