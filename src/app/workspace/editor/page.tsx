'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Sidebar from '@/components/layout/Sidebar';
import { Edit3, Clock, CheckCircle2, XCircle, Users, ArrowRight } from 'lucide-react';
import { useVeriLexStore, hasMinRole } from '@/lib/useStore';
import { apiFetch } from '@/lib/api-fetch';

type Proposal = { id: string; maxim_id: string; status: string; change_summary: string; created_at: string; username?: string };

export default function EditorWorkspacePage() {
  const { authUser } = useVeriLexStore();
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authUser) return;
    apiFetch('/api/proposals?status=pending')
      .then(r => r.json())
      .then(d => { setProposals(d.data ?? []); setLoading(false); })
      .catch(() => setLoading(false));
  }, [authUser]);

  const handleAction = async (id: string, action: 'approve' | 'reject') => {
    const res = await apiFetch(`/api/proposals/${id}/${action}`, { method: 'POST' });
    if (res.ok) setProposals(prev => prev.filter(p => p.id !== id));
  };

  if (!authUser || !hasMinRole(authUser.role, 'editor')) {
    return (
      <>
        <Header />
        <main style={{ padding: '3rem 2rem', textAlign: 'center' }}>
          <p>Halaman ini hanya untuk <strong>Editor</strong> dan di atasnya.</p>
          <Link href="/profil" style={{ color: '#2563EB' }}>Ajukan peningkatan role →</Link>
        </main>
        <Footer />
      </>
    );
  }

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
                <div style={{ width: '40px', height: '40px', backgroundColor: '#ECFDF5', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Edit3 size={20} color="#059669" />
                </div>
                <div>
                  <h1 style={{ margin: 0 }}>Workspace Editor</h1>
                  <p style={{ margin: 0 }}>Tinjau dan proses antrian usulan kontributor yang memerlukan persetujuan.</p>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
              {[
                { label: 'Antrian Review', count: proposals.length, icon: <Clock size={20} color="#D97706" />, cls: 'badge-warning' },
                { label: 'Status Sistem', count: 'Aktif', icon: <CheckCircle2 size={20} color="#16A34A" />, cls: 'badge-success' },
                { label: 'Mode Moderasi', count: 'Realtime', icon: <Users size={20} color="#2563EB" />, cls: 'badge-info' },
              ].map(stat => (
                <div key={stat.label} className="wiki-card" style={{ padding: '1.25rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ padding: '0.75rem', borderRadius: '10px', backgroundColor: '#F8FAFC' }}>
                    {stat.icon}
                  </div>
                  <div>
                    <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.5rem', color: '#0F172A', margin: 0 }}>{stat.count}</p>
                    <p style={{ fontSize: '0.8125rem', color: '#64748B', margin: 0, fontWeight: 500 }}>{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Antrian Review Section */}
            <div className="wiki-card">
              <h2 className="wiki-card-header" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Clock size={18} color="#0F172A" /> Antrian Review Usulan Kontributor
              </h2>
              {loading ? (
                <div style={{ padding: '2rem', textAlign: 'center', color: '#64748B', fontSize: '0.875rem' }}>
                  <div className="skeleton" style={{ height: '120px', width: '100%' }} />
                </div>
              ) : proposals.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '3rem 1rem', color: '#64748B' }}>
                  <CheckCircle2 size={36} style={{ opacity: 0.3, color: '#10B981', marginBottom: '0.75rem' }} />
                  <p style={{ margin: 0, fontSize: '0.875rem', fontWeight: 500 }}>Tidak ada usulan yang menunggu review saat ini. Semua antrian bersih!</p>
                </div>
              ) : (
                <div style={{ display: 'grid', gap: '0.875rem' }}>
                  {proposals.map(p => (
                    <div key={p.id} style={{ border: '1px solid #E2E8F0', borderRadius: '10px', padding: '1.125rem 1.25rem', backgroundColor: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
                      <div style={{ flex: 1, minWidth: '240px' }}>
                        <p style={{ fontWeight: 600, fontSize: '0.9375rem', color: '#0F172A', margin: '0 0 0.375rem' }}>
                          {p.change_summary || 'Tanpa ringkasan'}
                        </p>
                        <div style={{ display: 'flex', gap: '0.875rem', alignItems: 'center', flexWrap: 'wrap' }}>
                          <Link href={`/maksim/${p.maxim_id}`} style={{ fontSize: '0.8125rem', color: '#2563EB', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                            Lihat Artikel <ArrowRight size={13} />
                          </Link>
                          <span style={{ fontSize: '0.75rem', color: '#94A3B8' }}>{new Date(p.created_at).toLocaleDateString('id-ID')}</span>
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
                        <button onClick={() => handleAction(p.id, 'approve')}
                          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', padding: '0.5rem 1rem', borderRadius: '8px', backgroundColor: '#F0FDF4', color: '#15803D', border: '1px solid #DCFCE7', fontSize: '0.8125rem', fontWeight: 600, cursor: 'pointer' }}>
                          <CheckCircle2 size={15} /> Setujui
                        </button>
                        <button onClick={() => handleAction(p.id, 'reject')}
                          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', padding: '0.5rem 1rem', borderRadius: '8px', backgroundColor: '#FEF2F2', color: '#B91C1C', border: '1px solid #FEE2E2', fontSize: '0.8125rem', fontWeight: 600, cursor: 'pointer' }}>
                          <XCircle size={15} /> Tolak
                        </button>
                      </div>
                    </div>
                  ))}
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
