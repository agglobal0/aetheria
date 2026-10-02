import React, { useState } from 'react';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import { contactService } from '../services/api';
import Breadcrumbs from '../components/Breadcrumbs';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setStatus('error');
      setFeedbackMessage('Please complete all required fields.');
      return;
    }

    setStatus('loading');
    setFeedbackMessage('');

    try {
      const res = await contactService.submit(formData);
      if (res.data.success) {
        setStatus('success');
        setFeedbackMessage(res.data.message || 'Your message has been received.');
        setFormData({ name: '', email: '', subject: '', message: '' });
      }
    } catch (err) {
      setStatus('error');
      setFeedbackMessage(err.response?.data?.message || 'Failed to send message. Please try again.');
    }
  };

  return (
    <div className="container" style={{ padding: 'clamp(2rem, 4vw, 3rem) clamp(0.875rem, 3vw, 1.5rem) clamp(3rem, 6vw, 6rem) clamp(0.875rem, 3vw, 1.5rem)' }}>
      <Breadcrumbs items={[{ label: 'Editorial Contact' }]} />

      <div style={{ maxWidth: '680px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(2rem, 4vw, 3rem)' }}>
          <span style={{ fontSize: '0.75rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: '700' }}>
            Get in Touch
          </span>
          <h1 className="serif-heading" style={{ fontSize: 'clamp(2rem, 4.5vw, 2.75rem)', marginTop: '0.3rem', marginBottom: '0.85rem' }}>
            Connect with ORAANIS
          </h1>
          <p style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1rem, 2vw, 1.15rem)', color: 'var(--text-secondary)', maxWidth: '540px', margin: '0 auto' }}>
            Have a thought to share, a reflection, or a feedback inquiry? We welcome your message.
          </p>
        </div>

        {/* Form */}
        <div className="contact-form-wrap">
          <form onSubmit={handleSubmit} style={{
            backgroundColor: 'var(--bg-secondary)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-color)',
            padding: 'clamp(1.5rem, 4vw, 2.5rem)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.03)'
          }}>
            
            {status === 'success' && (
              <div style={{
                padding: '0.85rem 1.15rem',
                backgroundColor: 'rgba(46, 139, 128, 0.15)',
                color: 'var(--accent-technology)',
                borderRadius: 'var(--radius-sm)',
                marginBottom: '1.25rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                fontSize: '0.9rem'
              }}>
                <CheckCircle size={18} style={{ flexShrink: 0 }} /> {feedbackMessage}
              </div>
            )}

            {status === 'error' && (
              <div style={{
                padding: '0.85rem 1.15rem',
                backgroundColor: 'rgba(139, 38, 62, 0.15)',
                color: 'var(--accent-ethics)',
                borderRadius: 'var(--radius-sm)',
                marginBottom: '1.25rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                fontSize: '0.9rem'
              }}>
                <AlertCircle size={18} style={{ flexShrink: 0 }} /> {feedbackMessage}
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))', gap: '1rem', marginBottom: '1.15rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', marginBottom: '0.35rem', color: 'var(--text-muted)' }}>
                  Your Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="e.g. Eleanor Vance"
                  value={formData.name}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    fontSize: '16px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-color)',
                    backgroundColor: 'var(--bg-input)',
                    color: 'var(--text-primary)',
                    outline: 'none'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', marginBottom: '0.35rem', color: 'var(--text-muted)' }}>
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="e.g. eleanor@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    fontSize: '16px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-color)',
                    backgroundColor: 'var(--bg-input)',
                    color: 'var(--text-primary)',
                    outline: 'none'
                  }}
                />
              </div>
            </div>

            <div style={{ marginBottom: '1.15rem' }}>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', marginBottom: '0.35rem', color: 'var(--text-muted)' }}>
                Subject *
              </label>
              <input
                type="text"
                name="subject"
                required
                placeholder="e.g. Inquiry regarding reflection / essay"
                value={formData.subject}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  fontSize: '16px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-color)',
                  backgroundColor: 'var(--bg-input)',
                  color: 'var(--text-primary)',
                  outline: 'none'
                }}
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', marginBottom: '0.35rem', color: 'var(--text-muted)' }}>
                Message *
              </label>
              <textarea
                name="message"
                required
                rows={5}
                placeholder="Write your note..."
                value={formData.message}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  fontSize: '16px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-color)',
                  backgroundColor: 'var(--bg-input)',
                  color: 'var(--text-primary)',
                  outline: 'none',
                  resize: 'vertical'
                }}
              />
            </div>

            <button
              type="submit"
              disabled={status === 'loading'}
              className="btn btn-primary"
              style={{ width: '100%', padding: '0.85rem', gap: '0.5rem', fontSize: '0.925rem' }}
            >
              <Send size={16} /> {status === 'loading' ? 'Sending Message...' : 'Send Message'}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
