'use client';

import { useState, useEffect, useCallback } from 'react';
import { X, Copy, Check, Quote } from 'lucide-react';
import type { Maxim } from '@/types';

interface CitationModalProps {
  maxim: Maxim;
  onClose: () => void;
}

type CitationFormat = 'apa' | 'chicago' | 'mla' | 'bibtex';

function generateCitations(maxim: Maxim) {
  const today = new Date();
  const accessDate = today.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  const accessDateEn = today.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  const year = today.getFullYear();
  const url = `https://verilex.id/maksim/${maxim.id}`;
  const bibtexKey = maxim.id.replace(/-/g, '_');

  const apa = `VeriLex Editorial. (${year}). *${maxim.latinPhrase}: ${maxim.indonesianMeaning}*. VeriLex — Ensiklopedia Maksim Hukum. Diakses pada ${accessDate}, dari ${url}`;

  const chicago = `VeriLex Editorial. "${maxim.latinPhrase}: ${maxim.indonesianMeaning}." VeriLex — Ensiklopedia Maksim Hukum. Last modified ${year}. Accessed ${accessDateEn}. ${url}.`;

  const mla = `VeriLex Editorial. "${maxim.latinPhrase}: ${maxim.indonesianMeaning}." *VeriLex — Ensiklopedia Maksim Hukum*, ${year}, ${url}. Accessed ${accessDateEn}.`;

  const bibtex = `@misc{verilex_${bibtexKey}_${year},
  author    = {{VeriLex Editorial}},
  title     = {${maxim.latinPhrase}: ${maxim.indonesianMeaning}},
  year      = {${year}},
  url       = {${url}},
  note      = {Diakses pada ${accessDate}},
  publisher = {VeriLex --- Ensiklopedia Maksim Hukum},
}`;

  return { apa, chicago, mla, bibtex };
}

export default function CitationModal({ maxim, onClose }: CitationModalProps) {
  const [activeFormat, setActiveFormat] = useState<CitationFormat>('apa');
  const [copied, setCopied] = useState(false);
  const citations = generateCitations(maxim);

  const handleCopy = useCallback(() => {
    const text = citations[activeFormat];
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  }, [activeFormat, citations]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  const formatLabels: Record<CitationFormat, string> = {
    apa: 'APA 7th Ed.',
    chicago: 'Chicago 17th',
    mla: 'MLA 9th Ed.',
    bibtex: 'BibTeX',
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        backgroundColor: 'rgba(15, 27, 60, 0.45)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid #A2A9B1',
          width: '100%',
          maxWidth: '600px',
          boxShadow: '0 8px 32px rgba(15,27,60,0.18)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            backgroundColor: '#EAF3FF',
            borderBottom: '1px solid #A2A9B1',
            padding: '0.75rem 1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Quote size={16} color="var(--navy)" />
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 700,
                fontSize: '0.875rem',
                color: 'var(--navy)',
              }}
            >
              Kutip Artikel Ini
            </span>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#54595D',
              padding: '0.25rem',
              display: 'flex',
            }}
            aria-label="Tutup modal sitasi"
          >
            <X size={16} />
          </button>
        </div>

        {/* Article title hint */}
        <div
          style={{
            padding: '0.75rem 1rem',
            borderBottom: '1px solid #EAECF0',
            backgroundColor: '#F8F9FA',
          }}
        >
          <p
            style={{
              fontSize: '0.75rem',
              color: '#54595D',
              margin: 0,
              fontFamily: 'var(--font-body)',
            }}
          >
            Artikel:{' '}
            <strong style={{ fontStyle: 'italic', color: 'var(--navy)' }}>
              {maxim.latinPhrase}
            </strong>{' '}
            — {maxim.indonesianMeaning}
          </p>
        </div>

        {/* Format Tabs */}
        <div
          style={{
            display: 'flex',
            borderBottom: '1px solid #A2A9B1',
            backgroundColor: '#F8F9FA',
          }}
        >
          {(Object.keys(formatLabels) as CitationFormat[]).map((fmt) => (
            <button
              key={fmt}
              onClick={() => setActiveFormat(fmt)}
              style={{
                flex: 1,
                padding: '0.5rem 0.25rem',
                fontFamily: 'var(--font-body)',
                fontWeight: activeFormat === fmt ? 700 : 400,
                fontSize: '0.75rem',
                color: activeFormat === fmt ? 'var(--navy)' : '#54595D',
                background: activeFormat === fmt ? '#FFFFFF' : 'transparent',
                border: 'none',
                borderBottom: activeFormat === fmt ? '2px solid var(--navy)' : '2px solid transparent',
                cursor: 'pointer',
                transition: 'all 150ms',
              }}
            >
              {formatLabels[fmt]}
            </button>
          ))}
        </div>

        {/* Citation Text */}
        <div style={{ padding: '1rem' }}>
          <div
            style={{
              backgroundColor: '#F8F9FA',
              border: '1px solid #EAECF0',
              padding: '0.875rem',
              fontFamily:
                activeFormat === 'bibtex'
                  ? 'var(--font-mono)'
                  : 'var(--font-body)',
              fontSize: activeFormat === 'bibtex' ? '0.75rem' : '0.8125rem',
              lineHeight: 1.7,
              color: '#202122',
              whiteSpace: activeFormat === 'bibtex' ? 'pre' : 'normal',
              overflowX: 'auto',
              minHeight: '100px',
            }}
          >
            {citations[activeFormat]}
          </div>

          <div
            style={{
              marginTop: '0.875rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '0.5rem',
            }}
          >
            <p
              style={{
                fontSize: '0.6875rem',
                color: '#72777D',
                margin: 0,
                fontFamily: 'var(--font-body)',
                fontStyle: 'italic',
              }}
            >
              * Tanggal akses otomatis sesuai hari ini. Sesuaikan jika perlu.
            </p>
            <button
              onClick={handleCopy}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.375rem',
                backgroundColor: copied ? '#2E7D32' : 'var(--navy)',
                color: '#FFFFFF',
                border: 'none',
                padding: '0.4375rem 0.875rem',
                fontSize: '0.8125rem',
                fontFamily: 'var(--font-body)',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'background-color 200ms',
              }}
            >
              {copied ? (
                <>
                  <Check size={13} /> Disalin!
                </>
              ) : (
                <>
                  <Copy size={13} /> Salin Sitasi
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
