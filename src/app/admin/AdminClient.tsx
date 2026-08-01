'use client';

import { useState, useEffect, useCallback } from 'react';
import { Users, Flag, Activity, Search, ChevronLeft, ChevronRight, Lock, Shield, X, Plus, Ban, CheckCircle, AlertTriangle } from 'lucide-react';
import { useVeriLexStore, hasMinRole, ROLE_LABELS, ROLE_COLORS, type UserRole } from '@/lib/useStore';
import { apiFetch } from '@/lib/api-fetch';
import Link from 'next/link';

// ── Types ─────────────────────────────────────────────────────────────────
interface AdminUser {
  id: string;
  username: string;
  display_name: string;
  created_at: string;
  roles: string[];
  activeBan: { ban_type: string; expires_at: string | null } | null;
}

interface Report {
  id: string;
  maxim_id: string;
  reporter_name: string;
  category: string;
  description: string;
  status: string;
  created_at: string;
}

interface ActivityLog {
  id: string;
  user_name: string;
  action: string;
  target_type: string;
  target_id: string;
  details: Record<string, unknown>;
  created_at: string;
}

const CATEGORY_LABELS: Record<string, string> = {
  hoaks: 'Hoaks', referensi_salah: 'Referensi Salah',
  salah_kutip_pasal: 'Salah Kutip Pasal', latin_salah: 'Latin Salah',
  terjemahan_salah: 'Terjemahan Salah', vandalisme: 'Vandalisme',
  plagiarisme: 'Plagiarisme', spam: 'Spam', lainnya: 'Lainnya',
};

const ALL_ROLES: UserRole[] = ['reader','contributor','editor','reviewer','senior_editor','subject_expert','administrator'];

type TabType = 'users' | 'reports' | 'logs';

