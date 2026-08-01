'use client';
import { useEffect, useState } from 'react';
import { UserRound, ShieldCheck, Send } from 'lucide-react';
import { useVeriLexStore, ROLE_LABELS, type UserRole } from '@/lib/useStore';
import { supabase } from '@/lib/supabase';
import { apiFetch } from '@/lib/api-fetch';

const roles: { value: UserRole; label: string }[] = [
  { value: 'contributor', label: 'Contributor' }, { value: 'editor', label: 'Editor' }, { value: 'reviewer', label: 'Reviewer' }, { value: 'senior_editor', label: 'Senior Editor' }, { value: 'subject_expert', label: 'Subject Expert' },
];

export default function ProfileClient() {
  const { authUser, setAuthUser } = useVeriLexStore();
  const [displayName, setDisplayName] = useState(''); const [requestedRole, setRequestedRole] = useState<UserRole>('contributor');
  const [motivation, setMotivation] = useState(''); const [requests, setRequests] = useState<{ id: string; requested_role: string; status: string; created_at: string }[]>([]); const [message, setMessage] = useState('');
  useEffect(() => { if (authUser) { queueMicrotask(() => setDisplayName(authUser.displayName)); void apiFetch('/api/role-requests').then(r => r.json()).then(d => setRequests(d.data ?? [])); } }, [authUser]);
  if (!authUser) return <main className="account-page"><p>Silakan masuk untuk melihat profil Anda.</p></main>;
  const user = authUser;
  async function saveProfile(e: React.FormEvent) { e.preventDefault(); const { error } = await supabase.from('profiles').update({ display_name: displayName, updated_at: new Date().toISOString() }).eq('id', user.id); if (!error) { setAuthUser({ ...user, displayName }); setMessage('Profil berhasil diperbarui.'); } }
  async function applyRole(e: React.FormEvent) { e.preventDefault(); const res = await apiFetch('/api/role-requests', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ requested_role: requestedRole, motivation }) }); const data = await res.json(); setMessage(res.ok ? 'Pengajuan role berhasil dikirim.' : data.error ?? 'Pengajuan gagal.'); if (res.ok) { setMotivation(''); const r = await apiFetch('/api/role-requests'); setRequests((await r.json()).data ?? []); } }
  return <main className="account-page"><div className="account-heading"><UserRound /><div><h1>Profil Saya</h1><p>@{authUser.username} · {ROLE_LABELS[authUser.role]}</p></div></div>{message && <p className="account-message">{message}</p>}<div className="account-grid"><form onSubmit={saveProfile} className="account-card"><h2>Informasi profil</h2><label>Nama tampilan<input value={displayName} onChange={e => setDisplayName(e.target.value)} required /></label><label>Email<input value={authUser.email} disabled /></label><button className="btn-primary">Simpan profil</button></form><form onSubmit={applyRole} className="account-card"><h2><ShieldCheck size={18} /> Ajukan role</h2><p>Pengajuan akan ditinjau administrator sebelum kewenangan diberikan.</p><label>Role yang diajukan<select value={requestedRole} onChange={e => setRequestedRole(e.target.value as UserRole)}>{roles.map(role => <option key={role.value} value={role.value}>{role.label}</option>)}</select></label><label>Motivasi (minimal 30 karakter)<textarea value={motivation} onChange={e => setMotivation(e.target.value)} minLength={30} required /></label><button className="btn-primary"><Send size={15} /> Kirim pengajuan</button></form></div><section className="account-card"><h2>Riwayat pengajuan role</h2>{requests.length ? <ul className="account-list">{requests.map(request => <li key={request.id}><strong>{request.requested_role}</strong><span>{request.status} · {new Date(request.created_at).toLocaleDateString('id-ID')}</span></li>)}</ul> : <p>Belum ada pengajuan role.</p>}</section></main>;
}
