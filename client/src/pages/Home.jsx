import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Scale,
  Users,
  Feather,
  Monitor,
  BookOpen,
  Compass,
  Sprout,
  Library,
  Mail,
  CheckCircle2,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { LeafIcon, LeafBullet } from '../components/BrandIcons';
import { newsletterService } from '../services/api';
import {
  heroDeskImg,
  profPortraitImg,
  stonePathImg,
  mistyMountainsImg,
  thumbKnowingWorth,
  thumbTrustLost,
  thumbCostGood,
  thumbTechHuman
} from '../assets/images';

export default function Home() {
  const [email, setEmail] = useState('');
  const [subscribeStatus, setSubscribeStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const validateEmail = (val) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(val.trim());
  };

  const handleSubscribe = async (e) => {
    e.preventDefault();
    const cleanEmail = email.trim();

    if (!cleanEmail) {
      setSubscribeStatus('error');
      setFeedbackMessage('Please enter your email address.');
      return;
    }

    if (!validateEmail(cleanEmail)) {
      setSubscribeStatus('error');
      setFeedbackMessage('Please enter a valid email address (e.g., name@gmail.com).');
      return;
    }

    setSubscribeStatus('loading');
    setFeedbackMessage('');

    try {
      const res = await newsletterService.subscribe(cleanEmail);
      if (res.data?.success) {
        setSubscribeStatus('success');
        setFeedbackMessage(res.data.message || 'Thank you for subscribing! A thought worth carrying will arrive in your inbox.');
        setEmail('');
      } else {
        setSubscribeStatus('error');
        setFeedbackMessage(res.data?.message || 'Subscription could not be completed. Please try again.');
      }
    } catch (err) {
      console.error('Newsletter error:', err);
      setSubscribeStatus('error');
      setFeedbackMessage(err.response?.data?.message || 'Subscription failed. Please check your connection and try again.');
    }
  };



  return (
    <div style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)', overflowX: 'hidden' }}>

      {/* =========================================================================
          1. HERO SECTION (Desk & Mountain Landscape with Contemplative Quote)
          ========================================================================= */}
      <section
        className="ref-hero"
        style={{
          backgroundImage: `url(${heroDeskImg})`
        }}
      >
        <div className="ref-hero-overlay" />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="ref-hero-content animate-fade-in">
            {/* Top Leaf Accent */}
            <div style={{ marginBottom: '1.25rem' }}>
              <LeafIcon size={26} color="#7A937D" />
            </div>

            {/* Main Headline */}
            <h1 className="ref-hero-title">
              Life doesn't always need an answer.<br />
              Sometimes, it needs a different perspective.
            </h1>

            {/* Subtitle */}
            <p className="ref-hero-desc">
              A space for thoughtful reflections on life, people, choices, relationships, ethics and the changing relationship between technology and humanity.
            </p>

            {/* CTA Buttons */}
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <Link to="/essays" className="btn-dark-green">
                Explore Reflections <ArrowRight size={16} />
              </Link>
              <Link to="/about" className="btn-warm-pill">
                My Story
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. SECTION: "Why This Space?" & "Explore by Theme"
          ========================================================================= */}
      <section style={{ padding: 'clamp(2.5rem, 5vw, 4.5rem) 0 clamp(2rem, 4vw, 3.5rem) 0' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(280px, 38%) 1fr',
            gap: 'clamp(2rem, 4vw, 3.5rem)',
            alignItems: 'start'
          }} className="ref-two-col-grid">

            {/* Left Column: Why This Space? */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
                <LeafIcon size={22} color="#5C7A60" />
                <h2 style={{
                  fontFamily: 'var(--font-cormorant)',
                  fontSize: 'clamp(1.6rem, 3.5vw, 2rem)',
                  fontWeight: '700',
                  color: 'var(--text-primary)',
                  letterSpacing: '-0.01em'
                }}>
                  Why This Space?
                </h2>
              </div>

              <p style={{
                fontSize: '0.92rem',
                lineHeight: '1.65',
                color: 'var(--text-secondary)',
                marginBottom: '1.5rem'
              }}>
                We live in a world that has never been more connected, yet many of us carry thoughts we rarely speak about.
              </p>

              {/* Bulleted Points with Leaves */}
              <ul style={{
                listStyle: 'none',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.6rem',
                marginBottom: '1.75rem',
                fontSize: '0.88rem',
                color: 'var(--text-secondary)'
              }}>
                {[
                  'Difficult choices',
                  'Unspoken emotions',
                  'Workplace struggles',
                  'Changing relationships',
                  'Questions of right and wrong',
                  'The pressure to keep going when life feels complicated'
                ].map((item, idx) => (
                  <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <LeafBullet size={14} color="#7A937D" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <p style={{
                fontSize: '0.92rem',
                lineHeight: '1.6',
                color: 'var(--text-secondary)',
                marginBottom: '0.35rem'
              }}>
                Sometimes we don't need someone to tell us what to do.
              </p>
              <p style={{
                fontSize: '0.92rem',
                lineHeight: '1.6',
                color: 'var(--text-primary)',
                fontWeight: '600',
                fontStyle: 'italic',
                marginBottom: '1.5rem'
              }}>
                We simply need another way of looking at what we are going through.
              </p>

              <Link
                to="/about"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  fontSize: '0.88rem',
                  fontWeight: '600',
                  color: 'var(--text-primary)',
                  borderBottom: '1px solid var(--text-primary)',
                  paddingBottom: '2px'
                }}
              >
                Read My Story <ArrowRight size={14} />
              </Link>
            </div>

            {/* Right Column: Explore by Theme */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <h3 style={{
                  fontFamily: 'var(--font-cormorant)',
                  fontSize: 'clamp(1.35rem, 3vw, 1.6rem)',
                  fontWeight: '600',
                  color: 'var(--text-primary)',
                  letterSpacing: '-0.01em'
                }}>
                  Explore by Theme
                </h3>
                <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--border-color)', maxWidth: '80px' }} />
              </div>

              {/* 4 Theme Cards */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '1rem'
              }} className="ref-themes-grid">

                {/* Card 1: Ethics & Dilemmas */}
                <div className="theme-card theme-card-ethics">
                  <div style={{ opacity: 0.85, marginBottom: '0.75rem' }}>
                    <Scale size={28} strokeWidth={1.5} color="#8A4A28" />
                  </div>
                  <div>
                    <h4 style={{
                      fontFamily: 'var(--font-cormorant)',
                      fontSize: '1.15rem',
                      fontWeight: '700',
                      lineHeight: '1.2',
                      marginBottom: '0.5rem'
                    }}>
                      Ethics &<br />Dilemmas
                    </h4>
                    <p style={{ fontSize: '0.78rem', lineHeight: '1.45', opacity: 0.85, marginBottom: '1rem' }}>
                      When life isn't simply right or wrong.
                    </p>
                  </div>
                  <Link
                    to="/category/ethics"
                    style={{
                      fontSize: '0.78rem',
                      fontWeight: '600',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.25rem'
                    }}
                  >
                    Explore <ArrowRight size={12} />
                  </Link>
                </div>

                {/* Card 2: Human Behaviour */}
                <div className="theme-card theme-card-human">
                  <div style={{ opacity: 0.85, marginBottom: '0.75rem' }}>
                    <Users size={28} strokeWidth={1.5} color="#2D5A38" />
                  </div>
                  <div>
                    <h4 style={{
                      fontFamily: 'var(--font-cormorant)',
                      fontSize: '1.15rem',
                      fontWeight: '700',
                      lineHeight: '1.2',
                      marginBottom: '0.5rem'
                    }}>
                      Human<br />Behaviour
                    </h4>
                    <p style={{ fontSize: '0.78rem', lineHeight: '1.45', opacity: 0.85, marginBottom: '1rem' }}>
                      Understanding people beyond their actions.
                    </p>
                  </div>
                  <Link
                    to="/category/human-behaviour"
                    style={{
                      fontSize: '0.78rem',
                      fontWeight: '600',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.25rem'
                    }}
                  >
                    Explore <ArrowRight size={12} />
                  </Link>
                </div>

                {/* Card 3: Reflections */}
                <div className="theme-card theme-card-life">
                  <div style={{ opacity: 0.85, marginBottom: '0.75rem' }}>
                    <Feather size={28} strokeWidth={1.5} color="#683972" />
                  </div>
                  <div>
                    <h4 style={{
                      fontFamily: 'var(--font-cormorant)',
                      fontSize: '1.15rem',
                      fontWeight: '700',
                      lineHeight: '1.2',
                      marginBottom: '0.5rem'
                    }}>
                      Reflections
                    </h4>
                    <p style={{ fontSize: '0.78rem', lineHeight: '1.45', opacity: 0.85, marginBottom: '1rem' }}>
                      What experience and quiet contemplation teach us.
                    </p>
                  </div>
                  <Link
                    to="/category/reflections"
                    style={{
                      fontSize: '0.78rem',
                      fontWeight: '600',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.25rem'
                    }}
                  >
                    Explore <ArrowRight size={12} />
                  </Link>
                </div>

                {/* Card 4: Technology & Humanity */}
                <div className="theme-card theme-card-tech">
                  <div style={{ opacity: 0.85, marginBottom: '0.75rem' }}>
                    <Monitor size={28} strokeWidth={1.5} color="#26526B" />
                  </div>
                  <div>
                    <h4 style={{
                      fontFamily: 'var(--font-cormorant)',
                      fontSize: '1.15rem',
                      fontWeight: '700',
                      lineHeight: '1.2',
                      marginBottom: '0.5rem'
                    }}>
                      Technology &<br />Humanity
                    </h4>
                    <p style={{ fontSize: '0.78rem', lineHeight: '1.45', opacity: 0.85, marginBottom: '1rem' }}>
                      Where technology meets the human side of life.
                    </p>
                  </div>
                  <Link
                    to="/category/technology"
                    style={{
                      fontSize: '0.78rem',
                      fontWeight: '600',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.25rem'
                    }}
                  >
                    Explore <ArrowRight size={12} />
                  </Link>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>



      {/* =========================================================================
          4. SECTION: "A Thought to Carry" Watercolor Banner
          ========================================================================= */}
      <section style={{ padding: '0 0 clamp(2.5rem, 5vw, 4.5rem) 0' }}>
        <div className="container">
          <div className="thought-quote-banner">
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1.5rem',
              position: 'relative',
              zIndex: 2
            }}>

              {/* Left Botanical Motif + Quote */}
              <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', maxWidth: '820px' }}>
                <div className="ref-botanical-leaf">
                  <LeafIcon size={44} color="#658869" />
                </div>

                <div>
                  <div style={{
                    fontSize: '0.8rem',
                    fontFamily: 'var(--font-sans)',
                    fontWeight: '600',
                    letterSpacing: '0.08em',
                    color: '#4B6B4F',
                    marginBottom: '0.5rem'
                  }}>
                    A Thought to Carry
                  </div>

                  <blockquote style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 'clamp(1.05rem, 1.8vw, 1.3rem)',
                    lineHeight: '1.55',
                    color: 'var(--text-primary)',
                    fontStyle: 'italic',
                    marginBottom: '0.5rem'
                  }}>
                    <span style={{ fontSize: '1.8rem', lineHeight: '0', verticalAlign: '-0.35em', marginRight: '0.3rem', color: '#4B6B4F' }}>“</span>
                    Knowing your worth is not about convincing others of your value. It is about no longer needing their recognition to live by it.
                  </blockquote>

                  <div style={{
                    fontSize: '0.82rem',
                    color: 'var(--text-secondary)',
                    fontStyle: 'italic'
                  }}>
                    — Monika Chopra
                  </div>
                </div>
              </div>

              {/* Right Read More Link */}
              <div style={{ alignSelf: 'center' }}>
                <Link
                  to="/essays"
                  style={{
                    fontSize: '0.85rem',
                    fontWeight: '600',
                    color: '#345239',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                    whiteSpace: 'nowrap'
                  }}
                >
                  Read More Thoughts <ArrowRight size={14} />
                </Link>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. SECTION: "The Person Behind the Words" & "Read • Reflect • Rethink"
          ========================================================================= */}
      <section style={{ padding: '0 0 clamp(3rem, 6vw, 5rem) 0' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(300px, 56%) 1fr',
            gap: 'clamp(2rem, 4vw, 3.5rem)',
            alignItems: 'start'
          }} className="ref-bio-feature-grid">

            {/* Left: Portrait & Bio */}
            <div className="bio-box">
              <img
                src={profPortraitImg}
                alt="Prof. Monika Chopra"
                style={{
                  width: '100%',
                  height: '270px',
                  objectFit: 'cover',
                  borderRadius: '10px'
                }}
              />

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.85rem' }}>
                  <Compass size={18} color="var(--accent-primary)" />
                  <h3 style={{
                    fontFamily: 'var(--font-cormorant)',
                    fontSize: '1.45rem',
                    fontWeight: '700',
                    color: 'var(--text-primary)'
                  }}>
                    The Person Behind the Words
                  </h3>
                </div>

                <p style={{
                  fontSize: '0.84rem',
                  lineHeight: '1.65',
                  color: 'var(--text-secondary)',
                  marginBottom: '0.8rem'
                }}>
                  I am Prof. Monika Chopra, an educator in Information Technology with nearly three decades of teaching, reading, observing and learning from people and life.
                </p>

                <p style={{
                  fontSize: '0.84rem',
                  lineHeight: '1.65',
                  color: 'var(--text-secondary)',
                  marginBottom: '0.8rem'
                }}>
                  Technology has been my profession. Human beings have been my deeper subject of study.
                </p>

                <p style={{
                  fontSize: '0.84rem',
                  lineHeight: '1.65',
                  color: 'var(--text-secondary)',
                  marginBottom: '1.25rem'
                }}>
                  I write to explore those lessons — not because I have figured life out, but because I continue to learn from it.
                </p>

                <Link
                  to="/about"
                  style={{
                    fontSize: '0.84rem',
                    fontWeight: '600',
                    color: 'var(--text-primary)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.3rem'
                  }}
                >
                  More About Me <ArrowRight size={13} />
                </Link>
              </div>
            </div>

            {/* Right: Read • Reflect • Rethink Features List */}
            <div className="ref-feature-col">
              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{
                  fontFamily: 'var(--font-cormorant)',
                  fontSize: 'clamp(1.35rem, 3vw, 1.6rem)',
                  fontWeight: '700',
                  color: 'var(--text-primary)',
                  letterSpacing: '0.02em',
                  marginBottom: '0.2rem'
                }}>
                  Read • Reflect • Rethink
                </h3>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  What You Will Find Here
                </span>
              </div>

              {/* 4 Feature Items */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem', marginBottom: '1.75rem' }}>

                {/* Item 1 */}
                <div style={{ display: 'flex', gap: '0.9rem', alignItems: 'flex-start' }}>
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    backgroundColor: '#F3EAE0',
                    color: '#8A5E35',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <BookOpen size={16} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '0.15rem' }}>
                      Thoughtful Essays
                    </h4>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.45' }}>
                      Longer reflections on life, ethics and human behaviour.
                    </p>
                  </div>
                </div>

                {/* Item 2 */}
                <div style={{ display: 'flex', gap: '0.9rem', alignItems: 'flex-start' }}>
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    backgroundColor: '#FCEFE6',
                    color: '#B0653B',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <Compass size={16} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '0.15rem' }}>
                      Life Perspectives
                    </h4>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.45' }}>
                      Different ways of looking at difficult situations and choices.
                    </p>
                  </div>
                </div>

                {/* Item 3 */}
                <div style={{ display: 'flex', gap: '0.9rem', alignItems: 'flex-start' }}>
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    backgroundColor: '#E7F2E8',
                    color: '#387346',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <Sprout size={16} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '0.15rem' }}>
                      Wisdom in Few Words
                    </h4>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.45' }}>
                      Short thoughts and observations worth carrying with you.
                    </p>
                  </div>
                </div>

                {/* Item 4 */}
                <div style={{ display: 'flex', gap: '0.9rem', alignItems: 'flex-start' }}>
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    backgroundColor: '#EFE7F2',
                    color: '#7B4285',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <Library size={16} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '0.15rem' }}>
                      Stories & Experiences
                    </h4>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.45' }}>
                      Lessons from teaching, observing and living.
                    </p>
                  </div>
                </div>

              </div>

              <Link
                to="/essays"
                style={{
                  fontSize: '0.85rem',
                  fontWeight: '600',
                  color: 'var(--text-primary)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.3rem'
                }}
              >
                Explore the Library <ArrowRight size={13} />
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          6. SECTION: Panoramic Misty Mountains Banner (3 Columns)
          ========================================================================= */}
      <section
        className="misty-mountains-section"
        style={{
          backgroundImage: `url(${mistyMountainsImg})`
        }}
      >
        <div className="misty-mountains-overlay" />
        <div className="container misty-mountains-container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 360px 1fr',
            gap: '2.5rem',
            alignItems: 'center'
          }} className="ref-three-panel-grid">

            {/* Panel 1: A Bigger Idea */}
            <div>
              <h3 style={{
                fontFamily: 'var(--font-cormorant)',
                fontSize: 'clamp(1.6rem, 3.5vw, 2rem)',
                fontWeight: '700',
                color: '#FFFFFF',
                marginBottom: '1rem'
              }}>
                A Bigger Idea
              </h3>

              <p style={{
                fontSize: '0.85rem',
                lineHeight: '1.65',
                color: 'rgba(255, 255, 255, 0.85)',
                marginBottom: '1rem'
              }}>
                I believe there are many thoughts people carry silently because they don't know where to place them.
              </p>

              <p style={{
                fontSize: '0.85rem',
                lineHeight: '1.65',
                color: 'rgba(255, 255, 255, 0.85)',
                marginBottom: '1.5rem'
              }}>
                This website is the beginning of a larger vision — a space where people can express what troubles them without fear of judgment or the need to reveal who they are, and receive thoughtful perspectives rooted in wisdom and emotional understanding.
              </p>

              <div style={{
                fontFamily: 'var(--font-serif)',
                fontStyle: 'italic',
                fontSize: '0.98rem',
                lineHeight: '1.65',
                color: '#D4E2D7'
              }}>
                <div>From experience to reflection.</div>
                <div>From reflection to wisdom.</div>
                <div>From wisdom to a more conscious way of living.</div>
              </div>
            </div>

            {/* Panel 2: Center Floating Newsletter Card */}
            <div className="newsletter-float-card">
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                backgroundColor: 'rgba(184, 107, 39, 0.1)',
                color: '#9C6634',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '0.75rem'
              }}>
                <Mail size={20} strokeWidth={1.75} />
              </div>

              <h4 style={{
                fontFamily: 'var(--font-cormorant)',
                fontSize: '1.5rem',
                fontWeight: '700',
                lineHeight: '1.2',
                marginBottom: '0.6rem'
              }}>
                A Thought to Carry
              </h4>

              <p style={{
                fontSize: '0.82rem',
                lineHeight: '1.5',
                color: 'var(--text-secondary)',
                marginBottom: '1.25rem'
              }}>
                Every 10–14 days, receive one thoughtful reflection — something to pause over, question and perhaps see differently.
              </p>

              {subscribeStatus === 'success' ? (
                <div style={{
                  padding: '1rem 0.85rem',
                  borderRadius: '8px',
                  backgroundColor: 'rgba(56, 115, 70, 0.12)',
                  color: '#245E33',
                  fontSize: '0.85rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginBottom: '1rem'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: '600' }}>
                    <CheckCircle2 size={18} /> Thank you for subscribing!
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#2D6B3D', textAlign: 'center' }}>
                    {feedbackMessage}
                  </div>
                  <button
                    onClick={() => { setSubscribeStatus('idle'); setFeedbackMessage(''); }}
                    style={{
                      marginTop: '0.35rem',
                      fontSize: '0.74rem',
                      textDecoration: 'underline',
                      color: '#245E33',
                      cursor: 'pointer'
                    }}
                  >
                    Subscribe another email
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1rem' }}>
                  <div className="ref-newsletter-form-row" style={{ display: 'flex', gap: '0.35rem' }}>
                    <input
                      type="email"
                      required
                      placeholder="Your email address (e.g. name@gmail.com)"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (subscribeStatus === 'error') {
                          setSubscribeStatus('idle');
                          setFeedbackMessage('');
                        }
                      }}
                      style={{
                        flex: 1,
                        padding: '0.65rem 0.85rem',
                        fontSize: '16px',
                        border: subscribeStatus === 'error' ? '1px solid #D32F2F' : '1px solid var(--border-color)',
                        borderRadius: '6px',
                        outline: 'none',
                        backgroundColor: 'var(--bg-secondary)',
                        color: 'var(--text-primary)',
                        minWidth: 0
                      }}
                    />
                    <button
                      type="submit"
                      disabled={subscribeStatus === 'loading'}
                      className="btn-dark-green"
                      style={{
                        padding: '0.65rem 1.1rem',
                        fontSize: '0.82rem',
                        borderRadius: '6px',
                        opacity: subscribeStatus === 'loading' ? 0.7 : 1,
                        cursor: subscribeStatus === 'loading' ? 'wait' : 'pointer',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      {subscribeStatus === 'loading' ? (
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                          <Loader2 size={13} className="animate-spin" /> Subscribing...
                        </span>
                      ) : (
                        'Subscribe'
                      )}
                    </button>
                  </div>

                  {subscribeStatus === 'error' && (
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      fontSize: '0.78rem',
                      color: '#D32F2F',
                      textAlign: 'left',
                      padding: '0.2rem 0.35rem'
                    }}>
                      <AlertCircle size={14} style={{ flexShrink: 0 }} />
                      <span>{feedbackMessage}</span>
                    </div>
                  )}
                </form>
              )}

              <div style={{
                fontSize: '0.74rem',
                color: 'var(--text-muted)',
                lineHeight: '1.4'
              }}>
                No noise. No unnecessary emails.<br />
                Just a thought worth carrying.
              </div>

              <div style={{ marginTop: '0.75rem', opacity: 0.6 }}>
                <LeafIcon size={16} color="#658869" />
              </div>
            </div>

            {/* Panel 3: Right Contemplation */}
            <div style={{ textAlign: 'center', padding: '0 1rem' }}>
              <h4 style={{
                fontFamily: 'var(--font-cormorant)',
                fontStyle: 'italic',
                fontSize: 'clamp(1.35rem, 3vw, 1.65rem)',
                fontWeight: '600',
                color: '#FFFFFF',
                lineHeight: '1.25',
                marginBottom: '1.25rem'
              }}>
                Perhaps you will find<br />
                something here that makes you pause.
              </h4>

              <div style={{
                fontSize: '0.84rem',
                lineHeight: '1.7',
                color: 'rgba(255, 255, 255, 0.85)',
                marginBottom: '1.25rem'
              }}>
                <div>A thought you hadn't considered.</div>
                <div>A question you hadn't asked.</div>
                <div>A perspective that changes the way you see something you already knew.</div>
              </div>

              <div style={{
                fontSize: '0.82rem',
                color: '#D4E2D7',
                marginBottom: '1.5rem'
              }}>
                Read slowly. Think deeply.<br />
                Take what resonates.
              </div>

              <div style={{
                fontFamily: 'var(--font-cormorant)',
                fontStyle: 'italic',
                fontSize: '1.35rem',
                fontWeight: '600',
                color: '#F4ECE0',
                lineHeight: '1.3'
              }}>
                Because sometimes,<br />
                a different perspective<br />
                can change everything.
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Responsive Layout Styles */}
      <style>{`
        .ref-botanical-leaf {
          display: block;
        }
        @media (max-width: 960px) {
          .ref-two-col-grid {
            grid-template-columns: 1fr !important;
            gap: 2.25rem !important;
          }
          .ref-themes-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .ref-reflections-grid {
            grid-template-columns: 1fr !important;
          }
          .ref-bio-feature-grid {
            grid-template-columns: 1fr !important;
          }
          .ref-feature-col {
            padding-left: 0 !important;
          }
          .ref-three-panel-grid {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
        }
        @media (max-width: 600px) {
          .ref-themes-grid {
            grid-template-columns: 1fr !important;
          }
          .ref-botanical-leaf {
            display: none !important;
          }
          .ref-newsletter-form-row {
            flex-direction: column !important;
          }
          .ref-newsletter-form-row input,
          .ref-newsletter-form-row button {
            width: 100% !important;
          }
        }
        .ref-more-item:hover {
          background-color: var(--bg-tertiary);
        }
      `}</style>

    </div>
  );
}
