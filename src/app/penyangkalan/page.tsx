import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Sidebar from '@/components/layout/Sidebar';
import { siteUrl } from '@/lib/site';
import { ShieldAlert } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Penyangkalan (Disclaimer) — VeriLex',
  description: 'Pernyataan penyangkalan resmi VeriLex mengenai batas tanggung jawab konten ensiklopedia hukum ini.',
  alternates: { canonical: `${siteUrl}/penyangkalan` },
};

export default function PenyangkalanPage() {
  return (
    <>
      <Header />
      <div style={{ display: 'flex', minHeight: 'calc(100vh - 46px)', backgroundColor: '#F8FAFC' }}>
        <div className="hidden lg:block">
          <Sidebar />
        </div>
        <main style={{ flex: 1, minWidth: 0, padding: '2rem 1.5rem' }}>
          <div style={{ maxWidth: '1080px', margin: '0 auto' }}>

            {/* Warning Callout Notice */}
            <div className="notice-error" style={{ marginBottom: '1.75rem', display: 'flex', alignItems: 'flex-start', gap: '0.875rem' }}>
              <ShieldAlert size={22} color="#DC2626" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <p style={{ margin: 0, fontWeight: 600, color: '#991B1B', lineHeight: 1.6 }}>
                  VeriLex <strong>bukan</strong> firma hukum, pengacara, atau penasihat hukum resmi.
                  Seluruh konten platform ditujukan semata-mata untuk kepentingan akademis, pendidikan, dan penelitian hukum.
                </p>
              </div>
            </div>

            <div className="wiki-card" style={{ padding: '2.25rem 2.5rem', marginBottom: '1.5rem' }}>
              <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.75rem', color: '#0F172A', borderBottom: '1px solid #E2E8F0', paddingBottom: '0.75rem', marginTop: 0, marginBottom: '1.75rem' }}>
                Penyangkalan Resmi (Disclaimer)
              </h1>

              <section style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '1.0625rem', color: '#0F172A', margin: '0 0 0.75rem', border: 'none', padding: 0 }}>
                  1. Bukan Nasihat Hukum
                </h2>
                <p style={{ fontSize: '0.9375rem', lineHeight: 1.75, color: '#334155' }}>
                  Seluruh informasi yang tersedia di platform VeriLex — termasuk definisi, penjelasan, analisis,
                  dan contoh kasus — <strong>bukan merupakan nasihat hukum, konsultasi hukum, atau pendapat hukum
                  profesional</strong> dalam bentuk apapun. Informasi ini tidak dimaksudkan sebagai pengganti
                  nasihat dari advokat, notaris, atau konsultan hukum berlisensi.
                </p>
                <p style={{ fontSize: '0.9375rem', lineHeight: 1.75, color: '#334155' }}>
                  Untuk masalah hukum konkret yang memerlukan tindakan nyata, <strong>konsultasikan selalu dengan
                  profesional hukum yang berwenang</strong>: advokat terdaftar di PERADI, notaris berlisensi,
                  atau lembaga bantuan hukum resmi.
                </p>
              </section>

              <section style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '1.0625rem', color: '#0F172A', margin: '0 0 0.75rem', border: 'none', padding: 0 }}>
                  2. Akurasi & Kelengkapan Konten
                </h2>
                <p style={{ fontSize: '0.9375rem', lineHeight: 1.75, color: '#334155' }}>
                  Tim editorial VeriLex berupaya keras memastikan akurasi dan kelengkapan informasi yang disajikan
                  melalui proses kurasi berlapis. Namun, VeriLex <strong>tidak memberikan jaminan (warranty) apapun</strong>,
                  baik tersurat maupun tersirat, atas keakuratan, kelengkapan, kebaruan, atau kesesuaian konten
                  untuk tujuan tertentu.
                </p>
                <p style={{ fontSize: '0.9375rem', lineHeight: 1.75, color: '#334155' }}>
                  Hukum berkembang dan berubah. Putusan pengadilan, peraturan perundang-undangan, dan interpretasi
                  hukum yang dicantumkan dalam VeriLex mungkin telah berubah sejak terakhir diperbarui. Pengguna
                  dianjurkan memverifikasi informasi ke sumber primer dan otoritatif sebelum menggunakannya dalam
                  konteks hukum formal.
                </p>
              </section>

              <section style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '1.0625rem', color: '#0F172A', margin: '0 0 0.75rem', border: 'none', padding: 0 }}>
                  3. Batas Tanggung Jawab
                </h2>
                <p style={{ fontSize: '0.9375rem', lineHeight: 1.75, color: '#334155' }}>
                  VeriLex dan seluruh kontributornya <strong>tidak bertanggung jawab atas kerugian atau kerusakan
                  apapun</strong> — langsung maupun tidak langsung — yang timbul dari penggunaan atau ketergantungan
                  pada informasi yang tersedia di platform ini.
                </p>
                <p style={{ fontSize: '0.9375rem', lineHeight: 1.75, color: '#334155' }}>
                  Ini mencakup namun tidak terbatas pada: kerugian finansial, keputusan bisnis, kekalahan perkara
                  hukum, atau konsekuensi lainnya akibat menggunakan atau salah mengartikan konten VeriLex.
                </p>
              </section>

              <section style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '1.0625rem', color: '#0F172A', margin: '0 0 0.75rem', border: 'none', padding: 0 }}>
                  4. Hak Cipta & Penggunaan Konten
                </h2>
                <p style={{ fontSize: '0.9375rem', lineHeight: 1.75, color: '#334155' }}>
                  Konten orisinal VeriLex (deskripsi, analisis, struktur) dilindungi hak cipta. Konten dapat
                  dikutip untuk keperluan akademis dengan mencantumkan sumber secara jelas:
                  <em> "VeriLex — Ensiklopedia Maksim Hukum Latin Indonesia, [nama maksim], [tanggal akses]."</em>
                </p>
              </section>

              <section>
                <h2 style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '1.0625rem', color: '#0F172A', margin: '0 0 0.75rem', border: 'none', padding: 0 }}>
                  5. Tautan Pihak Ketiga & Perubahan
                </h2>
                <p style={{ fontSize: '0.9375rem', lineHeight: 1.75, color: '#334155', margin: 0 }}>
                  VeriLex dapat memuat tautan ke sumber eksternal (putusan pengadilan, peraturan, jurnal hukum).
                  VeriLex tidak mengendalikan dan tidak bertanggung jawab atas konten situs eksternal tersebut.
                  VeriLex berhak mengubah pernyataan penyangkalan ini sewaktu-waktu.
                </p>
              </section>
            </div>

            {/* Footer links */}
            <div className="notice-info" style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.8125rem', color: '#0369A1', fontWeight: 600 }}>Tautan Terkait:</span>
              <Link href="/tentang" style={{ fontSize: '0.8125rem', color: '#0369A1', fontWeight: 600 }}>Tentang VeriLex</Link>
              <Link href="/faq" style={{ fontSize: '0.8125rem', color: '#0369A1', fontWeight: 600 }}>FAQ</Link>
              <Link href="/panduan" style={{ fontSize: '0.8125rem', color: '#0369A1', fontWeight: 600 }}>Panduan Penggunaan</Link>
            </div>

          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}
