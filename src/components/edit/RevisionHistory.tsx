'use client';

import { useState, useEffect } from 'react';
import { History, RotateCcw, ChevronDown, ChevronUp, User, Calendar, FileText, AlertTriangle } from 'lucide-react';
import { useVeriLexStore, hasMinRole } from '@/lib/useStore';
import { apiFetch } from '@/lib/api-fetch';

interface Revision {
  id: string;
  revision_number: number;
  editor_name: string;
  edit_reason: string;
  change_basis: string | null;
  change_basis_detail: string | null;
  diff_summary: string | null;
  is_rollback: boolean;
  created_at: string;
}

const BASIS_LABELS: Record<string, { label: string; color: string; bg: string }> = {
  'uu':       { label: 'Undang-Undang',   color: '#065F46', bg: '#ECFDF5' },
  'undang_undang': { label: 'Undang-Undang', color: '#065F46', bg: '#ECFDF5' },
  'putusan':  { label: 'Putusan',         color: '#1E40AF', bg: '#EFF6FF' },
  'buku':     { label: 'Buku',            color: '#92400E', bg: '#FFFBEB' },
  'jurnal':   { label: 'Jurnal',          color: '#6B21A8', bg: '#FDF4FF' },
  'doktrin':  { label: 'Doktrin',         color: '#134E4A', bg: '#F0FDFA' },
  'rollback': { label: 'Rollback',        color: '#991B1B', bg: '#FEF2F2' },
};

interface Props {
  maximId: string;
  maximLatinPhrase: string;
}

