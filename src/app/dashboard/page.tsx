import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Sidebar from '@/components/layout/Sidebar';
import DashboardClient from './DashboardClient';

export const metadata: Metadata = {
  title: 'Dashboard Progres — VeriLex',
  description: 'Pantau progres pembelajaran maksim hukum Latin Anda di VeriLex.',
};

export default function DashboardPage() {
  return (
    <>
      <Header />
      <div style={{ display: 'flex', minHeight: 'calc(100vh - 64px)' }}>
        <div className="hidden lg:block">
          <Sidebar />
        </div>
        <div style={{ flex: 1, minWidth: 0, backgroundColor: 'var(--cream)' }}>
          <DashboardClient />
        </div>
      </div>
      <Footer />
    </>
  );
}
