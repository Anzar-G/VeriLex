'use client';

import { useState, useEffect } from 'react';
import { Award, TrendingUp, CheckCircle, XCircle, BookOpen, Flag } from 'lucide-react';

interface ReputationData {
  user_id: string;
  score: number;
  edits_accepted: number;
  edits_rejected: number;
  references_added: number;
  reports_valid: number;
  updated_at: string;
}

interface EditorReputationBadgeProps {
  userId: string;
  displayName?: string;
  compact?: boolean;
}

function getReputationLevel(score: number): {
  label: string;
  color: string;
  bg: string;
  border: string;
  icon: string;
} {
  if (score >= 500)
    return { label: 'Editor Senior', color: '#92400E', bg: '#FFFBEB', border: '#FDE68A', icon: '🏆' };
  if (score >= 200)
    return { label: 'Editor Terpercaya', color: '#065F46', bg: '#ECFDF5', border: '#A7F3D0', icon: '⭐' };
  if (score >= 100)
    return { label: 'Kontributor Aktif', color: '#1E40AF', bg: '#EFF6FF', border: '#BFDBFE', icon: '📘' };
  if (score >= 50)
    return { label: 'Kontributor', color: '#4B5563', bg: '#F3F4F6', border: '#D1D5DB', icon: '✏️' };
  return { label: 'Pemula', color: '#54595D', bg: '#F8F9FA', border: '#A2A9B1', icon: '🌱' };
}

