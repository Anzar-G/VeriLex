'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Sidebar from '@/components/layout/Sidebar';
import { BookOpen, Scale, GraduationCap, ArrowRight, Users, FileText, Award } from 'lucide-react';


export default function TentangPage() {
  const [maximCount, setMaximCount] = useState<number | null>(null);

  useEffect(() => {
    fetch('/api/maxims?limit=1')
      .then(r => r.json())
      .then(d => { if (d.total) setMaximCount(d.total); })
      .catch(() => {});
  }, []);

  return (
    <>
      <Header />
      <div style={{ display: 'flex', minHeight: 'calc(100vh - 46px)' }}>
        <div className="hidden lg:block">
          <Sidebar />
        </div>
        <main style={{ flex: 1, minWidth: 0, backgroundColor: '#F8F9FA' }}>
          {/* Hero Section */}
          <div style={{ backgroundColor: '#0F1B3C', color: '#FFFFFF', padding: '3rem 2rem 2.5rem' }}>
            <div style={{ maxWidth: '800px' }}>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#A0AEC0', marginBottom: '0.75rem', fontWeight: 600 }}>
                Tentang Platform
              </p>
              <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '2.25rem', color: '#FFFFFF', marginBottom: '1rem', border: 'none', padding: 0, lineHeight: 1.2 }}>
                VeriLex — <em style={{ fontWeight: 400, fontStyle: 'italic' }}>Veritas et Lex</em>
              </h1>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', lineHeight: 1.75, color: '#CBD5E0', maxWidth: '680px', marginBottom: '2rem' }}>
                Ensiklopedia digital terpadu pertama di Indonesia yang khusus didedikasikan untuk memetakan,
                menjelaskan, dan menyediakan referensi putusan pengadilan terkait <strong style={{ color: '#FFFFFF' }}>maksim hukum Latin</strong> —
                dari <em>Corpus Juris Civilis</em> hingga yurisprudensi Mahkamah Agung Indonesia.
              </p>
              {/* Stat bar */}
              <div style={{ display: 'flex', gap: '2.5rem', flexWrap: 'wrap' }}>
                {[
                  { value: maximCount ? `${maximCount}+` : '—', label: 'Maksim Terkurasi' },
                  { value: '11', label: 'Bidang Hukum' },
                  { value: '100%', label: 'Gratis & Terbuka' },
                ].map(stat => (
                  <div key={stat.label}>
                    <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.875rem', color: '#FFFFFF', margin: 0 }}>{stat.value}</p>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: '#A0AEC0', margin: '0.125rem 0 0', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={{ padding: '2rem' }}>
            <div style={{ maxWidth: '800px' }}>

              {/* Misi */}
              <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #A2A9B1', padding: '2rem', marginBottom: '1.5rem' }}>
                <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.25rem', color: '#0F1B3C', borderBottom: '2px solid #0F1B3C', paddingBottom: '0.5rem', marginTop: 0, marginBottom: '1.5rem' }}>
                  Misi Platform
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
                  {[
                    {
                      icon: <BookOpen size={22} color="#0F1B3C" />,
                      title: 'Presisi Akademis',
                      desc: 'Penjelasan bedah etimologi kata per kata dan konstruksi makna hukum yang sahih, merujuk sumber primer.',
                    },
                    {
                      icon: <Scale size={22} color="#0F1B3C" />,
                      title: 'Integrasi Yurisprudensi',
                      desc: 'Menghubungkan maksim hukum kuno dengan penerapannya dalam putusan Mahkamah Agung & Mahkamah Konstitusi RI.',
                    },
                    {
                      icon: <GraduationCap size={22} color="#0F1B3C" />,
                      title: 'Aksesibilitas Belajar',
                      desc: 'Alat kognitif modern seperti Spaced Repetition Flashcard, Quiz interaktif, dan indeks lengkap A–Z.',
                    },
                  ].map(item => (
                    <div key={item.title} style={{ display: 'flex', gap: '0.875rem', alignItems: 'flex-start' }}>
                      <div style={{ flexShrink: 0, width: '40px', height: '40px', backgroundColor: '#EAF3FF', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {item.icon}
                      </div>
                      <div>
                        <p style={{ fontWeight: 700, fontSize: '0.875rem', color: '#0F1B3C', margin: '0 0 0.25rem' }}>{item.title}</p>
                        <p style={{ fontSize: '0.8125rem', color: '#54595D', lineHeight: 1.6, margin: 0 }}>{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Latar Belakang */}
              <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #A2A9B1', padding: '2rem', marginBottom: '1.5rem' }}>
                <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.25rem', color: '#0F1B3C', borderBottom: '2px solid #0F1B3C', paddingBottom: '0.5rem', marginTop: 0, marginBottom: '1rem' }}>
                  Latar Belakang
                </h2>
                <p style={{ fontSize: '0.9375rem', lineHeight: 1.75, color: '#202122', marginBottom: '1rem' }}>
                  <strong>VeriLex</strong> lahir dari kebutuhan mendesak di ekosistem pendidikan hukum Indonesia:
                  tidak ada platform digital yang secara sistematis mendokumentasikan maksim hukum Latin —
                  fondasi epistemologis dari hukum modern — beserta konteks yurisprudensi Indonesia yang relevan.
                </p>
                <p style={{ fontSize: '0.9375rem', lineHeight: 1.75, color: '#202122', marginBottom: '1rem' }}>
                  Sumber berbahasa asing seperti <em>Black&apos;s Law Dictionary</em> atau <em>Bouvier&apos;s Law Dictionary</em>
                  memang komprehensif, namun tidak membahas bagaimana maksim-maksim tersebut diimplementasikan
                  dalam tradisi hukum sipil (<em>civil law</em>) Indonesia — sistem yang secara historis mewarisi
                  kodifikasi hukum Belanda (BW/KUHPerdata) yang sendiri berakar kuat pada prinsip-prinsip Romawi.
                </p>
                <p style={{ fontSize: '0.9375rem', lineHeight: 1.75, color: '#202122', margin: 0 }}>
                  VeriLex menjawab kesenjangan ini dengan pendekatan ensiklopedis terstruktur: setiap entri memuat
                  etimologi, analisis yuridis, contoh kasus konkret dari Indonesia, serta keterkaitannya dengan
                  maksim-maksim serumpun.
                </p>
              </div>

              {/* Standar Referensi */}
              <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #A2A9B1', padding: '2rem', marginBottom: '1.5rem' }}>
                <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.25rem', color: '#0F1B3C', borderBottom: '2px solid #0F1B3C', paddingBottom: '0.5rem', marginTop: 0, marginBottom: '1rem' }}>
                  Standar & Metodologi Kurasi
                </h2>
                <p style={{ fontSize: '0.875rem', lineHeight: 1.7, color: '#54595D', marginBottom: '1rem' }}>
                  Setiap maksim yang dimuat dalam VeriLex dikurasi melalui proses multi-tahap:
                </p>
                <div style={{ display: 'grid', gap: '0.75rem' }}>
                  {[
                    { num: '01', title: 'Verifikasi Sumber Primer', desc: 'Merujuk langsung ke Corpus Juris Civilis, Digestum Iustiniani, atau teks asli Latin.' },
                    { num: '02', title: 'Komparasi Kamus Hukum', desc: "Cross-check dengan Black's Law Dictionary (11th Ed.), Bouvier's Law Dictionary, dan Fockema Andreae Rechtsgele." },
                    { num: '03', title: 'Yurisprudensi Indonesia', desc: 'Penelusuran putusan Mahkamah Agung, Mahkamah Konstitusi, dan pengadilan tinggi relevan di Indonesia.' },
                    { num: '04', title: 'Review Editorial', desc: 'Seluruh entri melalui proses review berlapis: Contributor → Editor → Senior Editor sebelum dipublikasikan.' },
                  ].map(item => (
                    <div key={item.num} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', padding: '0.75rem', backgroundColor: '#F8F9FA', border: '1px solid #EAECF0' }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '0.75rem', color: '#A2A9B1', flexShrink: 0, marginTop: '2px' }}>{item.num}</span>
                      <div>
                        <p style={{ fontWeight: 700, fontSize: '0.875rem', color: '#202122', margin: '0 0 0.25rem' }}>{item.title}</p>
                        <p style={{ fontSize: '0.8125rem', color: '#54595D', lineHeight: 1.6, margin: 0 }}>{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tim & Kontribusi */}
              <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #A2A9B1', padding: '2rem', marginBottom: '1.5rem' }}>
                <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.25rem', color: '#0F1B3C', borderBottom: '2px solid #0F1B3C', paddingBottom: '0.5rem', marginTop: 0, marginBottom: '1rem' }}>
                  Tim Editorial & Kontribusi
                </h2>
                <p style={{ fontSize: '0.9375rem', lineHeight: 1.75, color: '#202122', marginBottom: '1.25rem' }}>
                  VeriLex dibangun oleh komunitas terbuka yang terdiri dari mahasiswa hukum, praktisi, akademisi,
                  dan penggiat literasi hukum. Setiap kontributor terdaftar berperan dalam memperluas dan menjaga
                  kualitas ensiklopedia ini.
                </p>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  {[
                    { icon: <Users size={16} />, label: 'Kontributor', desc: 'Mengusulkan & menulis entri baru' },
                    { icon: <FileText size={16} />, label: 'Editor & Senior Editor', desc: 'Meninjau & memvalidasi konten' },
                    { icon: <Award size={16} />, label: 'Pakar Bidang', desc: 'Memberikan validasi substantif hukum' },
                  ].map(item => (
                    <div key={item.label} style={{ flex: '1 1 180px', border: '1px solid #EAECF0', padding: '0.875rem', backgroundColor: '#FAFBFC' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#0F1B3C', marginBottom: '0.375rem' }}>
                        {item.icon}
                        <strong style={{ fontSize: '0.875rem' }}>{item.label}</strong>
                      </div>
                      <p style={{ fontSize: '0.8125rem', color: '#54595D', margin: 0, lineHeight: 1.5 }}>{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Penyangkalan ringkas */}
              <div style={{ backgroundColor: '#FFFBEB', border: '1px solid #FDE68A', padding: '1rem 1.25rem', marginBottom: '1.5rem' }}>
                <p style={{ fontSize: '0.875rem', color: '#92400E', lineHeight: 1.6, margin: 0 }}>
                  <strong>⚠ Penyangkalan:</strong> Konten VeriLex ditujukan murni untuk keperluan akademis, edukasi, dan penelitian hukum.
                  Platform ini <strong>bukan</strong> merupakan nasihat hukum formal. Untuk konsultasi hukum konkret, hubungi
                  advokat terdaftar atau lembaga bantuan hukum resmi.{' '}
                  <Link href="/penyangkalan" style={{ color: '#92400E', fontWeight: 700 }}>Baca penyangkalan lengkap →</Link>
                </p>
              </div>

              {/* CTA */}
              <div style={{ backgroundColor: '#0F1B3C', padding: '2rem', textAlign: 'center' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.25rem', color: '#FFFFFF', marginTop: 0, marginBottom: '0.5rem', border: 'none', padding: 0 }}>
                  Mulai Eksplorasi VeriLex
                </h3>
                <p style={{ fontSize: '0.875rem', color: '#A0AEC0', marginBottom: '1.5rem' }}>
                  Temukan ratusan maksim hukum Latin beserta penjelasan mendalam dan contoh yurisprudensi Indonesia.
                </p>
                <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <Link href="/cari" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', backgroundColor: '#FFFFFF', color: '#0F1B3C', padding: '0.625rem 1.25rem', fontWeight: 700, fontSize: '0.875rem', textDecoration: 'none' }}>
                    Jelajahi Indeks <ArrowRight size={14} />
                  </Link>
                  <Link href="/flashcard" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', backgroundColor: 'transparent', color: '#FFFFFF', padding: '0.625rem 1.25rem', fontWeight: 600, fontSize: '0.875rem', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.3)' }}>
                    Mulai Flashcard
                  </Link>
                  <Link href="/quiz" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', backgroundColor: 'transparent', color: '#FFFFFF', padding: '0.625rem 1.25rem', fontWeight: 600, fontSize: '0.875rem', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.3)' }}>
                    Quiz Interaktif
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}
