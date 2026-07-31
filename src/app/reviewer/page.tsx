import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ReviewerDashboardClient from './ReviewerDashboardClient';

export const metadata: Metadata = {
  title: 'Dashboard Reviewer — VeriLex',
  description: 'Tinjau dan kelola proposal suntingan yang masuk ke VeriLex.',
};

export default function ReviewerPage() {
  return (
    <>
      <Header />
      <ReviewerDashboardClient />
      <Footer />
    </>
  );
}
