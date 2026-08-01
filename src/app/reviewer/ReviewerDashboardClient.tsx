'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ClipboardList, CheckCircle, XCircle, Clock, Eye, RefreshCw, Lock } from 'lucide-react';
import { useVeriLexStore, hasMinRole, ROLE_LABELS, ROLE_COLORS } from '@/lib/useStore';
import { apiFetch } from '@/lib/api-fetch';

interface Proposal {
  id: string;
  maxim_id: string;
  status: 'pending' | 'under_review' | 'approved' | 'rejected';
  change_summary: string;
  edit_reason?: string;
  change_basis?: string;
  created_at: string;
  updated_at: string;
}

const STATUS_CONFIG = {
  pending:      { label: 'Menunggu',    color: '#92400E', bg: '#FFFBEB', border: '#FDE68A', icon: Clock },
  under_review: { label: 'Ditinjau',    color: '#1E40AF', bg: '#EFF6FF', border: '#BFDBFE', icon: Eye },
  approved:     { label: 'Diterima',    color: '#065F46', bg: '#ECFDF5', border: '#A7F3D0', icon: CheckCircle },
  rejected:     { label: 'Ditolak',     color: '#991B1B', bg: '#FEF2F2', border: '#FECACA', icon: XCircle },
};

const BASIS_LABELS: Record<string, string> = {
  uu: 'UU/Peraturan', putusan: 'Putusan', buku: 'Buku', jurnal: 'Jurnal', doktrin: 'Doktrin',
};

