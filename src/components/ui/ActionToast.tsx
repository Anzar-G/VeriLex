'use client';

import { useEffect, useState, createContext, useContext, useCallback } from 'react';
import { CheckCircle, XCircle, Info, AlertTriangle, X } from 'lucide-react';

/* ─── Types ─────────────────────────────────────────────── */
type ToastType = 'success' | 'error' | 'info' | 'warning';

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextValue {
  showToast: (message: string, type?: ToastType) => void;
}

/* ─── Context ─────────────────────────────────────────────── */
const ToastContext = createContext<ToastContextValue>({ showToast: () => {} });

export function useToast() {
  return useContext(ToastContext);
}

/* ─── Config per type ─────────────────────────────────────── */
const CONFIG: Record<ToastType, { bg: string; border: string; color: string; icon: React.ReactNode }> = {
  success: { bg: '#F0FDF4', border: '#86EFAC', color: '#166534', icon: <CheckCircle size={15} /> },
  error:   { bg: '#FEF2F2', border: '#FECACA', color: '#991B1B', icon: <XCircle size={15} /> },
  info:    { bg: '#EFF6FF', border: '#BFDBFE', color: '#1E40AF', icon: <Info size={15} /> },
  warning: { bg: '#FFFBEB', border: '#FDE68A', color: '#92400E', icon: <AlertTriangle size={15} /> },
};

/* ─── Single Toast item ──────────────────────────────────── */
function ToastItem({ toast, onDismiss }: { toast: Toast; onDismiss: () => void }) {
  const c = CONFIG[toast.type];
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Trigger enter animation
    const enter = requestAnimationFrame(() => setVisible(true));
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onDismiss, 300);
    }, 3200);
    return () => {
      cancelAnimationFrame(enter);
      clearTimeout(timer);
    };
  }, [onDismiss]);

  return (
    <div
      role="alert"
      aria-live="polite"
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '0.625rem',
        padding: '0.75rem 1rem',
        backgroundColor: c.bg,
        border: `1px solid ${c.border}`,
        color: c.color,
        fontSize: '0.875rem',
        fontFamily: 'var(--font-body)',
        lineHeight: 1.5,
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        minWidth: '240px',
        maxWidth: '360px',
        // Entry/exit animation
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(8px)',
        transition: 'opacity 250ms ease, transform 250ms ease',
      }}
    >
      <span style={{ flexShrink: 0, marginTop: '1px' }}>{c.icon}</span>
      <span style={{ flex: 1 }}>{toast.message}</span>
      <button
        onClick={() => { setVisible(false); setTimeout(onDismiss, 300); }}
        style={{ background: 'none', border: 'none', cursor: 'pointer', color: c.color, padding: '0', flexShrink: 0, display: 'flex', opacity: 0.7 }}
        aria-label="Tutup notifikasi"
      >
        <X size={13} />
      </button>
    </div>
  );
}

/* ─── Provider ───────────────────────────────────────────── */
export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: ToastType = 'info') => {
    const id = `${Date.now()}-${Math.random()}`;
    setToasts(prev => [...prev, { id, message, type }]);
  }, []);

  const dismiss = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {/* Toast container — bottom-left, above footer */}
      <div
        aria-label="Notifikasi"
        style={{
          position: 'fixed',
          bottom: '1.5rem',
          left: '1.5rem',
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
          pointerEvents: toasts.length ? 'auto' : 'none',
        }}
      >
        {toasts.map(t => (
          <ToastItem key={t.id} toast={t} onDismiss={() => dismiss(t.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

/* ─── Standalone imperative helper (for non-React contexts) ─ */
export default ToastProvider;
