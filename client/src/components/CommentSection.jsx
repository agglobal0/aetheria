import React, { useState, useEffect } from 'react';
import { MessageSquare, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { commentService } from '../services/api';
import { formatDate } from '../utils/helpers';

export default function CommentSection({ essayId }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [content, setContent] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    async function loadComments() {
      if (!essayId) return;
      try {
        const res = await commentService.getByEssay(essayId);
        if (res.data.success) {
          setComments(res.data.data);
        }
      } catch (err) {
        console.error('Failed to load comments:', err);
      } finally {
        setLoading(false);
      }
    }
    loadComments();
  }, [essayId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !content) {
      setFeedback({ type: 'error', message: 'Please fill in all fields (name, email, comment).' });
      return;
    }

    setSubmitting(true);
    setFeedback(null);

    try {
      const res = await commentService.addComment(essayId, { name, email, content });
      if (res.data.success) {
        setComments(prev => [res.data.data, ...prev]);
        setContent('');
        setFeedback({ type: 'success', message: 'Your comment has been posted.' });
      }
    } catch (err) {
      setFeedback({ type: 'error', message: err.response?.data?.message || 'Failed to post comment.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section style={{ marginTop: '4rem', paddingTop: '3rem', borderTop: '1px solid var(--border-color)' }}>
      <h3 style={{
        fontFamily: 'var(--font-serif)',
        fontSize: '1.6rem',
        fontWeight: '700',
        marginBottom: '2rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.6rem',
        color: 'var(--text-primary)'
      }}>
        <MessageSquare size={22} /> Discussion ({comments.length})
      </h3>

      {/* Comment Form */}
      <form onSubmit={handleSubmit} style={{
        backgroundColor: 'var(--bg-secondary)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-md)',
        padding: '1.75rem',
        marginBottom: '3rem'
      }}>
        <h4 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1.25rem', color: 'var(--text-primary)' }}>
          Join the conversation
        </h4>

        {feedback && (
          <div style={{
            padding: '0.75rem 1rem',
            borderRadius: 'var(--radius-sm)',
            marginBottom: '1rem',
            fontSize: '0.875rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            backgroundColor: feedback.type === 'success' ? 'rgba(46, 139, 128, 0.15)' : 'rgba(139, 38, 62, 0.15)',
            color: feedback.type === 'success' ? 'var(--accent-technology)' : 'var(--accent-ethics)'
          }}>
            {feedback.type === 'success' ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
            {feedback.message}
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', marginBottom: '0.4rem', color: 'var(--text-muted)' }}>
              Your Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Eleanor Vance"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem',
                fontSize: '0.9rem',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-color)',
                backgroundColor: 'var(--bg-input)',
                color: 'var(--text-primary)',
                outline: 'none'
              }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', marginBottom: '0.4rem', color: 'var(--text-muted)' }}>
              Email Address *
            </label>
            <input
              type="email"
              required
              placeholder="e.g. eleanor@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem',
                fontSize: '0.9rem',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-color)',
                backgroundColor: 'var(--bg-input)',
                color: 'var(--text-primary)',
                outline: 'none'
              }}
            />
          </div>
        </div>

        <div style={{ marginBottom: '1.25rem' }}>
          <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', marginBottom: '0.4rem', color: 'var(--text-muted)' }}>
            Your Reflection *
          </label>
          <textarea
            required
            rows={4}
            placeholder="Share your thoughtful perspective on this essay..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            style={{
              width: '100%',
              padding: '0.75rem',
              fontSize: '0.925rem',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-color)',
              backgroundColor: 'var(--bg-input)',
              color: 'var(--text-primary)',
              outline: 'none',
              resize: 'vertical'
            }}
          />
        </div>

        <button type="submit" disabled={submitting} className="btn btn-primary" style={{ padding: '0.75rem 1.5rem', gap: '0.5rem' }}>
          <Send size={16} /> {submitting ? 'Posting...' : 'Post Thought'}
        </button>
      </form>

      {/* Comments List */}
      {loading ? (
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Loading comments...</p>
      ) : comments.length === 0 ? (
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', fontStyle: 'italic' }}>
          No thoughts shared yet. Be the first to start the conversation.
        </p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {comments.map(c => (
            <div key={c.id} style={{
              padding: '1.25rem 1.5rem',
              backgroundColor: 'var(--bg-secondary)',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-color)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ fontWeight: '600', fontSize: '0.95rem', color: 'var(--text-primary)' }}>
                  {c.name}
                </span>
                <span style={{ fontSize: '0.775rem', color: 'var(--text-muted)' }}>
                  {formatDate(c.created_at)}
                </span>
              </div>
              <p style={{ fontSize: '0.925rem', color: 'var(--text-secondary)', lineHeight: '1.6', whiteSpace: 'pre-line' }}>
                {c.content}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
