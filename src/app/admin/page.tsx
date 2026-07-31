import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AdminClient from './AdminClient';

export const metadata: Metadata = {
  title: 'Admin Panel — VeriLex',
  description: 'Kelola pengguna, role, laporan, dan log aktivitas VeriLex.',
};

export default function AdminPage() {
  return (
    <>
      <Header />
      <AdminClient />
      <Footer />
    </>
  );
}
