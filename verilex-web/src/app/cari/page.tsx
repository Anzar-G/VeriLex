import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Sidebar from '@/components/layout/Sidebar';
import SearchPageClient from './SearchPageClient';

export const metadata: Metadata = {
  title: 'Jelajahi Maksim Hukum Latin — VeriLex',
  description: 'Cari dan temukan maksim hukum Latin yang relevan. Filter berdasarkan bidang hukum dan urutkan sesuai kebutuhan Anda.',
};

export default function SearchPage() {
  return (
    <>
      <Header />
      <div style={{ display: 'flex', minHeight: 'calc(100vh - 64px)' }}>
        <div className="hidden lg:block">
          <Sidebar />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <SearchPageClient />
        </div>
      </div>
      <Footer />
    </>
  );
}
