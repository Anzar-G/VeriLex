'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Sidebar from '@/components/layout/Sidebar';
import { Crown, Users, TrendingUp, AlertTriangle, ArrowRight } from 'lucide-react';
import { useVeriLexStore, hasMinRole } from '@/lib/useStore';
import { apiFetch } from '@/lib/api-fetch';

type Stats = { total_maxims?: number; pending_proposals?: number; active_editors?: number };

export default function SeniorEditorWorkspacePage() {
  const { authUser } = useVeriLexStore();
  const [stats, setStats] = useState<Stats>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authUser) return;
    apiFetch('/api/admin/stats')
      .then(r => r.json())
      .then(d => { setStats(d ?? {}); setLoading(false); })
      .catch(() => setLoading(false));
  }, [authUser]);

  if (!authUser || !hasMinRole(authUser.role, 'senior_editor')) {
    return (
      <>
        <Header />
        <main style={{ padding: '3rem 2rem', textAlign: 'center' }}>
          <p>Halaman ini hanya untuk <strong>Senior Editor</strong> dan di atasnya.</p>
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

            <div className="page-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ width: '40px', height: '40px', backgroundColor: '#FFFBEB', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Crown size={20} color="#D97706" />
                </div>
                <div>
                  <h1 style={{ margin: 0 }}>Workspace Senior Editor</h1>
                  <p style={{ margin: 0 }}>Pantau kualitas konten, eskalasi moderasi, dan performa tim editorial.</p>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
              {loading ? (
                <div className="skeleton" style={{ height: '100px', gridColumn: '1/-1' }} />
              ) : [
                { label: 'Total Maksim Aktif', count: stats.total_maxims ?? '—', icon: <TrendingUp size={20} color="#2563EB" /> },
                { label: 'Usulan Pending', count: stats.pending_proposals ?? '—', icon: <AlertTriangle size={20} color="#D97706" /> },
                { label: 'Editor Aktif', count: stats.active_editors ?? '—', icon: <Users size={20} color="#059669" /> },
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

            {/* Quick Actions */}
            <div className="wiki-card" style={{ marginBottom: '1.5rem' }}>
              <h2 className="wiki-card-header">Akses Cepat Pengelolaan</h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                {[
                  { label: 'Antrian Review Editor', href: '/workspace/editor', color: '#059669', bg: '#ECFDF5', border: '#DCFCE7' },
                  { label: 'Panel Admin Utama', href: '/admin', color: '#DC2626', bg: '#FEF2F2', border: '#FEE2E2' },
                  { label: 'Dashboard Reviewer', href: '/reviewer', color: '#D97706', bg: '#FFFBEB', border: '#FEF3C7' },
                  { label: 'Jelajahi Maksim', href: '/cari', color: '#2563EB', bg: '#EFF6FF', border: '#DBEAFE' },
                ].map(action => (
                  <Link key={action.href} href={action.href}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', padding: '0.625rem 1.125rem', borderRadius: '8px', border: `1px solid ${action.border}`, color: action.color, fontWeight: 600, fontSize: '0.84375rem', textDecoration: 'none', backgroundColor: action.bg }}>
                    {action.label} <ArrowRight size={14} />
                  </Link>
                ))}
              </div>
            </div>

            {/* Notice */}
            <div className="notice-warning">
              <p style={{ margin: 0, fontSize: '0.875rem' }}>
                <strong>Catatan Senior Editor:</strong> Anda memiliki wewenang mengendalikan penetapan prioritas konten dan eskalasi moderasi.
                Gunakan <Link href="/admin" style={{ color: '#92400E', fontWeight: 700, textDecoration: 'underline' }}>Panel Admin Utama</Link> untuk manajemen akun pengguna secara menyeluruh.
              </p>
            </div>

          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}
