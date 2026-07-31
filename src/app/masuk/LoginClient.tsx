'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Eye, EyeOff, Loader, LogIn } from 'lucide-react';
import { signIn, getUserProfile } from '@/lib/auth';
import { useVeriLexStore } from '@/lib/useStore';
import type { UserRole } from '@/lib/useStore';

export default function LoginClient() {
  const router = useRouter();
  const { setAuthUser } = useVeriLexStore();

  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { data, error: authErr } = await signIn(email, password);

    if (authErr || !data.user) {
      setError(authErr?.message === 'Invalid login credentials'
        ? 'Email atau kata sandi salah.'
        : authErr?.message || 'Terjadi kesalahan. Coba lagi.');
      setLoading(false);
      return;
    }

    // Fetch profile + role — with fallback so redirect always happens
    try {
      const { profile, role } = await getUserProfile(data.user.id);
      setAuthUser({
        id: data.user.id,
        email: data.user.email!,
        username: profile?.username || email.split('@')[0],
        displayName: profile?.display_name || email.split('@')[0],
        role: (role as UserRole) || 'contributor',
        avatarUrl: profile?.avatar_url,
      });
    } catch {
      // Profile fetch failed — still log them in with minimal info
      setAuthUser({
        id: data.user.id,
        email: data.user.email!,
        username: email.split('@')[0],
        displayName: email.split('@')[0],
        role: 'contributor',
      });
    }

    // Always redirect — never leave user stuck on loading
    router.push('/');
  }

  return (
    <div style={{ minHeight: 'calc(100vh - 92px)', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F6F6F6', padding: '2rem 1rem' }}>
      <div style={{ width: '100%', maxWidth: '400px' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <Link href="/" style={{ display: 'inline-block' }}>
            <img src="/verilex-logo.png" alt="VeriLex" style={{ height: '64px', width: 'auto', display: 'block', margin: '0 auto 0.75rem' }} />
          </Link>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 400, color: '#000', margin: '0 0 0.25rem', borderBottom: 'none', paddingBottom: 0 }}>
            Masuk ke VeriLex
          </h1>
          <p style={{ fontSize: '0.8125rem', color: '#54595D', margin: 0 }}>
            Ensiklopedia Maksim Hukum Latin Indonesia
          </p>
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
              <label htmlFor="login-email" style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: '#202122', marginBottom: '0.25rem' }}>
                Alamat Email
              </label>
              <input
                id="login-email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                autoComplete="email"
                placeholder="nama@email.com"
                className="input-text"
                style={{ fontSize: '0.875rem' }}
              />
            </div>

            <div>
              <label htmlFor="login-password" style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: '#202122', marginBottom: '0.25rem' }}>
                Kata Sandi
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  id="login-password"
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className="input-text"
                  style={{ fontSize: '0.875rem', paddingRight: '2.5rem' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(p => !p)}
                  style={{ position: 'absolute', right: '0.625rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#72777D' }}
                  aria-label={showPass ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary"
              style={{ justifyContent: 'center', height: '40px', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.375rem' }}
            >
              {loading
                ? <><Loader size={15} style={{ animation: 'spin 1s linear infinite' }} /> Memverifikasi...</>
                : <><LogIn size={15} /> Masuk</>
              }
            </button>

          </form>

          <hr style={{ border: 'none', borderTop: '1px solid #EAECF0', margin: '1.25rem 0' }} />

          <p style={{ textAlign: 'center', fontSize: '0.8125rem', color: '#54595D', margin: 0 }}>
            Belum punya akun?{' '}
            <Link href="/daftar" className="wiki-link" style={{ fontWeight: 700 }}>
              Daftar sekarang
            </Link>
          </p>
        </div>

        <p style={{ textAlign: 'center', fontSize: '0.75rem', color: '#72777D', marginTop: '1rem' }}>
          Dengan masuk, Anda setuju dengan{' '}
          <Link href="/panduan" className="wiki-link">Panduan Kontributor</Link> VeriLex.
        </p>
      </div>
    </div>
  );
}
