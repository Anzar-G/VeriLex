import React from 'react';

/**
 * Tabel responsif dengan scroll horizontal + indikator.
 * P0-5: Menggantikan semua <table> telanjang di artikel agar
 *       tidak overflow di layar mobile (360px+).
 *
 * Penggunaan:
 *   <ResponsiveTable
 *     headers={['Kata', 'Bentuk Latin', 'Jenis', 'Arti']}
 *     rows={maxim.wordByWordExtended.map(w => [w.word, w.latinForm, w.partOfSpeech, w.meaning])}
 *   />
 */

interface Props {
  headers: (string | React.ReactNode)[];
  rows: (string | React.ReactNode)[][];
  /** Indeks kolom yang tidak di-wrap (misal kolom pertama yang jadi label) */
  noWrapCols?: number[];
  /** Style override untuk sel header tertentu berdasarkan indeks */
  headerStyles?: Record<number, React.CSSProperties>;
  /** Style override untuk sel data tertentu berdasarkan indeks kolom */
  cellStyles?: Record<number, React.CSSProperties>;
  caption?: string;
}

const BASE_CELL: React.CSSProperties = {
  border: '1px solid #EAECF0',
  padding: '0.375rem 0.625rem',
  fontSize: '0.8125rem',
  verticalAlign: 'top',
  lineHeight: 1.5,
};

const BASE_HEADER: React.CSSProperties = {
  ...BASE_CELL,
  backgroundColor: '#F8F9FA',
  fontWeight: 700,
  whiteSpace: 'nowrap',
};

export default function ResponsiveTable({
  headers,
  rows,
  noWrapCols = [],
  headerStyles = {},
  cellStyles = {},
  caption,
}: Props) {
  return (
    <div
      style={{
        overflowX: 'auto',
        WebkitOverflowScrolling: 'touch',
        margin: '0.5rem 0 1.25rem',
        border: '1px solid #EAECF0',
        borderRadius: '2px',
      }}
      role="region"
      aria-label={caption || 'Tabel data'}
    >
      <table
        style={{
          borderCollapse: 'collapse',
          width: '100%',
          /* Pastikan tabel punya lebar minimum agar tidak terlalu sempit */
          minWidth: `${Math.max(headers.length * 80, 320)}px`,
        }}
      >
        {caption && <caption style={{ fontSize: '0.75rem', color: '#72777D', marginBottom: '0.25rem', textAlign: 'left', padding: '0.25rem 0.5rem' }}>{caption}</caption>}
        <thead>
          <tr style={{ backgroundColor: '#F8F9FA', borderBottom: '1px solid #A2A9B1' }}>
            {headers.map((h, i) => (
              <th key={i} style={{ ...BASE_HEADER, ...headerStyles[i] }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri} style={{ borderBottom: '1px solid #EAECF0', backgroundColor: ri % 2 === 0 ? '#FFFFFF' : 'transparent' }}>
              {row.map((cell, ci) => (
                <td
                  key={ci}
                  style={{
                    ...BASE_CELL,
                    whiteSpace: noWrapCols.includes(ci) ? 'nowrap' : 'normal',
                    ...cellStyles[ci],
                  }}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
          {rows.length === 0 && (
            <tr>
              <td
                colSpan={headers.length}
                style={{ ...BASE_CELL, textAlign: 'center', color: '#72777D', fontStyle: 'italic', padding: '1rem' }}
              >
                Belum ada data.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
