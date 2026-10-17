import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Compass, Eye, BookOpen, Feather } from 'lucide-react';
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
      <div className="container" style={{ maxWidth: '820px', margin: '0 auto', padding: '0 clamp(1.25rem, 4vw, 2rem)' }}>
        
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
          boxShadow: '0 4px 24px rgba(0, 0, 0, 0.03)'
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
              color: 'var(--accent-teal)',
              marginBottom: '0.6rem'
            }}>
              <Eye size={14} /> Mentor & Contributor
            </span>

            <h1 style={{
              fontSize: 'clamp(2.2rem, 5vw, 3.2rem)',
              fontFamily: 'var(--font-cormorant)',
              fontWeight: '700',
              letterSpacing: '-0.02em',
              lineHeight: '1.15',
              marginBottom: '0.6rem',
              color: 'var(--text-primary)'
            }}>
              RAJSAAR
            </h1>

            <p style={{
              fontSize: 'clamp(1.05rem, 2.5vw, 1.25rem)',
              fontFamily: 'var(--font-serif)',
              fontStyle: 'italic',
              color: 'var(--accent-teal)',
              margin: '0 0 0.5rem 0',
              fontWeight: '500',
              lineHeight: '1.4'
            }}>
              A Different angle or a revolving mirror
            </p>

            <p style={{
              fontSize: '0.86rem',
              color: 'var(--text-muted)',
              margin: '0',
              fontWeight: '500',
              letterSpacing: '0.04em',
              textTransform: 'uppercase'
            }}>
              Educator • Mentor • Academic Leader • Observer of Human Behaviour
            </p>

            <div style={{
              width: '48px',
              height: '2px',
              backgroundColor: 'var(--accent-teal)',
              marginTop: '1.25rem',
              opacity: 0.8
            }} />
          </header>

          {/* Featured RAJSAAR Image */}
          <div style={{
            marginBottom: '2.75rem',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 6px 20px rgba(0, 0, 0, 0.06)',
            border: '1px solid var(--border-color)'
          }}>
            <img
              src={rajsaarWritingImg}
              alt="RAJSAAR - Mentor & Contributor"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
                maxHeight: '460px',
                objectFit: 'cover'
              }}
            />
          </div>

          {/* Continuous Flowing Editorial Prose */}
          <div style={{
            fontSize: 'clamp(1rem, 2vw, 1.085rem)',
            lineHeight: '1.9',
            color: 'var(--text-primary)',
            textAlign: 'justify'
          }}>

            <p style={{ marginBottom: '1.5rem' }}>
              There are thinkers who express themselves to address the issue from a different perspective based on their own experience and life long learning. Their perspective reflects not only their own insight but their ability to peep through the views expressed by the second person. Their understanding and ability to critically analyse the thoughts and the feelings expressed by people bring out an all together different dimension of the matter being deliberated upon.
            </p>

            <p style={{
              marginBottom: '2rem',
              fontSize: '1.2rem',
              fontFamily: 'var(--font-serif)',
              fontStyle: 'italic',
              fontWeight: '700',
              color: 'var(--accent-teal)'
            }}>
              RAJSAAR writes from that space.
            </p>

            <p style={{ marginBottom: '1.5rem' }}>
              An educator, mentor, academic leader and keen observer of human nature, instincts and behaviour, RAJSAAR brings to his writings a perspective shaped by years of learning, leading, interacting with people and observing institutions closely and internally. His journey entails taking him through positions of responsibility, taking quick and timely decisions, varied relationships and the many shades of human behaviour that reveal themselves only with time.
            </p>

            <p style={{ marginBottom: '0.6rem', fontWeight: '600' }}>
              That experience does not make his writings predictable.
            </p>
            <p style={{ marginBottom: '1.75rem', color: 'var(--text-secondary)', fontStyle: 'italic' }}>
              It makes it layered thereby revealing facets one after the other.
            </p>

            <p style={{ marginBottom: '1.5rem' }}>
              RAJSAAR has a distinctive way of looking at ordinary situations deciphering and decoding the actual thoughts hidden beneath them. A conversation may become a reflection on human nature. A decision may reveal something about values. A relationship may reveal the difference between perception and reality.
            </p>

            <div style={{
              backgroundColor: 'var(--bg-tertiary)',
              borderLeft: '3px solid var(--accent-teal)',
              padding: '1.25rem 1.5rem',
              borderRadius: '0 8px 8px 0',
              margin: '2rem 0',
              fontFamily: 'var(--font-serif)',
              fontSize: '1.08rem',
              fontStyle: 'italic',
              lineHeight: '1.75',
              color: 'var(--text-primary)'
            }}>
              His writings do not merely describe what happens — rather it looks at why it happens, what it implies, and what one may have failed to notice while it was happening.
            </div>

            <p style={{ marginBottom: '1.5rem' }}>
              His perspective is often unconventional. His observations may be quiet, but they are deep seated rather than superficial. He is drawn towards the space between appearance and reality, intent and action, success and meaning, authority and responsibility, knowledge and wisdom.
            </p>

            <p style={{ marginBottom: '2rem', fontWeight: '600', color: 'var(--text-primary)' }}>
              That is where his writings find their real meaning and relevance.
            </p>

            <p style={{ marginBottom: '1.5rem' }}>
              RAJSAAR does not write to provide the reader with a conclusion neatly tied at the end. He writes to unfold other layers of thought.
            </p>

            <p style={{ marginBottom: '1.75rem' }}>
              The range and diversity of the subject varies widely encompassing people, relationships, institutions, ambition, failure, values, leadership, choices or the contradictions and paradoxes that quietly shape human behaviour and are forceful denominators of our public life.
            </p>

            {/* Unrevealed Curiosity Box */}
            <div style={{
              backgroundColor: 'var(--surface-color)',
              border: '1px solid var(--border-color)',
              borderRadius: '12px',
              padding: '1.5rem 1.75rem',
              margin: '2.25rem 0'
            }}>
              <p style={{
                fontSize: '0.85rem',
                fontWeight: '700',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--accent-teal)',
                marginBottom: '0.85rem'
              }}>
                At the root of each topic lies an unrevealed curiosity:
              </p>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
                fontFamily: 'var(--font-serif)',
                fontSize: '1.15rem',
                color: 'var(--text-primary)'
              }}>
                <div>• What are we seeing?</div>
                <div>• What are we missing?</div>
                <div style={{ fontStyle: 'italic', color: 'var(--accent-teal)', fontWeight: '600', marginTop: '0.25rem' }}>
                  • And what changes when we look at the same thing from a different perspective?
                </div>
              </div>
            </div>

            <p style={{ marginBottom: '1.5rem' }}>
              <strong style={{ fontWeight: '700' }}>RAJSAAR</strong> is a pseudonym deliberately chosen to conceal identity so as to insulate the readers from the influence of his designation, post, offices held or holding and his public persona. It will make his writings non-judgemental, non-partisan and bereft of public signage.
            </p>

            <p style={{
              marginBottom: '2rem',
              fontStyle: 'italic',
              color: 'var(--text-secondary)',
              fontWeight: '500'
            }}>
              The identity may remain private, but the perspective should be loud and clearly heard across a wider audience.
            </p>

            <p style={{ marginBottom: '1.5rem' }}>
              On ORAANIS, RAJSAAR brings together the voice of an educator, the discernment of a mentor, the experience of a leader and the curiosity of a lifelong observer.
            </p>

            <div style={{
              margin: '2rem 0',
              padding: '0.75rem 0 0.75rem 1.25rem',
              borderLeft: '2px solid var(--accent-primary)',
              lineHeight: '2',
              color: 'var(--text-primary)'
            }}>
              <div>His writing is not an attempt to explain life.</div>
              <div style={{ fontWeight: '700', color: 'var(--accent-teal)' }}>It is an invitation to look at it more closely.</div>
            </div>

            <p style={{ marginBottom: '1.5rem' }}>
              Because life rarely hides its truths completely. More often, we see them and simply choose the easier interpretation.
            </p>

            <p style={{ marginBottom: '1rem', fontWeight: '700', color: 'var(--text-primary)' }}>
              RAJSAAR pauses at that moment:
            </p>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.65rem',
              margin: '1.25rem 0 2rem 0',
              paddingLeft: '1rem',
              borderLeft: '2px solid var(--border-color)',
              color: 'var(--text-secondary)',
              fontStyle: 'italic'
            }}>
              <div>Between what happened and what we think happened.</div>
              <div>Between what was said and what was meant.</div>
              <div>Between the person we meet and the person we never took the time to understand.</div>
            </div>

            <p style={{ marginBottom: '1rem' }}>
              And perhaps that is where his writings truly begin.
            </p>

            <p style={{ marginBottom: '2.5rem', fontWeight: '600', color: 'var(--text-primary)' }}>
              Not with an answer. But the moment when an ordinary thought suddenly becomes impossible to ignore.
            </p>

            {/* Final Cadence Pullquote */}
            <div style={{
              backgroundColor: 'var(--bg-primary)',
              border: '1px solid var(--border-color)',
              borderRadius: '12px',
              padding: '1.5rem 1.75rem',
              margin: '2.5rem 0 3rem 0',
              textAlign: 'center'
            }}>
              <p style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(1.1rem, 2.5vw, 1.3rem)',
                fontStyle: 'italic',
                lineHeight: '1.7',
                color: 'var(--text-primary)',
                margin: 0
              }}>
                "Read RAJSAAR once, and you may remember the thought.<br />
                <span style={{ color: 'var(--accent-teal)', fontWeight: '700' }}>
                  Read him again, and you may question the way you saw it."
                </span>
              </p>
            </div>

            {/* Closing Signature & Links */}
            <div style={{
              textAlign: 'left',
              paddingTop: '2.5rem',
              borderTop: '1px solid var(--border-color)'
            }}>
              <div style={{
                fontSize: '1.5rem',
                fontFamily: 'var(--font-cormorant)',
                fontWeight: '700',
                color: 'var(--text-primary)',
                marginBottom: '0.25rem'
              }}>
                RAJSAAR
              </div>

              <p style={{
                fontSize: '0.88rem',
                color: 'var(--text-secondary)',
                marginBottom: '2rem'
              }}>
                Mentor & Contributor • Educator • Academic Leader • Voice of Experience
              </p>

              {/* Action Buttons */}
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '1rem',
                alignItems: 'center'
              }}>
                <Link to="/essays" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem' }}>
                  Explore Essays <ArrowRight size={15} />
                </Link>
                <Link to="/about" className="btn btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem' }}>
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