export default function RevisionHistory({ maximId, maximLatinPhrase }: Props) {
  const { authUser } = useVeriLexStore();
  const [revisions,    setRevisions]    = useState<Revision[]>([]);
  const [loading,      setLoading]      = useState(true);
  const [rollingBack,  setRollingBack]  = useState<string | null>(null);
  const [expandedId,   setExpandedId]   = useState<string | null>(null);
  const [successMsg,   setSuccessMsg]   = useState<string | null>(null);
  const [errorMsg,     setErrorMsg]     = useState<string | null>(null);

  const canRollback = authUser ? hasMinRole(authUser.role, 'senior_editor') : false;

  useEffect(() => {
    apiFetch(`/api/maxims/${maximId}/revisions`)
      .then(r => r.json())
      .then(data => setRevisions(data))
      .finally(() => setLoading(false));
  }, [maximId]);

  async function handleRollback(revision: Revision) {
    if (!confirm(`Rollback ke Revisi #${revision.revision_number}?\n\nArtikel akan dikembalikan ke kondisi SEBELUM revisi ini. Tindakan ini akan dicatat dalam riwayat.`)) return;

    setRollingBack(revision.id);
    setErrorMsg(null);

    try {
      const res = await apiFetch(`/api/maxims/${maximId}/rollback`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          revision_id:  revision.id,
          editor_id:    authUser?.id,
          editor_name:  authUser?.displayName ?? 'Editor',
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Gagal rollback');
      }

      setSuccessMsg(`Berhasil rollback ke Revisi #${revision.revision_number}. Halaman akan dimuat ulang...`);
      setTimeout(() => window.location.reload(), 2000);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Gagal rollback');
    } finally {
      setRollingBack(null);
    }
  }

  return (
    <div style={{ padding: '0.5rem 0' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
        <History size={20} color="var(--navy)" />
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.125rem', fontWeight: 400, color: '#000', margin: 0, border: 'none', padding: 0 }}>
          Riwayat Sunting
        </h2>
      </div>

      <p style={{ fontSize: '0.8125rem', color: '#54595D', marginBottom: '1.25rem', lineHeight: 1.5 }}>
        Semua perubahan pada artikel <em>{maximLatinPhrase}</em> tercatat di sini secara transparan.
        {canRollback && ' Sebagai Editor, Anda dapat melakukan rollback ke versi sebelumnya.'}
      </p>

      {successMsg && (
        <div style={{ padding: '0.625rem 0.875rem', backgroundColor: '#ECFDF5', border: '1px solid #A7F3D0', marginBottom: '1rem', fontSize: '0.8125rem', color: '#065F46' }}>
          ✓ {successMsg}
        </div>
      )}
      {errorMsg && (
        <div style={{ padding: '0.625rem 0.875rem', backgroundColor: '#FEF2F2', border: '1px solid #FECACA', marginBottom: '1rem', fontSize: '0.8125rem', color: '#991B1B' }}>
          ⚠ {errorMsg}
        </div>
      )}

      {loading ? (
        <div style={{ textAlign: 'center', padding: '2rem', color: '#72777D', fontSize: '0.8125rem' }}>
          Memuat riwayat...
        </div>
      ) : revisions.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '2rem', backgroundColor: '#F8F9FA', border: '1px solid #EAECF0' }}>
          <History size={32} style={{ color: '#A2A9B1', marginBottom: '0.5rem' }} />
          <p style={{ fontSize: '0.875rem', color: '#72777D', margin: 0 }}>
            Belum ada riwayat sunting untuk artikel ini.
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          {revisions.map((rev, idx) => {
            const basis   = rev.change_basis ? BASIS_LABELS[rev.change_basis] : null;
            const isFirst = idx === 0;
            const isExpanded = expandedId === rev.id;

            return (
              <div key={rev.id} style={{
                border: '1px solid #EAECF0',
                borderTop: idx === 0 ? '1px solid #EAECF0' : 'none',
                backgroundColor: rev.is_rollback ? '#FFF8F0' : isFirst ? '#F0F9FF' : '#FFFFFF',
              }}>
                {/* Main row */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', padding: '0.75rem 1rem', flexWrap: 'wrap' }}>

                  {/* Revision number */}
                  <div style={{
                    flexShrink: 0, width: '36px', height: '36px',
                    backgroundColor: isFirst ? '#0F1B3C' : '#F8F9FA',
                    border: '1px solid', borderColor: isFirst ? '#0F1B3C' : '#EAECF0',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 700,
                    color: isFirst ? '#FFFFFF' : '#54595D',
                  }}>
                    #{rev.revision_number}
                  </div>

                  {/* Content */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.25rem' }}>
                      {isFirst && (
                        <span style={{ fontSize: '0.625rem', fontWeight: 700, backgroundColor: '#0F1B3C', color: '#FFFFFF', padding: '0.1rem 0.375rem', borderRadius: '2px' }}>
                          TERKINI
                        </span>
                      )}
                      {rev.is_rollback && (
                        <span style={{ fontSize: '0.625rem', fontWeight: 700, backgroundColor: '#FEF2F2', color: '#991B1B', border: '1px solid #FECACA', padding: '0.1rem 0.375rem' }}>
                          ROLLBACK
                        </span>
                      )}
                      {basis && (
                        <span style={{ fontSize: '0.625rem', fontWeight: 600, backgroundColor: basis.bg, color: basis.color, border: `1px solid ${basis.color}40`, padding: '0.1rem 0.375rem' }}>
                          {basis.label}
                        </span>
                      )}
                    </div>

                    <p style={{ fontSize: '0.875rem', fontWeight: 600, color: '#202122', margin: '0 0 0.25rem', lineHeight: 1.3 }}>
                      {rev.edit_reason}
                    </p>

                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.75rem', color: '#72777D' }}>
                        <User size={11} /> {rev.editor_name}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.75rem', color: '#72777D' }}>
                        <Calendar size={11} />
                        {new Date(rev.created_at).toLocaleString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'flex', gap: '0.375rem', flexShrink: 0 }}>
                    {/* Expand detail */}
                    <button
                      type="button"
                      onClick={() => setExpandedId(isExpanded ? null : rev.id)}
                      style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', background: 'none', border: '1px solid #EAECF0', cursor: 'pointer', padding: '0.25rem 0.5rem', fontSize: '0.75rem', color: '#54595D' }}
                    >
                      <FileText size={11} />
                      {isExpanded ? <ChevronUp size={11} /> : <ChevronDown size={11} />}
                    </button>

                    {/* Rollback (Editor+, not on latest) */}
                    {canRollback && !isFirst && (
                      <button
                        type="button"
                        onClick={() => handleRollback(rev)}
                        disabled={rollingBack === rev.id}
                        style={{
                          display: 'flex', alignItems: 'center', gap: '0.25rem',
                          background: 'none', border: '1px solid #FECACA',
                          cursor: rollingBack === rev.id ? 'not-allowed' : 'pointer',
                          padding: '0.25rem 0.5rem', fontSize: '0.75rem',
                          color: '#991B1B', opacity: rollingBack === rev.id ? 0.6 : 1,
                        }}
                        title="Rollback ke versi ini"
                      >
                        <RotateCcw size={11} />
                        {rollingBack === rev.id ? '...' : 'Rollback'}
                      </button>
                    )}
                  </div>
                </div>

                {/* Expanded detail */}
                {isExpanded && (
                  <div style={{ padding: '0.75rem 1rem', borderTop: '1px solid #EAECF0', backgroundColor: '#F8F9FA' }}>
                    {rev.change_basis_detail && (
                      <div style={{ marginBottom: '0.5rem' }}>
                        <span style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#54595D', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Dasar Perubahan:</span>
                        <p style={{ fontSize: '0.8125rem', color: '#202122', margin: '0.25rem 0 0', fontStyle: 'italic' }}>{rev.change_basis_detail}</p>
                      </div>
                    )}
                    {rev.diff_summary && (
                      <div>
                        <span style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#54595D', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Ringkasan:</span>
                        <p style={{ fontSize: '0.8125rem', color: '#202122', margin: '0.25rem 0 0' }}>{rev.diff_summary}</p>
                      </div>
                    )}
                    {canRollback && !isFirst && (
                      <div style={{ marginTop: '0.75rem', padding: '0.5rem', backgroundColor: '#FFF8F0', border: '1px solid #FDE68A', display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                        <AlertTriangle size={12} style={{ color: '#AC6600', flexShrink: 0 }} />
                        <p style={{ fontSize: '0.75rem', color: '#92400E', margin: 0 }}>
                          Rollback akan mengembalikan artikel ke kondisi SEBELUM revisi ini dan mencatat tindakan tersebut.
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
