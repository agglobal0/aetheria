import React, { useState } from 'react';
import { Mail, CheckCircle, AlertCircle, ArrowRight } from 'lucide-react';
import { newsletterService } from '../services/api';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      setStatus('error');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      const res = await newsletterService.subscribe(email);
      if (res.data.success) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
        setErrorMessage(res.data.message || 'Subscription failed. Please try again.');
      }
    } catch (err) {
      console.error('Newsletter subscribe error:', err);
      setStatus('error');
      setErrorMessage(err.response?.data?.message || 'Subscription failed. Please try again.');
    }
  };

  return (
    <div style={{
      backgroundColor: 'var(--bg-secondary)',
      border: '1px solid var(--border-color)',
      borderRadius: 'var(--radius-lg)',
      padding: '3.5rem 2.5rem',
      margin: '4rem 0',
      textAlign: 'center',
      position: 'relative'
    }} className="animate-fade-in">
      <div style={{ maxWidth: '640px', margin: '0 auto' }}>
        
        <div style={{
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          backgroundColor: 'var(--bg-tertiary)',
          border: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.5rem auto',
          color: 'var(--text-primary)'
        }}>
          <Mail size={22} />
        </div>

        <h3 className="serif-heading" style={{ fontSize: '2.2rem', marginBottom: '0.75rem', fontWeight: '700' }}>
          The Sunday Reflections
        </h3>

        <p style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '1.1rem',
          color: 'var(--text-secondary)',
          lineHeight: '1.6',
          marginBottom: '2rem'
        }}>
          Delivered every Sunday morning: one deep-dive essay on ethics, human behavior, technology, or life, with zero spam or promotional noise.
        </p>

        {status === 'success' ? (
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.6rem',
            padding: '1rem 1.75rem',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'rgba(46, 139, 128, 0.15)',
            border: '1px solid rgba(46, 139, 128, 0.3)',
            color: 'var(--accent-technology)',
            fontSize: '0.95rem',
            fontWeight: '600'
          }}>
            <CheckCircle size={18} /> Thank you for subscribing to Aetheria Essays.
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
            <div style={{
              display: 'flex',
              gap: '0.75rem',
              width: '100%',
              maxWidth: '480px',
              flexWrap: 'wrap'
            }}>
              <input
                type="email"
                required
                placeholder="Enter your email address..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status === 'loading'}
                style={{
                  flex: 1,
                  minWidth: '240px',
                  padding: '0.85rem 1.25rem',
                  fontSize: '0.95rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-color)',
                  backgroundColor: 'var(--bg-input)',
                  color: 'var(--text-primary)',
                  outline: 'none'
                }}
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="btn btn-primary"
                style={{ padding: '0.85rem 1.5rem', whiteSpace: 'nowrap', gap: '0.4rem' }}
              >
                {status === 'loading' ? 'Subscribing...' : <>Subscribe <ArrowRight size={16} /></>}
              </button>
            </div>

            {status === 'error' && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                color: 'var(--accent-ethics)',
                fontSize: '0.875rem',
                marginTop: '0.5rem'
              }}>
                <AlertCircle size={14} /> {errorMessage}
              </div>
            )}
          </form>
        )}

      </div>
    </div>
  );
}
