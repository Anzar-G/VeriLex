'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Search, Menu, X, LogIn, LogOut, User } from 'lucide-react';
import { useVeriLexStore } from '@/lib/useStore';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [inputName, setInputName] = useState('');
  const { favorites, user, loginUser, logoutUser } = useVeriLexStore();
  const pathname = usePathname();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/cari?q=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginUser(inputName.trim());
    setLoginModalOpen(false);
    setInputName('');
  };

  const isHomepage = pathname === '/';
  const isSearchPage = pathname === '/cari';

  return (
    <header
      style={{
        backgroundColor: '#F6F6F6',
        height: '46px',
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

        {/* Brand Logo */}
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

        {/* Search Bar */}
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          {!isHomepage && !isSearchPage && (
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
          {user.isLoggedIn ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', color: '#202122' }}>
              <User size={12} color="var(--navy)" />
              <span style={{ fontWeight: 600 }}>{user.name}</span>
              <button 
                onClick={logoutUser}
                style={{ background: 'none', border: 'none', color: '#C85A54', cursor: 'pointer', padding: 0, fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.125rem', marginLeft: '0.25rem' }}
                title="Keluar log"
              >
                <LogOut size={12} /> Keluar
              </button>
            </div>
          ) : (
            <button 
              onClick={() => setLoginModalOpen(true)}
              style={{ background: 'none', border: 'none', color: '#0645AD', cursor: 'pointer', padding: 0, fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
            >
              <LogIn size={12} /> Masuk log
            </button>
          )}
          <Link href="/faq" className="wiki-link" style={{ color: '#0645AD' }}>Pembicaraan</Link>
          <Link href="/dashboard" className="wiki-link" style={{ color: '#0645AD' }}>Kontribusi</Link>
          <Link href="/favorit" className="wiki-link" style={{ color: '#0645AD', fontWeight: 600 }}>
            Favorit ({favorites.length})
          </Link>
        </div>
      </div>

      {/* Login Modal Overlay */}
      {loginModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 100,
        }}>
          <form 
            onSubmit={handleLoginSubmit}
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #A2A9B1',
              padding: '1.5rem',
              width: '100%',
              maxWidth: '320px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ margin: 0, fontSize: '0.9375rem', fontFamily: 'var(--font-display)', fontWeight: 700 }}>Masuk Log VeriLex</h3>
              <button type="button" onClick={() => setLoginModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#72777D' }}>
                <X size={16} />
              </button>
            </div>
            
            <label htmlFor="login-name-input" style={{ display: 'block', fontSize: '0.75rem', color: '#54595D', marginBottom: '0.375rem', fontWeight: 600 }}>Nama Pengguna / Samaran:</label>
            <input 
              type="text" 
              id="login-name-input"
              required 
              value={inputName} 
              onChange={e => setInputName(e.target.value)}
              className="input-text"
              placeholder="Contoh: Nizar Alfaris"
              style={{ fontSize: '0.8125rem', height: '32px', marginBottom: '1rem' }}
            />

            <button type="submit" className="btn-primary" style={{ width: '100%', height: '32px', justifyContent: 'center' }}>
              Masuk
            </button>
          </form>
        </div>
      )}

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
          {user.isLoggedIn ? (
            <div style={{ padding: '0.625rem 1.25rem', borderBottom: '1px solid #EAECF0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#F8F9FA' }}>
              <span style={{ fontSize: '0.8125rem', fontWeight: 700 }}>{user.name}</span>
              <button onClick={logoutUser} style={{ background: 'none', border: 'none', color: '#C85A54', cursor: 'pointer', fontSize: '0.8125rem' }}>Keluar</button>
            </div>
          ) : (
            <button onClick={() => { setMobileMenuOpen(false); setLoginModalOpen(true); }} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '0.625rem 1.25rem', color: '#0645AD', background: 'none', border: 'none', borderBottom: '1px solid #EAECF0', fontSize: '0.8125rem', fontWeight: 700 }}>
              Masuk Log
            </button>
          )}
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