export function EditorReputationBadge({ userId, displayName, compact = false }: EditorReputationBadgeProps) {
  const [rep, setRep] = useState<ReputationData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/reputation?user_id=${userId}`)
      .then((r) => r.json())
      .then((j) => setRep(j.data))
      .finally(() => setLoading(false));
  }, [userId]);

  if (loading) return null;
  if (!rep) {
    if (compact) return null;
    return (
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.25rem',
          fontSize: '0.6875rem',
          color: '#72777D',
          fontFamily: 'var(--font-body)',
        }}
      >
        🌱 Pemula · Skor: 0
      </span>
    );
  }

  const level = getReputationLevel(rep.score);

  if (compact) {
    return (
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.25rem',
          fontSize: '0.6875rem',
          color: level.color,
          backgroundColor: level.bg,
          border: `1px solid ${level.border}`,
          padding: '0.125rem 0.375rem',
          fontFamily: 'var(--font-body)',
          fontWeight: 600,
        }}
        title={`Skor reputasi: ${rep.score}`}
      >
        {level.icon} {level.label} · {rep.score} poin
      </span>
    );
  }

  return (
    <div
      style={{
        border: `1px solid ${level.border}`,
        backgroundColor: level.bg,
        padding: '0.875rem 1rem',
        fontFamily: 'var(--font-body)',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          marginBottom: '0.75rem',
        }}
      >
        <Award size={18} color={level.color} />
        <div>
          <p
            style={{
              margin: 0,
              fontWeight: 700,
              fontSize: '0.875rem',
              color: level.color,
            }}
          >
            {level.icon} {level.label}
            {displayName && (
              <span style={{ fontWeight: 400, color: '#54595D' }}> — {displayName}</span>
            )}
          </p>
          <p style={{ margin: 0, fontSize: '0.75rem', color: '#54595D' }}>
            Total skor:{' '}
            <strong style={{ color: level.color }}>{rep.score.toLocaleString()} poin</strong>
          </p>
        </div>
      </div>

      {/* Score breakdown */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '0.5rem',
        }}
      >
        {[
          {
            label: 'Suntingan Diterima',
            value: rep.edits_accepted,
            pts: rep.edits_accepted * 10,
            icon: CheckCircle,
            color: '#065F46',
          },
          {
            label: 'Suntingan Ditolak',
            value: rep.edits_rejected,
            pts: rep.edits_rejected * -2,
            icon: XCircle,
            color: '#C85A54',
          },
          {
            label: 'Referensi Ditambahkan',
            value: rep.references_added,
            pts: rep.references_added * 5,
            icon: BookOpen,
            color: '#1E40AF',
          },
          {
            label: 'Laporan Valid',
            value: rep.reports_valid,
            pts: rep.reports_valid * 3,
            icon: Flag,
            color: '#92400E',
          },
        ].map((item) => (
          <div
            key={item.label}
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #EAECF0',
              padding: '0.5rem 0.625rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.375rem',
            }}
          >
            <item.icon size={13} color={item.color} />
            <div>
              <p
                style={{ margin: 0, fontSize: '0.625rem', color: '#72777D' }}
              >
                {item.label}
              </p>
              <p style={{ margin: 0, fontSize: '0.8125rem', fontWeight: 700 }}>
                {item.value}
                <span
                  style={{
                    fontSize: '0.625rem',
                    fontWeight: 400,
                    color: item.pts >= 0 ? '#065F46' : '#C85A54',
                    marginLeft: '0.25rem',
                  }}
                >
                  ({item.pts >= 0 ? '+' : ''}{item.pts} poin)
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Leaderboard component ──────────────────────────────────────────────────

interface LeaderboardEntry {
  user_id: string;
  score: number;
  edits_accepted: number;
  edits_rejected: number;
  references_added: number;
  reports_valid: number;
  updated_at: string;
}

export function EditorLeaderboard() {
  const [leaders, setLeaders] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/reputation?leaderboard=1')
      .then((r) => r.json())
      .then((j) => setLeaders(j.data || []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          marginBottom: '1rem',
          paddingBottom: '0.625rem',
          borderBottom: '1px solid #EAECF0',
        }}
      >
        <TrendingUp size={16} color="var(--navy)" />
        <h3
          style={{
            fontFamily: 'var(--font-body)',
            fontWeight: 700,
            fontSize: '0.875rem',
            color: '#202122',
            margin: 0,
          }}
        >
          Papan Peringkat Editor
        </h3>
      </div>

      {loading ? (
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.8125rem',
            color: '#72777D',
          }}
        >
          Memuat...
        </p>
      ) : leaders.length === 0 ? (
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.8125rem',
            color: '#72777D',
            fontStyle: 'italic',
          }}
        >
          Belum ada data reputasi editor.
        </p>
      ) : (
        <div>
          {leaders.map((entry, idx) => {
            const level = getReputationLevel(entry.score);
            const medals = ['🥇', '🥈', '🥉'];
            return (
              <div
                key={entry.user_id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.5rem 0',
                  borderBottom: idx < leaders.length - 1 ? '1px solid #F3F4F6' : 'none',
                }}
              >
                <span
                  style={{
                    width: '24px',
                    textAlign: 'center',
                    fontSize: idx < 3 ? '1rem' : '0.8125rem',
                    color: idx < 3 ? '#000' : '#72777D',
                    fontWeight: idx < 3 ? 700 : 400,
                    flexShrink: 0,
                  }}
                >
                  {medals[idx] ?? `#${idx + 1}`}
                </span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p
                    style={{
                      margin: 0,
                      fontSize: '0.8125rem',
                      fontWeight: 600,
                      color: '#202122',
                      fontFamily: 'var(--font-body)',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {entry.user_id.slice(0, 8)}...
                  </p>
                  <span
                    style={{
                      fontSize: '0.6875rem',
                      color: level.color,
                      backgroundColor: level.bg,
                      border: `1px solid ${level.border}`,
                      padding: '0.0625rem 0.3rem',
                      fontFamily: 'var(--font-body)',
                    }}
                  >
                    {level.label}
                  </span>
                </div>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 700,
                    fontSize: '0.875rem',
                    color: 'var(--navy)',
                    flexShrink: 0,
                  }}
                >
                  {entry.score.toLocaleString()}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
