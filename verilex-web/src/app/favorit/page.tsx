import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Sidebar from '@/components/layout/Sidebar';
import FavoritClient from './FavoritClient';

export const metadata: Metadata = {
  title: 'Favorit Saya — VeriLex',
  description: 'Daftar maksim hukum Latin yang Anda simpan.',
};

export default function FavoritPage() {
  return (
    <>
      <Header />
      <div style={{ display: 'flex', minHeight: 'calc(100vh - 60px)' }}>
        <div className="hidden lg:block">
          <Sidebar />
        </div>
        <div style={{ flex: 1, minWidth: 0, backgroundColor: '#F8F9FA' }}>
          <FavoritClient />
        </div>
      </div>
      <Footer />
    </>
  );
}
