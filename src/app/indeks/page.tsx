import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { createServerClient } from '@/lib/supabase-server';
import { siteUrl } from '@/lib/site';

export const metadata: Metadata = { title: 'Indeks A–Z Maksim Hukum Latin', description: 'Indeks alfabetis seluruh maksim hukum Latin di VeriLex.', alternates: { canonical: `${siteUrl}/indeks` } };
export default async function IndexPage() {
  const supabase = createServerClient();
  const { data } = await supabase.from('maxims').select('id, latin_phrase, indonesian_meaning').eq('is_active', true).order('latin_phrase');
  const maxims = data ?? [];
  const groups = maxims.reduce<Record<string, typeof maxims>>((out, maxim) => { const letter = maxim.latin_phrase.charAt(0).toUpperCase(); (out[letter] ??= []).push(maxim); return out; }, {});
  return <><Header /><main className="container-page" style={{ minHeight: '70vh', padding: '2rem 1rem' }}><h1>Indeks A–Z</h1><p>Daftar alfabetis maksim hukum Latin VeriLex.</p>{Object.entries(groups).map(([letter, maxims]) => <section key={letter}><h2>{letter}</h2><ul>{maxims.map(maxim => <li key={maxim.id}><Link href={`/maksim/${maxim.id}`}>{maxim.latin_phrase}</Link> — {maxim.indonesian_meaning}</li>)}</ul></section>)}</main><Footer /></>;
}
