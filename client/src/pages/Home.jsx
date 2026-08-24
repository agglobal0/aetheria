import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';
import { essayService, categoryService } from '../services/api';
import FeaturedEssay from '../components/FeaturedEssay';
import CategoryCard from '../components/CategoryCard';
import EssayCard from '../components/EssayCard';
import NewsletterForm from '../components/NewsletterForm';
import LoadingSkeleton from '../components/LoadingSkeleton';
import DailyWisdom from '../components/DailyWisdom';
import WisdomNavigator from '../components/WisdomNavigator';
import MotivationalQuotes from '../components/MotivationalQuotes';

export default function Home() {
  const [featuredEssay, setFeaturedEssay] = useState(null);
  const [latestEssays, setLatestEssays] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadHomeData() {
      try {
        setLoading(true);
        const [essaysRes, catsRes] = await Promise.all([
          essayService.getAll({ limit: 12, status: 'published' }),
          categoryService.getAll()
        ]);

        if (essaysRes.data.success) {
          const all = essaysRes.data.data;
          const feat = all.find(e => e.featured === 1) || all[0];
          setFeaturedEssay(feat);

          const remaining = all.filter(e => e.id !== feat?.id);
          setLatestEssays(remaining.slice(0, 6));
        }

        if (catsRes.data.success) {
          setCategories(catsRes.data.data);
        }
      } catch (err) {
        console.error('Failed to load home page data:', err);
      } finally {
        setLoading(false);
      }
    }

    loadHomeData();
  }, []);

  return (
    <div>
      {/* Motivational Editorial Hero Section */}
      <section style={{
        padding: '5rem 0 4.5rem 0',
        textAlign: 'center',
        borderBottom: '1px solid var(--border-color)',
        marginBottom: '4rem',
        background: 'var(--hero-glow)'
      }} className="animate-fade-in">
        <div className="reading-container">
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.4rem 0.95rem',
            borderRadius: 'var(--radius-full)',
            backgroundColor: 'var(--accent-light)',
            color: 'var(--accent-primary)',
            fontSize: '0.8rem',
            fontWeight: '700',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            marginBottom: '1.75rem'
          }}>
            <Sparkles size={14} /> Prof. Monika Chopra • Life Lessons & Moral Wisdom
          </div>

          <h1 className="serif-heading" style={{
            fontSize: 'clamp(2.5rem, 6vw, 4.2rem)',
            fontWeight: '700',
            lineHeight: '1.12',
            color: 'var(--text-primary)',
            marginBottom: '1.5rem',
            letterSpacing: '-0.03em'
          }}>
            Wisdom to Live & Lead with Purpose.
          </h1>

          <p style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1.25rem',
            lineHeight: '1.7',
            color: 'var(--text-secondary)',
            marginBottom: '2.5rem',
            maxWidth: '650px',
            margin: '0 auto 2.5rem auto'
          }}>
            Inspiring reflections on ethical friction, human resilience, quiet character, and the timeless lessons that shape meaningful lives.
          </p>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/essays" className="btn btn-primary" style={{ padding: '0.9rem 2rem', fontSize: '0.95rem' }}>
              Explore Life Lessons <ArrowRight size={18} />
            </Link>
            <a href="#daily-wisdom" className="btn btn-outline" style={{ padding: '0.9rem 2rem', fontSize: '0.95rem' }}>
              Daily Reflection
            </a>
          </div>
        </div>
      </section>

      <div className="container">
        {loading ? (
          <LoadingSkeleton type="grid" count={6} />
        ) : (
          <>
            {/* Daily Wisdom Widget */}
            <section id="daily-wisdom" style={{ marginBottom: '5rem' }}>
              <DailyWisdom />
            </section>

            {/* Featured Article Section */}
            {featuredEssay && (
              <section style={{ marginBottom: '5rem' }}>
                <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <ShieldCheck size={18} style={{ color: 'var(--accent-primary)' }} />
                  <span style={{ fontSize: '0.8rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: '700' }}>
                    Featured Moral Essay
                  </span>
                </div>
                <FeaturedEssay essay={featuredEssay} />
              </section>
            )}

            {/* Wisdom Navigator Guidance Tool */}
            <WisdomNavigator />

            {/* Four Core Spheres Grid */}
            <section style={{ marginBottom: '6rem' }}>
              <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <span style={{ fontSize: '0.75rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--accent-primary)', fontWeight: '700' }}>
                  Character & Wisdom Pillars
                </span>
                <h2 className="serif-heading" style={{ fontSize: '2.2rem', marginTop: '0.3rem' }}>
                  Explore the Four Spheres of Wisdom
                </h2>
              </div>

              <div className="grid-4">
                {categories.map(cat => (
                  <CategoryCard key={cat.id} category={cat} />
                ))}
              </div>
            </section>

            {/* Latest Essays Grid */}
            <section id="latest" style={{ marginBottom: '6rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.5rem' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: '700' }}>
                    Reflective Scholarship
                  </span>
                  <h2 className="serif-heading" style={{ fontSize: '2.2rem', marginTop: '0.3rem' }}>
                    Latest Life Lessons & Essays
                  </h2>
                </div>
                <Link to="/essays" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.9rem', fontWeight: '600', color: 'var(--accent-primary)' }}>
                  View All ({latestEssays.length + 1}) <ArrowRight size={16} />
                </Link>
              </div>

              <div className="grid-3">
                {latestEssays.map(essay => (
                  <EssayCard key={essay.id} essay={essay} />
                ))}
              </div>
            </section>

            {/* Philosophical Motivational Quotes Section */}
            <MotivationalQuotes />

            {/* Newsletter Subscription Banner */}
            <NewsletterForm />
          </>
        )}
      </div>
    </div>
  );
}

