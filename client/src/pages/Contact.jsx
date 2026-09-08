import React, { useState } from 'react';
import { Mail, Send, CheckCircle, AlertCircle, MapPin, MessageSquare } from 'lucide-react';
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
        setFeedbackMessage(res.data.message || 'Your message has been received by our editorial team.');
        setFormData({ name: '', email: '', subject: '', message: '' });
      }
    } catch (err) {
      setStatus('error');
      setFeedbackMessage(err.response?.data?.message || 'Failed to send message. Please try again.');
    }
  };

  return (
    <div className="container" style={{ padding: '3rem 1.5rem 6rem 1.5rem' }}>
      <Breadcrumbs items={[{ label: 'Editorial Contact' }]} />

      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span style={{ fontSize: '0.75rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: '700' }}>
            Get in Touch
          </span>
          <h1 className="serif-heading" style={{ fontSize: '3rem', marginTop: '0.3rem', marginBottom: '1rem' }}>
            Editorial Correspondence
          </h1>
          <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '580px', margin: '0 auto' }}>
            Have a thought to share, an essay proposal, or a feedback inquiry? We read every submission attentively.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '3rem' }}>
          
          {/* Contact Info Sidebar */}
          <div style={{ gridColumn: 'span 4' }} className="contact-info">
            <div style={{
              backgroundColor: 'var(--bg-secondary)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)',
              padding: '2rem',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              gap: '2rem'
            }}>
              <div>
                <h3 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: '700', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                  Editorial Desk
                </h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-primary)', fontSize: '0.95rem' }}>
                  <Mail size={18} />
                  <span>editor@aetheria.org</span>
                </div>
              </div>

              <div>
                <h3 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: '700', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                  Submissions
                </h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-primary)', fontSize: '0.95rem' }}>
                  <MessageSquare size={18} />
                  <span>essays@aetheria.org</span>
                </div>
              </div>

              <div>
                <h3 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: '700', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                  HQ Office
                </h3>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', color: 'var(--text-primary)', fontSize: '0.95rem' }}>
                  <MapPin size={18} style={{ flexShrink: 0, marginTop: '0.2rem' }} />
                  <span>Aetheria Review, 148 Humanities Plaza, Cambridge, MA</span>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div style={{ gridColumn: 'span 8' }} className="contact-form-wrap">
            <form onSubmit={handleSubmit} style={{
              backgroundColor: 'var(--bg-secondary)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)',
              padding: '2.5rem'
            }}>
              
              {status === 'success' && (
                <div style={{
                  padding: '1rem 1.25rem',
                  backgroundColor: 'rgba(46, 139, 128, 0.15)',
                  color: 'var(--accent-technology)',
                  borderRadius: 'var(--radius-sm)',
                  marginBottom: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  fontSize: '0.925rem'
                }}>
                  <CheckCircle size={20} /> {feedbackMessage}
                </div>
              )}

              {status === 'error' && (
                <div style={{
                  padding: '1rem 1.25rem',
                  backgroundColor: 'rgba(139, 38, 62, 0.15)',
                  color: 'var(--accent-ethics)',
                  borderRadius: 'var(--radius-sm)',
                  marginBottom: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  fontSize: '0.925rem'
                }}>
                  <AlertCircle size={20} /> {feedbackMessage}
                </div>
              )}

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '1.25rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: '600', marginBottom: '0.4rem', color: 'var(--text-muted)' }}>
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="e.g. Dr. Eleanor Vance"
                    value={formData.name}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '0.8rem',
                      fontSize: '0.925rem',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--border-color)',
                      backgroundColor: 'var(--bg-input)',
                      color: 'var(--text-primary)',
                      outline: 'none'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: '600', marginBottom: '0.4rem', color: 'var(--text-muted)' }}>
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
                      padding: '0.8rem',
                      fontSize: '0.925rem',
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
                <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: '600', marginBottom: '0.4rem', color: 'var(--text-muted)' }}>
                  Subject *
                </label>
                <input
                  type="text"
                  name="subject"
                  required
                  placeholder="e.g. Inquiry regarding essay submission"
                  value={formData.subject}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '0.8rem',
                    fontSize: '0.925rem',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-color)',
                    backgroundColor: 'var(--bg-input)',
                    color: 'var(--text-primary)',
                    outline: 'none'
                  }}
                />
              </div>

              <div style={{ marginBottom: '1.75rem' }}>
                <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: '600', marginBottom: '0.4rem', color: 'var(--text-muted)' }}>
                  Message *
                </label>
                <textarea
                  name="message"
                  required
                  rows={6}
                  placeholder="Write your note to the editorial team..."
                  value={formData.message}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '0.8rem',
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

              <button
                type="submit"
                disabled={status === 'loading'}
                className="btn btn-primary"
                style={{ width: '100%', padding: '0.9rem', gap: '0.5rem', fontSize: '0.95rem' }}
              >
                <Send size={18} /> {status === 'loading' ? 'Sending Message...' : 'Send Message'}
              </button>
            </form>
          </div>

        </div>
      </div>

      <style>{`
        @media (max-width: 840px) {
          .contact-info { grid-column: span 12 !important; }
          .contact-form-wrap { grid-column: span 12 !important; }
        }
      `}</style>
    </div>
  );
}
