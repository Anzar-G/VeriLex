'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FileEdit, Flag, Award, Clock, CheckCircle, XCircle, Filter } from 'lucide-react';
import { useVeriLexStore } from '@/lib/useStore';
import { apiFetch } from '@/lib/api-fetch';

type Proposal = { id: string; maxim_id: string; status: string; change_summary: string; created_at: string };
type Revision  = { id: string; maxim_id: string; edit_reason: string; created_at: string };
type Report    = { id: string; maxim_id: string; category: string; status: string; created_at: string };
type Data = { proposals: Proposal[]; revisions: Revision[]; reports: Report[]; reputation: { score: number } | null };

type ItemType = 'Usulan' | 'Suntingan' | 'Laporan';

const STATUS_STYLE: Record<string, { bg: string; color: string; icon: React.ReactNode }> = {
  pending:   { bg: '#FFFBEB', color: '#92400E', icon: <Clock size={11} /> },
  approved:  { bg: '#F0FDF4', color: '#166534', icon: <CheckCircle size={11} /> },
  rejected:  { bg: '#FEF2F2', color: '#991B1B', icon: <XCircle size={11} /> },
  tersimpan: { bg: '#EFF6FF', color: '#1E40AF', icon: <CheckCircle size={11} /> },
  open:      { bg: '#FFFBEB', color: '#92400E', icon: <Clock size={11} /> },
};

const TYPE_COLORS: Record<ItemType, { bg: string; color: string; border: string }> = {
  Usulan:    { bg: '#EFF6FF', color: '#1E40AF', border: '#BFDBFE' },
  Suntingan: { bg: '#ECFDF5', color: '#065F46', border: '#A7F3D0' },
  Laporan:   { bg: '#FEF3C7', color: '#92400E', border: '#FDE68A' },
};

export default function ContributionsClient() {
  const { authUser } = useVeriLexStore();
  const [data, setData] = useState<Data | null>(null);
  const [filter, setFilter] = useState<ItemType | 'Semua'>('Semua');

  useEffect(() => {
    if (authUser) void apiFetch('/api/me/contributions').then(r => r.json()).then(setData);
  }, [authUser]);

  if (!authUser) {
    return (
      <main className="account-page">
        <p>Silakan <Link href="/masuk" style={{ color: '#0645AD' }}>masuk</Link> untuk melihat kontribusi Anda.</p>
      </main>
    );
  }

  if (!data) {
    return (
      <main className="account-page">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#72777D' }}>
          <Clock size={16} /> <span>Memuat kontribusi…</span>
        </div>
      </main>
    );
  }

  const allItems = [
    ...data.proposals.map(x => ({ ...x, type: 'Usulan' as ItemType, summary: x.change_summary })),
    ...data.revisions.map(x => ({ ...x, type: 'Suntingan' as ItemType, summary: x.edit_reason, status: 'tersimpan' })),
    ...data.reports.map(x => ({ ...x, type: 'Laporan' as ItemType, summary: x.category })),
  ].sort((a, b) => +new Date(b.created_at) - +new Date(a.created_at));

  const filtered = filter === 'Semua' ? allItems : allItems.filter(i => i.type === filter);

  return (
    <main className="account-page">

      {/* Heading */}
      <div className="account-heading">
        <FileEdit size={24} />
        <div>
          <h1>Kontribusi Saya</h1>
          <p>Riwayat usulan, suntingan, dan laporan Anda di VeriLex.</p>
        </div>
      </div>

      {/* Stats */}
      <div className="dashboard-stat-grid contribution-stats" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '0.75rem', marginBottom: '1.5rem' }}>
        {[
          {
            icon: <FileEdit size={20} color="#1E40AF" />,
            value: data.proposals.length + data.revisions.length,
            label: 'Kontribusi Editorial',
            bg: '#EFF6FF', color: '#1E40AF',
          },
          {
            icon: <Flag size={20} color="#92400E" />,
            value: data.reports.length,
            label: 'Laporan Terkirim',
            bg: '#FFFBEB', color: '#92400E',
          },
          {
            icon: <Award size={20} color="#6B21A8" />,
            value: data.reputation?.score ?? 0,
            label: 'Poin Reputasi',
            bg: '#FDF4FF', color: '#6B21A8',
          },
          {
            icon: <CheckCircle size={20} color="#065F46" />,
            value: data.proposals.filter(p => p.status === 'approved').length,
            label: 'Disetujui',
            bg: '#ECFDF5', color: '#065F46',
          },
        ].map(stat => (
          <div key={stat.label} style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', backgroundColor: stat.bg, border: `1px solid ${stat.color}20`, padding: '1rem' }}>
            {stat.icon}
            <strong style={{ fontSize: '1.5rem', color: stat.color, fontFamily: 'var(--font-display)', marginTop: '0.25rem' }}>{stat.value}</strong>
            <span style={{ color: stat.color, fontSize: '0.8rem', fontWeight: 600 }}>{stat.label}</span>
          </div>
        ))}
      </div>

      {/* Filter */}
      <section className="account-card">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <h2 style={{ margin: 0 }}><Clock size={18} /> Aktivitas Terbaru</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.8125rem', color: '#54595D' }}>
            <Filter size={13} />
            {(['Semua', 'Usulan', 'Suntingan', 'Laporan'] as const).map(f => (
              <button key={f} onClick={() => setFilter(f)}
                style={{ padding: '0.25rem 0.625rem', border: '1px solid', fontSize: '0.75rem', cursor: 'pointer', fontFamily: 'var(--font-body)', fontWeight: filter === f ? 700 : 400, backgroundColor: filter === f ? '#0F1B3C' : '#FFFFFF', color: filter === f ? '#FFFFFF' : '#202122', borderColor: filter === f ? '#0F1B3C' : '#A2A9B1' }}>
                {f}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <p style={{ color: '#72777D', fontSize: '0.875rem', textAlign: 'center', padding: '1.5rem' }}>
            Belum ada aktivitas yang tercatat.
          </p>
        ) : (
          <ul className="account-list">
            {filtered.map(item => {
              const s = STATUS_STYLE[item.status] ?? STATUS_STYLE.pending;
              const t = TYPE_COLORS[item.type];
              return (
                <li key={`${item.type}-${item.id}`} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', padding: '0.875rem 0', borderBottom: '1px solid #EAECF0' }}>
                  <span style={{ padding: '0.125rem 0.5rem', backgroundColor: t.bg, color: t.color, border: `1px solid ${t.border}`, fontSize: '0.7rem', fontWeight: 700, flexShrink: 0, marginTop: '2px' }}>
                    {item.type}
                  </span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontWeight: 600, fontSize: '0.875rem', color: '#202122', margin: '0 0 0.25rem', lineHeight: 1.4 }}>
                      {item.summary || 'Tanpa ringkasan'}
                    </p>
                    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
                      <Link href={`/maksim/${item.maxim_id}`} style={{ fontSize: '0.75rem', color: '#0645AD' }}>
                        Lihat artikel →
                      </Link>
                      <span style={{ fontSize: '0.75rem', color: '#A2A9B1' }}>
                        {new Date(item.created_at).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })}
                      </span>
                    </div>
                  </div>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', padding: '0.125rem 0.5rem', backgroundColor: s.bg, color: s.color, fontSize: '0.7rem', fontWeight: 700, flexShrink: 0, marginTop: '2px' }}>
                    {s.icon} {item.status}
                  </span>
                </li>
              );
            })}
          </ul>
        )}
      </section>

    </main>
  );
}
