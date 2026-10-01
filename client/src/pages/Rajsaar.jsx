import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Compass, Eye, Sparkles, BookOpen, Feather } from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';

export default function Rajsaar() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div style={{ backgroundColor: 'var(--bg-primary)', minHeight: '100vh', padding: 'clamp(1.5rem, 3vw, 2.5rem) 0 clamp(4rem, 8vw, 7rem) 0' }}>
      <div className="container" style={{ maxWidth: '820px', margin: '0 auto', padding: '0 clamp(1.25rem, 4vw, 2rem)' }}>
        
        {/* Breadcrumb Navigation */}
        <div style={{ marginBottom: '1.5rem' }}>
          <Breadcrumbs items={[{ label: 'RAJSAAR' }]} />
        </div>

        {/* Main Content Card */}
        <article style={{
          backgroundColor: 'var(--bg-secondary)',
          border: '1px solid var(--border-color)',
          borderRadius: '16px',
          padding: 'clamp(2rem, 5vw, 4rem) clamp(1.5rem, 5vw, 3.5rem)',
          boxShadow: '0 4px 20px rgba(44, 38, 33, 0.04)',
          marginBottom: '3rem'
        }}>
          
          {/* Header */}
          <header style={{ textAlign: 'center', marginBottom: 'clamp(2.5rem, 5vw, 3.5rem)' }}>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontSize: '0.82rem',
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              color: 'var(--accent-primary)',
              marginBottom: '0.6rem'
            }}>
              <Eye size={14} /> Through the Mentor’s Lens
            </span>

            <h1 style={{
              fontFamily: 'var(--font-cormorant)',
              fontSize: 'clamp(2.6rem, 6vw, 3.8rem)',
              fontWeight: '700',
              letterSpacing: '0.04em',
              lineHeight: '1.1',
              marginBottom: '0.6rem',
              color: 'var(--text-primary)'
            }}>
              RAJSAAR
            </h1>

            <p style={{
              fontFamily: 'var(--font-cormorant)',
              fontSize: 'clamp(1.2rem, 2.8vw, 1.5rem)',
              fontStyle: 'italic',
              color: 'var(--text-secondary)',
              margin: '0 auto'
            }}>
              Through the Mentor’s Lens
            </p>

            <div style={{
              width: '45px',
              height: '2px',
              backgroundColor: 'var(--accent-primary)',
              margin: '1.25rem auto 0 auto',
              opacity: 0.7
            }} />
          </header>

          {/* Continuous Editorial Essay Prose */}
          <div style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(1.08rem, 2.2vw, 1.22rem)',
            lineHeight: '1.9',
            color: 'var(--text-primary)'
          }}>

            <div style={{ margin: '1.5rem 0', lineHeight: '2' }}>
              <div>Some write to express what they know.</div>
              <div>Some write to share what they have learnt.</div>
              <div>And some write because experience leaves behind thoughts that deserve to be understood.</div>
            </div>

            <p style={{ margin: '2rem 0 1.5rem 0', fontWeight: '600', fontSize: '1.25rem', color: 'var(--accent-primary)' }}>
              RAJSAAR belongs to the latter.
            </p>

            <p style={{ marginBottom: '1.75rem', lineHeight: '1.85' }}>
              An educator by profession, a mentor by nature and an astute observer of people and life, RAJSAAR brings to his writing the perspective of someone who has spent years observing human behaviour, relationships, institutions, choices and the consequences they quietly create.
            </p>

            <div style={{
              padding: '1.25rem 1.5rem',
              backgroundColor: 'var(--bg-tertiary)',
              borderRadius: '8px',
              margin: '2rem 0',
              lineHeight: '1.8',
              borderLeft: '3px solid var(--accent-primary)'
            }}>
              <div style={{ fontWeight: '600', marginBottom: '0.35rem' }}>His writings are not sermons.</div>
              <div style={{ fontStyle: 'italic', color: 'var(--text-secondary)' }}>They are not ready-made answers.</div>
            </div>

            <p style={{ marginBottom: '1.5rem' }}>
              They are reflections born from experience, observation and the questions that life often leaves unanswered.
            </p>

            <p style={{ marginBottom: '1.75rem' }}>
              He writes about people and relationships, ambition and failure, values and contradictions, choices and consequences, and those subtle truths that remain invisible when we look only at the surface.
            </p>

            <p style={{ marginBottom: '1.25rem', fontWeight: '600' }}>
              His purpose is not to tell the reader what to think.
            </p>

            <blockquote style={{
              fontStyle: 'italic',
              fontSize: 'clamp(1.15rem, 2.4vw, 1.32rem)',
              lineHeight: '1.75',
              color: 'var(--accent-primary)',
              borderLeft: '3px solid var(--accent-primary)',
              paddingLeft: '1.25rem',
              margin: '2rem 0',
              backgroundColor: 'var(--bg-tertiary)',
              padding: '1.25rem 1.5rem',
              borderRadius: '0 8px 8px 0'
            }}>
              <p style={{ margin: '0 0 0.5rem 0' }}>It is to make the reader stop, question and look again.</p>
              <p style={{ margin: 0 }}>Because sometimes, what appears obvious is only one version of the truth.</p>
            </blockquote>

            <p style={{ margin: '2rem 0 1.5rem 0', lineHeight: '1.85' }}>
              <strong>RAJSAAR</strong> is a chosen writing identity — deliberately distanced from designation, position and public persona. It allows the words to arrive without the weight of a name or title, and gives the thought its own space to breathe.
            </p>

            <p style={{ marginBottom: '1.5rem', fontStyle: 'italic' }}>
              On this platform, RAJSAAR writes not from a pedestal, but from the vantage point of experience.
            </p>

            <div style={{
              padding: '1.25rem 1.5rem',
              backgroundColor: 'var(--bg-tertiary)',
              borderRadius: '8px',
              margin: '2rem 0',
              lineHeight: '2.1'
            }}>
              <div>A quieter voice.</div>
              <div>A discerning eye.</div>
              <div>A mind shaped by years of learning, leading, observing and reflecting.</div>
            </div>

            <p style={{ margin: '2rem 0 1.5rem 0', lineHeight: '1.85' }}>
              And perhaps that is what a mentor truly offers — not always an answer, but a different way of seeing the question.
            </p>

            <p style={{ marginBottom: '1.5rem', fontWeight: '600', color: 'var(--accent-primary)' }}>
              RAJSAAR is here to do precisely that.
            </p>

            <div style={{ margin: '2rem 0', lineHeight: '2.1', fontSize: '1.2rem', fontFamily: 'var(--font-cormorant)', fontWeight: '600' }}>
              <div>To observe.</div>
              <div>To question.</div>
              <div>To reflect.</div>
              <div style={{ fontStyle: 'italic', color: 'var(--accent-primary)' }}>And perhaps, to see life a little differently.</div>
            </div>

            {/* Closing Signature & Links */}
            <div style={{
              textAlign: 'center',
              paddingTop: '2.5rem',
              borderTop: '1px solid var(--border-color)',
              marginTop: '3rem'
            }}>
              <p style={{
                fontFamily: 'var(--font-cormorant)',
                fontSize: '2rem',
                fontWeight: '700',
                color: 'var(--text-primary)',
                letterSpacing: '0.04em',
                marginBottom: '0.25rem'
              }}>
                RAJSAAR
              </p>

              <p style={{
                fontSize: '0.88rem',
                fontStyle: 'italic',
                color: 'var(--text-secondary)',
                marginBottom: '2rem'
              }}>
                Through the Mentor’s Lens
              </p>

              {/* Action Buttons */}
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '1rem',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <Link to="/essays" className="btn btn-dark-green" style={{ padding: '0.75rem 1.6rem', fontSize: '0.92rem' }}>
                  Explore Essays <ArrowRight size={16} />
                </Link>
                <Link to="/person-behind-this" className="btn btn-secondary" style={{ padding: '0.75rem 1.6rem', fontSize: '0.92rem' }}>
                  <Compass size={16} /> The Person Behind This
                </Link>
                <Link to="/about" className="btn btn-secondary" style={{ padding: '0.75rem 1.6rem', fontSize: '0.92rem' }}>
                  <BookOpen size={16} /> About ORAANIS
                </Link>
              </div>
            </div>

          </div>

        </article>

      </div>
    </div>
  );
}
