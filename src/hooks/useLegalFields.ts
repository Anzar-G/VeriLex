'use client';

import { useEffect, useState } from 'react';
import type { LegalField, LegalFieldMeta } from '@/types';

// Fallback shape used while loading — labels only, count = 0
const FALLBACK_FIELDS: LegalFieldMeta[] = [
  { id: 'umum',          label: 'Asas Umum & Penafsiran',           count: 0, description: '' },
  { id: 'pidana',        label: 'Hukum Pidana & Acara Pidana',      count: 0, description: '' },
  { id: 'perdata',       label: 'Hukum Perdata & Kontrak',          count: 0, description: '' },
  { id: 'properti',      label: 'Hak Milik & Benda',                count: 0, description: '' },
  { id: 'keluarga',      label: 'Waris & Keluarga',                 count: 0, description: '' },
  { id: 'bisnis',        label: 'Hukum Dagang & Korporasi',         count: 0, description: '' },
  { id: 'internasional', label: 'Hukum Internasional & HAM',        count: 0, description: '' },
  { id: 'tata-negara',   label: 'Hukum Administrasi & Tata Negara', count: 0, description: '' },
  { id: 'acara',         label: 'Hukum Acara Perdata & Pembuktian', count: 0, description: '' },
  { id: 'lain-lain',     label: 'Maksim Lain-Lain & Filosofis',     count: 0, description: '' },
  { id: 'administrasi',  label: 'Hukum Administrasi',               count: 0, description: '' },
].map(f => ({ ...f, id: f.id as LegalField }));

export function useLegalFields() {
  const [fields,  setFields]  = useState<LegalFieldMeta[]>(FALLBACK_FIELDS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/legal-fields')
      .then(r => r.ok ? r.json() : null)
      .then(data => { if (data) setFields(data); })
      .finally(() => setLoading(false));
  }, []);

  return { fields, loading };
}
