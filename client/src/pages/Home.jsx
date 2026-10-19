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
  Loader2,
  Sparkles
} from 'lucide-react';
import { LeafIcon, LeafBullet } from '../components/BrandIcons';
import SEO from '../components/SEO';
import BookReader from '../components/BookReader';
import { newsletterService } from '../services/api';
import {
  heroDeskImg,
  profPortraitImg,
  stonePathImg,
  mistyMountainsImg,
  thumbKnowingWorth,
  thumbTrustLost,
  thumbCostGood,
  thumbTechHuman,
  rajsaarWritingImg
} from '../assets/images';

export default function Home() {
  const [isReaderOpen, setIsReaderOpen] = useState(false);
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
      <SEO
        title="ORAANIS — Where Experience Becomes Wisdom | Monika Chopra"
        description="A quiet, contemplative editorial space by Monika Chopra and RAJSAAR exploring human behaviour, emotional intelligence, life reflections, ethics, and wisdom."
        canonical="/"
      />

      {/* =========================================================================
          1. HERO SECTION (Direct Background Video & Contemplative Quote)
          ========================================================================= */}
      <section
        className="ref-hero"
      >
        <video
          className="ref-hero-video"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
          tabIndex="-1"
          disablePictureInPicture
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
        <div className="ref-hero-overlay" />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="ref-hero-content animate-fade-in">
            {/* Top Leaf Accent */}
            <div style={{ marginBottom: '1.25rem', display: 'flex', justifyContent: 'center' }}>
              <LeafIcon size={26} color="var(--accent-teal)" />
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
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}>
              <Link to="/essays" className="btn-dark-green">
                Explore Essays <ArrowRight size={16} />
              </Link>
              <Link to="/about" className="btn-warm-pill">
                <BookOpen size={16} /> About ORAANIS
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. SECTION: "Why This Space?" (Top) & "Explore by Category" (Down)
          ========================================================================= */}
      <section className="why-space-section">
        <div className="container">

          {/* Top: Why This Space? Full Editorial Card */}
          <div className="why-space-full-card">
            <div className="why-space-pill-badge">
              <LeafIcon size={13} color="var(--accent-teal)" />
              <span>An Invitation to Pause</span>
            </div>

            <h2 className="why-space-title">
              Why This Space?
            </h2>

            <p style={{ fontSize: '1.05rem', lineHeight: '1.8', color: 'var(--text-primary)', marginBottom: '1.25rem', fontWeight: '500' }}>
              We have never had more access to information, yet understanding ourselves and the people around us has not necessarily become easier.
            </p>

            <p style={{ fontSize: '0.98rem', lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
              A search can give us an answer in seconds. A social media post can tell us what a situation means. A short video can offer a solution to a problem that may have taken us years to understand. But human experiences rarely fit into a few lines.
            </p>

            <p style={{ fontSize: '0.98rem', lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
              A disagreement can have many layers. A relationship can hold affection and disappointment at the same time. A decision can be right for one phase of life and wrong for another. Even our own behaviour can surprise us.
            </p>

            {/* Focus Explore Block - Clean Left Border Accent */}
            <div style={{
              padding: '0.35rem 0 0.35rem 1.35rem',
              borderLeft: '2.5px solid var(--accent-teal)',
              margin: '1.75rem 0'
            }}>
              <p style={{ fontSize: '1.05rem', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                This is the space ORAANIS wants to explore.
              </p>
              <p style={{ fontSize: '0.95rem', lineHeight: '1.75', color: 'var(--text-secondary)', margin: 0 }}>
                Not the obvious explanation, but what lies underneath it. Not simply what happened, but the different ways it can be understood. Not just the emotion we felt in a moment, but what that emotion may reveal about our expectations, choices, relationships and patterns.
              </p>
            </div>

            <p style={{ fontSize: '0.98rem', lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
              There is also value in encountering a perspective that is different from our own. We do not always have to agree with an idea for it to make us think. Sometimes the most useful thought is the one that makes us pause and reconsider something we had already decided.
            </p>

            <p style={{ fontSize: '0.98rem', lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '1.75rem' }}>
              ORAANIS brings together such thoughts and perspectives through stories, essays and conversations around the experiences that shape everyday life.
            </p>

            {/* Philosophical Quote Block - Clean & Unboxed */}
            <div style={{
              margin: '1.75rem 0',
              paddingLeft: '1.35rem',
              borderLeft: '2px solid rgba(58, 80, 107, 0.3)'
            }}>
              <p style={{ fontSize: '0.98rem', color: 'var(--text-primary)', fontWeight: '600', marginBottom: '0.5rem' }}>
                The intention is simple: to create something worth spending a few quiet minutes with.
              </p>
              <div style={{ fontSize: '0.92rem', lineHeight: '1.7', color: 'var(--text-secondary)', fontStyle: 'italic', marginBottom: '0.5rem' }}>
                <div>Something that does not demand an immediate reaction.</div>
                <div>Something that leaves room for your own interpretation.</div>
              </div>
              <p style={{ fontSize: '0.95rem', lineHeight: '1.7', color: 'var(--text-primary)', fontStyle: 'italic', margin: 0 }}>
                Because the most meaningful insights are not always the ones that tell us something new. Sometimes they are the ones that make us look at something familiar in a way we had never considered before.
              </p>
            </div>

            <p style={{
              fontSize: '1.05rem',
              fontFamily: 'var(--font-serif)',
              fontWeight: '700',
              color: 'var(--accent-teal)',
              fontStyle: 'italic',
              margin: '1.75rem 0 0 0'
            }}>
              ORAANIS is that space between reading something and truly thinking about it.
            </p>
          </div>

          {/* Down: Explore by Category (5 Pillars Grid) */}
          <div className="why-space-categories-block">
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
            <div className="explore-pillars-horizontal-grid">

              {/* 1. Reflections */}
              <Link to="/category/reflections" className="theme-pillar-card pillar-reflections">
                <div>
                  <div className="theme-pillar-icon-box">
                    <BookOpen size={20} strokeWidth={1.75} />
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
                  <ArrowRight size={13} className="theme-pillar-action-arrow" />
                </div>
              </Link>

              {/* 2. Emotional Intelligence */}
              <Link to="/category/emotional-intelligence" className="theme-pillar-card pillar-emotional-intelligence">
                <div>
                  <div className="theme-pillar-icon-box">
                    <Brain size={20} strokeWidth={1.75} />
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
                  <ArrowRight size={13} className="theme-pillar-action-arrow" />
                </div>
              </Link>

              {/* 3. Healing */}
              <Link to="/category/healing" className="theme-pillar-card pillar-healing">
                <div>
                  <div className="theme-pillar-icon-box">
                    <HeartPulse size={20} strokeWidth={1.75} />
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
                  <ArrowRight size={13} className="theme-pillar-action-arrow" />
                </div>
              </Link>

              {/* 4. Wisdom */}
              <Link to="/category/wisdom" className="theme-pillar-card pillar-wisdom">
                <div>
                  <div className="theme-pillar-icon-box">
                    <Lightbulb size={20} strokeWidth={1.75} />
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
                  <ArrowRight size={13} className="theme-pillar-action-arrow" />
                </div>
              </Link>

              {/* 5. Spirituality */}
              <Link to="/category/spirituality" className="theme-pillar-card pillar-spirituality">
                <div>
                  <div className="theme-pillar-icon-box">
                    <Flower2 size={20} strokeWidth={1.75} />
                  </div>
                  <h4 className="theme-pillar-title">
                    Spirituality
                  </h4>
                  <p className="theme-pillar-desc">
                    Meditations on purpose, transcendence, quiet consciousness, and inner depth.
                  </p>
                </div>
                <div className="theme-pillar-action">
                  <span>Explore</span>
                  <ArrowRight size={13} className="theme-pillar-action-arrow" />
                </div>
              </Link>
            </div>
          </div>

        </div>
      </section>



      {/* =========================================================================
          4. SECTION: Contemplative Quote Banners (RAJSAAR Mentor Lens & Monika Chopra)
          ========================================================================= */}
      <section style={{ padding: '0 0 clamp(2.5rem, 5vw, 4.5rem) 0' }}>
        <div className="container">
          
          {/* 1. RAJSAAR: Through the Mentor's Lens */}
          <div className="thought-quote-banner" style={{ marginBottom: '1.5rem' }}>
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
                  <LeafIcon size={44} color="var(--accent-teal)" />
                </div>

                <div>
                  <div style={{
                    fontSize: '0.8rem',
                    fontFamily: 'var(--font-sans)',
                    fontWeight: '600',
                    letterSpacing: '0.08em',
                    color: 'var(--accent-teal)',
                    marginBottom: '0.5rem'
                  }}>
                    Through the Mentor’s Lens
                  </div>

                  <blockquote style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 'clamp(1.05rem, 1.8vw, 1.3rem)',
                    lineHeight: '1.55',
                    color: 'var(--text-primary)',
                    fontStyle: 'italic',
                    marginBottom: '0.5rem'
                  }}>
                    <span style={{ fontSize: '1.8rem', lineHeight: '0', verticalAlign: '-0.35em', marginRight: '0.3rem', color: 'var(--accent-teal)' }}>“</span>
                    Life does not always answer our questions; sometimes, it changes the person asking them.
                    <span style={{ fontSize: '1.8rem', lineHeight: '0', verticalAlign: '-0.35em', marginLeft: '0.3rem', color: 'var(--accent-teal)' }}>”</span>
                  </blockquote>

                  <div style={{
                    fontSize: '0.82rem',
                    color: 'var(--text-secondary)',
                    fontStyle: 'italic'
                  }}>
                    — RAJSAAR
                  </div>
                </div>
              </div>

              {/* Right Read More Link */}
              <div style={{ alignSelf: 'center' }}>
                <Link
                  to="/rajsaar"
                  style={{
                    fontSize: '0.85rem',
                    fontWeight: '600',
                    color: 'var(--accent-teal)',
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

          {/* 2. Monika Chopra: A Thought to Carry */}
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
                  <LeafIcon size={44} color="var(--accent-teal)" />
                </div>

                <div>
                  <div style={{
                    fontSize: '0.8rem',
                    fontFamily: 'var(--font-sans)',
                    fontWeight: '600',
                    letterSpacing: '0.08em',
                    color: 'var(--accent-teal)',
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
                    <span style={{ fontSize: '1.8rem', lineHeight: '0', verticalAlign: '-0.35em', marginRight: '0.3rem', color: 'var(--accent-teal)' }}>“</span>
                    Knowing your worth is not about convincing others of your value. It is about no longer needing their recognition to live by it.
                    <span style={{ fontSize: '1.8rem', lineHeight: '0', verticalAlign: '-0.35em', marginLeft: '0.3rem', color: 'var(--accent-teal)' }}>”</span>
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
                    color: 'var(--accent-teal)',
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
          5. SECTION: "The People Behind the Words" (Monika Chopra & RAJSAAR) & "Read • Reflect • Rethink"
          ========================================================================= */}
      <section style={{ padding: '0 0 clamp(3.5rem, 6vw, 5.5rem) 0' }}>
        <div className="container">

          {/* Section Header */}
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 2.75rem auto' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              color: 'var(--accent-primary)',
              fontSize: '0.82rem',
              fontWeight: '600',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginBottom: '0.5rem'
            }}>
              <Compass size={15} />
              <span>The Voices of ORAANIS</span>
            </div>
            <h2 style={{
              fontFamily: 'var(--font-cormorant)',
              fontSize: 'clamp(2rem, 4vw, 2.5rem)',
              fontWeight: '700',
              color: 'var(--text-primary)',
              lineHeight: '1.2',
              marginBottom: '0.6rem'
            }}>
              The People Behind the Words
            </h2>
            <p style={{
              fontSize: '0.92rem',
              color: 'var(--text-secondary)',
              lineHeight: '1.65'
            }}>
              Two distinct perspectives rooted in teaching, mentorship, and decades of observing the human experience.
            </p>
          </div>

          {/* 2-Author Showcase Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2rem',
            marginBottom: '3rem'
          }}>

            {/* Author 1: Monika Chopra */}
            <div className="author-showcase-card" style={{
              backgroundColor: 'var(--surface-color)',
              border: '1px solid var(--border-color)',
              borderRadius: '16px',
              padding: 'clamp(1.4rem, 2.5vw, 1.85rem)',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 4px 20px rgba(0,0,0,0.03)'
            }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '170px 1fr',
                gap: '1.4rem',
                alignItems: 'start'
              }} className="author-card-inner">
                <img
                  src={profPortraitImg}
                  alt="Monika Chopra"
                  style={{
                    width: '100%',
                    height: '210px',
                    objectFit: 'cover',
                    borderRadius: '12px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
                  }}
                />
                <div>
                  <div style={{
                    display: 'inline-block',
                    fontSize: '0.72rem',
                    fontWeight: '700',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: 'var(--accent-teal)',
                    backgroundColor: 'rgba(58, 80, 107, 0.08)',
                    padding: '0.2rem 0.6rem',
                    borderRadius: '4px',
                    marginBottom: '0.5rem'
                  }}>
                    Author & Educator
                  </div>
                  <h3 style={{
                    fontFamily: 'var(--font-cormorant)',
                    fontSize: '1.5rem',
                    fontWeight: '700',
                    color: 'var(--text-primary)',
                    marginBottom: '0.35rem'
                  }}>
                    Monika Chopra
                  </h3>
                  <p style={{
                    fontSize: '0.83rem',
                    lineHeight: '1.6',
                    color: 'var(--text-secondary)',
                    marginBottom: '0.5rem'
                  }}>
                    Educator in Information Technology with nearly three decades of teaching, observing, and learning from life.
                  </p>
                  <p style={{
                    fontSize: '0.82rem',
                    lineHeight: '1.55',
                    color: 'var(--text-secondary)',
                    marginBottom: '1rem',
                    fontStyle: 'italic'
                  }}>
                    "Technology has been my profession. Human beings have been my deeper subject of study."
                  </p>
                  <Link
                    to="/person-behind-this"
                    style={{
                      fontSize: '0.84rem',
                      fontWeight: '600',
                      color: 'var(--accent-primary)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem'
                    }}
                  >
                    More About Monika <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            </div>

            {/* Author 2: RAJSAAR */}
            <div className="author-showcase-card" style={{
              backgroundColor: 'var(--surface-color)',
              border: '1px solid var(--border-color)',
              borderRadius: '16px',
              padding: 'clamp(1.4rem, 2.5vw, 1.85rem)',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 4px 20px rgba(0,0,0,0.03)'
            }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '170px 1fr',
                gap: '1.4rem',
                alignItems: 'start'
              }} className="author-card-inner">
                <img
                  src={rajsaarWritingImg}
                  alt="RAJSAAR"
                  style={{
                    width: '100%',
                    height: '210px',
                    objectFit: 'cover',
                    borderRadius: '12px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
                  }}
                />
                <div>
                  <div style={{
                    display: 'inline-block',
                    fontSize: '0.72rem',
                    fontWeight: '700',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: 'var(--accent-teal)',
                    backgroundColor: 'rgba(58, 80, 107, 0.08)',
                    padding: '0.2rem 0.6rem',
                    borderRadius: '4px',
                    marginBottom: '0.5rem'
                  }}>
                    Mentor & Contributor
                  </div>
                  <h3 style={{
                    fontFamily: 'var(--font-cormorant)',
                    fontSize: '1.5rem',
                    fontWeight: '700',
                    color: 'var(--text-primary)',
                    marginBottom: '0.2rem'
                  }}>
                    RAJSAAR
                  </h3>
                  <div style={{
                    fontSize: '0.76rem',
                    fontWeight: '600',
                    color: 'var(--text-muted)',
                    marginBottom: '0.5rem',
                    letterSpacing: '0.02em'
                  }}>
                    A Different Angle or a Revolving Mirror
                  </div>
                  <p style={{
                    fontSize: '0.83rem',
                    lineHeight: '1.6',
                    color: 'var(--text-secondary)',
                    marginBottom: '0.5rem'
                  }}>
                    An educator, mentor, and academic leader who decodes the subtle layers between perception, human nature, and reality.
                  </p>
                  <p style={{
                    fontSize: '0.82rem',
                    lineHeight: '1.55',
                    color: 'var(--text-secondary)',
                    marginBottom: '1rem',
                    fontStyle: 'italic'
                  }}>
                    "Not an attempt to explain life, but an invitation to look at it more closely."
                  </p>
                  <Link
                    to="/rajsaar"
                    style={{
                      fontSize: '0.84rem',
                      fontWeight: '600',
                      color: 'var(--accent-primary)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem'
                    }}
                  >
                    Discover RAJSAAR <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            </div>

          </div>

          {/* Read • Reflect • Rethink Features Block */}
          <div style={{
            backgroundColor: 'var(--surface-color)',
            border: '1px solid var(--border-color)',
            borderRadius: '16px',
            padding: 'clamp(1.5rem, 3vw, 2.25rem)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.02)'
          }}>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '1rem',
              marginBottom: '1.75rem',
              borderBottom: '1px solid var(--border-color)',
              paddingBottom: '1.2rem'
            }}>
              <div>
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
                <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                  What You Will Find in the ORAANIS Library
                </span>
              </div>
              <Link
                to="/essays"
                style={{
                  fontSize: '0.85rem',
                  fontWeight: '600',
                  color: 'var(--accent-primary)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.3rem'
                }}
              >
                Explore the Library <ArrowRight size={13} />
              </Link>
            </div>

            {/* 4 Feature Items Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '1.5rem'
            }}>

              {/* Item 1 */}
              <div style={{ display: 'flex', gap: '0.9rem', alignItems: 'flex-start' }}>
                <div style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(58, 80, 107, 0.08)',
                  color: 'var(--accent-teal)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <BookOpen size={17} />
                </div>
                <div>
                  <h4 style={{ fontSize: '0.92rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '0.2rem' }}>
                    Thoughtful Essays
                  </h4>
                  <p style={{ fontSize: '0.81rem', color: 'var(--text-secondary)', lineHeight: '1.45' }}>
                    Longer reflections on life, ethics and human behaviour.
                  </p>
                </div>
              </div>

              {/* Item 2 */}
              <div style={{ display: 'flex', gap: '0.9rem', alignItems: 'flex-start' }}>
                <div style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(28, 37, 65, 0.08)',
                  color: 'var(--accent-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <Compass size={17} />
                </div>
                <div>
                  <h4 style={{ fontSize: '0.92rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '0.2rem' }}>
                    Life Perspectives
                  </h4>
                  <p style={{ fontSize: '0.81rem', color: 'var(--text-secondary)', lineHeight: '1.45' }}>
                    Different ways of looking at difficult situations and choices.
                  </p>
                </div>
              </div>

              {/* Item 3 */}
              <div style={{ display: 'flex', gap: '0.9rem', alignItems: 'flex-start' }}>
                <div style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(58, 80, 107, 0.08)',
                  color: 'var(--accent-teal)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <Sprout size={17} />
                </div>
                <div>
                  <h4 style={{ fontSize: '0.92rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '0.2rem' }}>
                    Wisdom in Few Words
                  </h4>
                  <p style={{ fontSize: '0.81rem', color: 'var(--text-secondary)', lineHeight: '1.45' }}>
                    Short thoughts and observations worth carrying with you.
                  </p>
                </div>
              </div>

              {/* Item 4 */}
              <div style={{ display: 'flex', gap: '0.9rem', alignItems: 'flex-start' }}>
                <div style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(169, 188, 208, 0.18)',
                  color: 'var(--accent-teal)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <Library size={17} />
                </div>
                <div>
                  <h4 style={{ fontSize: '0.92rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '0.2rem' }}>
                    Stories & Experiences
                  </h4>
                  <p style={{ fontSize: '0.81rem', color: 'var(--text-secondary)', lineHeight: '1.45' }}>
                    Lessons from teaching, observing and living.
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* Interactive FlipBook Modal Reader */}
      {isReaderOpen && (
        <BookReader
          bookUrl="/books/reflections-part-1.pdf"
          bookTitle="REFLECTIONS — Part 1"
          bookAuthor="Monika Chopra"
          initialPage={1}
          onClose={() => setIsReaderOpen(false)}
        />
      )}

      {/* =========================================================================
          FEATURED PUBLICATION: REFLECTIONS — Part 1 (Interactive FlipBook)
          ========================================================================= */}
      <section
        className="home-featured-book-section"
        style={{
          padding: '4.75rem 0',
          backgroundColor: '#0B132B',
          color: '#F8FAFC',
          position: 'relative',
          overflow: 'hidden',
          borderTop: '1px solid #1C2541',
          borderBottom: '1px solid #1C2541'
        }}
      >
        {/* Subtle Background Glow */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '25%',
            transform: 'translate(-50%, -50%)',
            width: '550px',
            height: '550px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(58, 80, 107, 0.25) 0%, rgba(11, 19, 43, 0) 70%)',
            pointerEvents: 'none'
          }}
        />

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: 'clamp(2rem, 5vw, 4.5rem)',
              alignItems: 'center'
            }}
          >
            {/* Left: 3D Hardcover Book Mockup */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div
                style={{
                  perspective: '1200px',
                  width: 'min(330px, 85vw)'
                }}
              >
                <div
                  onClick={() => setIsReaderOpen(true)}
                  style={{
                    position: 'relative',
                    aspectRatio: '1 / 1.48',
                    borderRadius: '8px 14px 14px 8px',
                    backgroundColor: '#4A1525',
                    backgroundImage: 'linear-gradient(135deg, #5B1B2F 0%, #3B0E1C 100%)',
                    boxShadow: '18px 25px 50px -10px rgba(0, 0, 0, 0.7), 2px 0 10px rgba(0,0,0,0.3)',
                    cursor: 'pointer',
                    padding: '2rem 1.6rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    border: '1px solid #7D2D44',
                    transition: 'all 0.35s cubic-bezier(0.2, 0.8, 0.2, 1)',
                    transform: 'rotateY(-10deg) rotateX(3deg)',
                    transformOrigin: 'left center'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'rotateY(0deg) rotateX(0deg) translateY(-8px)';
                    e.currentTarget.style.boxShadow = '24px 32px 65px -10px rgba(0, 0, 0, 0.85), 4px 0 16px rgba(0,0,0,0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'rotateY(-10deg) rotateX(3deg)';
                    e.currentTarget.style.boxShadow = '18px 25px 50px -10px rgba(0, 0, 0, 0.7), 2px 0 10px rgba(0,0,0,0.3)';
                  }}
                >
                  {/* Book Spine Crease Illusion */}
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      bottom: 0,
                      left: 0,
                      width: '22px',
                      background: 'linear-gradient(to right, rgba(0,0,0,0.5) 0%, rgba(255,255,255,0.06) 50%, rgba(0,0,0,0.3) 100%)',
                      borderRadius: '8px 0 0 8px',
                      pointerEvents: 'none'
                    }}
                  />

                  {/* Gold Filigree Double Border */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: '12px',
                      border: '1px solid #D4AF37',
                      borderRadius: '4px',
                      pointerEvents: 'none',
                      opacity: 0.85
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      inset: '16px',
                      border: '1px solid rgba(212, 175, 55, 0.4)',
                      borderRadius: '3px',
                      pointerEvents: 'none'
                    }}
                  />

                  {/* Top: Emblem */}
                  <div style={{ textAlign: 'center', zIndex: 2 }}>
                    <div style={{ color: '#D4AF37', letterSpacing: '0.28em', fontSize: '0.72rem', textTransform: 'uppercase' }}>
                      O R A A N I S
                    </div>
                    <div style={{ display: 'inline-flex', color: '#D4AF37', margin: '0.2rem 0' }}>
                      <svg width="30" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
                        <path d="M12 21C12 21 12.5 14 16 10C18.5 7 21.5 5.5 21.5 5.5C21.5 5.5 19.5 9 16.5 11.5C14 13.5 12 21 12 21Z" fill="#D4AF37" fillOpacity="0.3"/>
                        <path d="M12 21C12 21 11.5 15 8 12.5C5.5 10.5 2.5 10 2.5 10C2.5 10 5.5 8 9.5 10.5C11 11.5 12 21 12 21Z" fill="#D4AF37" fillOpacity="0.3"/>
                        <path d="M12 21V10" stroke="#D4AF37" strokeWidth="1.5"/>
                      </svg>
                    </div>
                  </div>

                  {/* Center: Book Title */}
                  <div style={{ textAlign: 'center', zIndex: 2 }}>
                    <h3
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
                        fontWeight: '700',
                        color: '#FBF8F3',
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        margin: '0 0 0.4rem 0',
                        lineHeight: 1.1
                      }}
                    >
                      REFLECTIONS
                    </h3>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem',
                        color: '#D4AF37',
                        fontFamily: 'var(--font-heading)',
                        fontStyle: 'italic',
                        fontSize: '1rem',
                        margin: '0.3rem 0 0.8rem 0'
                      }}
                    >
                      <span style={{ width: '22px', height: '1px', backgroundColor: '#D4AF37', opacity: 0.6 }} />
                      <span>Part 1</span>
                      <span style={{ width: '22px', height: '1px', backgroundColor: '#D4AF37', opacity: 0.6 }} />
                    </div>
                    <p
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontStyle: 'italic',
                        color: '#E8D7C3',
                        fontSize: '0.82rem',
                        lineHeight: 1.4,
                        margin: '0 auto',
                        maxWidth: '200px'
                      }}
                    >
                      On life, people, and the quiet lessons that shape us
                    </p>
                  </div>

                  {/* Bottom: Author & Motto */}
                  <div style={{ textAlign: 'center', zIndex: 2 }}>
                    <div
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '1rem',
                        fontWeight: '600',
                        color: '#FBF8F3',
                        letterSpacing: '0.06em',
                        marginBottom: '0.25rem'
                      }}
                    >
                      Monika Chopra
                    </div>
                    <div
                      style={{
                        color: '#D4AF37',
                        fontSize: '0.62rem',
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        opacity: 0.95
                      }}
                    >
                      READ • REFLECT • BECOME
                    </div>
                  </div>

                  {/* Floating Action Badge */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '-14px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      backgroundColor: '#1C2541',
                      color: '#F8FAFC',
                      padding: '0.3rem 0.8rem',
                      borderRadius: '999px',
                      fontSize: '0.7rem',
                      fontWeight: '600',
                      border: '1px solid #3A506B',
                      whiteSpace: 'nowrap',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
                      zIndex: 3
                    }}
                  >
                    <BookOpen size={12} color="#A9BCD0" />
                    <span>Click to Open Book</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Book Overview & Controls */}
            <div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '999px',
                  backgroundColor: 'rgba(58, 80, 107, 0.35)',
                  border: '1px solid #3A506B',
                  color: '#A9BCD0',
                  fontSize: '0.74rem',
                  fontWeight: '600',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  marginBottom: '1.1rem'
                }}
              >
                <Sparkles size={13} color="#A9BCD0" />
                <span>New Book Release • Digital Edition 2026</span>
              </div>

              <h2
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(2rem, 3.5vw, 2.8rem)',
                  fontWeight: '700',
                  lineHeight: 1.18,
                  marginBottom: '0.5rem',
                  color: '#F8FAFC'
                }}
              >
                REFLECTIONS — Part 1
              </h2>

              <p
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontStyle: 'italic',
                  fontSize: '1.15rem',
                  color: '#A9BCD0',
                  marginBottom: '1.25rem'
                }}
              >
                On life, people, and the quiet lessons that shape us
              </p>

              <p
                style={{
                  fontSize: '0.94rem',
                  lineHeight: 1.75,
                  color: '#A9BCD0',
                  marginBottom: '1.5rem',
                  textAlign: 'justify'
                }}
              >
                "Life rarely announces its lessons. They arrive through ordinary conversations,
                unexpected silences, changing relationships, difficult choices, and moments we understand
                only much later." In forty-three short reflections and eight quiet pauses, Monika Chopra invites
                you to read page by page, question gently, and look beyond appearances.
              </p>

              {/* 4 Feature Badges */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                  gap: '0.75rem',
                  marginBottom: '2rem'
                }}
              >
                <div style={{ backgroundColor: '#1C2541', border: '1px solid #3A506B', borderRadius: '8px', padding: '0.75rem' }}>
                  <div style={{ fontSize: '0.7rem', color: '#A9BCD0', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Format</div>
                  <div style={{ fontSize: '1.05rem', fontWeight: '700', color: '#F8FAFC', marginTop: '0.15rem' }}>Animated Book</div>
                </div>

                <div style={{ backgroundColor: '#1C2541', border: '1px solid #3A506B', borderRadius: '8px', padding: '0.75rem' }}>
                  <div style={{ fontSize: '0.7rem', color: '#A9BCD0', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Pages</div>
                  <div style={{ fontSize: '1.05rem', fontWeight: '700', color: '#F8FAFC', marginTop: '0.15rem' }}>82 Pages</div>
                </div>

                <div style={{ backgroundColor: '#1C2541', border: '1px solid #3A506B', borderRadius: '8px', padding: '0.75rem' }}>
                  <div style={{ fontSize: '0.7rem', color: '#A9BCD0', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Chapters</div>
                  <div style={{ fontSize: '1.05rem', fontWeight: '700', color: '#F8FAFC', marginTop: '0.15rem' }}>8 Parts + Pauses</div>
                </div>

                <div style={{ backgroundColor: '#1C2541', border: '1px solid #3A506B', borderRadius: '8px', padding: '0.75rem' }}>
                  <div style={{ fontSize: '0.7rem', color: '#A9BCD0', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Reading Mode</div>
                  <div style={{ fontSize: '1.05rem', fontWeight: '700', color: '#A9BCD0', marginTop: '0.15rem' }}>In-Site Only</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                <button
                  onClick={() => setIsReaderOpen(true)}
                  style={{
                    backgroundColor: '#F8FAFC',
                    color: '#0B132B',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '0.85rem 1.85rem',
                    fontSize: '0.94rem',
                    fontWeight: '700',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.65rem',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#A9BCD0';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#F8FAFC';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <BookOpen size={18} />
                  <span>Open & Read Book</span>
                </button>

                <Link
                  to="/books"
                  style={{
                    color: '#A9BCD0',
                    textDecoration: 'none',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    padding: '0.85rem 1.25rem',
                    borderRadius: '8px',
                    border: '1px solid #3A506B',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#F8FAFC';
                    e.currentTarget.style.backgroundColor = '#1C2541';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#A9BCD0';
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  <span>Explore Chapters & Overview</span>
                  <ArrowRight size={15} />
                </Link>
              </div>
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
                color: 'var(--accent-inner)'
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
                backgroundColor: 'rgba(58, 80, 107, 0.1)',
                color: 'var(--accent-teal)',
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
                  backgroundColor: 'rgba(58, 80, 107, 0.1)',
                  color: 'var(--accent-teal)',
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
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', textAlign: 'center' }}>
                    {feedbackMessage}
                  </div>
                  <button
                    onClick={() => { setSubscribeStatus('idle'); setFeedbackMessage(''); }}
                    style={{
                      marginTop: '0.35rem',
                      fontSize: '0.74rem',
                      textDecoration: 'underline',
                      color: 'var(--accent-teal)',
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
                <LeafIcon size={16} color="var(--accent-teal)" />
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
                color: 'var(--accent-inner)',
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
                color: '#FFFFFF',
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
