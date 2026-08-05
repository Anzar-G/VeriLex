import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { createServerClient } from '@/lib/supabase-server';
import { siteUrl } from '@/lib/site';

export const metadata: Metadata = { title: 'Kategori Maksim Hukum', description: 'Jelajahi maksim hukum Latin berdasarkan bidang hukum.', alternates: { canonical: `${siteUrl}/kategori` } };
const labels: Record<string, string> = { umum: 'Asas Umum', pidana: 'Hukum Pidana', perdata: 'Hukum Perdata', properti: 'Hak Milik', keluarga: 'Waris & Keluarga', bisnis: 'Hukum Dagang', internasional: 'Internasional', 'tata-negara': 'Tata Negara', acara: 'Hukum Acara', 'lain-lain': 'Filosofis', administrasi: 'Administrasi' };

export default async function CategoryPage() {
  const supabase = createServerClient();
  const { data } = await supabase.from('maxims').select('legal_fields').eq('is_active', true);
  const counts: Record<string, number> = {};
  for (const row of data ?? []) for (const field of row.legal_fields ?? []) counts[field] = (counts[field] ?? 0) + 1;
  return <><Header /><main className="container-page" style={{ minHeight: '70vh', padding: '2rem 1rem' }}><h1>Kategori Maksim Hukum</h1><p>Telusuri maksim berdasarkan bidang hukum.</p><div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '0.75rem', marginTop: '1.5rem' }}>{Object.entries(labels).map(([id, label]) => <Link key={id} href={`/cari?bidang=${id}`} style={{ border: '1px solid #A2A9B1', padding: '1rem', textDecoration: 'none', color: '#202122' }}><strong>{label}</strong><span style={{ display: 'block', color: '#54595D', marginTop: '0.25rem' }}>{counts[id] ?? 0} maksim</span></Link>)}</div></main><Footer /></>;
}

