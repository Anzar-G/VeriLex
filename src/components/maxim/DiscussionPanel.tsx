'use client';

import { useState, useEffect, useCallback } from 'react';
import { MessageSquare, Reply, Trash2, ChevronDown, ChevronUp, Send } from 'lucide-react';
import { useVeriLexStore } from '@/lib/useStore';
import { apiFetch } from '@/lib/api-fetch';

interface Discussion {
  id: string;
  maxim_id: string;
  parent_id: string | null;
  author_id: string | null;
  author_name: string;
  content: string;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
  replies?: Discussion[];
}

interface DiscussionPanelProps {
  maximId: string;
  latinPhrase: string;
}

function timeAgo(dateStr: string): string {
  const seconds = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
  if (seconds < 60) return 'baru saja';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} menit lalu`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} jam lalu`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days} hari lalu`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months} bulan lalu`;
  return `${Math.floor(months / 12)} tahun lalu`;
}

function buildThreads(flat: Discussion[]): Discussion[] {
  const map = new Map<string, Discussion>();
  const roots: Discussion[] = [];
  flat.forEach((d) => {
    map.set(d.id, { ...d, replies: [] });
  });
  map.forEach((d) => {
    if (d.parent_id) {
      const parent = map.get(d.parent_id);
      if (parent) parent.replies!.push(d);
      else roots.push(d);
    } else {
      roots.push(d);
    }
  });
  return roots;
}

interface CommentFormProps {
  placeholder?: string;
  onSubmit: (content: string, authorName: string) => Promise<void>;
  authorName: string;
  buttonLabel?: string;
  compact?: boolean;
}

