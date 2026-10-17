import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, User } from 'lucide-react';
import { LeafIcon } from '../components/BrandIcons';
import Breadcrumbs from '../components/Breadcrumbs';

export default function About() {
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
          <Breadcrumbs items={[{ label: 'About ORAANIS' }]} />
        </div>

        {/* =========================================================================
            ABOUT ORAANIS EDITORIAL ESSAY
            ========================================================================= */}
        <article style={{
          backgroundColor: 'var(--bg-secondary)',
          border: '1px solid var(--border-color)',
          borderRadius: '16px',
          padding: 'clamp(2.25rem, 5vw, 4.5rem) clamp(1.5rem, 5vw, 3.5rem)',
          boxShadow: '0 4px 24px rgba(44, 38, 33, 0.03)'
        }}>
          
          {/* Header */}
          <header style={{ marginBottom: '2.5rem', textAlign: 'left' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.75rem' }}>
              <LeafIcon size={18} color="var(--accent-primary)" />
            </div>

            <h1 style={{
              fontSize: 'clamp(2.2rem, 5vw, 3.2rem)',
              fontWeight: '700',
              letterSpacing: '-0.02em',
              lineHeight: '1.15',
              color: 'var(--text-primary)',
              marginBottom: '0.4rem',
              fontFamily: 'var(--font-serif)'
            }}>
              ORAANIS
            </h1>

            <p style={{
              fontSize: 'clamp(1.15rem, 2.4vw, 1.4rem)',
              fontFamily: 'var(--font-serif)',
              fontStyle: 'italic',
              color: 'var(--text-secondary)',
              margin: '0.35rem 0 1rem 0'
            }}>
              Bringing Inner Stories Into the Light
            </p>

            <div style={{
              width: '40px',
              height: '2px',
              backgroundColor: 'var(--accent-primary)',
              marginTop: '1rem',
              opacity: 0.6
            }} />
          </header>

          {/* Continuous Flowing Editorial Prose */}
          <div style={{
            fontSize: 'clamp(1rem, 2vw, 1.075rem)',
            lineHeight: '1.85',
            color: 'var(--text-primary)',
            textAlign: 'justify'
          }}>

            <p style={{ marginBottom: '1.35rem' }}>
              Every life carries stories that are rarely spoken. Some remain as questions, some become memories, some leave wounds, and some, with time and understanding, become wisdom.
            </p>

            <p style={{ marginBottom: '1.35rem', fontWeight: '600' }}>
              ORAANIS is a space for those stories.
            </p>

            <p style={{ marginBottom: '2.5rem' }}>
              It is a place to pause, read, reflect and understand what life is quietly teaching us. It is not about having all the answers, nor is it about offering easy solutions to complicated experiences. It is about asking better questions, looking beyond what appears on the surface, understanding ourselves a little more deeply, and becoming more conscious of the person we are becoming.
            </p>

            {/* Read */}
            <h2 style={{
              fontSize: 'clamp(1.4rem, 3vw, 1.75rem)',
              fontFamily: 'var(--font-serif)',
              fontWeight: '700',
              color: 'var(--text-primary)',
              marginTop: '2.5rem',
              marginBottom: '0.75rem',
              borderTop: '1px solid var(--border-color)',
              paddingTop: '2rem'
            }}>
              Read
            </h2>

            <p style={{ marginBottom: '1.15rem', fontStyle: 'italic', color: 'var(--text-secondary)' }}>
              Every story has something to teach us.
            </p>

            <p style={{ marginBottom: '1.15rem' }}>
              ORAANIS explores life, relationships, human behaviour, emotions, choices, struggles and the experiences that quietly shape who we become. Some stories may mirror something we have lived through. Some may challenge the way we see things. Others may simply make us pause and think.
            </p>

            <p style={{ marginBottom: '2.5rem', fontWeight: '500' }}>
              Reading, after all, is not only about knowing more. Sometimes it is about seeing differently.
            </p>

            {/* Reflect */}
            <h2 style={{
              fontSize: 'clamp(1.4rem, 3vw, 1.75rem)',
              fontFamily: 'var(--font-serif)',
              fontWeight: '700',
              color: 'var(--text-primary)',
              marginTop: '2.5rem',
              marginBottom: '0.75rem',
              borderTop: '1px solid var(--border-color)',
              paddingTop: '2rem'
            }}>
              Reflect
            </h2>

            <p style={{ marginBottom: '1.15rem', fontStyle: 'italic', color: 'var(--text-secondary)' }}>
              The real conversation often begins within.
            </p>

            <p style={{ marginBottom: '1.25rem' }}>
              An experience becomes meaningful when we take the time to reflect on it. Why did it affect me so deeply? Why did I react the way I did? What was this moment trying to show me? What am I still carrying? What do I need to understand, accept or let go of?
            </p>

            <p style={{ marginBottom: '2.5rem', fontWeight: '500' }}>
              ORAANIS creates space for these questions because clarity does not always arrive when we search for answers. Sometimes it begins with a pause.
            </p>

            {/* Understand */}
            <h2 style={{
              fontSize: 'clamp(1.4rem, 3vw, 1.75rem)',
              fontFamily: 'var(--font-serif)',
              fontWeight: '700',
              color: 'var(--text-primary)',
              marginTop: '2.5rem',
              marginBottom: '0.75rem',
              borderTop: '1px solid var(--border-color)',
              paddingTop: '2rem'
            }}>
              Understand
            </h2>

            <p style={{ marginBottom: '1.15rem', fontStyle: 'italic', color: 'var(--text-secondary)' }}>
              There is often more to a situation than what happened.
            </p>

            <p style={{ marginBottom: '1.15rem' }}>
              Human beings are complicated. We misunderstand, react, protect ourselves, expect, forgive, repeat patterns and change. Behind many actions are emotions, experiences and fears that may not always be visible.
            </p>

            <p style={{ marginBottom: '1.15rem' }}>
              Understanding does not necessarily mean agreeing with someone. It means being willing to look beyond the obvious and recognise that every person carries a story of their own.
            </p>

            <p style={{ marginBottom: '2.5rem', fontWeight: '500' }}>
              When we begin to understand rather than immediately judge, our view of people, relationships and even ourselves begins to change.
            </p>

            {/* Emotional Intelligence */}
            <h2 style={{
              fontSize: 'clamp(1.4rem, 3vw, 1.75rem)',
              fontFamily: 'var(--font-serif)',
              fontWeight: '700',
              color: 'var(--text-primary)',
              marginTop: '2.5rem',
              marginBottom: '0.75rem',
              borderTop: '1px solid var(--border-color)',
              paddingTop: '2rem'
            }}>
              Emotional Intelligence
            </h2>

            <p style={{ marginBottom: '1.15rem' }}>
              Knowing what we feel is only the beginning. Understanding those feelings, and learning how to respond to them, is where emotional intelligence begins.
            </p>

            <p style={{ marginBottom: '1.15rem' }}>
              It is about recognising our emotions without allowing them to control every response. It is about understanding our own reactions, becoming aware of what others may be experiencing, knowing when to speak and when to pause, setting boundaries without losing compassion, and learning when something needs to be addressed and when it simply needs to be released.
            </p>

            <p style={{ marginBottom: '1.15rem' }}>
              ORAANIS explores the emotional spaces between people — the things left unsaid, the misunderstandings that grow quietly, the expectations we carry, the boundaries we need to establish, the compassion we sometimes need to offer and the experiences we eventually need to let go of.
            </p>

            <p style={{ marginBottom: '1.15rem' }}>
              Emotional intelligence is not about becoming less emotional. It is about becoming more aware of what our emotions are telling us and choosing how we respond.
            </p>

            <p style={{ marginBottom: '2.5rem', fontWeight: '600', color: 'var(--accent-teal)' }}>
              Sometimes maturity is knowing what deserves a reaction, what deserves a conversation, and what deserves our silence.
            </p>

            {/* Wisdom */}
            <h2 style={{
              fontSize: 'clamp(1.4rem, 3vw, 1.75rem)',
              fontFamily: 'var(--font-serif)',
              fontWeight: '700',
              color: 'var(--text-primary)',
              marginTop: '2.5rem',
              marginBottom: '0.75rem',
              borderTop: '1px solid var(--border-color)',
              paddingTop: '2rem'
            }}>
              Wisdom
            </h2>

            <p style={{ marginBottom: '1.15rem', fontStyle: 'italic', color: 'var(--text-secondary)' }}>
              Experience alone does not make us wise. What we understand from our experiences does.
            </p>

            <p style={{ marginBottom: '1.15rem' }}>
              Life gives us moments. Reflection gives those moments meaning. Understanding gives them depth. And with time, those lessons can become wisdom.
            </p>

            <p style={{ marginBottom: '1.15rem' }}>
              ORAANIS looks for those lessons in ordinary as well as extraordinary experiences — in relationships, failures, achievements, loss, choices, change and the passage of time.
            </p>

            <p style={{ marginBottom: '2.5rem', fontWeight: '500' }}>
              Wisdom is not knowing everything. It is learning to recognise what experience was trying to teach us.
            </p>

            {/* Relationships */}
            <h2 style={{
              fontSize: 'clamp(1.4rem, 3vw, 1.75rem)',
              fontFamily: 'var(--font-serif)',
              fontWeight: '700',
              color: 'var(--text-primary)',
              marginTop: '2.5rem',
              marginBottom: '0.75rem',
              borderTop: '1px solid var(--border-color)',
              paddingTop: '2rem'
            }}>
              Relationships
            </h2>

            <p style={{ marginBottom: '1.15rem' }}>
              People become part of our stories, but not every relationship is meant to remain the same forever.
            </p>

            <p style={{ marginBottom: '1.15rem' }}>
              Relationships teach us about trust, love, friendship, family, mentorship, expectations, distance, forgiveness and boundaries. They reveal parts of ourselves that we may not have discovered otherwise.
            </p>

            <p style={{ marginBottom: '1.15rem' }}>
              ORAANIS looks at relationships without reducing them to perfection or blame. Real relationships are rarely simple. They are built between imperfect people who are learning, changing and trying to understand one another.
            </p>

            <p style={{ marginBottom: '2.5rem', fontWeight: '500' }}>
              Sometimes relationships grow. Sometimes they change. Sometimes they end. And sometimes their greatest lesson is the person we become through them.
            </p>

            {/* Healing */}
            <h2 style={{
              fontSize: 'clamp(1.4rem, 3vw, 1.75rem)',
              fontFamily: 'var(--font-serif)',
              fontWeight: '700',
              color: 'var(--text-primary)',
              marginTop: '2.5rem',
              marginBottom: '0.75rem',
              borderTop: '1px solid var(--border-color)',
              paddingTop: '2rem'
            }}>
              Healing
            </h2>

            <p style={{ marginBottom: '1.15rem', fontStyle: 'italic', color: 'var(--text-secondary)' }}>
              Healing is not the same as erasing the past.
            </p>

            <p style={{ marginBottom: '1.15rem' }}>
              Some experiences cannot be changed, and some memories may remain with us for a long time. What can change is our relationship with them.
            </p>

            <p style={{ marginBottom: '1.15rem' }}>
              Healing can mean understanding what happened, accepting what cannot be changed, releasing what no longer belongs to us and carrying forward the lessons that help us grow.
            </p>

            <p style={{ marginBottom: '1.15rem' }}>
              ORAANIS does not promise a life without pain. Instead, it explores how difficult experiences can sometimes become perspective, how loss can become learning, and how difficult chapters can contribute to a wiser version of ourselves.
            </p>

            <p style={{ marginBottom: '2.5rem', fontWeight: '600' }}>
              Healing does not mean forgetting the chapter. It means no longer allowing that chapter to write your identity.
            </p>

            {/* Spirituality */}
            <h2 style={{
              fontSize: 'clamp(1.4rem, 3vw, 1.75rem)',
              fontFamily: 'var(--font-serif)',
              fontWeight: '700',
              color: 'var(--text-primary)',
              marginTop: '2.5rem',
              marginBottom: '0.75rem',
              borderTop: '1px solid var(--border-color)',
              paddingTop: '2rem'
            }}>
              Spirituality
            </h2>

            <p style={{ marginBottom: '1.15rem', fontStyle: 'italic', color: 'var(--text-secondary)' }}>
              Some answers arrive only when we stop trying to force them.
            </p>

            <p style={{ marginBottom: '1.15rem' }}>
              For many, spirituality is found in faith, surrender, gratitude, silence, acceptance, prayer, timing and the quiet belief that life may be unfolding beyond what we can presently understand.
            </p>

            <p style={{ marginBottom: '1.15rem' }}>
              ORAANIS approaches spirituality as an inner journey rather than a fixed prescription. It leaves room for questioning, reflection and individual understanding.
            </p>

            <p style={{ marginBottom: '2.5rem', fontWeight: '500' }}>
              Faith does not necessarily remove uncertainty. Sometimes it simply gives us the courage to walk through it.
            </p>

            {/* Life & Becoming */}
            <h2 style={{
              fontSize: 'clamp(1.4rem, 3vw, 1.75rem)',
              fontFamily: 'var(--font-serif)',
              fontWeight: '700',
              color: 'var(--text-primary)',
              marginTop: '2.5rem',
              marginBottom: '0.75rem',
              borderTop: '1px solid var(--border-color)',
              paddingTop: '2rem'
            }}>
              Life &amp; Becoming
            </h2>

            <p style={{ marginBottom: '1.15rem', fontWeight: '600' }}>
              We are never quite finished becoming.
            </p>

            <p style={{ marginBottom: '1.15rem' }}>
              A conversation can change us. So can a relationship, a failure, a success, a loss, a book, a difficult season or a moment when we finally choose differently.
            </p>

            <p style={{ marginBottom: '1.15rem' }}>
              Every experience leaves something behind.
            </p>

            <p style={{ marginBottom: '1.15rem', fontStyle: 'italic', color: 'var(--text-secondary)' }}>
              Perhaps the more important question is not only, “What happened to me?” but also, “What is this making me?”
            </p>

            <p style={{ marginBottom: '1.15rem' }}>
              Because reflection is not meant to keep us trapped in the past. It is meant to help us understand the past well enough to move forward with greater awareness.
            </p>

            <p style={{ marginBottom: '2.5rem', fontWeight: '500' }}>
              ORAANIS is ultimately about that journey — from experience to reflection, from reflection to understanding, from understanding to wisdom, and from wisdom to becoming.
            </p>

            {/* The ORAANIS Journey */}
            <h2 style={{
              fontSize: 'clamp(1.4rem, 3vw, 1.75rem)',
              fontFamily: 'var(--font-serif)',
              fontWeight: '700',
              color: 'var(--text-primary)',
              marginTop: '2.5rem',
              marginBottom: '0.75rem',
              borderTop: '1px solid var(--border-color)',
              paddingTop: '2rem'
            }}>
              The ORAANIS Journey
            </h2>

            <p style={{ marginBottom: '1.15rem' }}>
              There is no fixed formula for this journey.
            </p>

            <p style={{ marginBottom: '1.15rem' }}>
              Sometimes we begin with a story. Sometimes with a question. Sometimes with an experience we cannot quite explain.
            </p>

            <p style={{ marginBottom: '1.15rem' }}>
              We read something and recognise ourselves in it. We reflect on it. We begin to understand something we had previously overlooked. That understanding becomes a lesson, the lesson becomes growth, and slowly, almost unnoticed, we begin to become someone a little more aware than before.
            </p>

            <p style={{ marginBottom: '1.15rem' }}>
              That is the journey ORAANIS hopes to create.
            </p>

            <p style={{ marginBottom: '2.5rem', fontWeight: '600' }}>
              Not a journey towards perfection, but towards awareness.
            </p>

            {/* What ORAANIS Stands For */}
            <h2 style={{
              fontSize: 'clamp(1.4rem, 3vw, 1.75rem)',
              fontFamily: 'var(--font-serif)',
              fontWeight: '700',
              color: 'var(--text-primary)',
              marginTop: '2.5rem',
              marginBottom: '0.75rem',
              borderTop: '1px solid var(--border-color)',
              paddingTop: '2rem'
            }}>
              What ORAANIS Stands For
            </h2>

            <p style={{ marginBottom: '1.15rem' }}>
              ORAANIS is not about motivation without meaning or positivity that ignores reality. It is not about offering ready-made answers to deeply personal questions, nor is it about turning wisdom into a collection of quotations.
            </p>

            <p style={{ marginBottom: '1.25rem' }}>
              It is a space where experiences can be explored, emotions can be understood, relationships can be questioned, and ordinary moments can reveal extraordinary lessons.
            </p>

            <div style={{
              padding: '0.5rem 0 0.5rem 1.25rem',
              borderLeft: '2px solid var(--accent-primary)',
              margin: '1.5rem 0 2rem 0',
              lineHeight: '2',
              color: 'var(--text-primary)'
            }}>
              <div>A space to read something that makes you stop.</div>
              <div>A thought that makes you look within.</div>
              <div>A story that helps you understand someone differently.</div>
              <div>A lesson that stays with you long after you have finished reading.</div>
            </div>

            <p style={{ marginBottom: '2.5rem', fontStyle: 'italic', color: 'var(--text-secondary)' }}>
              And perhaps, somewhere along the way, a realisation that changes the way you see yourself and the life you are living.
            </p>

            {/* The Essence of ORAANIS */}
            <h2 style={{
              fontSize: 'clamp(1.4rem, 3vw, 1.75rem)',
              fontFamily: 'var(--font-serif)',
              fontWeight: '700',
              color: 'var(--text-primary)',
              marginTop: '2.5rem',
              marginBottom: '0.75rem',
              borderTop: '1px solid var(--border-color)',
              paddingTop: '2rem'
            }}>
              The Essence of ORAANIS
            </h2>

            <div style={{ margin: '1.25rem 0 2rem 0', lineHeight: '2.1', fontSize: '1.05rem' }}>
              <div>ORAANIS is about the stories beneath the stories.</div>
              <div>The emotions behind the reactions.</div>
              <div>The lessons hidden inside experiences.</div>
              <div>The questions we carry quietly.</div>
              <div>The wisdom that arrives with time.</div>
              <div style={{ fontWeight: '600' }}>And the person we slowly become when we begin to understand it all.</div>
            </div>

            <p style={{
              fontSize: '1.15rem',
              fontFamily: 'var(--font-serif)',
              fontWeight: '700',
              color: 'var(--accent-teal)',
              letterSpacing: '0.04em',
              margin: '2rem 0 3rem 0'
            }}>
              Read. Reflect. Understand. Become.
            </p>

            {/* Closing Mantra & Sign-off */}
            <div style={{
              paddingTop: '2.5rem',
              borderTop: '1px solid var(--border-color)',
              textAlign: 'left'
            }}>
              <div style={{
                fontSize: '1.5rem',
                fontFamily: 'var(--font-serif)',
                fontWeight: '700',
                color: 'var(--text-primary)',
                marginBottom: '0.35rem'
              }}>
                ORAANIS
              </div>

              <div style={{
                color: 'var(--text-secondary)',
                fontSize: '0.98rem',
                lineHeight: '1.8',
                marginBottom: '1.75rem',
                fontStyle: 'italic'
              }}>
                Bringing Inner Stories Into the Light
              </div>

              {/* Navigation Actions */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
                <Link to="/person-behind-this" className="btn-dark-green">
                  <User size={16} /> The Person Behind This
                </Link>
                <Link to="/essays" className="btn-warm-pill">
                  Explore Reflections <ArrowRight size={15} />
                </Link>
              </div>
            </div>

          </div>
        </article>

      </div>
    </div>
  );
}
