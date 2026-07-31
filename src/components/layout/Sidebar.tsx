'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useVeriLexStore, hasMinRole } from '@/lib/useStore';

const mainNavigation = [
  { label: 'Halaman Utama', href: '/' },
  { label: 'Semua Maksim', href: '/cari' },
  { label: 'Quiz Interaktif', href: '/quiz' },
  { label: 'Flashcard SRA', href: '/flashcard' },
  { label: 'Dashboard Progres', href: '/dashboard' },
];
const legalFields = [
  { label: 'Hukum Pidana', href: '/cari?bidang=pidana' },
  { label: 'Hukum Perdata', href: '/cari?bidang=perdata' },
  { label: 'Hukum Tata Negara', href: '/cari?bidang=tata-negara' },
  { label: 'Hukum Internasional', href: '/cari?bidang=internasional' },
  { label: 'Hukum Administrasi', href: '/cari?bidang=administrasi' },
];

const helpItems = [
  { label: 'Panduan Penggunaan', href: '/panduan' },
  { label: 'Pertanyaan Umum (FAQ)', href: '/faq' },
  { label: 'Tentang VeriLex', href: '/tentang' },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { favorites, authUser } = useVeriLexStore();
  const isReviewer = authUser ? hasMinRole(authUser.role, 'reviewer') : false;

  const isActive = (href: string) => {
    if (href === '/' && pathname === '/') return true;
    if (href === '/cari' && pathname === '/cari') return true;
    if (href !== '/' && href !== '/cari' && pathname.startsWith(href)) return true;
    return false;
  };

  return (
    <aside
      style={{
        width: '180px',
        flexShrink: 0,
        backgroundColor: 'transparent',
        padding: '1rem 0.5rem 2rem 0',
        minHeight: 'calc(100vh - 60px)',
        position: 'sticky',
        top: '60px',
        alignSelf: 'flex-start',
      }}
    >
      {/* Navigation Section */}
      <div style={{ marginBottom: '1.25rem' }}>
        <p style={{
          fontWeight: 500,
          fontSize: '0.75rem',
          color: '#54595D',
          borderBottom: '1px solid #E6E6E6',
          paddingBottom: '0.125rem',
          margin: '0 0.75rem 0.375rem',
          fontFamily: 'var(--font-body)',
        }}>
          Navigasi
        </p>
        <ul className="vector-sidebar-list">
          {mainNavigation.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`vector-sidebar-link ${isActive(item.href) ? 'active' : ''}`}
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/favorit"
              className={`vector-sidebar-link ${pathname === '/favorit' ? 'active' : ''}`}
            >
              Favorit Saya ({favorites.length})
            </Link>
          </li>
          {isReviewer && (
            <li>
              <Link
                href="/reviewer"
                className={`vector-sidebar-link ${pathname === '/reviewer' ? 'active' : ''}`}
                style={{ color: '#AC6600', fontWeight: pathname === '/reviewer' ? 700 : 400 }}
              >
                Dashboard Reviewer
              </Link>
            </li>
          )}
        </ul>
      </div>

      {/* Kategori Hukum Section */}
      <div style={{ marginBottom: '1.25rem' }}>
        <p style={{
          fontWeight: 500,
          fontSize: '0.75rem',
          color: '#54595D',
          borderBottom: '1px solid #E6E6E6',
          paddingBottom: '0.125rem',
          margin: '0 0.75rem 0.375rem',
          fontFamily: 'var(--font-body)',
        }}>
          Portal Bidang
        </p>
        <ul className="vector-sidebar-list">
          {legalFields.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`vector-sidebar-link ${pathname === '/cari' && isActive(item.href) ? 'active' : ''}`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Bantuan Section */}
      <div style={{ marginBottom: '1.25rem' }}>
        <p style={{
          fontWeight: 500,
          fontSize: '0.75rem',
          color: '#54595D',
          borderBottom: '1px solid #E6E6E6',
          paddingBottom: '0.125rem',
          margin: '0 0.75rem 0.375rem',
          fontFamily: 'var(--font-body)',
        }}>
          Bantuan &amp; Info
        </p>
        <ul className="vector-sidebar-list">
          {helpItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`vector-sidebar-link ${isActive(item.href) ? 'active' : ''}`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
