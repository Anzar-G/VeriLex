'use client';

import { Star, NotebookPen } from 'lucide-react';

type Tab = 'baca' | 'diskusi' | 'catatan' | 'sunting' | 'riwayat';

interface Props {
  activeTab: Tab;
  isFav: boolean;
  onTabChange: (tab: Tab) => void;
  onToggleFav: () => void;
}

/**
 * Tab navigasi artikel — skema konsisten.
 *
 * Grup kiri  : Halaman | Diskusi | Catatan
 * Grup kanan : Baca | Sunting | Riwayat | ★
 *
 * P2-3: Diskusi & Catatan dipisah menjadi dua tab terpisah.
 */
export default function ArticleTabBar({ activeTab, isFav, onTabChange, onToggleFav }: Props) {
  const isReadingMode = activeTab === 'baca';
  const isEditingMode = activeTab === 'sunting';
  const isPageGroup   = isReadingMode || isEditingMode;

  return (
    <div className="vector-tabs-container">
      {/* Grup kiri: konteks halaman */}
      <div className="vector-tabs-group">
        <button
          onClick={() => onTabChange('baca')}
          className={`vector-tab-item vector-tab-btn ${isPageGroup ? 'active' : ''}`}
          aria-current={isPageGroup ? 'page' : undefined}
        >
          Halaman
        </button>
        <button
          onClick={() => onTabChange('diskusi')}
          className={`vector-tab-item vector-tab-btn ${activeTab === 'diskusi' ? 'active' : ''}`}
          aria-current={activeTab === 'diskusi' ? 'page' : undefined}
          title="Diskusi komunitas"
        >
          Diskusi
        </button>
        <button
          onClick={() => onTabChange('catatan')}
          className={`vector-tab-item vector-tab-btn ${activeTab === 'catatan' ? 'active' : ''}`}
          aria-current={activeTab === 'catatan' ? 'page' : undefined}
          title="Catatan pribadi Anda"
          style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}
        >
          <NotebookPen size={12} />
          Catatan
        </button>
      </div>

      {/* Grup kanan: aksi pada halaman */}
      <div className="vector-tabs-group">
        <button
          onClick={() => onTabChange('baca')}
          className={`vector-tab-item vector-tab-btn ${isReadingMode ? 'active' : ''}`}
          aria-current={isReadingMode ? 'page' : undefined}
          title="Mode baca"
        >
          Baca
        </button>
        <button
          onClick={() => onTabChange('sunting')}
          className={`vector-tab-item vector-tab-btn ${isEditingMode ? 'active' : ''}`}
          aria-current={isEditingMode ? 'page' : undefined}
          title="Sunting artikel"
        >
          Sunting
        </button>
        <button
          onClick={() => onTabChange('riwayat')}
          className={`vector-tab-item vector-tab-btn ${activeTab === 'riwayat' ? 'active' : ''}`}
          aria-current={activeTab === 'riwayat' ? 'page' : undefined}
          title="Lihat riwayat suntingan"
        >
          Riwayat
        </button>
        <button
          onClick={onToggleFav}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            padding: '0 0.5rem',
            color: isFav ? 'var(--bronze)' : '#72777D',
            transition: 'color 150ms',
          }}
          aria-label={isFav ? 'Hapus dari favorit' : 'Simpan ke favorit'}
          aria-pressed={isFav}
        >
          <Star size={14} fill={isFav ? 'var(--bronze)' : 'none'} />
        </button>
      </div>
    </div>
  );
}
