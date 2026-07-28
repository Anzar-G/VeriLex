'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpen, Scale, FileText, Star, Brain, BookMarked, HelpCircle, Info, Bookmark } from 'lucide-react';
import { useVeriLexStore } from '@/lib/useStore';

const legalFieldItems = [
  { label: 'Semua Maksim', href: '/cari', icon: Scale },
  { label: 'Hukum Pidana', href: '/cari?bidang=pidana', icon: Scale },
  { label: 'Hukum Perdata', href: '/cari?bidang=perdata', icon: Scale },
  { label: 'Tata Negara', href: '/cari?bidang=tata-negara', icon: Scale },
  { label: 'Hukum Internasional', href: '/cari?bidang=internasional', icon: Scale },
  { label: 'Administrasi Negara', href: '/cari?bidang=administrasi', icon: Scale },
];

const learningItems = [
  { label: 'Quiz Interaktif', href: '/quiz', icon: Brain },
  { label: 'Flashcard SRA', href: '/flashcard', icon: BookMarked },
  { label: 'Dashboard Progres', href: '/dashboard', icon: FileText },
];

const helpItems = [
  { label: 'Panduan Penggunaan', href: '/panduan', icon: BookOpen },
  { label: 'Pertanyaan Umum (FAQ)', href: '/faq', icon: HelpCircle },
  { label: 'Tentang VeriLex', href: '/tentang', icon: Info },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { favorites } = useVeriLexStore();

  const isActive = (href: string) => {
    if (href === '/cari' && pathname === '/cari') return true;
    if (href !== '/cari' && pathname.startsWith(href)) return true;
    return false;
  };

  return (
    <aside
      style={{
        width: '240px',
        flexShrink: 0,
        backgroundColor: '#FFFFFF',
        borderRight: '1px solid #EAECF0',
        minHeight: 'calc(100vh - 60px)',
        position: 'sticky',
        top: '60px',
        overflowY: 'auto',
        paddingBottom: '2rem',
      }}
    >
      {/* Saved Favorites Section */}
      <div style={{ padding: '1.25rem 0 0.5rem' }}>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontWeight: 700,
          fontSize: '0.6875rem',
          color: 'var(--steel-muted)',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          padding: '0 0.875rem',
          marginBottom: '0.375rem',
        }}>
          Pustaka Saya
        </p>
        <Link
          href="/favorit"
          className={`nav-item ${pathname === '/favorit' ? 'active' : ''}`}
          style={{ justifyContent: 'space-between' }}
        >
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Star size={14} fill={favorites.length > 0 ? 'var(--bronze)' : 'none'} color="var(--bronze)" />
            Favorit Saya
          </span>
          <span style={{
            fontSize: '0.75rem',
            fontWeight: 700,
            backgroundColor: '#EAECF0',
            color: 'var(--steel)',
            borderRadius: '999px',
            padding: '0.125rem 0.5rem',
          }}>
            {favorites.length}
          </span>
        </Link>
      </div>

      <hr className="divider-h" style={{ margin: '0.5rem 0.875rem' }} />

      {/* Browse Maxims Section */}
      <div style={{ padding: '0.25rem 0 0.5rem' }}>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontWeight: 700,
          fontSize: '0.6875rem',
          color: 'var(--steel-muted)',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          padding: '0 0.875rem',
          marginBottom: '0.375rem',
        }}>
          Kategori Hukum
        </p>
        {legalFieldItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`nav-item ${isActive(item.href) ? 'active' : ''}`}
          >
            <item.icon size={14} style={{ opacity: 0.6 }} />
            {item.label}
          </Link>
        ))}
      </div>

      <hr className="divider-h" style={{ margin: '0.5rem 0.875rem' }} />

      {/* Learning Tools Section */}
      <div style={{ padding: '0.25rem 0 0.5rem' }}>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontWeight: 700,
          fontSize: '0.6875rem',
          color: 'var(--steel-muted)',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          padding: '0 0.875rem',
          marginBottom: '0.375rem',
        }}>
          Pembelajaran
        </p>
        {learningItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`nav-item ${isActive(item.href) ? 'active' : ''}`}
          >
            <item.icon size={14} style={{ opacity: 0.6 }} />
            {item.label}
          </Link>
        ))}
      </div>

      <hr className="divider-h" style={{ margin: '0.5rem 0.875rem' }} />

      {/* Help & Info Section */}
      <div style={{ padding: '0.25rem 0 0.5rem' }}>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontWeight: 700,
          fontSize: '0.6875rem',
          color: 'var(--steel-muted)',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          padding: '0 0.875rem',
          marginBottom: '0.375rem',
        }}>
          Informasi &amp; Bantuan
        </p>
        {helpItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`nav-item ${isActive(item.href) ? 'active' : ''}`}
          >
            <item.icon size={14} style={{ opacity: 0.6 }} />
            {item.label}
          </Link>
        ))}
      </div>
    </aside>
  );
}
