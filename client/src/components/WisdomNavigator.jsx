import React, { useState } from 'react';
import { Compass, ShieldCheck, HeartHandshake, Feather, ArrowRight, Lightbulb } from 'lucide-react';
import { Link } from 'react-router-dom';

const SEEK_GOALS = [
  {
    id: 'purpose',
    title: 'Finding Purpose & Direction',
    icon: Compass,
    color: 'var(--accent-life-reflection)',
    summary: 'Navigating life crossroads, understanding quiet ambitions, and setting meaningful long-term values.',
    actionStep: 'Identify one project or habit that feeds your soul regardless of external financial gain.',
    essaySlug: 'things-we-understand-too-late',
    essayTitle: 'Things We Understand Too Late'
  },
  {
    id: 'integrity',
    title: 'Ethical Friction & Moral Choices',
    icon: ShieldCheck,
    color: 'var(--accent-ethics)',
    summary: 'Resisting convenience culture, making brave decisions in corporate or social settings.',
    actionStep: 'Pause 10 seconds before agreeing or reacting to controversial news or social pressure.',
    essaySlug: 'when-convenience-becomes-a-moral-choice',
    essayTitle: 'When Convenience Becomes a Moral Choice'
  },
  {
    id: 'resilience',
    title: 'Overcoming Doubt & Solitude',
    icon: Feather,
    color: 'var(--accent-technology)',
    summary: 'Embracing quiet periods of growth, transforming setbacks into wisdom, and quiet self-concept.',
    actionStep: 'Write down three past failures that ultimately made you wiser or more empathetic.',
    essaySlug: 'what-quiet-seasons-teach-us',
    essayTitle: 'What Quiet Seasons Teach Us'
  },
  {
    id: 'connection',
    title: 'Authentic Human Connection',
    icon: HeartHandshake,
    color: 'var(--accent-human-behaviour)',
    summary: 'Moving beyond ironical detachment, overcoming unspoken expectations, and building deep trust.',
    actionStep: 'Express genuine appreciation to someone today without expecting anything in return.',
    essaySlug: 'why-we-pretend-not-to-care',
    essayTitle: 'Why We Pretend Not to Care'
  }
];

export default function WisdomNavigator() {
  const [selectedId, setSelectedId] = useState('purpose');

  const activeGoal = SEEK_GOALS.find(g => g.id === selectedId) || SEEK_GOALS[0];
  const IconComponent = activeGoal.icon;

  return (
    <section style={{
      backgroundColor: 'var(--bg-secondary)',
      border: '1px solid var(--border-color)',
      borderRadius: 'var(--radius-lg)',
      padding: 'clamp(1.5rem, 4vw, 3rem) clamp(1rem, 3vw, 2rem)',
      marginBottom: 'clamp(3rem, 6vw, 5rem)',
      boxShadow: 'var(--shadow-sm)'
    }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <span style={{ fontSize: '0.75rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--accent-primary)', fontWeight: '700' }}>
          Interactive Wisdom Navigator
        </span>
        <h2 className="serif-heading" style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)', marginTop: '0.3rem' }}>
          What Guidance Do You Seek Today?
        </h2>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '560px', margin: '0.5rem auto 0 auto', fontSize: '0.925rem' }}>
          Select your focus to discover actionable life lessons and curated reflections by Prof. Monika Chopra.
        </p>
      </div>

      {/* Goal Selector Chips */}
      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '2rem' }}>
        {SEEK_GOALS.map((goal) => {
          const isSelected = selectedId === goal.id;
          const GoalIcon = goal.icon;
          return (
            <button
              key={goal.id}
              onClick={() => setSelectedId(goal.id)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.55rem 1rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.825rem',
                fontWeight: '600',
                border: isSelected ? `2px solid ${goal.color}` : '1px solid var(--border-color)',
                backgroundColor: isSelected ? 'var(--bg-tertiary)' : 'var(--bg-primary)',
                color: isSelected ? 'var(--text-primary)' : 'var(--text-secondary)',
                cursor: 'pointer',
                transition: 'all var(--transition-fast)'
              }}
            >
              <GoalIcon size={15} style={{ color: goal.color }} />
              <span>{goal.title}</span>
            </button>
          );
        })}
      </div>

      {/* Active Goal Result Card */}
      <div style={{
        backgroundColor: 'var(--bg-primary)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-md)',
        padding: 'clamp(1.25rem, 3vw, 2rem)',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '1.5rem',
        alignItems: 'center',
        animation: 'fadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <IconComponent size={22} style={{ color: activeGoal.color, flexShrink: 0 }} />
            <h3 className="serif-heading" style={{ fontSize: '1.3rem' }}>{activeGoal.title}</h3>
          </div>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.65', marginBottom: '1.25rem', fontSize: '0.95rem' }}>
            {activeGoal.summary}
          </p>

          <div style={{
            backgroundColor: 'var(--accent-light)',
            borderLeft: `3px solid ${activeGoal.color}`,
            padding: '0.85rem 1rem',
            borderRadius: '0 var(--radius-sm) var(--radius-sm) 0',
            marginBottom: '0.5rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: '700', color: 'var(--accent-primary)', marginBottom: '0.2rem' }}>
              <Lightbulb size={13} /> Micro Life Practice
            </div>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-primary)', lineHeight: '1.5' }}>
              {activeGoal.actionStep}
            </div>
          </div>
        </div>

        <div style={{
          backgroundColor: 'var(--bg-secondary)',
          padding: '1.25rem',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-color)'
        }}>
          <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '700', color: 'var(--text-muted)' }}>
            Recommended Essay
          </span>
          <h4 className="serif-heading" style={{ fontSize: '1.15rem', margin: '0.4rem 0 0.6rem 0' }}>
            {activeGoal.essayTitle}
          </h4>
          <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', marginBottom: '1rem', lineHeight: '1.5' }}>
            Deep philosophical inquiry exploring this dimension of human life and ethics.
          </p>
          <Link
            to={`/essay/${activeGoal.essaySlug}`}
            className="btn btn-primary"
            style={{ width: '100%', padding: '0.65rem 1rem', fontSize: '0.85rem' }}
          >
            Read Essay Reflection <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
}