export default function AdminClient() {
  const { authUser } = useVeriLexStore();
  const isAdmin = authUser ? hasMinRole(authUser.role, 'administrator') : false;

  const [activeTab,   setActiveTab]   = useState<TabType>('users');
  const [users,       setUsers]       = useState<AdminUser[]>([]);
  const [reports,     setReports]     = useState<Report[]>([]);
  const [logs,        setLogs]        = useState<ActivityLog[]>([]);
  const [totalUsers,  setTotalUsers]  = useState(0);
  const [userPage,    setUserPage]    = useState(1);
  const [searchQ,     setSearchQ]     = useState('');
  const [loading,     setLoading]     = useState(false);
  const [reportStatus, setReportStatus] = useState('menunggu');

  // ── Role modal state ─────────────────────────────────────────────────────
  const [roleModalUser, setRoleModalUser] = useState<AdminUser | null>(null);
  const [addingRole,    setAddingRole]    = useState('');
  const [processing,    setProcessing]    = useState(false);

  // ── Ban modal state ──────────────────────────────────────────────────────
  const [banModalUser,  setBanModalUser]  = useState<AdminUser | null>(null);
  const [banType,       setBanType]       = useState<'warning'|'temporary'|'permanent'>('warning');
  const [banReason,     setBanReason]     = useState('');
  const [banDays,       setBanDays]       = useState(7);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    const res = await apiFetch(`/api/admin/users?page=${userPage}&q=${encodeURIComponent(searchQ)}`);
    const data = await res.json();
    setUsers(data.users ?? []);
    setTotalUsers(data.total ?? 0);
    setLoading(false);
  }, [userPage, searchQ]);

  const fetchReports = useCallback(async () => {
    setLoading(true);
    const res = await apiFetch(`/api/reports?status=${reportStatus}`);
    setReports(await res.json());
    setLoading(false);
  }, [reportStatus]);

  const fetchLogs = useCallback(async () => {
    setLoading(true);
    const res = await apiFetch('/api/admin/logs');
    const data = await res.json();
    setLogs(data.logs ?? []);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!isAdmin) return;
    queueMicrotask(() => {
      if (activeTab === 'users') void fetchUsers();
      if (activeTab === 'reports') void fetchReports();
      if (activeTab === 'logs') void fetchLogs();
    });
  }, [activeTab, isAdmin, fetchUsers, fetchReports, fetchLogs]);

  async function assignRole(userId: string, role: string) {
    setProcessing(true);
    await apiFetch(`/api/admin/users/${userId}/role`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role }),
    });
    await fetchUsers();
    setProcessing(false);
  }

  async function revokeRole(userId: string, role: string) {
    if (!confirm(`Cabut role "${ROLE_LABELS[role as UserRole]}" dari user ini?`)) return;
    setProcessing(true);
    await apiFetch(`/api/admin/users/${userId}/role?role=${role}`, { method: 'DELETE' });
    await fetchUsers();
    setProcessing(false);
  }

  async function issueBan() {
    if (!banModalUser || !banReason.trim()) return;
    setProcessing(true);
    await apiFetch(`/api/admin/users/${banModalUser.id}/ban`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ban_type: banType, reason: banReason,
        issued_by: authUser?.id, issued_by_name: authUser?.displayName,
        duration_days: banType === 'temporary' ? banDays : undefined,
      }),
    });
    setBanModalUser(null); setBanReason(''); setBanType('warning');
    await fetchUsers();
    setProcessing(false);
  }

  async function liftBan(userId: string) {
    if (!confirm('Cabut ban user ini?')) return;
    await apiFetch(`/api/admin/users/${userId}/ban`, { method: 'DELETE' });
    await fetchUsers();
  }

  async function handleReport(id: string, status: string) {
    await apiFetch(`/api/reports/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status, handler_id: authUser?.id }),
    });
    await fetchReports();
  }

  // ── Access guard ─────────────────────────────────────────────────────────
  if (!authUser) {
    return (
      <div style={{ minHeight: 'calc(100vh - 92px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <Lock size={40} style={{ color: '#A2A9B1', marginBottom: '1rem' }} />
          <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.125rem', color: 'var(--navy)', marginBottom: '1rem' }}>Masuk terlebih dahulu</p>
          <Link href="/masuk" className="btn-primary">Masuk</Link>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div style={{ minHeight: 'calc(100vh - 92px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <Shield size={40} style={{ color: '#A2A9B1', marginBottom: '1rem' }} />
          <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.125rem', color: 'var(--navy)', marginBottom: '0.5rem' }}>Akses Terbatas</p>
          <p style={{ fontSize: '0.875rem', color: '#54595D' }}>Halaman ini hanya untuk Administrator.</p>
        </div>
      </div>
    );
  }

  const totalPages = Math.ceil(totalUsers / 20);

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '1.5rem 1rem' }}>

      {/* Header */}
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 400, color: '#000', margin: '0 0 0.25rem', border: 'none', padding: 0 }}>
          Admin Panel
        </h1>
        <p style={{ fontSize: '0.8125rem', color: '#54595D', margin: 0 }}>
          Selamat datang, <strong>{authUser.displayName}</strong> · Administrator VeriLex
        </p>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', borderBottom: '1px solid #A2A9B1', marginBottom: '1.25rem' }}>
        {([
          { id: 'users',   label: 'Kelola Pengguna', icon: Users },
          { id: 'reports', label: 'Laporan',          icon: Flag },
          { id: 'logs',    label: 'Log Aktivitas',    icon: Activity },
        ] as { id: TabType; label: string; icon: React.ElementType }[]).map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            style={{
              display: 'flex', alignItems: 'center', gap: '0.375rem',
              padding: '0.5rem 1rem', border: '1px solid', marginBottom: '-1px',
              borderColor: activeTab === tab.id ? '#A2A9B1' : 'transparent',
              borderBottom: activeTab === tab.id ? '1px solid #FFFFFF' : '1px solid transparent',
              backgroundColor: activeTab === tab.id ? '#FFFFFF' : 'transparent',
              cursor: 'pointer', fontSize: '0.8125rem', fontFamily: 'var(--font-body)',
              color: activeTab === tab.id ? '#202122' : '#0645AD',
              fontWeight: activeTab === tab.id ? 700 : 400,
            }}
          >
            <tab.icon size={14} /> {tab.label}
          </button>
        ))}
      </div>

      {/* ══ TAB: USERS ══ */}
      {activeTab === 'users' && (
        <div>
          {/* Search */}
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
            <div style={{ position: 'relative', flex: 1, maxWidth: '400px' }}>
              <Search size={14} style={{ position: 'absolute', left: '0.625rem', top: '50%', transform: 'translateY(-50%)', color: '#72777D', pointerEvents: 'none' }} />
              <input type="search" value={searchQ} onChange={e => setSearchQ(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && fetchUsers()}
                placeholder="Cari username atau nama..." className="input-text"
                style={{ paddingLeft: '2.25rem' }} />
            </div>
            <button onClick={fetchUsers} className="btn-secondary" style={{ padding: '0.375rem 0.875rem', fontSize: '0.8125rem' }}>Cari</button>
          </div>

          <p style={{ fontSize: '0.75rem', color: '#72777D', marginBottom: '0.75rem' }}>
            {totalUsers} pengguna terdaftar
          </p>

          {loading ? (
            <p style={{ color: '#72777D', fontSize: '0.875rem', textAlign: 'center', padding: '2rem' }}>Memuat...</p>
          ) : (
            <>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                {/* Header row */}
                <div className="admin-user-row admin-user-heading" style={{ display: 'grid', gridTemplateColumns: '2fr 1.5fr 1fr auto', gap: '0.5rem', padding: '0.5rem 0.875rem', backgroundColor: '#F8F9FA', border: '1px solid #EAECF0', fontSize: '0.6875rem', fontWeight: 700, color: '#54595D', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  <span>Pengguna</span><span>Role</span><span>Status</span><span>Aksi</span>
                </div>
                {users.map(user => {
                  const highestRole = user.roles.sort((a, b) => {
                    const order = ['administrator','senior_editor','subject_expert','editor','reviewer','contributor','reader'];
                    return order.indexOf(a) - order.indexOf(b);
                  })[0] as UserRole;
                  const rc = ROLE_COLORS[highestRole] ?? ROLE_COLORS.reader;
                  return (
                    <div key={user.id} className="admin-user-row" style={{ display: 'grid', gridTemplateColumns: '2fr 1.5fr 1fr auto', gap: '0.5rem', padding: '0.625rem 0.875rem', border: '1px solid #EAECF0', borderTop: 'none', alignItems: 'center', backgroundColor: user.activeBan ? '#FFF8F0' : '#FFFFFF' }}>
                      {/* User info */}
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '0.875rem', color: '#202122' }}>{user.display_name || user.username}</div>
                        <div style={{ fontSize: '0.75rem', color: '#72777D', fontFamily: 'var(--font-mono)' }}>@{user.username}</div>
                        <div style={{ fontSize: '0.6875rem', color: '#A2A9B1' }}>{new Date(user.created_at).toLocaleDateString('id-ID')}</div>
                      </div>
                      {/* Roles */}
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}>
                        {user.roles.map(r => {
                          const c = ROLE_COLORS[r as UserRole] ?? ROLE_COLORS.reader;
                          return (
                            <span key={r} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.2rem', fontSize: '0.625rem', fontWeight: 700, padding: '0.125rem 0.375rem', backgroundColor: c.bg, color: c.text, border: `1px solid ${c.border}`, cursor: 'pointer' }}
                              onClick={() => revokeRole(user.id, r)}
                              title="Klik untuk cabut role ini"
                            >
                              {ROLE_LABELS[r as UserRole] ?? r} <X size={9} />
                            </span>
                          );
                        })}
                      </div>
                      {/* Ban status */}
                      <div>
                        {user.activeBan ? (
                          <span style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#991B1B', backgroundColor: '#FEF2F2', border: '1px solid #FECACA', padding: '0.125rem 0.375rem' }}>
                            {user.activeBan.ban_type === 'warning' ? '⚠ Warning' : user.activeBan.ban_type === 'temporary' ? '⏳ Suspended' : '🚫 Banned'}
                          </span>
                        ) : (
                          <span style={{ fontSize: '0.6875rem', color: '#065F46' }}>✓ Aktif</span>
                        )}
                      </div>
                      {/* Actions */}
                      <div style={{ display: 'flex', gap: '0.25rem', flexShrink: 0 }}>
                        <button onClick={() => setRoleModalUser(user)} title="Kelola role"
                          style={{ padding: '0.25rem 0.5rem', border: '1px solid #BFDBFE', backgroundColor: '#EFF6FF', color: '#1E40AF', cursor: 'pointer', fontSize: '0.6875rem', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                          <Shield size={11} /> Role
                        </button>
                        {user.activeBan ? (
                          <button onClick={() => liftBan(user.id)} title="Cabut ban"
                            style={{ padding: '0.25rem 0.5rem', border: '1px solid #A7F3D0', backgroundColor: '#ECFDF5', color: '#065F46', cursor: 'pointer', fontSize: '0.6875rem', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                            <CheckCircle size={11} /> Cabut
                          </button>
                        ) : (
                          <button onClick={() => setBanModalUser(user)} title="Ban user"
                            style={{ padding: '0.25rem 0.5rem', border: '1px solid #FECACA', backgroundColor: '#FEF2F2', color: '#991B1B', cursor: 'pointer', fontSize: '0.6875rem', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                            <Ban size={11} /> Ban
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', marginTop: '1rem' }}>
                  <button onClick={() => setUserPage(p => Math.max(p - 1, 1))} disabled={userPage === 1}
                    style={{ padding: '0.375rem', border: '1px solid #A2A9B1', background: '#FFFFFF', cursor: 'pointer', color: userPage === 1 ? '#A2A9B1' : '#202122', display: 'flex', alignItems: 'center' }}>
                    <ChevronLeft size={14} />
                  </button>
                  <span style={{ fontSize: '0.8125rem', color: '#202122' }}>Hal {userPage} / {totalPages}</span>
                  <button onClick={() => setUserPage(p => Math.min(p + 1, totalPages))} disabled={userPage === totalPages}
                    style={{ padding: '0.375rem', border: '1px solid #A2A9B1', background: '#FFFFFF', cursor: 'pointer', color: userPage === totalPages ? '#A2A9B1' : '#202122', display: 'flex', alignItems: 'center' }}>
                    <ChevronRight size={14} />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      )}

      {/* ══ TAB: REPORTS ══ */}
      {activeTab === 'reports' && (
        <div>
          <div style={{ display: 'flex', gap: '0.375rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
            {['menunggu','ditinjau','diterima','ditolak'].map(s => (
              <button key={s} onClick={() => setReportStatus(s)}
                style={{ padding: '0.375rem 0.75rem', border: '1px solid', fontSize: '0.8125rem', cursor: 'pointer', fontFamily: 'var(--font-body)', borderColor: reportStatus === s ? '#0F1B3C' : '#A2A9B1', backgroundColor: reportStatus === s ? '#0F1B3C' : '#FFFFFF', color: reportStatus === s ? '#FFFFFF' : '#202122' }}>
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
          </div>
          {loading ? <p style={{ color: '#72777D', textAlign: 'center', padding: '2rem' }}>Memuat...</p> : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {reports.length === 0 ? (
                <p style={{ textAlign: 'center', color: '#72777D', padding: '3rem', backgroundColor: '#F8F9FA', border: '1px solid #EAECF0' }}>Tidak ada laporan</p>
              ) : reports.map(r => (
                <div key={r.id} style={{ border: '1px solid #EAECF0', padding: '0.875rem 1rem', backgroundColor: '#FFFFFF' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.75rem', flexWrap: 'wrap' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.375rem', flexWrap: 'wrap' }}>
                        <span style={{ fontSize: '0.6875rem', fontWeight: 700, padding: '0.125rem 0.375rem', backgroundColor: '#FEF2F2', color: '#991B1B', border: '1px solid #FECACA' }}>
                          {CATEGORY_LABELS[r.category] || r.category}
                        </span>
                        <Link href={`/maksim/${r.maxim_id}`} className="wiki-link" style={{ fontSize: '0.875rem', fontWeight: 700 }}>
                          {r.maxim_id.replace(/-/g, ' ')}
                        </Link>
                      </div>
                      <p style={{ fontSize: '0.875rem', color: '#202122', margin: '0 0 0.25rem' }}>{r.description}</p>
                      <p style={{ fontSize: '0.75rem', color: '#72777D', margin: 0 }}>
                        Dilaporkan oleh {r.reporter_name} · {new Date(r.created_at).toLocaleString('id-ID')}
                      </p>
                    </div>
                    {r.status === 'menunggu' || r.status === 'ditinjau' ? (
                      <div style={{ display: 'flex', gap: '0.375rem', flexShrink: 0 }}>
                        <button onClick={() => handleReport(r.id, 'ditinjau')} style={{ padding: '0.375rem 0.625rem', border: '1px solid #BFDBFE', backgroundColor: '#EFF6FF', color: '#1E40AF', cursor: 'pointer', fontSize: '0.75rem' }}>Tinjau</button>
                        <button onClick={() => handleReport(r.id, 'diterima')} style={{ padding: '0.375rem 0.625rem', border: '1px solid #A7F3D0', backgroundColor: '#ECFDF5', color: '#065F46', cursor: 'pointer', fontSize: '0.75rem' }}>Terima</button>
                        <button onClick={() => handleReport(r.id, 'ditolak')} style={{ padding: '0.375rem 0.625rem', border: '1px solid #FECACA', backgroundColor: '#FEF2F2', color: '#991B1B', cursor: 'pointer', fontSize: '0.75rem' }}>Tolak</button>
                      </div>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ══ TAB: LOGS ══ */}
      {activeTab === 'logs' && (
        <div>
          {loading ? <p style={{ color: '#72777D', textAlign: 'center', padding: '2rem' }}>Memuat...</p> : (
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>
              {logs.length === 0 ? (
                <p style={{ textAlign: 'center', color: '#72777D', padding: '2rem' }}>Belum ada log aktivitas</p>
              ) : logs.map(log => (
                <div key={log.id} className="admin-log-row" style={{ display: 'grid', gridTemplateColumns: '180px 120px 1fr', gap: '0.5rem', padding: '0.375rem 0.5rem', borderBottom: '1px solid #EAECF0', alignItems: 'baseline' }}>
                  <span style={{ color: '#72777D', fontSize: '0.6875rem' }}>
                    {new Date(log.created_at).toLocaleString('id-ID')}
                  </span>
                  <span style={{ color: '#0645AD', fontWeight: 700 }}>{log.user_name || 'Sistem'}</span>
                  <span style={{ color: '#202122' }}>
                    <strong style={{ color: '#AC6600' }}>{log.action}</strong>
                    {log.target_type && ` → ${log.target_type}`}
                    {log.target_id && ` #${log.target_id.slice(0, 8)}`}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ══ MODAL: Role Management ══ */}
      {roleModalUser && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200, padding: '1rem' }}>
          <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #A2A9B1', padding: '1.5rem', width: '100%', maxWidth: '420px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', margin: 0, border: 'none' }}>Kelola Role: {roleModalUser.display_name}</h3>
              <button onClick={() => setRoleModalUser(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#72777D' }}><X size={16} /></button>
            </div>

            {/* Current roles */}
            <p style={{ fontSize: '0.75rem', fontWeight: 700, color: '#54595D', marginBottom: '0.5rem' }}>Role saat ini:</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem', marginBottom: '1rem' }}>
              {roleModalUser.roles.map(r => {
                const c = ROLE_COLORS[r as UserRole] ?? ROLE_COLORS.reader;
                return (
                  <span key={r} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.75rem', fontWeight: 700, padding: '0.25rem 0.5rem', backgroundColor: c.bg, color: c.text, border: `1px solid ${c.border}`, cursor: 'pointer' }}
                    onClick={() => { revokeRole(roleModalUser.id, r); setRoleModalUser(prev => prev ? { ...prev, roles: prev.roles.filter(x => x !== r) } : null); }}
                    title="Klik untuk cabut"
                  >
                    {ROLE_LABELS[r as UserRole]} <X size={10} />
                  </span>
                );
              })}
            </div>

            {/* Add role */}
            <p style={{ fontSize: '0.75rem', fontWeight: 700, color: '#54595D', marginBottom: '0.5rem' }}>Tambah role:</p>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <select value={addingRole} onChange={e => setAddingRole(e.target.value)}
                style={{ flex: 1, border: '1px solid #A2A9B1', padding: '0.375rem 0.625rem', fontSize: '0.875rem', fontFamily: 'var(--font-body)', cursor: 'pointer', outline: 'none' }}>
                <option value="">— Pilih role —</option>
                {ALL_ROLES.filter(r => !roleModalUser.roles.includes(r)).map(r => (
                  <option key={r} value={r}>{ROLE_LABELS[r]}</option>
                ))}
              </select>
              <button disabled={!addingRole || processing} onClick={async () => {
                if (!addingRole) return;
                await assignRole(roleModalUser.id, addingRole);
                setRoleModalUser(prev => prev ? { ...prev, roles: [...prev.roles, addingRole] } : null);
                setAddingRole('');
              }} style={{ padding: '0.375rem 0.875rem', backgroundColor: '#0F1B3C', color: '#FFFFFF', border: 'none', cursor: 'pointer', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.25rem', opacity: !addingRole ? 0.5 : 1 }}>
                <Plus size={13} /> Tambah
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ══ MODAL: Ban ══ */}
      {banModalUser && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200, padding: '1rem' }}>
          <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #A2A9B1', padding: '1.5rem', width: '100%', maxWidth: '420px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', margin: 0, border: 'none' }}>Sanksi: {banModalUser.display_name}</h3>
              <button onClick={() => setBanModalUser(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#72777D' }}><X size={16} /></button>
            </div>

            <div style={{ padding: '0.625rem', backgroundColor: '#FFFBEB', border: '1px solid #FDE68A', marginBottom: '1rem', display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
              <AlertTriangle size={14} style={{ color: '#AC6600', flexShrink: 0, marginTop: '0.125rem' }} />
              <p style={{ fontSize: '0.75rem', color: '#92400E', margin: 0 }}>
                Gunakan sanksi secara proporsional. Warning → Temporary Ban → Permanent Ban.
              </p>
            </div>

            <div style={{ marginBottom: '0.75rem' }}>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#54595D', marginBottom: '0.25rem' }}>Jenis Sanksi</label>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {(['warning', 'temporary', 'permanent'] as const).map(bt => (
                  <button key={bt} onClick={() => setBanType(bt)}
                    style={{ flex: 1, padding: '0.375rem', border: '1px solid', borderColor: banType === bt ? '#0F1B3C' : '#A2A9B1', backgroundColor: banType === bt ? '#0F1B3C' : '#FFFFFF', color: banType === bt ? '#FFFFFF' : '#202122', cursor: 'pointer', fontSize: '0.75rem' }}>
                    {bt === 'warning' ? '⚠ Warning' : bt === 'temporary' ? '⏳ Sementara' : '🚫 Permanen'}
                  </button>
                ))}
              </div>
            </div>

            {banType === 'temporary' && (
              <div style={{ marginBottom: '0.75rem' }}>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#54595D', marginBottom: '0.25rem' }}>Durasi (hari)</label>
                <input type="number" value={banDays} onChange={e => setBanDays(parseInt(e.target.value))} min={1} max={365}
                  style={{ width: '100%', border: '1px solid #A2A9B1', padding: '0.375rem 0.625rem', fontSize: '0.875rem', outline: 'none' }} />
              </div>
            )}

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#54595D', marginBottom: '0.25rem' }}>Alasan Sanksi <span style={{ color: '#C85A54' }}>*</span></label>
              <textarea value={banReason} onChange={e => setBanReason(e.target.value)} rows={3}
                placeholder="Jelaskan alasan pemberian sanksi secara spesifik..."
                style={{ width: '100%', border: '1px solid #A2A9B1', padding: '0.375rem 0.625rem', fontSize: '0.875rem', fontFamily: 'var(--font-body)', resize: 'vertical', outline: 'none' }} />
            </div>

            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button onClick={issueBan} disabled={!banReason.trim() || processing}
                style={{ flex: 1, padding: '0.5rem', backgroundColor: '#991B1B', color: '#FFFFFF', border: 'none', cursor: 'pointer', fontSize: '0.875rem', fontWeight: 700, opacity: !banReason.trim() ? 0.5 : 1 }}>
                Terapkan Sanksi
              </button>
              <button onClick={() => setBanModalUser(null)} className="btn-secondary" style={{ padding: '0.5rem 1rem' }}>Batal</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
