'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Sidebar from '@/components/layout/Sidebar';
import { FileEdit, Clock, CheckCircle2, XCircle, AlertCircle, BookOpen, ArrowRight } from 'lucide-react';
import { useVeriLexStore, hasMinRole } from '@/lib/useStore';
import { apiFetch } from '@/lib/api-fetch';

type Proposal = { id: string; maxim_id: string; status: string; change_summary: string; created_at: string };

const STATUS_BADGE: Record<string, { cls: string; icon: React.ReactNode }> = {
  pending:  { cls: 'badge-warning', icon: <Clock size={12} /> },
  approved: { cls: 'badge-success', icon: <CheckCircle2 size={12} /> },
  rejected: { cls: 'badge-error', icon: <XCircle size={12} /> },
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
          <Link href="/profil" style={{ color: '#2563EB' }}>Ajukan peningkatan role di Profil →</Link>
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
      <div style={{ display: 'flex', minHeight: 'calc(100vh - 46px)', backgroundColor: '#F8FAFC' }}>
        <div className="hidden lg:block"><Sidebar /></div>
        <main style={{ flex: 1, minWidth: 0, padding: '2rem 1.5rem' }}>
          <div style={{ maxWidth: '1080px', margin: '0 auto' }}>

            {/* Header */}
            <div className="page-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ width: '40px', height: '40px', backgroundColor: '#EFF6FF', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <FileEdit size={20} color="#2563EB" />
                </div>
                <div>
                  <h1 style={{ margin: 0 }}>Workspace Kontributor</h1>
                  <p style={{ margin: 0 }}>Halo, <strong>{authUser.displayName}</strong> — kelola usulan dan kontribusi Anda di sini.</p>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
              {[
                { label: 'Menunggu Review', count: pending.length, cls: 'badge-warning', icon: <Clock size={20} color="#D97706" /> },
                { label: 'Usulan Disetujui', count: approved.length, cls: 'badge-success', icon: <CheckCircle2 size={20} color="#16A34A" /> },
                { label: 'Usulan Ditolak', count: rejected.length, cls: 'badge-error', icon: <XCircle size={20} color="#DC2626" /> },
              ].map(stat => (
                <div key={stat.label} className="wiki-card" style={{ padding: '1.25rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ padding: '0.75rem', borderRadius: '10px', backgroundColor: '#F8FAFC' }}>
                    {stat.icon}
                  </div>
                  <div>
                    <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.75rem', color: '#0F172A', margin: 0 }}>{stat.count}</p>
                    <p style={{ fontSize: '0.8125rem', color: '#64748B', margin: 0, fontWeight: 500 }}>{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Panduan Singkat Callout */}
            <div className="notice-info" style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.875rem', color: '#0369A1', marginTop: 0, marginBottom: '0.5rem', border: 'none', padding: 0, display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                <AlertCircle size={15} /> Panduan Alur Kontribusi
              </h3>
              <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.8125rem', color: '#0369A1', lineHeight: 1.75 }}>
                <li>Buka halaman detail maksim yang ingin diusulkan perubahan</li>
                <li>Klik tab <strong>"Sunting"</strong> — isi draf perbaikan dan ringkasan alasan</li>
                <li>Kirim usulan: tim editor akan meninjau dalam 1–3 hari kerja</li>
                <li>Pantau status persetujuan pada tabel di bawah</li>
              </ul>
              <div style={{ marginTop: '0.875rem' }}>
                <Link href="/cari" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.8125rem', color: '#0284C7', fontWeight: 700, textDecoration: 'none' }}>
                  Jelajahi maksim untuk disunting <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            {/* Proposals List Table */}
            <div className="wiki-card">
              <h2 className="wiki-card-header">Riwayat Usulan Saya</h2>
              {loading ? (
                <div style={{ padding: '2rem', textAlign: 'center', color: '#64748B', fontSize: '0.875rem' }}>
                  <div className="skeleton" style={{ height: '120px', width: '100%' }} />
                </div>
              ) : proposals.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '3rem 1rem', color: '#64748B' }}>
                  <BookOpen size={36} style={{ opacity: 0.3, marginBottom: '0.75rem' }} />
                  <p style={{ margin: 0, fontSize: '0.875rem', fontWeight: 500 }}>Anda belum memiliki usulan perbaikan. Mulai berkontribusi sekarang!</p>
                </div>
              ) : (
                <div className="data-table-container">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Ringkasan Perubahan</th>
                        <th>Status</th>
                        <th>Tanggal Pengajuan</th>
                        <th>Artikel</th>
                      </tr>
                    </thead>
                    <tbody>
                      {proposals.map(p => {
                        const s = STATUS_BADGE[p.status] ?? STATUS_BADGE.pending;
                        return (
                          <tr key={p.id}>
                            <td style={{ fontWeight: 500, color: '#0F172A', maxWidth: '320px' }}>
                              <span style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                {p.change_summary || '—'}
                              </span>
                            </td>
                            <td>
                              <span className={`badge ${s.cls}`}>
                                {s.icon} {p.status}
                              </span>
                            </td>
                            <td style={{ color: '#64748B', whiteSpace: 'nowrap' }}>
                              {new Date(p.created_at).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })}
                            </td>
                            <td>
                              <Link href={`/maksim/${p.maxim_id}`} style={{ color: '#2563EB', fontWeight: 600, fontSize: '0.8125rem' }}>
                                Lihat Artikel →
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
