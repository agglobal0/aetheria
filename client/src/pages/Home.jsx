import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Scale,
  Users,
  Feather,
  Monitor,
  BookOpen,
  Brain,
  HeartPulse,
  Compass,
  Lightbulb,
  Flower2,
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
      <section className="why-space-section">
        <div className="container">
          <div className="why-space-grid">

            {/* Left Column: Why This Space? */}
            <div className="why-space-left">
              <div>
                <div className="why-space-pill-badge">
                  <LeafIcon size={14} color="var(--accent-primary)" />
                  <span>An Invitation to Pause</span>
                </div>

                <h2 className="why-space-title">
                  Why This Space?
                </h2>

                <p style={{ fontSize: '0.975rem', lineHeight: '1.75', color: 'var(--text-primary)', marginBottom: '1rem', fontWeight: '500' }}>
                  We have never had more access to information, yet understanding ourselves and the people around us has not necessarily become easier.
                </p>

                <p style={{ fontSize: '0.925rem', lineHeight: '1.7', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                  A search can give us an answer in seconds. A social media post can tell us what a situation means. A short video can offer a solution to a problem that may have taken us years to understand. But human experiences rarely fit into a few lines.
                </p>

                <p style={{ fontSize: '0.925rem', lineHeight: '1.7', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
                  A disagreement can have many layers. A relationship can hold affection and disappointment at the same time. A decision can be right for one phase of life and wrong for another. Even our own behaviour can surprise us.
                </p>

                {/* Focus Explore Block */}
                <div style={{
                  padding: '1rem 1.15rem',
                  backgroundColor: 'var(--bg-tertiary)',
                  borderRadius: 'var(--radius-sm)',
                  borderLeft: '3px solid var(--accent-primary)',
                  marginBottom: '1.25rem'
                }}>
                  <p style={{ fontSize: '0.95rem', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                    This is the space ORAANIS wants to explore.
                  </p>
                  <p style={{ fontSize: '0.875rem', lineHeight: '1.65', color: 'var(--text-secondary)', margin: 0 }}>
                    Not the obvious explanation, but what lies underneath it. Not simply what happened, but the different ways it can be understood. Not just the emotion we felt in a moment, but what that emotion may reveal about our expectations, choices, relationships and patterns.
                  </p>
                </div>

                <p style={{ fontSize: '0.925rem', lineHeight: '1.7', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                  There is also value in encountering a perspective that is different from our own. We do not always have to agree with an idea for it to make us think. Sometimes the most useful thought is the one that makes us pause and reconsider something we had already decided.
                </p>

                <p style={{ fontSize: '0.925rem', lineHeight: '1.7', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
                  ORAANIS brings together such thoughts and perspectives through stories, essays and conversations around the experiences that shape everyday life.
                </p>

                {/* Philosophical Quote Card */}
                <div className="why-space-quote-card" style={{ marginBottom: '1.25rem' }}>
                  <p className="why-space-quote-lead" style={{ fontSize: '0.925rem', marginBottom: '0.5rem' }}>
                    The intention is simple: to create something worth spending a few quiet minutes with.
                  </p>
                  <div style={{ fontSize: '0.85rem', lineHeight: '1.6', color: 'var(--text-secondary)', fontStyle: 'italic', marginBottom: '0.5rem' }}>
                    <div>Something that does not demand an immediate reaction.</div>
                    <div>Something that leaves room for your own interpretation.</div>
                  </div>
                  <p className="why-space-quote-core" style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>
                    Because the most meaningful insights are not always the ones that tell us something new. Sometimes they are the ones that make us look at something familiar in a way we had never considered before.
                  </p>
                </div>

                <p style={{
                  fontSize: '0.95rem',
                  fontFamily: 'var(--font-serif)',
                  fontWeight: '600',
                  color: 'var(--accent-burgundy, #8B263E)',
                  fontStyle: 'italic',
                  marginBottom: '1.5rem'
                }}>
                  ORAANIS is that space between reading something and truly thinking about it.
                </p>
              </div>

              <div>
                <Link
                  to="/person-behind-this"
                  className="why-space-story-btn"
                >
                  <span>Read My Story</span>
                  <ArrowRight size={15} className="story-btn-arrow" />
                </Link>
              </div>
            </div>

            {/* Right Column: Explore by Category (5 Pillars) */}
            <div className="why-space-right">
              <div className="explore-theme-header">
                <div>
                  <h3 className="explore-theme-title">
                    Explore by Category
                  </h3>
                  <span className="explore-theme-subtitle">5 Pillars of Reflection</span>
                </div>
                <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--border-color)', maxWidth: '120px', marginLeft: '1.25rem' }} />
              </div>

              {/* 5 Theme Cards Grid */}
              <div className="explore-theme-grid">

                {/* 1. Reflections */}
                <Link to="/category/reflections" className="theme-pillar-card pillar-reflections">
                  <div>
                    <div className="theme-pillar-icon-box">
                      <BookOpen size={22} strokeWidth={1.75} />
                    </div>
                    <h4 className="theme-pillar-title">
                      Reflections
                    </h4>
                    <p className="theme-pillar-desc">
                      Quiet contemplation, personal growth, and lessons learned through life.
                    </p>
                  </div>
                  <div className="theme-pillar-action">
                    <span>Explore</span>
                    <ArrowRight size={14} className="theme-pillar-action-arrow" />
                  </div>
                </Link>

                {/* 2. Emotional Intelligence */}
                <Link to="/category/emotional-intelligence" className="theme-pillar-card pillar-emotional-intelligence">
                  <div>
                    <div className="theme-pillar-icon-box">
                      <Brain size={22} strokeWidth={1.75} />
                    </div>
                    <h4 className="theme-pillar-title">
                      Emotional Intelligence
                    </h4>
                    <p className="theme-pillar-desc">
                      Understanding psychology, empathy, human nature, and self-awareness.
                    </p>
                  </div>
                  <div className="theme-pillar-action">
                    <span>Explore</span>
                    <ArrowRight size={14} className="theme-pillar-action-arrow" />
                  </div>
                </Link>

                {/* 3. Healing */}
                <Link to="/category/healing" className="theme-pillar-card pillar-healing">
                  <div>
                    <div className="theme-pillar-icon-box">
                      <HeartPulse size={22} strokeWidth={1.75} />
                    </div>
                    <h4 className="theme-pillar-title">
                      Healing
                    </h4>
                    <p className="theme-pillar-desc">
                      Nurturing resilience, emotional recovery, self-forgiveness, and inner peace.
                    </p>
                  </div>
                  <div className="theme-pillar-action">
                    <span>Explore</span>
                    <ArrowRight size={14} className="theme-pillar-action-arrow" />
                  </div>
                </Link>

                {/* 4. Wisdom */}
                <Link to="/category/wisdom" className="theme-pillar-card pillar-wisdom">
                  <div>
                    <div className="theme-pillar-icon-box">
                      <Lightbulb size={22} strokeWidth={1.75} />
                    </div>
                    <h4 className="theme-pillar-title">
                      Wisdom
                    </h4>
                    <p className="theme-pillar-desc">
                      Timeless insights, moral integrity, ethics, and enduring human life lessons.
                    </p>
                  </div>
                  <div className="theme-pillar-action">
                    <span>Explore</span>
                    <ArrowRight size={14} className="theme-pillar-action-arrow" />
                  </div>
                </Link>

                {/* 5. Spirituality (Wide Spanning Row) */}
                <Link to="/category/spirituality" className="theme-pillar-card theme-pillar-card-wide pillar-spirituality">
                  <div className="theme-pillar-wide-left">
                    <div className="theme-pillar-icon-box">
                      <Flower2 size={24} strokeWidth={1.75} />
                    </div>
                    <div>
                      <h4 className="theme-pillar-title">
                        Spirituality
                      </h4>
                      <p className="theme-pillar-desc">
                        Meditations on purpose, transcendence, quiet consciousness, and inner depth.
                      </p>
                    </div>
                  </div>
                  <div className="theme-pillar-action">
                    <span>Explore</span>
                    <ArrowRight size={14} className="theme-pillar-action-arrow" />
                  </div>
                </Link>

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
                alt="Monika Chopra"
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
                  I am Monika Chopra, an educator in Information Technology with nearly three decades of teaching, reading, observing and learning from people and life.
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
                  to="/person-behind-this"
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
