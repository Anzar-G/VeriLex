'use client';

import React from 'react';

// ── Difficulty Badge ──────────────────────────────────────────────────────
const DIFFICULTY = {
  dasar:    { label: '🟢 Dasar',    color: '#065F46', bg: '#ECFDF5', border: '#A7F3D0', desc: 'Cocok untuk mahasiswa hukum semester awal' },
  menengah: { label: '🟡 Menengah', color: '#92400E', bg: '#FFFBEB', border: '#FDE68A', desc: 'Membutuhkan pemahaman dasar hukum' },
  lanjutan: { label: '🔴 Lanjutan', color: '#991B1B', bg: '#FEF2F2', border: '#FECACA', desc: 'Untuk praktisi dan akademisi hukum' },
};

// ── Article Status Badge ──────────────────────────────────────────────────
const STATUS = {
  draft:    { label: 'Draft',           color: '#54595D', bg: '#F8F9FA', border: '#A2A9B1' },
  reviewed: { label: 'Telah Ditinjau',  color: '#1E40AF', bg: '#EFF6FF', border: '#BFDBFE' },
  stable:   { label: 'Stabil',          color: '#065F46', bg: '#ECFDF5', border: '#A7F3D0' },
  featured: { label: '⭐ Artikel Unggulan', color: '#92400E', bg: '#FFFBEB', border: '#FDE68A' },
};

interface DifficultyBadgeProps {
  difficulty: string;
  showTooltip?: boolean;
}

export function DifficultyBadge({ difficulty, showTooltip = true }: DifficultyBadgeProps) {
  const cfg = DIFFICULTY[difficulty as keyof typeof DIFFICULTY] ?? DIFFICULTY.menengah;
  return (
    <span
      title={showTooltip ? cfg.desc : undefined}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: '0.25rem',
        fontSize: '0.6875rem', fontWeight: 700, padding: '0.2rem 0.5rem',
        backgroundColor: cfg.bg, color: cfg.color, border: `1px solid ${cfg.border}`,
        borderRadius: '2px', cursor: showTooltip ? 'help' : 'default',
      }}
    >
      {cfg.label}
    </span>
  );
}

interface StatusBadgeProps {
  status: string;
  version?: number;
}

export function StatusBadge({ status, version }: StatusBadgeProps) {
  const cfg = STATUS[status as keyof typeof STATUS] ?? STATUS.draft;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: '0.375rem',
      fontSize: '0.6875rem', fontWeight: 700, padding: '0.2rem 0.5rem',
      backgroundColor: cfg.bg, color: cfg.color, border: `1px solid ${cfg.border}`,
      borderRadius: '2px',
    }}>
      {cfg.label}
      {version && version > 1 && (
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.625rem', opacity: 0.8 }}>
          v{version}
        </span>
      )}
    </span>
  );
}

// ── Combined Article Meta Bar ─────────────────────────────────────────────
interface ArticleMetaBarProps {
  difficulty?: string;
  status?: string;
  version?: number;
  updatedAt?: string;
}

export function ArticleMetaBar({ difficulty, status, version, updatedAt }: ArticleMetaBarProps) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap',
      padding: '0.5rem 0', borderBottom: '1px solid #EAECF0', marginBottom: '0.75rem',
      fontSize: '0.75rem',
    }}>
      {difficulty && <DifficultyBadge difficulty={difficulty} />}
      {status && <StatusBadge status={status} version={version} />}
      {updatedAt && (
        <span style={{ color: '#72777D', marginLeft: 'auto', fontFamily: 'var(--font-mono)', fontSize: '0.6875rem' }}>
          Diperbarui: {new Date(updatedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
        </span>
      )}
    </div>
  );
}
