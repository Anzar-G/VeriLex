'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Sidebar from '@/components/layout/Sidebar';
import { BookOpen, Scale, GraduationCap, ArrowRight, Users, FileText, Award, ShieldCheck, CheckCircle2 } from 'lucide-react';

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
      <div style={{ display: 'flex', minHeight: 'calc(100vh - 46px)', backgroundColor: '#F8FAFC' }}>
        <div className="hidden lg:block">
          <Sidebar />
        </div>
        <main style={{ flex: 1, minWidth: 0, padding: '2rem 1.5rem' }}>
          <div style={{ maxWidth: '1080px', margin: '0 auto' }}>
            
            {/* Hero Section Banner */}
            <div style={{
              background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
              color: '#FFFFFF',
              borderRadius: '16px',
              padding: '3rem 2.5rem',
              marginBottom: '2rem',
              boxShadow: '0 10px 30px -5px rgba(15, 23, 42, 0.15)',
              position: 'relative',
              overflow: 'hidden',
            }}>
              {/* Subtle background glow circle */}
              <div style={{ position: 'absolute', right: '-50px', top: '-50px', width: '250px', height: '250px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, rgba(0,0,0,0) 70%)', pointerEvents: 'none' }} />

              <div style={{ maxWidth: '780px', position: 'relative', zIndex: 1 }}>
                <span className="badge badge-navy" style={{ background: 'rgba(255,255,255,0.1)', color: '#93C5FD', borderColor: 'rgba(255,255,255,0.15)', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.08em', fontSize: '0.7rem' }}>
                  Platform Ensiklopedia Hukum Digital
                </span>
                <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '2.5rem', color: '#FFFFFF', marginBottom: '1rem', border: 'none', padding: 0, lineHeight: 1.15, letterSpacing: '-0.02em' }}>
                  VeriLex — <em style={{ fontWeight: 400, fontStyle: 'italic', color: '#F1F5F9' }}>Veritas et Lex</em>
                </h1>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', lineHeight: 1.75, color: '#94A3B8', marginBottom: '2.25rem' }}>
                  Ensiklopedia digital terpadu pertama di Indonesia yang khusus didedikasikan untuk memetakan,
                  menjelaskan, dan menyediakan referensi putusan pengadilan terkait <strong style={{ color: '#F8FAFC' }}>maksim hukum Latin</strong> —
                  dari <em>Corpus Juris Civilis</em> hingga yurisprudensi Mahkamah Agung & Mahkamah Konstitusi RI.
                </p>

                {/* Stat bar */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                  {[
                    { value: maximCount ? `${maximCount}+` : '200+', label: 'Maksim Terkurasi' },
                    { value: '11', label: 'Bidang Hukum' },
                    { value: '100%', label: 'Akses Gratis & Terbuka' },
                  ].map(stat => (
                    <div key={stat.label} style={{ background: 'rgba(255,255,255,0.05)', padding: '0.875rem 1.125rem', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.08)' }}>
                      <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.75rem', color: '#FFFFFF', margin: 0 }}>{stat.value}</p>
                      <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: '#94A3B8', margin: '0.25rem 0 0', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Main Content Grid */}
            <div style={{ display: 'grid', gap: '1.75rem' }}>

              {/* Misi Platform */}
              <div className="wiki-card">
                <h2 className="wiki-card-header" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <ShieldCheck size={20} color="#0F172A" /> Misi Utama VeriLex
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem', marginTop: '1.25rem' }}>
                  {[
                    {
                      icon: <BookOpen size={20} color="#2563EB" />,
                      bg: '#EFF6FF',
                      title: 'Presisi Akademis',
                      desc: 'Penjelasan bedah etimologi kata per kata dan konstruksi makna hukum yang sahih, merujuk langsung pada sumber rujukan primer.',
                    },
                    {
                      icon: <Scale size={20} color="#059669" />,
                      bg: '#ECFDF5',
                      title: 'Integrasi Yurisprudensi',
                      desc: 'Menghubungkan maksim hukum kuno dengan penerapannya dalam putusan Mahkamah Agung & Mahkamah Konstitusi RI.',
                    },
                    {
                      icon: <GraduationCap size={20} color="#7C3AED" />,
                      bg: '#F5F3FF',
                      title: 'Aksesibilitas Belajar',
                      desc: 'Alat kognitif modern seperti Spaced Repetition Flashcard, Quiz interaktif, serta Indeks Lengkap A–Z.',
                    },
                  ].map(item => (
                    <div key={item.title} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', padding: '1.25rem', borderRadius: '10px', backgroundColor: '#F8FAFC', border: '1px solid #F1F5F9' }}>
                      <div style={{ flexShrink: 0, width: '42px', height: '42px', backgroundColor: item.bg, borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {item.icon}
                      </div>
                      <div>
                        <h3 style={{ fontWeight: 700, fontSize: '0.9375rem', color: '#0F172A', margin: '0 0 0.375rem', border: 'none', padding: 0 }}>{item.title}</h3>
                        <p style={{ fontSize: '0.8125rem', color: '#64748B', lineHeight: 1.6, margin: 0 }}>{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Latar Belakang */}
              <div className="wiki-card">
                <h2 className="wiki-card-header">Latar Belakang Operasional</h2>
                <div style={{ fontSize: '0.9375rem', lineHeight: 1.8, color: '#334155' }}>
                  <p style={{ marginBottom: '1rem' }}>
                    <strong>VeriLex</strong> lahir dari kebutuhan mendesak di ekosistem pendidikan dan praktik hukum Indonesia:
                    belum adanya platform digital independen yang secara sistematis mendokumentasikan maksim hukum Latin —
                    fondasi epistemologis dari hukum modern — beserta konteks yurisprudensi Indonesia yang relevan.
                  </p>
                  <p style={{ marginBottom: '1rem' }}>
                    Sumber berbahasa asing seperti <em>Black&apos;s Law Dictionary</em> atau <em>Bouvier&apos;s Law Dictionary</em>
                    memang komprehensif, namun tidak membahas bagaimana maksim-maksim tersebut diimplementasikan
                    dalam tradisi hukum sipil (<em>civil law</em>) Indonesia — sistem yang secara historis mewarisi
                    kodifikasi hukum Belanda (BW/KUHPerdata) yang berakar kuat pada prinsip-prinsip Hukum Romawi.
                  </p>
                  <p style={{ margin: 0 }}>
                    VeriLex menjawab kesenjangan ini dengan pendekatan ensiklopedis terstruktur: setiap entri memuat
                    etimologi, analisis yuridis, contoh kasus konkret di Indonesia, serta peta relasi dengan maksim-maksim serumpun.
                  </p>
                </div>
              </div>

              {/* Standar Kurasi */}
              <div className="wiki-card">
                <h2 className="wiki-card-header">Standar & Metodologi Kurasi</h2>
                <p style={{ fontSize: '0.875rem', lineHeight: 1.6, color: '#64748B', marginBottom: '1.25rem' }}>
                  Setiap entri maksim yang dimuat dalam VeriLex melalui proses verifikasi dan kurasi berlapis:
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                  {[
                    { num: '01', title: 'Verifikasi Sumber Primer', desc: 'Merujuk langsung pada Corpus Juris Civilis, Digestum Iustiniani, atau teks sejarah Latin.' },
                    { num: '02', title: 'Komparasi Kamus Hukum', desc: "Cross-check dengan Black&apos;s Law Dictionary, Bouvier&apos;s, dan Fockema Andreae." },
                    { num: '03', title: 'Yurisprudensi Indonesia', desc: 'Penelusuran putusan Mahkamah Agung, MK, dan pengadilan tinggi di Indonesia.' },
                    { num: '04', title: 'Review Editorial', desc: 'Alur peninjauan bertingkat: Contributor → Editor → Senior Editor sebelum rilis.' },
                  ].map(item => (
                    <div key={item.num} style={{ padding: '1.125rem', backgroundColor: '#F8FAFC', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '0.75rem', color: '#2563EB', backgroundColor: '#EFF6FF', padding: '0.125rem 0.5rem', borderRadius: '4px' }}>{item.num}</span>
                        <CheckCircle2 size={16} color="#10B981" />
                      </div>
                      <h4 style={{ fontWeight: 700, fontSize: '0.875rem', color: '#0F172A', margin: '0 0 0.375rem', border: 'none', padding: 0 }}>{item.title}</h4>
                      <p style={{ fontSize: '0.8125rem', color: '#64748B', lineHeight: 1.5, margin: 0 }}>{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tim & Peran */}
              <div className="wiki-card">
                <h2 className="wiki-card-header">Struktur Ekosistem Editorial</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                  {[
                    { icon: <Users size={18} color="#2563EB" />, label: 'Kontributor', desc: 'Mengusulkan entri & perbaikan baru' },
                    { icon: <FileText size={18} color="#059669" />, label: 'Editor & Senior Editor', desc: 'Meninjau & memvalidasi keakuratan' },
                    { icon: <Award size={18} color="#7C3AED" />, label: 'Pakar Bidang', desc: 'Memberikan peninjauan akademis substantif' },
                  ].map(item => (
                    <div key={item.label} style={{ border: '1px solid #E2E8F0', padding: '1.125rem', borderRadius: '10px', backgroundColor: '#FFFFFF' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', color: '#0F172A', marginBottom: '0.5rem' }}>
                        {item.icon}
                        <strong style={{ fontSize: '0.875rem' }}>{item.label}</strong>
                      </div>
                      <p style={{ fontSize: '0.8125rem', color: '#64748B', margin: 0, lineHeight: 1.5 }}>{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Penyangkalan Callout Notice */}
              <div className="notice-warning">
                <p style={{ margin: 0, fontSize: '0.875rem', lineHeight: 1.6 }}>
                  <strong>⚠ Penyangkalan Tanggung Jawab:</strong> Seluruh konten VeriLex ditujukan murni untuk kepentingan akademis, edukasi, dan penelitian hukum. Platform ini <strong>bukan</strong> merupakan konsultasi atau nasihat hukum formal bagi kasus konkret. Untuk masalah hukum nyata, hubungi advokat terdaftar atau lembaga bantuan hukum resmi.{' '}
                  <Link href="/penyangkalan" style={{ color: '#92400E', fontWeight: 700, textDecoration: 'underline' }}>Baca Penyangkalan Lengkap →</Link>
                </p>
              </div>

              {/* Banner CTA */}
              <div style={{ background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)', borderRadius: '16px', padding: '2.5rem 2rem', textAlign: 'center', color: '#FFFFFF', boxShadow: '0 10px 25px -5px rgba(15, 23, 42, 0.12)' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.375rem', color: '#FFFFFF', marginTop: 0, marginBottom: '0.5rem', border: 'none', padding: 0 }}>
                  Mulai Jelajahi VeriLex Hari Ini
                </h3>
                <p style={{ fontSize: '0.875rem', color: '#94A3B8', marginBottom: '1.75rem', maxWidth: '540px', margin: '0 auto 1.75rem' }}>
                  Temukan ratusan maksim hukum Latin beserta terjemahan, analisis yuridis, dan yurisprudensi Indonesia.
                </p>
                <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <Link href="/cari" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', backgroundColor: '#2563EB', color: '#FFFFFF', padding: '0.625rem 1.25rem', fontWeight: 600, fontSize: '0.875rem', borderRadius: '8px', textDecoration: 'none', boxShadow: '0 4px 12px rgba(37,99,235,0.25)' }}>
                    Jelajahi Indeks <ArrowRight size={15} />
                  </Link>
                  <Link href="/flashcard" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', backgroundColor: 'rgba(255,255,255,0.1)', color: '#FFFFFF', padding: '0.625rem 1.25rem', fontWeight: 600, fontSize: '0.875rem', borderRadius: '8px', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.15)' }}>
                    Flashcard SRA
                  </Link>
                  <Link href="/quiz" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', backgroundColor: 'rgba(255,255,255,0.1)', color: '#FFFFFF', padding: '0.625rem 1.25rem', fontWeight: 600, fontSize: '0.875rem', borderRadius: '8px', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.15)' }}>
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