export default function ReviewerDashboardClient() {
  const { authUser } = useVeriLexStore();
  const [proposals,    setProposals]    = useState<Proposal[]>([]);
  const [loading,      setLoading]      = useState(true);
  const [activeStatus, setActiveStatus] = useState<'pending' | 'under_review' | 'approved' | 'rejected'>('pending');
  const [processing,   setProcessing]   = useState<string | null>(null);
  const [rejNotes,     setRejNotes]     = useState<Record<string, string>>({});

  const canReview = authUser ? hasMinRole(authUser.role, 'reviewer') : false;

  useEffect(() => {
    fetchProposals();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeStatus]);

  async function fetchProposals() {
    setLoading(true);
    try {
      const res = await apiFetch(`/api/proposals?status=${activeStatus}`);
      const data = await res.json();
      setProposals(data);
    } finally {
      setLoading(false);
    }
  }

  async function updateProposalStatus(id: string, status: 'approved' | 'rejected' | 'under_review', note?: string) {
    setProcessing(id);
    try {
      const res = await apiFetch(`/api/proposals/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status,
          reviewer_note: note,
          reviewer_id: authUser?.id,
        }),
      });
      if (res.ok) {
        setProposals(prev => prev.filter(p => p.id !== id));
      }
    } finally {
      setProcessing(null);
    }
  }

  if (!authUser) {
    return (
      <div style={{ minHeight: 'calc(100vh - 92px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <div style={{ textAlign: 'center' }}>
          <Lock size={40} style={{ color: '#A2A9B1', marginBottom: '1rem' }} />
          <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.125rem', color: 'var(--navy)', marginBottom: '1rem' }}>Masuk terlebih dahulu</p>
          <Link href="/masuk" className="btn-primary">Masuk</Link>
        </div>
      </div>
    );
  }

  if (!canReview) {
    const roleColor = ROLE_COLORS[authUser.role];
    return (
      <div style={{ minHeight: 'calc(100vh - 92px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <div style={{ textAlign: 'center', maxWidth: '400px' }}>
          <Lock size={40} style={{ color: '#A2A9B1', marginBottom: '1rem' }} />
          <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.125rem', color: 'var(--navy)', marginBottom: '0.5rem' }}>Akses Terbatas</p>
          <p style={{ fontSize: '0.875rem', color: '#54595D', marginBottom: '1rem' }}>
            Dashboard ini hanya untuk Reviewer, Senior Editor, dan Administrator.
          </p>
          <span style={{ fontSize: '0.75rem', padding: '0.25rem 0.625rem', backgroundColor: roleColor?.bg, color: roleColor?.text, border: `1px solid ${roleColor?.border}` }}>
            Peran Anda: {ROLE_LABELS[authUser.role]}
          </span>
        </div>
      </div>
    );
  }

  const counts = { pending: 0, under_review: 0, approved: 0, rejected: 0 };
  proposals.forEach(p => counts[p.status]++);

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '1.5rem 1rem' }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 400, color: '#000', margin: '0 0 0.25rem', border: 'none', borderBottom: 'none', paddingBottom: 0 }}>
            Dashboard Reviewer
          </h1>
          <p style={{ fontSize: '0.8125rem', color: '#54595D', margin: 0 }}>
            Selamat datang, <strong>{authUser.displayName}</strong> ·{' '}
            <span style={{ color: ROLE_COLORS[authUser.role]?.text }}>{ROLE_LABELS[authUser.role]}</span>
          </p>
        </div>
        <button onClick={fetchProposals} style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', background: 'none', border: '1px solid #A2A9B1', cursor: 'pointer', padding: '0.375rem 0.75rem', fontSize: '0.8125rem', color: '#202122' }}>
          <RefreshCw size={13} /> Perbarui
        </button>
      </div>

      {/* Status filter tabs */}
      <div style={{ display: 'flex', borderBottom: '1px solid #A2A9B1', marginBottom: '1.25rem', gap: 0, flexWrap: 'wrap' }}>
        {(Object.keys(STATUS_CONFIG) as Array<keyof typeof STATUS_CONFIG>).map(status => {
          const cfg = STATUS_CONFIG[status];
          const isActive = activeStatus === status;
          return (
            <button key={status} onClick={() => setActiveStatus(status)}
              style={{
                padding: '0.5rem 1rem', border: '1px solid', marginBottom: '-1px',
                borderColor: isActive ? '#A2A9B1' : 'transparent',
                borderBottom: isActive ? '1px solid #FFFFFF' : '1px solid transparent',
                backgroundColor: isActive ? '#FFFFFF' : 'transparent',
                cursor: 'pointer', fontSize: '0.8125rem', fontFamily: 'var(--font-body)',
                color: isActive ? '#202122' : '#0645AD', fontWeight: isActive ? 700 : 400,
                display: 'flex', alignItems: 'center', gap: '0.375rem',
              }}
            >
              <cfg.icon size={13} style={{ color: cfg.color }} />
              {cfg.label}
            </button>
          );
        })}
      </div>

      {/* Proposals list */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: '#72777D', fontSize: '0.875rem' }}>Memuat...</div>
      ) : proposals.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem', backgroundColor: '#F8F9FA', border: '1px solid #EAECF0' }}>
          <ClipboardList size={36} style={{ color: '#A2A9B1', marginBottom: '0.75rem' }} />
          <p style={{ fontSize: '0.875rem', color: '#72777D', margin: 0 }}>
            Tidak ada proposal dengan status &ldquo;{STATUS_CONFIG[activeStatus].label}&rdquo;
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
          {proposals.map(proposal => {
            const cfg = STATUS_CONFIG[proposal.status];
            const IconComp = cfg.icon;
            return (
              <div key={proposal.id} style={{ border: '1px solid #EAECF0', backgroundColor: '#FFFFFF', padding: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.875rem', flexWrap: 'wrap' }}>

                  {/* Status badge */}
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.6875rem', fontWeight: 700, padding: '0.25rem 0.5rem', backgroundColor: cfg.bg, color: cfg.color, border: `1px solid ${cfg.border}`, flexShrink: 0, borderRadius: '2px' }}>
                    <IconComp size={11} /> {cfg.label}
                  </span>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    {/* Article link */}
                    <Link href={`/maksim/${proposal.maxim_id}`} className="wiki-link" style={{ fontFamily: 'var(--font-display)', fontSize: '0.9375rem', fontWeight: 700 }}>
                      {proposal.maxim_id.replace(/-/g, ' ')}
                    </Link>

                    {/* Edit reason */}
                    {proposal.edit_reason && (
                      <p style={{ fontSize: '0.875rem', color: '#202122', margin: '0.25rem 0', lineHeight: 1.4 }}>
                        {proposal.edit_reason}
                      </p>
                    )}

                    {/* Change basis */}
                    {proposal.change_basis && (
                      <span style={{ fontSize: '0.6875rem', color: '#0645AD', backgroundColor: '#EFF6FF', border: '1px solid #BFDBFE', padding: '0.1rem 0.375rem', borderRadius: '2px' }}>
                        {BASIS_LABELS[proposal.change_basis] || proposal.change_basis}
                      </span>
                    )}

                    {/* Meta */}
                    <p style={{ fontSize: '0.75rem', color: '#72777D', margin: '0.375rem 0 0' }}>
                      {new Date(proposal.created_at).toLocaleString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>

                  {/* Actions */}
                  {(proposal.status === 'pending' || proposal.status === 'under_review') && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem', flexShrink: 0 }}>
                      {proposal.status === 'pending' && (
                        <button onClick={() => updateProposalStatus(proposal.id, 'under_review')} disabled={!!processing}
                          style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', padding: '0.375rem 0.75rem', border: '1px solid #BFDBFE', backgroundColor: '#EFF6FF', color: '#1E40AF', cursor: 'pointer', fontSize: '0.75rem' }}>
                          <Eye size={12} /> Tinjau
                        </button>
                      )}
                      {hasMinRole(authUser.role, 'senior_editor') || authUser.role === 'reviewer' ? (
                        <>
                          <button onClick={() => updateProposalStatus(proposal.id, 'approved')} disabled={!!processing}
                            style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', padding: '0.375rem 0.75rem', border: '1px solid #A7F3D0', backgroundColor: '#ECFDF5', color: '#065F46', cursor: 'pointer', fontSize: '0.75rem' }}>
                            <CheckCircle size={12} /> Setujui
                          </button>
                          <div style={{ display: 'flex', gap: '0.25rem' }}>
                            <input
                              type="text"
                              placeholder="Alasan tolak..."
                              value={rejNotes[proposal.id] || ''}
                              onChange={e => setRejNotes(p => ({ ...p, [proposal.id]: e.target.value }))}
                              style={{ flex: 1, border: '1px solid #FECACA', padding: '0.25rem 0.375rem', fontSize: '0.75rem', outline: 'none', minWidth: '120px' }}
                            />
                            <button onClick={() => updateProposalStatus(proposal.id, 'rejected', rejNotes[proposal.id])} disabled={!!processing}
                              style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', padding: '0.375rem 0.5rem', border: '1px solid #FECACA', backgroundColor: '#FEF2F2', color: '#991B1B', cursor: 'pointer', fontSize: '0.75rem' }}>
                              <XCircle size={12} /> Tolak
                            </button>
                          </div>
                        </>
                      ) : null}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
