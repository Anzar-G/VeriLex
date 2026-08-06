'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Sidebar from '@/components/layout/Sidebar';
import { Edit3, Clock, CheckCircle, XCircle, Users } from 'lucide-react';
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
          <Link href="/profil" style={{ color: '#0645AD' }}>Ajukan peningkatan role →</Link>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div style={{ display: 'flex', minHeight: 'calc(100vh - 46px)' }}>
        <div className="hidden lg:block"><Sidebar /></div>
        <main style={{ flex: 1, minWidth: 0, backgroundColor: '#F8F9FA', padding: '2rem' }}>
          <div style={{ maxWidth: '900px' }}>

            {/* Header */}
            <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #A2A9B1', padding: '1.5rem 2rem', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ width: '36px', height: '36px', backgroundColor: '#ECFDF5', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Edit3 size={18} color="#065F46" />
                </div>
                <div>
                  <h1 style={{ margin: 0, border: 'none', padding: 0, fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.375rem', color: '#0F1B3C' }}>
                    Workspace Editor
                  </h1>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: '#54595D' }}>Tinjau usulan kontributor yang menunggu persetujuan.</p>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
              {[
                { label: 'Antrian Review', count: proposals.length, icon: <Clock size={18} color="#92400E" />, bg: '#FFFBEB', color: '#92400E' },
                { label: 'Disetujui Hari Ini', count: '—', icon: <CheckCircle size={18} color="#166534" />, bg: '#F0FDF4', color: '#166534' },
                { label: 'Kontributor Aktif', count: '—', icon: <Users size={18} color="#1E40AF" />, bg: '#EFF6FF', color: '#1E40AF' },
              ].map(stat => (
                <div key={stat.label} style={{ backgroundColor: stat.bg, border: `1px solid ${stat.color}30`, padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  {stat.icon}
                  <div>
                    <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.5rem', color: stat.color, margin: 0 }}>{stat.count}</p>
                    <p style={{ fontSize: '0.75rem', color: stat.color, margin: 0 }}>{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Antrian Review */}
            <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #A2A9B1', padding: '1.5rem 2rem' }}>
              <h2 style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '1rem', color: '#0F1B3C', margin: '0 0 1rem', border: 'none', padding: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Clock size={16} /> Antrian Review Usulan
              </h2>
              {loading ? (
                <p style={{ color: '#72777D', fontSize: '0.875rem' }}>Memuat antrian…</p>
              ) : proposals.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '2rem', color: '#72777D' }}>
                  <CheckCircle size={32} style={{ opacity: 0.4, marginBottom: '0.5rem' }} />
                  <p style={{ margin: 0, fontSize: '0.875rem' }}>Tidak ada usulan yang menunggu review. Kerja bagus!</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {proposals.map(p => (
                    <div key={p.id} style={{ border: '1px solid #EAECF0', padding: '1rem', display: 'flex', alignItems: 'flex-start', gap: '1rem', flexWrap: 'wrap' }}>
                      <div style={{ flex: 1, minWidth: '200px' }}>
                        <p style={{ fontWeight: 600, fontSize: '0.875rem', color: '#202122', margin: '0 0 0.25rem' }}>
                          {p.change_summary || 'Tanpa ringkasan'}
                        </p>
                        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                          <Link href={`/maksim/${p.maxim_id}`} style={{ fontSize: '0.75rem', color: '#0645AD' }}>Lihat artikel →</Link>
                          <span style={{ fontSize: '0.75rem', color: '#72777D' }}>{new Date(p.created_at).toLocaleDateString('id-ID')}</span>
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
                        <button onClick={() => handleAction(p.id, 'approve')}
                          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', padding: '0.375rem 0.75rem', backgroundColor: '#F0FDF4', color: '#166534', border: '1px solid #A7F3D0', fontSize: '0.8125rem', fontWeight: 600, cursor: 'pointer' }}>
                          <CheckCircle size={13} /> Setujui
                        </button>
                        <button onClick={() => handleAction(p.id, 'reject')}
                          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', padding: '0.375rem 0.75rem', backgroundColor: '#FEF2F2', color: '#991B1B', border: '1px solid #FECACA', fontSize: '0.8125rem', fontWeight: 600, cursor: 'pointer' }}>
                          <XCircle size={13} /> Tolak
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
