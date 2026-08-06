'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Sidebar from '@/components/layout/Sidebar';
import { FileEdit, Clock, CheckCircle, XCircle, AlertCircle, BookOpen, ArrowRight } from 'lucide-react';
import { useVeriLexStore, hasMinRole } from '@/lib/useStore';
import { apiFetch } from '@/lib/api-fetch';

type Proposal = { id: string; maxim_id: string; status: string; change_summary: string; created_at: string };

const STATUS_COLORS: Record<string, { bg: string; color: string; icon: React.ReactNode }> = {
  pending:  { bg: '#FFFBEB', color: '#92400E', icon: <Clock size={13} /> },
  approved: { bg: '#F0FDF4', color: '#166534', icon: <CheckCircle size={13} /> },
  rejected: { bg: '#FEF2F2', color: '#991B1B', icon: <XCircle size={13} /> },
};

export default function KontributorWorkspacePage() {
  const { authUser } = useVeriLexStore();
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authUser) return;
    apiFetch('/api/me/contributions')
      .then(r => r.json())
      .then(d => { setProposals(d.proposals ?? []); setLoading(false); })
      .catch(() => setLoading(false));
  }, [authUser]);

  if (!authUser) {
    return (
      <>
        <Header />
        <main style={{ padding: '3rem 2rem', textAlign: 'center' }}>
          <p>Silakan <Link href="/masuk">masuk</Link> untuk mengakses workspace.</p>
        </main>
        <Footer />
      </>
    );
  }

  if (!hasMinRole(authUser.role, 'contributor')) {
    return (
      <>
        <Header />
        <main style={{ padding: '3rem 2rem', textAlign: 'center' }}>
          <p>Anda memerlukan role <strong>Kontributor</strong> atau lebih tinggi untuk mengakses halaman ini.</p>
          <Link href="/profil" style={{ color: '#0645AD' }}>Ajukan peningkatan role di Profil →</Link>
        </main>
        <Footer />
      </>
    );
  }

  const pending  = proposals.filter(p => p.status === 'pending');
  const approved = proposals.filter(p => p.status === 'approved');
  const rejected = proposals.filter(p => p.status === 'rejected');

  return (
    <>
      <Header />
      <div style={{ display: 'flex', minHeight: 'calc(100vh - 46px)' }}>
        <div className="hidden lg:block"><Sidebar /></div>
        <main style={{ flex: 1, minWidth: 0, backgroundColor: '#F8F9FA', padding: '2rem' }}>
          <div style={{ maxWidth: '860px' }}>

            {/* Header */}
            <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #A2A9B1', padding: '1.5rem 2rem', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.375rem' }}>
                <div style={{ width: '36px', height: '36px', backgroundColor: '#EFF6FF', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <FileEdit size={18} color="#1E40AF" />
                </div>
                <div>
                  <h1 style={{ margin: 0, border: 'none', padding: 0, fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.375rem', color: '#0F1B3C' }}>
                    Workspace Kontributor
                  </h1>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: '#54595D' }}>Halo, {authUser.displayName} — kelola usulan dan kontribusi Anda di sini.</p>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
              {[
                { label: 'Menunggu Review', count: pending.length, bg: '#FFFBEB', color: '#92400E' },
                { label: 'Disetujui', count: approved.length, bg: '#F0FDF4', color: '#166534' },
                { label: 'Ditolak', count: rejected.length, bg: '#FEF2F2', color: '#991B1B' },
              ].map(stat => (
                <div key={stat.label} style={{ backgroundColor: stat.bg, border: `1px solid ${stat.color}30`, padding: '1rem 1.25rem' }}>
                  <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.75rem', color: stat.color, margin: '0 0 0.125rem' }}>{stat.count}</p>
                  <p style={{ fontSize: '0.8rem', color: stat.color, margin: 0, fontWeight: 600 }}>{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Panduan Singkat */}
            <div style={{ backgroundColor: '#EFF6FF', border: '1px solid #BFDBFE', padding: '1.25rem 1.5rem', marginBottom: '1.5rem' }}>
              <h3 style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.875rem', color: '#1E40AF', marginTop: 0, marginBottom: '0.625rem', border: 'none', padding: 0 }}>
                <AlertCircle size={14} style={{ verticalAlign: 'middle', marginRight: '0.375rem' }} />
                Panduan Kontribusi
              </h3>
              <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.8125rem', color: '#1E40AF', lineHeight: 1.75 }}>
                <li>Buka halaman detail maksim yang ingin diubah</li>
                <li>Klik tab <strong>"Sunting"</strong> — isi perubahan dan ringkasan alasan</li>
                <li>Kirim usulan: tim editor akan meninjau dalam 1–3 hari kerja</li>
                <li>Pantau status usulan di tabel di bawah</li>
              </ul>
              <div style={{ marginTop: '0.75rem' }}>
                <Link href="/cari" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.8125rem', color: '#1E40AF', fontWeight: 700, textDecoration: 'none' }}>
                  Jelajahi maksim untuk disunting <ArrowRight size={13} />
                </Link>
              </div>
            </div>

            {/* Proposals List */}
            <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #A2A9B1', padding: '1.5rem 2rem' }}>
              <h2 style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '1rem', color: '#0F1B3C', margin: '0 0 1rem', border: 'none', padding: 0 }}>
                Riwayat Usulan Saya
              </h2>
              {loading ? (
                <p style={{ color: '#72777D', fontSize: '0.875rem' }}>Memuat data…</p>
              ) : proposals.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '2rem', color: '#72777D' }}>
                  <BookOpen size={32} style={{ opacity: 0.4, marginBottom: '0.5rem' }} />
                  <p style={{ margin: 0, fontSize: '0.875rem' }}>Anda belum memiliki usulan. Mulai berkontribusi sekarang!</p>
                </div>
              ) : (
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8125rem' }}>
                    <thead>
                      <tr style={{ backgroundColor: '#F8F9FA', borderBottom: '1px solid #EAECF0' }}>
                        <th style={{ padding: '0.625rem 0.75rem', textAlign: 'left', fontWeight: 700, color: '#54595D' }}>Ringkasan</th>
                        <th style={{ padding: '0.625rem 0.75rem', textAlign: 'left', fontWeight: 700, color: '#54595D' }}>Status</th>
                        <th style={{ padding: '0.625rem 0.75rem', textAlign: 'left', fontWeight: 700, color: '#54595D' }}>Tanggal</th>
                        <th style={{ padding: '0.625rem 0.75rem', textAlign: 'left', fontWeight: 700, color: '#54595D' }}>Artikel</th>
                      </tr>
                    </thead>
                    <tbody>
                      {proposals.map(p => {
                        const s = STATUS_COLORS[p.status] ?? STATUS_COLORS.pending;
                        return (
                          <tr key={p.id} style={{ borderBottom: '1px solid #EAECF0' }}>
                            <td style={{ padding: '0.625rem 0.75rem', color: '#202122', maxWidth: '280px' }}>
                              <span style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                {p.change_summary || '—'}
                              </span>
                            </td>
                            <td style={{ padding: '0.625rem 0.75rem' }}>
                              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', backgroundColor: s.bg, color: s.color, padding: '0.125rem 0.5rem', fontSize: '0.75rem', fontWeight: 600 }}>
                                {s.icon} {p.status}
                              </span>
                            </td>
                            <td style={{ padding: '0.625rem 0.75rem', color: '#72777D', whiteSpace: 'nowrap' }}>
                              {new Date(p.created_at).toLocaleDateString('id-ID')}
                            </td>
                            <td style={{ padding: '0.625rem 0.75rem' }}>
                              <Link href={`/maksim/${p.maxim_id}`} style={{ color: '#0645AD', fontSize: '0.75rem' }}>
                                Lihat →
                              </Link>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}