function CommentForm({
  placeholder = 'Tulis komentar hukum Anda...',
  onSubmit,
  authorName,
  buttonLabel = 'Kirim',
  compact = false,
}: CommentFormProps) {
  const [content, setContent] = useState('');
  const [name, setName] = useState(authorName);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    setLoading(true);
    setError('');
    try {
      await onSubmit(content.trim(), name.trim() || 'Anonim');
      setContent('');
    } catch {
      setError('Gagal mengirim komentar. Coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: compact ? '0.5rem' : '1rem' }}>
      {!compact && (
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nama Anda (opsional)"
          maxLength={80}
          style={{
            width: '100%',
            border: '1px solid #A2A9B1',
            padding: '0.375rem 0.625rem',
            fontFamily: 'var(--font-body)',
            fontSize: '0.8125rem',
            marginBottom: '0.5rem',
            outline: 'none',
          }}
        />
      )}
      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-end' }}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={placeholder}
          rows={compact ? 2 : 3}
          maxLength={2000}
          style={{
            flex: 1,
            border: '1px solid #A2A9B1',
            padding: '0.5rem 0.625rem',
            fontFamily: 'var(--font-body)',
            fontSize: '0.8125rem',
            outline: 'none',
            resize: 'vertical',
            lineHeight: 1.5,
          }}
        />
        <button
          type="submit"
          disabled={loading || !content.trim()}
          style={{
            backgroundColor: loading || !content.trim() ? '#A2A9B1' : 'var(--navy)',
            color: '#FFFFFF',
            border: 'none',
            padding: '0.5rem 0.875rem',
            fontFamily: 'var(--font-body)',
            fontWeight: 600,
            fontSize: '0.8125rem',
            cursor: loading || !content.trim() ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem',
            flexShrink: 0,
            height: compact ? '60px' : '76px',
          }}
        >
          <Send size={13} />
          {buttonLabel}
        </button>
      </div>
      {error && (
        <p
          style={{
            fontSize: '0.75rem',
            color: 'var(--error)',
            marginTop: '0.375rem',
            fontFamily: 'var(--font-body)',
          }}
        >
          {error}
        </p>
      )}
    </form>
  );
}

interface DiscussionItemProps {
  disc: Discussion;
  depth: number;
  currentUserId: string | null;
  onReply: (parentId: string, content: string, authorName: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  defaultAuthorName: string;
}

function DiscussionItem({
  disc,
  depth,
  currentUserId,
  onReply,
  onDelete,
  defaultAuthorName,
}: DiscussionItemProps) {
  const [showReply, setShowReply] = useState(false);
  const [showReplies, setShowReplies] = useState(true);
  const hasReplies = disc.replies && disc.replies.length > 0;
  const isOwn = currentUserId && disc.author_id === currentUserId;

  return (
    <div
      style={{
        marginLeft: depth > 0 ? '1.5rem' : 0,
        paddingLeft: depth > 0 ? '0.875rem' : 0,
        borderLeft: depth > 0 ? '2px solid #EAECF0' : 'none',
        marginBottom: '0.75rem',
      }}
    >
      {disc.is_deleted ? (
        <div
          style={{
            backgroundColor: '#F8F9FA',
            border: '1px dashed #A2A9B1',
            padding: '0.5rem 0.75rem',
            fontSize: '0.75rem',
            color: '#72777D',
            fontStyle: 'italic',
            fontFamily: 'var(--font-body)',
          }}
        >
          [Komentar telah dihapus]
        </div>
      ) : (
        <div
          style={{
            backgroundColor: depth === 0 ? '#FAFAFA' : '#FFFFFF',
            border: '1px solid #EAECF0',
            padding: '0.625rem 0.875rem',
          }}
        >
          {/* Author & time */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              marginBottom: '0.375rem',
              gap: '0.5rem',
              flexWrap: 'wrap',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 700,
                fontSize: '0.8125rem',
                color: 'var(--navy)',
              }}
            >
              {disc.author_name}
            </span>
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.6875rem',
                color: '#72777D',
              }}
            >
              {timeAgo(disc.created_at)}
            </span>
          </div>

          {/* Content */}
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.875rem',
              lineHeight: 1.6,
              color: '#202122',
              margin: '0 0 0.5rem',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
            }}
          >
            {disc.content}
          </p>

          {/* Actions */}
          <div
            style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}
          >
            {depth < 2 && (
              <button
                onClick={() => setShowReply((p) => !p)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                  fontSize: '0.75rem',
                  color: '#0645AD',
                  padding: 0,
                  fontFamily: 'var(--font-body)',
                }}
              >
                <Reply size={12} /> Balas
              </button>
            )}
            {isOwn && (
              <button
                onClick={() => onDelete(disc.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                  fontSize: '0.75rem',
                  color: '#C85A54',
                  padding: 0,
                  fontFamily: 'var(--font-body)',
                }}
              >
                <Trash2 size={12} /> Hapus
              </button>
            )}
            {hasReplies && (
              <button
                onClick={() => setShowReplies((p) => !p)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                  fontSize: '0.75rem',
                  color: '#54595D',
                  padding: 0,
                  fontFamily: 'var(--font-body)',
                  marginLeft: 'auto',
                }}
              >
                {showReplies ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                {disc.replies!.length} balasan
              </button>
            )}
          </div>

          {showReply && (
            <CommentForm
              placeholder="Tulis balasan Anda..."
              onSubmit={(content, authorName) => {
                setShowReply(false);
                return onReply(disc.id, content, authorName);
              }}
              authorName={defaultAuthorName}
              buttonLabel="Balas"
              compact
            />
          )}
        </div>
      )}

      {hasReplies && showReplies && (
        <div style={{ marginTop: '0.5rem' }}>
          {disc.replies!.map((reply) => (
            <DiscussionItem
              key={reply.id}
              disc={reply}
              depth={depth + 1}
              currentUserId={currentUserId}
              onReply={onReply}
              onDelete={onDelete}
              defaultAuthorName={defaultAuthorName}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function DiscussionPanel({ maximId, latinPhrase }: DiscussionPanelProps) {
  const { authUser } = useVeriLexStore();
  const [discussions, setDiscussions] = useState<Discussion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const defaultAuthorName = authUser?.displayName || '';

  const fetchDiscussions = useCallback(async () => {
    setLoading(true);
    const response = await fetch(`/api/discussions?maxim_id=${encodeURIComponent(maximId)}`);
    const payload = await response.json().catch(() => null);
    if (!response.ok) {
      setError('Gagal memuat diskusi.');
    } else {
      setDiscussions(payload?.data || []);
    }
    setLoading(false);
  }, [maximId]);

  useEffect(() => {
    queueMicrotask(() => { void fetchDiscussions(); });
  }, [fetchDiscussions]);

  const handlePost = async (
    content: string,
    authorName: string,
    parentId: string | null = null
  ) => {
    const response = await apiFetch('/api/discussions', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ maxim_id: maximId, parent_id: parentId, author_name: authorName, content }) });
    if (!response.ok) throw new Error('Gagal mengirim diskusi');
    await fetchDiscussions();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Hapus komentar ini?')) return;
    const response = await apiFetch('/api/discussions', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) });
    if (response.ok) await fetchDiscussions();
  };

  const threads = buildThreads(discussions);
  const currentUserId = authUser?.id || null;

  return (
    <div>
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          marginBottom: '1rem',
          paddingBottom: '0.75rem',
          borderBottom: '1px solid #EAECF0',
        }}
      >
        <MessageSquare size={18} color="var(--navy)" />
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.1rem',
            fontWeight: 700,
            color: 'var(--navy)',
            margin: 0,
            border: 'none',
            padding: 0,
          }}
        >
          Diskusi Artikel
        </h2>
        <span
          style={{
            fontSize: '0.75rem',
            color: '#72777D',
            fontFamily: 'var(--font-body)',
          }}
        >
          — {latinPhrase}
        </span>
      </div>

      <p
        style={{
          fontSize: '0.8125rem',
          color: '#54595D',
          marginBottom: '1.25rem',
          lineHeight: 1.5,
          fontFamily: 'var(--font-body)',
        }}
      >
        Gunakan halaman ini untuk mendiskusikan konten artikel, validitas sumber,
        atau contoh penerapan asas <strong>{latinPhrase}</strong> dalam praktik
        hukum. Harap menjaga kesopanan akademik.
      </p>

      {/* New comment form */}
      <div
        style={{
          border: '1px solid #A2A9B1',
          padding: '1rem',
          backgroundColor: '#F8F9FA',
          marginBottom: '1.5rem',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontWeight: 700,
            fontSize: '0.8125rem',
            color: '#202122',
            margin: '0 0 0.5rem',
          }}
        >
          Tambahkan Komentar Baru
        </p>
        <CommentForm
          onSubmit={(content, authorName) => handlePost(content, authorName)}
          authorName={defaultAuthorName}
        />
      </div>

      {/* Discussion list */}
      {loading ? (
        <div
          style={{
            textAlign: 'center',
            padding: '2rem',
            fontSize: '0.875rem',
            color: '#72777D',
            fontFamily: 'var(--font-body)',
          }}
        >
          Memuat diskusi...
        </div>
      ) : error ? (
        <div
          style={{
            padding: '1rem',
            backgroundColor: '#FFF5F5',
            border: '1px solid #FECACA',
            fontSize: '0.875rem',
            color: 'var(--error)',
            fontFamily: 'var(--font-body)',
          }}
        >
          {error}
        </div>
      ) : threads.length === 0 ? (
        <div
          style={{
            textAlign: 'center',
            padding: '2rem 1rem',
            backgroundColor: '#F8F9FA',
            border: '1px solid #EAECF0',
            fontSize: '0.875rem',
            color: '#72777D',
            fontStyle: 'italic',
            fontFamily: 'var(--font-body)',
          }}
        >
          Belum ada diskusi. Jadilah yang pertama memulai percakapan!
        </div>
      ) : (
        <div>
          {threads.map((disc) => (
            <DiscussionItem
              key={disc.id}
              disc={disc}
              depth={0}
              currentUserId={currentUserId}
              onReply={(parentId, content, authorName) =>
                handlePost(content, authorName, parentId)
              }
              onDelete={handleDelete}
              defaultAuthorName={defaultAuthorName}
            />
          ))}
        </div>
      )}
    </div>
  );
}
