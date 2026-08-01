'use client';

import { useState } from 'react';
import { Flag, X, Send } from 'lucide-react';
import { useVeriLexStore } from '@/lib/useStore';
import { apiFetch } from '@/lib/api-fetch';

const CATEGORIES = [
  { value: 'hoaks',            label: 'Hoaks / Informasi Palsu' },
  { value: 'referensi_salah',  label: 'Referensi Salah' },
  { value: 'salah_kutip_pasal', label: 'Salah Kutip Pasal' },
  { value: 'latin_salah',      label: 'Latin / Pelafalan Salah' },
  { value: 'terjemahan_salah', label: 'Terjemahan Salah' },
  { value: 'vandalisme',       label: 'Vandalisme' },
  { value: 'plagiarisme',      label: 'Plagiarisme' },
  { value: 'spam',             label: 'Spam' },
  { value: 'lainnya',          label: 'Lainnya' },
];

export default function ReportButton({ maximId }: { maximId: string }) {
  const { authUser } = useVeriLexStore();
  const [open,      setOpen]      = useState(false);
  const [category,  setCategory]  = useState('');
  const [desc,      setDesc]      = useState('');
  const [sending,   setSending]   = useState(false);
  const [success,   setSuccess]   = useState(false);
  const [error,     setError]     = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!category || !desc.trim()) { setError('Pilih kategori dan isi deskripsi.'); return; }
    setSending(true); setError(null);

    const res = await apiFetch('/api/reports', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        maxim_id:      maximId,
        category,
        description:   desc,
        reporter_id:   authUser?.id,
        reporter_name: authUser?.displayName ?? 'Anonim',
      }),
    });

    if (res.ok) {
      setSuccess(true);
      setTimeout(() => { setOpen(false); setSuccess(false); setCategory(''); setDesc(''); }, 2000);
    } else {
      setError('Gagal mengirim laporan. Coba lagi.');
    }
    setSending(false);
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', background: 'none', border: 'none', cursor: 'pointer', color: '#72777D', fontSize: '0.75rem', padding: '0.25rem 0', transition: 'color 150ms' }}
        onMouseEnter={e => (e.currentTarget.style.color = '#C85A54')}
        onMouseLeave={e => (e.currentTarget.style.color = '#72777D')}
        title="Laporkan artikel ini"
      >
        <Flag size={13} /> Laporkan
      </button>

      {open && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200, padding: '1rem' }}>
          <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #A2A9B1', padding: '1.5rem', width: '100%', maxWidth: '440px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', margin: 0, border: 'none', display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                <Flag size={16} style={{ color: '#C85A54' }} /> Laporkan Artikel
              </h3>
              <button onClick={() => setOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#72777D' }}><X size={16} /></button>
            </div>

            {success ? (
              <div style={{ textAlign: 'center', padding: '1.5rem' }}>
                <p style={{ color: '#065F46', fontWeight: 700, fontSize: '0.875rem' }}>✓ Laporan berhasil dikirim. Terima kasih!</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
                <p style={{ fontSize: '0.8125rem', color: '#54595D', margin: 0, lineHeight: 1.5 }}>
                  Laporan Anda akan ditinjau oleh tim editorial VeriLex.
                </p>

                {error && (
                  <div style={{ padding: '0.5rem 0.75rem', backgroundColor: '#FEF2F2', border: '1px solid #FECACA', fontSize: '0.8125rem', color: '#991B1B' }}>
                    {error}
                  </div>
                )}

                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#54595D', marginBottom: '0.25rem' }}>
                    Kategori Masalah <span style={{ color: '#C85A54' }}>*</span>
                  </label>
                  <select value={category} onChange={e => setCategory(e.target.value)} required
                    style={{ width: '100%', border: '1px solid #A2A9B1', padding: '0.375rem 0.625rem', fontSize: '0.875rem', fontFamily: 'var(--font-body)', cursor: 'pointer', outline: 'none' }}>
                    <option value="">— Pilih kategori —</option>
                    {CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#54595D', marginBottom: '0.25rem' }}>
                    Deskripsi Masalah <span style={{ color: '#C85A54' }}>*</span>
                  </label>
                  <textarea value={desc} onChange={e => setDesc(e.target.value)} required rows={4}
                    placeholder="Jelaskan secara spesifik bagian mana yang bermasalah dan mengapa..."
                    style={{ width: '100%', border: '1px solid #A2A9B1', padding: '0.375rem 0.625rem', fontSize: '0.875rem', fontFamily: 'var(--font-body)', resize: 'vertical', outline: 'none' }} />
                </div>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button type="submit" disabled={sending}
                    style={{ flex: 1, padding: '0.5rem', backgroundColor: '#C85A54', color: '#FFFFFF', border: 'none', cursor: 'pointer', fontSize: '0.875rem', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.375rem', opacity: sending ? 0.6 : 1 }}>
                    <Send size={13} /> {sending ? 'Mengirim...' : 'Kirim Laporan'}
                  </button>
                  <button type="button" onClick={() => setOpen(false)} className="btn-secondary" style={{ padding: '0.5rem 1rem' }}>Batal</button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
