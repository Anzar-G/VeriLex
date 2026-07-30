'use client';

import dynamic from 'next/dynamic';
import type { Maxim } from '@/types';

// Loading spinner while MaximDetailClient loads on the client
function Loading() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 90px)', backgroundColor: '#FFFFFF' }}>
      <span style={{ color: '#72777D', fontSize: '0.875rem' }}>Memuat halaman...</span>
    </div>
  );
}

const MaximDetailClient = dynamic(() => import('./MaximDetailClient'), {
  ssr: false,
  loading: () => <Loading />,
});

export default function MaximDetailWrapper({ maxim }: { maxim: Maxim }) {
  return <MaximDetailClient maxim={maxim} />;
}
