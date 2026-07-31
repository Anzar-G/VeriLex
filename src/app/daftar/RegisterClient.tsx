'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Eye, EyeOff, Loader, UserPlus, CheckCircle } from 'lucide-react';
import { signUp } from '@/lib/auth';

export default function RegisterClient() {
  const router = useRouter();

  const [email,       setEmail]       = useState('');
  const [username,    setUsername]    = useState('');
  const [displayName, setDisplayName] = useState('');
  const [password,    setPassword]    = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [showPass,    setShowPass]    = useState(false);
  const [loading,     setLoading]     = useState(false);
  const [error,       setError]       = useState<string | null>(null);
  const [success,     setSuccess]     = useState(false);

  const passwordStrength = (p: string) => {
    if (p.length === 0) return null;
    if (p.length < 6) return { label: 'Terlalu pendek', color: '#C85A54' };
    if (p.length < 8) return { label: 'Lemah', color: '#AC6600' };
    if (/[A-Z]/.test(p) && /[0-9]/.test(p)) return { label: 'Kuat', color: '#2E7D32' };
    return { label: 'Cukup', color: '#1E40AF' };
  };

  const strength = passwordStrength(password);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (password !== confirmPass) { setError('Kata sandi tidak cocok.'); return; }
    if (password.length < 6)      { setError('Kata sandi minimal 6 karakter.'); return; }
    if (username.length < 3)      { setError('Nama pengguna minimal 3 karakter.'); return; }
    if (!/^[a-z0-9_]+$/i.test(username)) { setError('Nama pengguna hanya boleh huruf, angka, dan underscore.'); return; }

    setLoading(true);

    const { error: authErr } = await signUp(email, password, username.toLowerCase(), displayName || username);

    if (authErr) {
      if (authErr.message.includes('already registered')) {
        setError('Email ini sudah terdaftar. Silakan masuk.');
      } else {
        setError(authErr.message);
      }
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);
  }

  if (success) {
    return (
      <div style={{ minHeight: 'calc(100vh - 92px)', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F6F6F6', padding: '2rem 1rem' }}>
        <div style={{ width: '100%', maxWidth: '400px', textAlign: 'center' }}>
          <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #A2A9B1', padding: '2rem' }}>
            <CheckCircle size={48} style={{ color: '#2E7D32', marginBottom: '1rem' }} />
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 400, color: '#000', margin: '0 0 0.75rem', border: 'none' }}>
              Pendaftaran Berhasil!
            </h2>
            <p style={{ fontSize: '0.875rem', color: '#54595D', lineHeight: 1.6, margin: '0 0 1.5rem' }}>
              Akun Anda telah dibuat. Silakan cek email <strong>{email}</strong> untuk verifikasi, lalu masuk ke VeriLex.
            </p>
            <Link href="/masuk" className="btn-primary" style={{ display: 'inline-flex', justifyContent: 'center', padding: '0.625rem 1.5rem' }}>
              Masuk Sekarang
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: 'calc(100vh - 92px)', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F6F6F6', padding: '2rem 1rem' }}>
      <div style={{ width: '100%', maxWidth: '460px' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <Link href="/" style={{ display: 'inline-block' }}>
            <img src="/verilex-logo.png" alt="VeriLex" style={{ height: '64px', width: 'auto', marginBottom: '0.75rem', display: 'block', margin: '0 auto 0.75rem' }} />
          </Link>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 400, color: '#000', margin: '0 0 0.25rem', borderBottom: 'none', paddingBottom: 0 }}>
            Buat Akun VeriLex
          </h1>
          <p style={{ fontSize: '0.8125rem', color: '#54595D', margin: 0 }}>
            Bergabung sebagai Kontributor Ensiklopedia
          </p>
        </div>

        {/* Role info banner */}
        <div style={{ backgroundColor: '#EAF3FF', border: '1px solid #A2A9B1', padding: '0.75rem 1rem', marginBottom: '1rem', fontSize: '0.8125rem', color: '#0F1B3C', lineHeight: 1.5 }}>
          <strong>Tentang peran awal:</strong> Akun baru akan mendapat peran <strong>Kontributor</strong> — dapat mengusulkan revisi yang akan ditinjau oleh Editor sebelum dipublikasikan.
        </div>

        {/* Form */}
        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #A2A9B1', padding: '1.5rem' }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

            {error && (
              <div style={{ backgroundColor: '#FFF5F5', border: '1px solid #C85A54', padding: '0.625rem 0.875rem', fontSize: '0.8125rem', color: '#C85A54', borderRadius: '2px' }}>
                {error}
              </div>
            )}

            <div>
              <label htmlFor="reg-email" style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: '#202122', marginBottom: '0.25rem' }}>
                Alamat Email <span style={{ color: '#C85A54' }}>*</span>
              </label>
              <input id="reg-email" type="email" value={email} onChange={e => setEmail(e.target.value)}
                required autoComplete="email" placeholder="nama@email.com" className="input-text" />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <div>
                <label htmlFor="reg-username" style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: '#202122', marginBottom: '0.25rem' }}>
                  Nama Pengguna <span style={{ color: '#C85A54' }}>*</span>
                </label>
                <input id="reg-username" type="text" value={username} onChange={e => setUsername(e.target.value)}
                  required autoComplete="username" placeholder="nizar_alfaris" className="input-text" />
                <p style={{ fontSize: '0.6875rem', color: '#72777D', margin: '0.25rem 0 0' }}>
                  Huruf, angka, dan _ saja
                </p>
              </div>
              <div>
                <label htmlFor="reg-display" style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: '#202122', marginBottom: '0.25rem' }}>
                  Nama Tampil
                </label>
                <input id="reg-display" type="text" value={displayName} onChange={e => setDisplayName(e.target.value)}
                  autoComplete="name" placeholder="Nizar Alfaris" className="input-text" />
                <p style={{ fontSize: '0.6875rem', color: '#72777D', margin: '0.25rem 0 0' }}>
                  Boleh dikosongkan
                </p>
              </div>
            </div>

            <div>
              <label htmlFor="reg-password" style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: '#202122', marginBottom: '0.25rem' }}>
                Kata Sandi <span style={{ color: '#C85A54' }}>*</span>
              </label>
              <div style={{ position: 'relative' }}>
                <input id="reg-password" type={showPass ? 'text' : 'password'}
                  value={password} onChange={e => setPassword(e.target.value)}
                  required minLength={6} autoComplete="new-password"
                  placeholder="Minimal 6 karakter" className="input-text" style={{ paddingRight: '2.5rem' }} />
                <button type="button" onClick={() => setShowPass(p => !p)}
                  style={{ position: 'absolute', right: '0.625rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#72777D' }}
                  aria-label="Toggle visibility">
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {strength && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', marginTop: '0.25rem' }}>
                  <div style={{ flex: 1, height: '3px', backgroundColor: '#EAECF0', borderRadius: '2px' }}>
                    <div style={{ width: strength.label === 'Terlalu pendek' ? '20%' : strength.label === 'Lemah' ? '40%' : strength.label === 'Cukup' ? '70%' : '100%', height: '100%', backgroundColor: strength.color, borderRadius: '2px', transition: 'width 200ms' }} />
                  </div>
                  <span style={{ fontSize: '0.6875rem', color: strength.color, fontWeight: 600 }}>{strength.label}</span>
                </div>
              )}
            </div>

            <div>
              <label htmlFor="reg-confirm" style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: '#202122', marginBottom: '0.25rem' }}>
                Konfirmasi Kata Sandi <span style={{ color: '#C85A54' }}>*</span>
              </label>
              <input id="reg-confirm" type={showPass ? 'text' : 'password'}
                value={confirmPass} onChange={e => setConfirmPass(e.target.value)}
                required autoComplete="new-password"
                placeholder="Ulangi kata sandi" className="input-text"
                style={{ borderColor: confirmPass && confirmPass !== password ? '#C85A54' : '' }} />
              {confirmPass && confirmPass !== password && (
                <p style={{ fontSize: '0.6875rem', color: '#C85A54', margin: '0.25rem 0 0' }}>Kata sandi tidak cocok</p>
              )}
            </div>

            <button type="submit" disabled={loading} className="btn-primary"
              style={{ justifyContent: 'center', height: '40px', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
              {loading
                ? <><Loader size={15} style={{ animation: 'spin 1s linear infinite' }} /> Mendaftarkan...</>
                : <><UserPlus size={15} /> Buat Akun</>
              }
            </button>

          </form>

          <hr style={{ border: 'none', borderTop: '1px solid #EAECF0', margin: '1.25rem 0' }} />
          <p style={{ textAlign: 'center', fontSize: '0.8125rem', color: '#54595D', margin: 0 }}>
            Sudah punya akun?{' '}
            <Link href="/masuk" className="wiki-link" style={{ fontWeight: 700 }}>Masuk di sini</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
