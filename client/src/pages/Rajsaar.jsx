import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Compass, Eye, BookOpen } from 'lucide-react';
import { rajsaarWritingImg } from '../assets/images';
import Breadcrumbs from '../components/Breadcrumbs';

export default function Rajsaar() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div style={{
      backgroundColor: 'var(--bg-primary)',
      minHeight: '100vh',
      padding: 'clamp(1.5rem, 3vw, 2.5rem) 0 clamp(4rem, 8vw, 7rem) 0',
      fontFamily: 'var(--font-sans)',
      color: 'var(--text-primary)'
    }}>
      <div className="container" style={{ maxWidth: '780px', margin: '0 auto', padding: '0 clamp(1.25rem, 4vw, 2rem)' }}>
        
        {/* Breadcrumb Navigation */}
        <div style={{ marginBottom: '1.75rem' }}>
          <Breadcrumbs items={[{ label: 'RAJSAAR' }]} />
        </div>

        {/* Main Editorial Card */}
        <article style={{
          backgroundColor: 'var(--bg-secondary)',
          border: '1px solid var(--border-color)',
          borderRadius: '16px',
          padding: 'clamp(2.25rem, 5vw, 4.5rem) clamp(1.5rem, 5vw, 3.5rem)',
          boxShadow: '0 4px 24px rgba(44, 38, 33, 0.03)'
        }}>
          
          {/* Header */}
          <header style={{ marginBottom: '2.5rem', textAlign: 'left' }}>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontSize: '0.78rem',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              color: 'var(--accent-primary)',
              marginBottom: '0.6rem'
            }}>
              <Eye size={14} /> Through the Mentor’s Lens
            </span>

            <h1 style={{
              fontSize: 'clamp(2.2rem, 5vw, 3rem)',
              fontWeight: '700',
              letterSpacing: '-0.02em',
              lineHeight: '1.2',
              marginBottom: '0.4rem',
              color: 'var(--text-primary)'
            }}>
              RAJSAAR
            </h1>

            <p style={{
              fontSize: 'clamp(1rem, 2vw, 1.15rem)',
              color: 'var(--text-secondary)',
              margin: '0'
            }}>
              Through the Mentor’s Lens
            </p>

            <div style={{
              width: '40px',
              height: '2px',
              backgroundColor: 'var(--accent-primary)',
              marginTop: '1rem',
              opacity: 0.6
            }} />
          </header>

          {/* Featured RAJSAAR Image */}
          <div style={{
            marginBottom: '2.5rem',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 6px 20px rgba(0, 0, 0, 0.06)',
            border: '1px solid var(--border-color)'
          }}>
            <img
              src={rajsaarWritingImg}
              alt="RAJSAAR - Through the Mentor's Lens"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
                maxHeight: '440px',
                objectFit: 'cover'
              }}
            />
          </div>

          {/* Continuous Flowing Prose */}
          <div style={{
            fontSize: 'clamp(1rem, 2vw, 1.075rem)',
            lineHeight: '1.85',
            color: 'var(--text-primary)'
          }}>

            <p style={{ marginBottom: '1rem' }}>
              Some write to express what they know.
            </p>
            <p style={{ marginBottom: '1rem' }}>
              Some write to share what they have learnt.
            </p>
            <p style={{ marginBottom: '2rem' }}>
              And some write because experience leaves behind thoughts that deserve to be understood.
            </p>

            <p style={{ marginBottom: '1.75rem', fontWeight: '700', fontSize: '1.15rem', color: 'var(--accent-primary)' }}>
              RAJSAAR belongs to the latter.
            </p>

            <p style={{ marginBottom: '1.75rem' }}>
              An educator by profession, a mentor by nature and an astute observer of people and life, RAJSAAR brings to his writing the perspective of someone who has spent years observing human behaviour, relationships, institutions, choices and the consequences they quietly create.
            </p>

            <p style={{ marginBottom: '0.75rem', fontWeight: '600' }}>
              His writings are not sermons.
            </p>
            <p style={{ marginBottom: '1.75rem', color: 'var(--text-secondary)', fontStyle: 'italic' }}>
              They are not ready-made answers.
            </p>

            <p style={{ marginBottom: '1.75rem' }}>
              They are reflections born from experience, observation and the questions that life often leaves unanswered.
            </p>

            <p style={{ marginBottom: '1.75rem' }}>
              He writes about people and relationships, ambition and failure, values and contradictions, choices and consequences, and those subtle truths that remain invisible when we look only at the surface.
            </p>

            <p style={{ marginBottom: '1rem', fontWeight: '600' }}>
              His purpose is not to tell the reader what to think.
            </p>

            <p style={{ marginBottom: '0.75rem' }}>
              It is to make the reader stop, question and look again.
            </p>
            <p style={{ marginBottom: '2rem', color: 'var(--text-secondary)', fontStyle: 'italic' }}>
              Because sometimes, what appears obvious is only one version of the truth.
            </p>

            <p style={{ marginBottom: '1.75rem' }}>
              <strong style={{ fontWeight: '700' }}>RAJSAAR</strong> is a chosen writing identity — deliberately distanced from designation, position and public persona. It allows the words to arrive without the weight of a name or title, and gives the thought its own space to breathe.
            </p>

            <p style={{ marginBottom: '1.75rem', fontStyle: 'italic', color: 'var(--text-secondary)' }}>
              On this platform, RAJSAAR writes not from a pedestal, but from the vantage point of experience.
            </p>

            <div style={{
              padding: '0.5rem 0 0.5rem 1.25rem',
              borderLeft: '2px solid var(--accent-primary)',
              margin: '1.75rem 0 2rem 0',
              lineHeight: '2',
              color: 'var(--text-primary)'
            }}>
              <div>A quieter voice.</div>
              <div>A discerning eye.</div>
              <div>A mind shaped by years of learning, leading, observing and reflecting.</div>
            </div>

            <p style={{ marginBottom: '1.5rem' }}>
              And perhaps that is what a mentor truly offers — not always an answer, but a different way of seeing the question.
            </p>

            <p style={{ marginBottom: '2rem', fontWeight: '600', color: 'var(--accent-primary)' }}>
              RAJSAAR is here to do precisely that.
            </p>

            <div style={{ margin: '2rem 0 3rem 0', lineHeight: '2', fontWeight: '500' }}>
              <div>To observe.</div>
              <div>To question.</div>
              <div>To reflect.</div>
              <div style={{ color: 'var(--accent-primary)', fontWeight: '600', fontStyle: 'italic' }}>
                And perhaps, to see life a little differently.
              </div>
            </div>

            {/* Closing Signature & Links */}
            <div style={{
              textAlign: 'left',
              paddingTop: '2.5rem',
              borderTop: '1px solid var(--border-color)'
            }}>
              <div style={{
                fontSize: '1.4rem',
                fontWeight: '700',
                color: 'var(--text-primary)',
                marginBottom: '0.25rem'
              }}>
                RAJSAAR
              </div>

              <p style={{
                fontSize: '0.95rem',
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
                alignItems: 'center'
              }}>
                <Link to="/essays" className="btn-dark-green">
                  Explore Reflections <ArrowRight size={15} />
                </Link>
                <Link to="/person-behind-this" className="btn-warm-pill">
                  <Compass size={16} /> The Person Behind This
                </Link>
                <Link to="/about" className="btn-warm-pill">
                  <BookOpen size={16} /> About Aetheria
                </Link>
              </div>
            </div>

          </div>

        </article>

      </div>
    </div>
  );
}
