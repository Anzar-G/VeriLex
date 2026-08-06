import type { Maxim } from '@/types';
import MaximDetailClient from './MaximDetailClient';

/**
 * Server-renderable wrapper.
 * Data sudah di-fetch di page.tsx (server), tinggal diteruskan ke
 * MaximDetailClient yang menangani semua interaksi browser.
 * SSR diaktifkan penuh — konten artikel ada di HTML awal sehingga:
 *   • LCP cepat (tidak ada "Memuat halaman..." di client)
 *   • Google bisa crawl seluruh isi artikel
 *   • Hydration hanya untuk elemen interaktif (tab, diskusi, audio, dsb.)
 */
export default function MaximDetailWrapper({ maxim }: { maxim: Maxim }) {
  return <MaximDetailClient maxim={maxim} />;
}
