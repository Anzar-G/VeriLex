export default function Loading() {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        gap: '1.5rem',
      }}
    >
      <div style={{ position: 'relative' }}>
        <img
          src="/verilex-logo.png"
          alt="VeriLex Logo Loading"
          className="pulse-logo"
          style={{
            height: '110px',
            width: '110px',
            borderRadius: '16px',
            objectFit: 'cover',
            border: '2px solid var(--navy)',
            transition: 'transform 0.3s ease',
          }}
        />
      </div>

      <div style={{ textAlign: 'center' }}>
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: '1.25rem',
            color: 'var(--navy)',
            margin: '0 0 0.25rem',
            letterSpacing: '0.02em',
          }}
        >
          VeriLex
        </h2>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.75rem',
            color: 'var(--steel-muted)',
            margin: 0,
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            fontWeight: 600,
          }}
        >
          Memuat Dokumen Hukum...
        </p>
      </div>
    </div>
  );
}
