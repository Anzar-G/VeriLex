'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Search, Menu, X, LogIn, LogOut, User, ChevronDown } from 'lucide-react';
import { useVeriLexStore, ROLE_LABELS, ROLE_COLORS, hasMinRole } from '@/lib/useStore';

export default function Header() {
  const router = useRouter();
  const [mobileMenuOpen,  setMobileMenuOpen]  = useState(false);
  const [searchQuery,     setSearchQuery]     = useState('');
  const [userMenuOpen,    setUserMenuOpen]    = useState(false);
  const { favorites, authUser, clearAuthUser } = useVeriLexStore();
  const pathname = usePathname();

  const isHomepage   = pathname === '/';
  const isSearchPage = pathname === '/cari';

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/cari?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const roleColor = authUser ? (ROLE_COLORS[authUser.role] ?? ROLE_COLORS.reader) : null;
  const roleLabel = authUser ? (ROLE_LABELS[authUser.role] ?? 'Pembaca') : null;

  return (
    <header className="site-header" style={{ backgroundColor: '#F6F6F6', height: '46px', position: 'relative', zIndex: 50, borderBottom: 'none', display: 'flex', alignItems: 'center' }}>
      <div className="container-page site-header-inner" style={{ display: 'flex', alignItems: 'center', height: '100%', width: '100%', gap: '1.5rem' }}>

        {/* Mobile toggle */}
        <button className="lg:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{ color: '#202122', background: 'none', border: 'none', cursor: 'pointer', padding: '0.25rem', display: 'flex', alignItems: 'center' }}
          aria-label="Buka menu navigasi">
          {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>

        {/* Logo */}
        <div style={{ width: '180px', flexShrink: 0 }} className="hidden lg:block">
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', textDecoration: 'none' }}>
            <img src="/verilex-logo.png" alt="VeriLex Logo" style={{ height: '24px', width: 'auto', borderRadius: '2px' }} />
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: '1rem', color: '#000000', letterSpacing: '0.02em' }}>
              VeriLex
            </span>
          </Link>
        </div>

        <Link href="/" className="mobile-brand lg:hidden" onClick={() => setMobileMenuOpen(false)}>
          <img src="/verilex-logo.png" alt="VeriLex" />
          <span>VeriLex</span>
        </Link>

        {/* Search bar (hidden on homepage & search page) */}
        <div className="header-search-slot" style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          {!isHomepage && !isSearchPage && (
            <form onSubmit={handleSearchSubmit} style={{ width: '100%', maxWidth: '360px' }} role="search">
              <div style={{ position: 'relative', width: '100%' }}>
                <label htmlFor="header-search-input" className="sr-only">Cari maksim hukum</label>
                <input type="search" id="header-search-input" placeholder="Cari VeriLex"
                  value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                  className="input-text"
                  style={{ paddingRight: '2rem', fontSize: '0.8125rem', backgroundColor: '#FFFFFF', height: '28px', borderColor: '#A2A9B1', borderRadius: '2px' }}
                />
                <button type="submit" style={{ position: 'absolute', right: '0.375rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#72777D', cursor: 'pointer', padding: '0.125rem', display: 'flex' }} aria-label="Cari">
                  <Search size={13} />
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Right: User utility (desktop) */}
        <div className="hidden md:flex" style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', fontSize: '0.75rem', fontFamily: 'var(--font-body)' }}>
          {authUser ? (
            // ── Logged-in user menu ──
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setUserMenuOpen(p => !p)}
                style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', background: 'none', border: 'none', cursor: 'pointer', padding: '0.25rem 0.5rem', color: '#202122', fontSize: '0.75rem' }}
              >
                <div style={{ width: '22px', height: '22px', borderRadius: '50%', backgroundColor: '#0F1B3C', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <User size={12} color="#FFFFFF" />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', lineHeight: 1.2 }}>
                  <span style={{ fontWeight: 700, fontSize: '0.75rem' }}>{authUser.displayName}</span>
                  <span style={{ fontSize: '0.625rem', padding: '0 0.25rem', borderRadius: '2px', backgroundColor: roleColor?.bg, color: roleColor?.text, border: `1px solid ${roleColor?.border}`, fontWeight: 600 }}>
                    {roleLabel}
                  </span>
                </div>
                <ChevronDown size={11} style={{ color: '#72777D', transform: userMenuOpen ? 'rotate(180deg)' : 'none', transition: 'transform 150ms' }} />
              </button>

              {/* Dropdown */}
              {userMenuOpen && (
                <div style={{ position: 'absolute', right: 0, top: '100%', marginTop: '2px', backgroundColor: '#FFFFFF', border: '1px solid #A2A9B1', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', minWidth: '180px', zIndex: 200 }}
                  onMouseLeave={() => setUserMenuOpen(false)}>
                  <div style={{ padding: '0.625rem 0.875rem', borderBottom: '1px solid #EAECF0', backgroundColor: '#F8F9FA' }}>
                    <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#202122' }}>{authUser.displayName}</div>
                    <div style={{ fontSize: '0.6875rem', color: '#72777D' }}>@{authUser.username}</div>
                  </div>
                  {[
                    { href: '/profil', label: 'Profil Saya' },
                    { href: '/kontribusi', label: 'Kontribusi Saya' },
                    { href: '/favorit', label: `Favorit (${favorites.length})` },
                    { href: '/dashboard', label: 'Dashboard' },
                    ...(authUser && hasMinRole(authUser.role, 'reviewer') ? [{ href: '/reviewer', label: 'Dashboard Reviewer' }] : []),
                    ...(authUser && hasMinRole(authUser.role, 'administrator') ? [{ href: '/admin', label: 'Admin Panel' }] : []),
                  ].map(item => (
                    <Link key={item.href} href={item.href}
                      onClick={() => setUserMenuOpen(false)}
                      style={{ display: 'block', padding: '0.5rem 0.875rem', fontSize: '0.8125rem', color: '#0645AD', textDecoration: 'none', borderBottom: '1px solid #EAECF0' }}
                      onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#F8F9FA')}
                      onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}>
                      {item.label}
                    </Link>
                  ))}
                  <button onClick={() => { clearAuthUser(); setUserMenuOpen(false); router.push('/'); }}
                    style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', width: '100%', padding: '0.5rem 0.875rem', fontSize: '0.8125rem', color: '#C85A54', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}>
                    <LogOut size={12} /> Keluar
                  </button>
                </div>
              )}
            </div>
          ) : (
            // ── Guest ──
            <div style={{ display: 'flex', gap: '0.625rem', alignItems: 'center' }}>
              <Link href="/masuk" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#0645AD', fontSize: '0.75rem', textDecoration: 'none' }}>
                <LogIn size={12} /> Masuk
              </Link>
              <span style={{ color: '#A2A9B1' }}>·</span>
              <Link href="/daftar" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#0645AD', fontSize: '0.75rem', textDecoration: 'none', fontWeight: 700 }}>
                Daftar
              </Link>
            </div>
          )}

          <Link href="/faq"     className="wiki-link" style={{ color: '#0645AD' }}>FAQ</Link>
          <Link href="/favorit" className="wiki-link" style={{ color: '#0645AD', fontWeight: 600 }}>
            Favorit ({favorites.length})
          </Link>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid #A2A9B1', position: 'absolute', top: '46px', left: 0, right: 0, boxShadow: '0 4px 8px rgba(0,0,0,0.08)', zIndex: 99 }} className="lg:hidden">
          {authUser ? (
            <div style={{ padding: '0.625rem 1.25rem', borderBottom: '1px solid #EAECF0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#F8F9FA' }}>
              <div>
                <div style={{ fontSize: '0.8125rem', fontWeight: 700 }}>{authUser.displayName}</div>
                <div style={{ fontSize: '0.625rem', color: roleColor?.text, backgroundColor: roleColor?.bg, border: `1px solid ${roleColor?.border}`, padding: '0 0.25rem', display: 'inline-block', marginTop: '2px' }}>
                  {roleLabel}
                </div>
              </div>
              <button onClick={() => { clearAuthUser(); setMobileMenuOpen(false); router.push('/'); }}
                style={{ background: 'none', border: 'none', color: '#C85A54', cursor: 'pointer', fontSize: '0.8125rem' }}>
                Keluar
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', borderBottom: '1px solid #EAECF0' }}>
              <Link href="/masuk" onClick={() => setMobileMenuOpen(false)}
                style={{ flex: 1, textAlign: 'center', padding: '0.625rem', color: '#0645AD', textDecoration: 'none', fontSize: '0.8125rem', borderRight: '1px solid #EAECF0' }}>
                Masuk
              </Link>
              <Link href="/daftar" onClick={() => setMobileMenuOpen(false)}
                style={{ flex: 1, textAlign: 'center', padding: '0.625rem', color: '#0645AD', textDecoration: 'none', fontSize: '0.8125rem', fontWeight: 700 }}>
                Daftar
              </Link>
            </div>
          )}
          {[
            { href: '/', label: 'Halaman Utama' },
            { href: '/cari', label: 'Jelajahi Indeks Maksim' },
            { href: '/indeks', label: 'Indeks A–Z' },
            { href: '/kategori', label: 'Kategori Hukum' },
            { href: '/favorit', label: `Favorit Saya (${favorites.length})` },
            { href: '/quiz', label: 'Quiz Interaktif' },
            { href: '/flashcard', label: 'Flashcard SRA' },
            { href: '/dashboard', label: 'Dashboard Progres' },
            { href: '/panduan', label: 'Panduan Penggunaan' },
            { href: '/faq', label: 'FAQ' },
            { href: '/penyangkalan', label: 'Penyangkalan' },
            { href: '/tentang', label: 'Tentang VeriLex' },
          ].map(item => (
            <Link key={item.href} href={item.href}
              style={{ display: 'block', padding: '0.625rem 1.25rem', color: '#0645AD', fontFamily: 'var(--font-body)', fontSize: '0.8125rem', textDecoration: 'none', borderBottom: '1px solid #EAECF0' }}
              onClick={() => setMobileMenuOpen(false)}>
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
