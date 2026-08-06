'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { UserRound, ShieldCheck, Send, Award, FileEdit, Star, Calendar, Clock } from 'lucide-react';
import { useVeriLexStore, ROLE_LABELS, ROLE_COLORS, type UserRole } from '@/lib/useStore';
import { supabase } from '@/lib/supabase';
import { apiFetch } from '@/lib/api-fetch';

const roles: { value: UserRole; label: string }[] = [
  { value: 'contributor', label: 'Kontributor' },
  { value: 'editor', label: 'Editor' },
  { value: 'reviewer', label: 'Pengulas' },
  { value: 'senior_editor', label: 'Senior Editor' },
  { value: 'subject_expert', label: 'Pakar Bidang' },
];

type RoleRequest = { id: string; requested_role: string; status: string; created_at: string };
type ContribData = {
  proposals: { id: string }[];
  revisions: { id: string }[];
  reports: { id: string }[];
  reputation: { score: number } | null;
};

export default function ProfileClient() {
  const { authUser, setAuthUser, favorites } = useVeriLexStore();
  const [displayName, setDisplayName] = useState('');
  const [requestedRole, setRequestedRole] = useState<UserRole>('contributor');
  const [motivation, setMotivation] = useState('');
  const [requests, setRequests] = useState<RoleRequest[]>([]);
  const [contribData, setContribData] = useState<ContribData | null>(null);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const [saveLoading, setSaveLoading] = useState(false);
  const [applyLoading, setApplyLoading] = useState(false);

  useEffect(() => {
    if (!authUser) return;
    setDisplayName(authUser.displayName);
    void apiFetch('/api/role-requests').then(r => r.json()).then(d => setRequests(d.data ?? []));
    void apiFetch('/api/me/contributions').then(r => r.json()).then(setContribData);
  }, [authUser]);

  if (!authUser) {
    return (
      <main className="account-page">
        <p>Silakan <Link href="/masuk" style={{ color: '#0645AD' }}>masuk</Link> untuk melihat profil Anda.</p>
      </main>
    );
  }

  const roleColor = ROLE_COLORS[authUser.role] ?? ROLE_COLORS.reader;
  const roleLabel = ROLE_LABELS[authUser.role] ?? 'Pembaca';

  const joinDate = authUser.id ? new Date(parseInt(authUser.id.split('-')[0], 16) * 1000) : null;

  async function saveProfile(e: React.FormEvent) {
    e.preventDefault();
    setSaveLoading(true);
    const { error } = await supabase
      .from('profiles')
      .update({ display_name: displayName, updated_at: new Date().toISOString() })
      .eq('id', authUser!.id);
    setSaveLoading(false);
    if (!error) {
      setAuthUser({ ...authUser!, displayName });
      setMessage({ text: 'Profil berhasil diperbarui.', type: 'success' });
    } else {
      setMessage({ text: 'Gagal menyimpan profil.', type: 'error' });
    }
    setTimeout(() => setMessage(null), 4000);
  }

  async function applyRole(e: React.FormEvent) {
    e.preventDefault();
    setApplyLoading(true);
    const res = await apiFetch('/api/role-requests', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ requested_role: requestedRole, motivation }),
    });
    const data = await res.json();
    setApplyLoading(false);
    setMessage({
      text: res.ok ? 'Pengajuan role berhasil dikirim.' : (data.error ?? 'Pengajuan gagal.'),
      type: res.ok ? 'success' : 'error',
    });
    if (res.ok) {
      setMotivation('');
      const r = await apiFetch('/api/role-requests');
      setRequests((await r.json()).data ?? []);
    }
    setTimeout(() => setMessage(null), 4000);
  }

  const STATUS_STYLE: Record<string, { bg: string; color: string }> = {
    pending:  { bg: '#FFFBEB', color: '#92400E' },
    approved: { bg: '#F0FDF4', color: '#166534' },
    rejected: { bg: '#FEF2F2', color: '#991B1B' },
  };

  return (
    <main className="account-page">

      {/* Profile Hero */}
      <div style={{ backgroundColor: '#0F1B3C', borderRadius: '4px', padding: '1.75rem 2rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
        <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <UserRound size={28} color="#FFFFFF" />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <h1 style={{ margin: '0 0 0.25rem', border: 'none', padding: 0, color: '#FFFFFF', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.375rem' }}>
            {authUser.displayName}
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.8125rem', color: '#A0AEC0' }}>@{authUser.username}</span>
            <span style={{ padding: '0.1rem 0.5rem', backgroundColor: roleColor.bg, color: roleColor.text, border: `1px solid ${roleColor.border}`, fontSize: '0.7rem', fontWeight: 700, borderRadius: '2px' }}>
              {roleLabel}
            </span>
          </div>
        </div>
        {/* Quick stats in hero */}
        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
          {[
            { icon: <FileEdit size={14} />, value: (contribData?.proposals.length ?? 0) + (contribData?.revisions.length ?? 0), label: 'Kontribusi' },
            { icon: <Star size={14} />, value: favorites.length, label: 'Favorit' },
            { icon: <Award size={14} />, value: contribData?.reputation?.score ?? 0, label: 'Reputasi' },
          ].map(stat => (
            <div key={stat.label} style={{ textAlign: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#FFFFFF', justifyContent: 'center', marginBottom: '0.125rem' }}>
                {stat.icon}
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.125rem' }}>{stat.value}</span>
              </div>
              <span style={{ fontSize: '0.7rem', color: '#A0AEC0', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Message */}
      {message && (
        <div style={{ padding: '0.75rem 1rem', marginBottom: '1rem', backgroundColor: message.type === 'success' ? '#F0FDF4' : '#FEF2F2', border: `1px solid ${message.type === 'success' ? '#86EFAC' : '#FECACA'}`, color: message.type === 'success' ? '#166534' : '#991B1B', fontSize: '0.875rem' }}>
          {message.text}
        </div>
      )}

      {/* Info row */}
      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.8125rem', color: '#54595D' }}>
          <Calendar size={13} /> Email: <strong style={{ color: '#202122' }}>{authUser.email}</strong>
        </div>
        {contribData && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.8125rem', color: '#54595D' }}>
            <Clock size={13} /> Laporan: <strong style={{ color: '#202122' }}>{contribData.reports.length}</strong>
          </div>
        )}
        <Link href="/kontribusi" style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.8125rem', color: '#0645AD', fontWeight: 600 }}>
          <FileEdit size={13} /> Lihat semua kontribusi →
        </Link>
      </div>

      {/* Main grid */}
      <div className="account-grid">
        {/* Edit profile */}
        <form onSubmit={saveProfile} className="account-card">
          <h2><UserRound size={18} /> Informasi Profil</h2>
          <label>
            Nama tampilan
            <input
              value={displayName}
              onChange={e => setDisplayName(e.target.value)}
              required
              style={{ display: 'block', width: '100%', marginTop: '0.35rem', padding: '0.65rem 0.75rem', border: '1px solid #A2A9B1', background: '#fff', fontFamily: 'var(--font-body)' }}
            />
          </label>
          <label>
            Email (tidak dapat diubah)
            <input
              value={authUser.email}
              disabled
              style={{ display: 'block', width: '100%', marginTop: '0.35rem', padding: '0.65rem 0.75rem', border: '1px solid #EAECF0', background: '#F8F9FA', color: '#72777D', fontFamily: 'var(--font-body)' }}
            />
          </label>
          <label>
            Username
            <input
              value={`@${authUser.username}`}
              disabled
              style={{ display: 'block', width: '100%', marginTop: '0.35rem', padding: '0.65rem 0.75rem', border: '1px solid #EAECF0', background: '#F8F9FA', color: '#72777D', fontFamily: 'var(--font-body)' }}
            />
          </label>
          <button className="btn-primary" disabled={saveLoading} style={{ marginTop: '0.5rem' }}>
            {saveLoading ? 'Menyimpan…' : 'Simpan profil'}
          </button>
        </form>

        {/* Role request */}
        <form onSubmit={applyRole} className="account-card">
          <h2><ShieldCheck size={18} /> Ajukan Role</h2>
          <p style={{ fontSize: '0.8125rem', color: '#54595D', marginTop: 0 }}>
            Pengajuan akan ditinjau administrator. Role saat ini:{' '}
            <strong style={{ color: roleColor.text }}>{roleLabel}</strong>
          </p>
          <label>
            Role yang diajukan
            <select
              value={requestedRole}
              onChange={e => setRequestedRole(e.target.value as UserRole)}
              style={{ display: 'block', width: '100%', marginTop: '0.35rem', padding: '0.65rem 0.75rem', border: '1px solid #A2A9B1', background: '#fff', fontFamily: 'var(--font-body)' }}
            >
              {roles.map(role => <option key={role.value} value={role.value}>{role.label}</option>)}
            </select>
          </label>
          <label>
            Motivasi <span style={{ fontWeight: 400, color: '#72777D' }}>(min. 30 karakter)</span>
            <textarea
              value={motivation}
              onChange={e => setMotivation(e.target.value)}
              minLength={30}
              required
              placeholder="Jelaskan mengapa Anda mengajukan role ini dan apa keahlian relevan Anda…"
              style={{ display: 'block', width: '100%', marginTop: '0.35rem', padding: '0.65rem 0.75rem', border: '1px solid #A2A9B1', background: '#fff', minHeight: '100px', resize: 'vertical', fontFamily: 'var(--font-body)', fontSize: '0.875rem' }}
            />
          </label>
          <button className="btn-primary" disabled={applyLoading} style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', marginTop: '0.5rem' }}>
            <Send size={14} /> {applyLoading ? 'Mengirim…' : 'Kirim pengajuan'}
          </button>
        </form>
      </div>

      {/* Role request history */}
      {requests.length > 0 && (
        <section className="account-card">
          <h2><Clock size={18} /> Riwayat Pengajuan Role</h2>
          <ul className="account-list">
            {requests.map(request => {
              const s = STATUS_STYLE[request.status] ?? STATUS_STYLE.pending;
              return (
                <li key={request.id}>
                  <div>
                    <strong>{ROLE_LABELS[request.requested_role as UserRole] ?? request.requested_role}</strong>
                    <span style={{ display: 'block', fontSize: '0.75rem', color: '#72777D' }}>
                      {new Date(request.created_at).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })}
                    </span>
                  </div>
                  <span style={{ padding: '0.125rem 0.5rem', backgroundColor: s.bg, color: s.color, fontSize: '0.75rem', fontWeight: 600 }}>
                    {request.status}
                  </span>
                </li>
              );
            })}
          </ul>
        </section>
      )}

    </main>
  );
}
