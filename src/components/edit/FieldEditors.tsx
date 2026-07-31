'use client';

import { useState } from 'react';
import { Plus, Trash2, GripVertical } from 'lucide-react';

// ── Shared styles ─────────────────────────────────────────────────────────
const inputStyle: React.CSSProperties = {
  width: '100%', border: '1px solid #A2A9B1', borderRadius: '2px',
  padding: '0.375rem 0.625rem', fontSize: '0.875rem',
  fontFamily: 'var(--font-body)', outline: 'none', backgroundColor: '#FFFFFF',
};

const labelStyle: React.CSSProperties = {
  display: 'block', fontSize: '0.75rem', fontWeight: 700,
  color: '#54595D', marginBottom: '0.25rem',
};

const fieldGroupStyle: React.CSSProperties = {
  marginBottom: '1rem',
};

// ── TextField ─────────────────────────────────────────────────────────────
interface TextFieldProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  mono?: boolean;
  placeholder?: string;
}
export function TextField({ label, value, onChange, mono, placeholder }: TextFieldProps) {
  return (
    <div style={fieldGroupStyle}>
      <label style={labelStyle}>{label}</label>
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        style={{ ...inputStyle, fontFamily: mono ? 'var(--font-mono)' : 'var(--font-body)', fontStyle: mono ? 'italic' : 'normal' }}
      />
    </div>
  );
}

// ── TextArea ──────────────────────────────────────────────────────────────
interface TextAreaProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
  placeholder?: string;
  hint?: string;
}
export function TextAreaField({ label, value, onChange, rows = 5, placeholder, hint }: TextAreaProps) {
  return (
    <div style={fieldGroupStyle}>
      <label style={labelStyle}>{label}</label>
      {hint && <p style={{ fontSize: '0.6875rem', color: '#72777D', margin: '0 0 0.25rem' }}>{hint}</p>}
      <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }}
      />
    </div>
  );
}

