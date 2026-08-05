'use client';

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <main style={{ minHeight: '70vh', display: 'grid', placeItems: 'center', padding: '2rem', textAlign: 'center' }}>
    <div><h1>Terjadi gangguan</h1><p>Data tidak dapat dimuat untuk sementara. Silakan coba lagi.</p><button className="btn-primary" onClick={reset}>Coba lagi</button></div>
  </main>;
}
