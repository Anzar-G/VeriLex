'use client';

import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Gavel, Home, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <>
      <Header />
      <main style={{ minHeight: 'calc(100vh - 60px)', padding: '4rem 1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F8F9FA' }}>
        <div 
          style={{ 
            maxWidth: '540px', 
            width: '100%', 
            backgroundColor: '#FFFFFF', 
            padding: '3rem 2rem', 
            borderRadius: '4px', 
            border: '1px solid #A2A9B1', 
            textAlign: 'center', 
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
            position: 'relative'
          }}
        >
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', backgroundColor: 'var(--navy)' }} />
          
          <div style={{ display: 'inline-flex', padding: '1rem', backgroundColor: 'rgba(200, 90, 84, 0.08)', borderRadius: '50%', marginBottom: '1.5rem', color: 'var(--error)' }}>
            <Gavel size={44} />
          </div>
          
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '2.25rem', color: 'var(--navy)', marginBottom: '0.5rem', border: 'none', padding: 0 }}>
            404
          </h1>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.25rem', color: '#202122', marginBottom: '1rem', border: 'none', padding: 0 }}>
            Halaman Tidak Ditemukan
          </h2>
          
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'var(--steel-muted)', lineHeight: 1.6, marginBottom: '2.5rem' }}>
            Maaf, halaman yang Anda cari tidak tersedia dalam database ensiklopedia kami. Kemungkinan halaman telah dihapus, dipindahkan, atau tautan yang Anda masukkan keliru.
          </p>
          
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/" className="btn-primary" style={{ fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Home size={15} /> Kembali ke Beranda
            </Link>
            <Link href="/cari" className="btn-secondary" style={{ fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Search size={15} /> Jelajahi Indeks
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