// ── SelectField ───────────────────────────────────────────────────────────
interface SelectFieldProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}
export function SelectField({ label, value, onChange, options }: SelectFieldProps) {
  return (
    <div style={fieldGroupStyle}>
      <label style={labelStyle}>{label}</label>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        style={{ ...inputStyle, cursor: 'pointer' }}
      >
        {options.map(o => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </div>
  );
}

// ── MultiSelectField (checkboxes) ─────────────────────────────────────────
interface MultiSelectProps {
  label: string;
  value: string[];
  onChange: (v: string[]) => void;
  options: { value: string; label: string }[];
}
export function MultiSelectField({ label, value, onChange, options }: MultiSelectProps) {
  const toggle = (v: string) =>
    onChange(value.includes(v) ? value.filter(x => x !== v) : [...value, v]);
  return (
    <div style={fieldGroupStyle}>
      <label style={labelStyle}>{label}</label>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
        {options.map(o => (
          <label key={o.value} style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', cursor: 'pointer', fontSize: '0.8125rem', padding: '0.25rem 0.5rem', border: `1px solid ${value.includes(o.value) ? '#0F1B3C' : '#A2A9B1'}`, backgroundColor: value.includes(o.value) ? '#EEF2FF' : '#FFFFFF' }}>
            <input type="checkbox" checked={value.includes(o.value)} onChange={() => toggle(o.value)} style={{ accentColor: '#0F1B3C' }} />
            {o.label}
          </label>
        ))}
      </div>
    </div>
  );
}

// ── StringListEditor (array of strings: elements, conditions, exceptions…) ──
interface StringListProps {
  label: string;
  value: string[];
  onChange: (v: string[]) => void;
  placeholder?: string;
  hint?: string;
}
export function StringListEditor({ label, value, onChange, placeholder, hint }: StringListProps) {
  const update = (i: number, v: string) => { const a = [...value]; a[i] = v; onChange(a); };
  const remove = (i: number) => onChange(value.filter((_, idx) => idx !== i));
  const add    = () => onChange([...value, '']);

  return (
    <div style={fieldGroupStyle}>
      <label style={labelStyle}>{label}</label>
      {hint && <p style={{ fontSize: '0.6875rem', color: '#72777D', margin: '0 0 0.375rem' }}>{hint}</p>}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
        {value.map((item, i) => (
          <div key={i} style={{ display: 'flex', gap: '0.375rem', alignItems: 'center' }}>
            <GripVertical size={14} style={{ color: '#A2A9B1', flexShrink: 0 }} />
            <input
              type="text"
              value={item}
              onChange={e => update(i, e.target.value)}
              placeholder={placeholder || `Item ${i + 1}`}
              style={{ ...inputStyle, flex: 1 }}
            />
            <button type="button" onClick={() => remove(i)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#C85A54', padding: '0.125rem', flexShrink: 0 }} aria-label="Hapus item">
              <Trash2 size={14} />
            </button>
          </div>
        ))}
        <button type="button" onClick={add} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', color: '#0645AD', background: 'none', border: '1px dashed #A2A9B1', cursor: 'pointer', fontSize: '0.8125rem', padding: '0.375rem 0.75rem', marginTop: '0.25rem' }}>
          <Plus size={13} /> Tambah item
        </button>
      </div>
    </div>
  );
}

// ── WordByWordEditor ──────────────────────────────────────────────────────
interface WordEntry { word: string; meaning: string; }
interface WordByWordProps {
  label: string;
  value: WordEntry[];
  onChange: (v: WordEntry[]) => void;
}
export function WordByWordEditor({ label, value, onChange }: WordByWordProps) {
  const update = (i: number, field: keyof WordEntry, v: string) => {
    const a = value.map((item, idx) => idx === i ? { ...item, [field]: v } : item);
    onChange(a);
  };
  const remove = (i: number) => onChange(value.filter((_, idx) => idx !== i));
  const add    = () => onChange([...value, { word: '', meaning: '' }]);

  return (
    <div style={fieldGroupStyle}>
      <label style={labelStyle}>{label}</label>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {value.map((entry, i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '0.375rem', alignItems: 'center', padding: '0.375rem', backgroundColor: '#F8F9FA', border: '1px solid #EAECF0' }}>
            <input type="text" value={entry.word} onChange={e => update(i, 'word', e.target.value)} placeholder="Kata Latin" style={{ ...inputStyle, fontStyle: 'italic' }} />
            <input type="text" value={entry.meaning} onChange={e => update(i, 'meaning', e.target.value)} placeholder="Arti" style={inputStyle} />
            <button type="button" onClick={() => remove(i)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#C85A54' }} aria-label="Hapus">
              <Trash2 size={13} />
            </button>
          </div>
        ))}
        <button type="button" onClick={add} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', color: '#0645AD', background: 'none', border: '1px dashed #A2A9B1', cursor: 'pointer', fontSize: '0.8125rem', padding: '0.375rem 0.75rem' }}>
          <Plus size={13} /> Tambah kata
        </button>
      </div>
    </div>
  );
}

// ── NestedObjectEditor (philosophicalMeaning, analysis) ──────────────────
interface NestedObjectProps {
  label: string;
  value: Record<string, string>;
  fields: { key: string; label: string; rows?: number }[];
  onChange: (v: Record<string, string>) => void;
}
export function NestedObjectEditor({ label, value, fields, onChange }: NestedObjectProps) {
  const update = (key: string, v: string) => onChange({ ...value, [key]: v });
  return (
    <div style={fieldGroupStyle}>
      <label style={{ ...labelStyle, fontSize: '0.8125rem', marginBottom: '0.5rem' }}>{label}</label>
      <div style={{ border: '1px solid #EAECF0', padding: '0.75rem', backgroundColor: '#FAFAFA', display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
        {fields.map(f => (
          <div key={f.key}>
            <label style={labelStyle}>{f.label}</label>
            <textarea
              value={value[f.key] || ''}
              onChange={e => update(f.key, e.target.value)}
              rows={f.rows || 3}
              style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

// ── KeyValueListEditor (relatedTerms: {term, definition}) ─────────────────
interface KVEntry { [key: string]: string; }
interface KVListProps {
  label: string;
  value: KVEntry[];
  keys: { key: string; label: string; placeholder?: string }[];
  onChange: (v: KVEntry[]) => void;
}
export function KeyValueListEditor({ label, value, keys, onChange }: KVListProps) {
  const update = (i: number, k: string, v: string) => {
    const a = value.map((item, idx) => idx === i ? { ...item, [k]: v } : item);
    onChange(a);
  };
  const remove = (i: number) => onChange(value.filter((_, idx) => idx !== i));
  const add    = () => { const blank: KVEntry = {}; keys.forEach(k => { blank[k.key] = ''; }); onChange([...value, blank]); };

  return (
    <div style={fieldGroupStyle}>
      <label style={labelStyle}>{label}</label>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {value.map((entry, i) => (
          <div key={i} style={{ border: '1px solid #EAECF0', padding: '0.5rem', backgroundColor: '#F8F9FA', display: 'flex', gap: '0.375rem', alignItems: 'flex-start' }}>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              {keys.map(k => (
                <input key={k.key} type="text" value={entry[k.key] || ''} onChange={e => update(i, k.key, e.target.value)}
                  placeholder={k.placeholder || k.label} style={inputStyle} />
              ))}
            </div>
            <button type="button" onClick={() => remove(i)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#C85A54', paddingTop: '0.25rem' }} aria-label="Hapus">
              <Trash2 size={13} />
            </button>
          </div>
        ))}
        <button type="button" onClick={add} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', color: '#0645AD', background: 'none', border: '1px dashed #A2A9B1', cursor: 'pointer', fontSize: '0.8125rem', padding: '0.375rem 0.75rem' }}>
          <Plus size={13} /> Tambah entri
        </button>
      </div>
    </div>
  );
}

// ── CaseExampleEditor (jurisprudence) ─────────────────────────────────────
interface CaseEntry {
  id: string; courtName: string; caseNumber: string;
  year: number; excerpt: string; context: string;
  analysis?: string; summary: string; sourceUrl?: string;
}
interface CaseEditorProps {
  label: string;
  value: CaseEntry[];
  onChange: (v: CaseEntry[]) => void;
}
export function CaseExampleEditor({ label, value, onChange }: CaseEditorProps) {
  const update = (i: number, field: keyof CaseEntry, v: string | number) => {
    const a = value.map((item, idx) => idx === i ? { ...item, [field]: v } : item);
    onChange(a);
  };
  const remove = (i: number) => onChange(value.filter((_, idx) => idx !== i));
  const add    = () => onChange([...value, { id: `case-${Date.now()}`, courtName: '', caseNumber: '', year: new Date().getFullYear(), excerpt: '', context: '', summary: '' }]);

  return (
    <div style={fieldGroupStyle}>
      <label style={labelStyle}>{label}</label>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {value.map((c, i) => (
          <div key={i} style={{ border: '1px solid #EAECF0', padding: '0.75rem', backgroundColor: '#F8F9FA' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#54595D' }}>Kasus {i + 1}</span>
              <button type="button" onClick={() => remove(i)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#C85A54' }} aria-label="Hapus kasus">
                <Trash2 size={13} />
              </button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.375rem' }}>
              <input type="text" value={c.courtName} onChange={e => update(i, 'courtName', e.target.value)} placeholder="Nama Pengadilan" style={inputStyle} />
              <input type="text" value={c.caseNumber} onChange={e => update(i, 'caseNumber', e.target.value)} placeholder="Nomor Perkara" style={inputStyle} />
              <input type="number" value={c.year} onChange={e => update(i, 'year', parseInt(e.target.value))} placeholder="Tahun" style={inputStyle} />
              <input type="text" value={c.sourceUrl || ''} onChange={e => update(i, 'sourceUrl', e.target.value)} placeholder="URL Sumber (opsional)" style={inputStyle} />
            </div>
            <textarea value={c.excerpt} onChange={e => update(i, 'excerpt', e.target.value)} placeholder="Kutipan putusan..." rows={2} style={{ ...inputStyle, marginTop: '0.375rem', resize: 'vertical' }} />
            <textarea value={c.context} onChange={e => update(i, 'context', e.target.value)} placeholder="Konteks perkara..." rows={2} style={{ ...inputStyle, marginTop: '0.375rem', resize: 'vertical' }} />
            <textarea value={c.summary} onChange={e => update(i, 'summary', e.target.value)} placeholder="Ringkasan..." rows={2} style={{ ...inputStyle, marginTop: '0.375rem', resize: 'vertical' }} />
          </div>
        ))}
        <button type="button" onClick={add} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', color: '#0645AD', background: 'none', border: '1px dashed #A2A9B1', cursor: 'pointer', fontSize: '0.8125rem', padding: '0.375rem 0.75rem' }}>
          <Plus size={13} /> Tambah kasus
        </button>
      </div>
    </div>
  );
}

// ── BooleanField ──────────────────────────────────────────────────────────
interface BooleanFieldProps {
  label: string;
  value: boolean;
  onChange: (v: boolean) => void;
}
export function BooleanField({ label, value, onChange }: BooleanFieldProps) {
  return (
    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.8125rem', marginBottom: '0.5rem' }}>
      <input type="checkbox" checked={value} onChange={e => onChange(e.target.checked)} style={{ accentColor: '#0F1B3C', width: '16px', height: '16px' }} />
      <span style={{ color: '#202122', fontWeight: 500 }}>{label}</span>
    </label>
  );
}
