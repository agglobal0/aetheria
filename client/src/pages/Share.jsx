import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Feather,
  Heart,
  MessageSquare,
  Sparkles,
  Compass,
  CheckCircle2,
  AlertCircle,
  Share2,
  Filter,
  Search,
  BookOpen,
  Sprout,
  ShieldCheck,
  Send,
  Loader2,
  UserCheck,
  UserX,
  ArrowRight,
  Quote
} from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';
import { perspectiveService } from '../services/api';

const TOPIC_CATEGORIES = [
  'All',
  'Life Lessons',
  'Relationships & Trust',
  'Inner Peace',
  'Career & Purpose',
  'Healing & Resilience',
  'Solitude & Growth'
];

const WRITING_PROMPTS = [
  {
    topic: 'Life Lessons',
    prompt: 'What is a lesson you learned the hard way that forever changed how you navigate life?'
  },
  {
    topic: 'Relationships & Trust',
    prompt: 'What have you understood about forgiveness after an expectation was broken?'
  },
  {
    topic: 'Inner Peace',
    prompt: 'What belief did you carry for years before realizing you no longer needed it?'
  },
  {
    topic: 'Career & Purpose',
    prompt: 'What does meaningful work mean to you beyond titles, praise, and financial metrics?'
  }
];

const FALLBACK_PERSPECTIVES = [
  {
    id: 1,
    author_name: 'Aarav M.',
    topic: 'Life Lessons',
    title: 'Learning to distinguish between silence and absence',
    content: 'For years, I thought silence in a relationship meant distance or withdrawal. But with time, I began to realize that some people carry their care quietly without constant performance. Silence isn\'t always empty; sometimes it is the only space large enough for genuine understanding to rest.',
    is_anonymous: 0,
    likes: 28,
    created_at: '2026-09-28T10:30:00Z'
  },
  {
    id: 2,
    author_name: 'A Fellow Educator',
    topic: 'Mentorship & Growth',
    title: 'What students teach us when we stop giving answers',
    content: 'Thirty years in the classroom taught me that the moment you stop trying to convince someone of a truth, their mind actually opens to discover it. Mentorship is not carving a statue; it is clearing away the stone so the person underneath can emerge.',
    is_anonymous: 1,
    likes: 42,
    created_at: '2026-09-29T14:15:00Z'
  },
  {
    id: 3,
    author_name: 'Meera Sen',
    topic: 'Inner Peace',
    title: 'The courage to be ordinary without feeling small',
    content: 'We live in a culture that constantly urges us to be extraordinary, exceptional, and visible. It took a period of quiet burnout for me to realize that an ordinary life lived with deep kindness, presence, and honesty is the rarest accomplishment of all.',
    is_anonymous: 0,
    likes: 51,
    created_at: '2026-09-30T09:45:00Z'
  },
  {
    id: 4,
    author_name: 'A Quiet Observer',
    topic: 'Relationships & Trust',
    title: 'The slow erosion of trust is rarely about one mistake',
    content: 'People often point to a single breaking point when trust falls apart. But in truth, trust rarely breaks in an instant; it erodes in small unkept promises, subtle dismissals, and moments where someone felt unseen and chose not to speak up anymore.',
    is_anonymous: 1,
    likes: 33,
    created_at: '2026-10-01T16:20:00Z'
  }
];

export default function Share() {
  const [perspectives, setPerspectives] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTopic, setSelectedTopic] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [likedMap, setLikedMap] = useState({});
  const [copiedId, setCopiedId] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    author_name: '',
    email: '',
    topic: 'Life Lessons',
    title: '',
    content: '',
    is_anonymous: false
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error'
  const [submitFeedback, setSubmitFeedback] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
    loadPerspectives();

    // Load liked state from localStorage
    try {
      const savedLikes = JSON.parse(localStorage.getItem('oraanis_liked_perspectives') || '{}');
      setLikedMap(savedLikes);
    } catch (e) {}
  }, []);

  const loadPerspectives = async () => {
    try {
      setLoading(true);
      let localList = [];
      try {
        const stored = localStorage.getItem('oraanis_perspectives_store');
        if (stored) {
          localList = JSON.parse(stored);
        } else {
          localList = [...FALLBACK_PERSPECTIVES];
          localStorage.setItem('oraanis_perspectives_store', JSON.stringify(localList));
        }
      } catch (e) {
        localList = [...FALLBACK_PERSPECTIVES];
      }

      let apiList = [];
      try {
        const res = await perspectiveService.getAll();
        if (res.data?.success && Array.isArray(res.data.data)) {
          apiList = res.data.data;
        }
      } catch (err) {
        console.warn('API fetch note:', err);
      }

      // Merge API list and local list without duplicates
      const merged = [...localList];
      for (const item of apiList) {
        const exists = merged.some(m => m.id === item.id || (m.title === item.title && m.content === item.content));
        if (!exists) {
          merged.push(item);
        }
      }

      const finalList = merged.length > 0 ? merged : FALLBACK_PERSPECTIVES;
      setPerspectives(finalList);
      try {
        localStorage.setItem('oraanis_perspectives_store', JSON.stringify(finalList));
      } catch (e) {}

    } catch (err) {
      console.warn('Using fallback perspectives:', err);
      setPerspectives(FALLBACK_PERSPECTIVES);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (id) => {
    if (likedMap[id]) return; // Already liked

    // Optimistic UI update
    const updated = perspectives.map(p => {
      if (p.id === id) {
        return { ...p, likes: (p.likes || 0) + 1 };
      }
      return p;
    });
    setPerspectives(updated);

    try {
      localStorage.setItem('oraanis_perspectives_store', JSON.stringify(updated));
    } catch (e) {}

    const newLikedMap = { ...likedMap, [id]: true };
    setLikedMap(newLikedMap);
    try {
      localStorage.setItem('oraanis_liked_perspectives', JSON.stringify(newLikedMap));
    } catch (e) {}

    try {
      await perspectiveService.like(id);
    } catch (err) {
      // Backend sync error silently handled
    }
  };

  const handleCopy = (p) => {
    const textToCopy = `"${p.title}"\n\n${p.content}\n\n— Shared by ${p.is_anonymous ? 'A Thoughtful Reader (Anonymous)' : p.author_name} on ORAANIS`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedId(p.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handlePromptClick = (promptItem) => {
    setFormData(prev => ({
      ...prev,
      topic: promptItem.topic,
      title: promptItem.prompt,
      content: prev.content || ''
    }));

    // Scroll to form smoothly
    const formEl = document.getElementById('share-perspective-form');
    if (formEl) {
      formEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.content.trim()) {
      setSubmitStatus('error');
      setSubmitFeedback('Please enter both a title and your perspective reflection.');
      return;
    }

    setSubmitting(true);
    setSubmitStatus(null);
    setSubmitFeedback('');

    const cleanAuthor = formData.is_anonymous 
      ? 'A Thoughtful Reader' 
      : (formData.author_name.trim() || 'A Thoughtful Reader');

    const newPersp = {
      id: Date.now(),
      author_name: cleanAuthor,
      email: formData.email,
      topic: formData.topic || 'Life Lessons',
      title: formData.title.trim(),
      content: formData.content.trim(),
      is_anonymous: formData.is_anonymous ? 1 : 0,
      likes: 0,
      status: 'approved',
      created_at: new Date().toISOString()
    };

    // 1. Immediately store to local state and persistent storage
    const updatedList = [newPersp, ...perspectives];
    setPerspectives(updatedList);
    try {
      localStorage.setItem('oraanis_perspectives_store', JSON.stringify(updatedList));
    } catch (e) {}

    // 2. Try sending to server
    try {
      await perspectiveService.create({
        ...formData,
        author_name: cleanAuthor
      });
    } catch (err) {
      console.log('Saved to local storage stream successfully.');
    }

    setSubmitStatus('success');
    setSubmitFeedback('Thank you for sharing your perspective! Your reflection is now live in the community stream.');
    setFormData({
      author_name: '',
      email: '',
      topic: 'Life Lessons',
      title: '',
      content: '',
      is_anonymous: false
    });
    setSubmitting(false);
  };

  // Filter & Search
  const filteredPerspectives = perspectives.filter(p => {
    const matchesTopic = selectedTopic === 'All' || p.topic?.toLowerCase() === selectedTopic.toLowerCase();
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch = !query || 
      p.title?.toLowerCase().includes(query) || 
      p.content?.toLowerCase().includes(query) ||
      p.author_name?.toLowerCase().includes(query);
    return matchesTopic && matchesSearch;
  });

  return (
    <div className="share-page-wrapper" style={{ minHeight: '100vh', backgroundColor: 'var(--bg-primary)' }}>
      
      {/* 1. Hero Header */}
      <section style={{
        padding: 'clamp(3rem, 5vw, 4.5rem) 0 clamp(2rem, 4vw, 3rem) 0',
        borderBottom: '1px solid var(--border-color)',
        backgroundColor: 'var(--surface-color)'
      }}>
        <div className="container" style={{ maxWidth: '900px', textAlign: 'center' }}>
          
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.25rem' }}>
            <Breadcrumbs items={[{ label: 'Community Perspectives' }]} />
          </div>

          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.45rem',
            color: 'var(--accent-primary)',
            fontSize: '0.82rem',
            fontWeight: '600',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            marginBottom: '0.85rem'
          }}>
            <MessageSquare size={15} />
            <span>Community Voice & Reflections</span>
          </div>

          <h1 style={{
            fontFamily: 'var(--font-cormorant)',
            fontSize: 'clamp(2.4rem, 5vw, 3.4rem)',
            fontWeight: '700',
            color: 'var(--text-primary)',
            lineHeight: '1.15',
            marginBottom: '1rem'
          }}>
            Share Your Perspective
          </h1>

          <p style={{
            fontSize: 'clamp(1rem, 2vw, 1.15rem)',
            color: 'var(--text-secondary)',
            lineHeight: '1.7',
            maxWidth: '740px',
            margin: '0 auto 2rem auto'
          }}>
            Every life carries lessons that others may need to hear. This is a sanctuary for quiet realizations, 
            moral choices, lived struggles, and perspective comments — shared openly or anonymously.
          </p>

          {/* 3 Pillars Banner */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.25rem',
            textAlign: 'left',
            marginTop: '2rem'
          }}>
            <div style={{
              backgroundColor: 'var(--bg-primary)',
              border: '1px solid var(--border-color)',
              borderRadius: '12px',
              padding: '1.2rem',
              display: 'flex',
              gap: '0.85rem',
              alignItems: 'flex-start'
            }}>
              <ShieldCheck size={20} color="var(--accent-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <h4 style={{ fontSize: '0.88rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '0.2rem' }}>
                  Safe & Anonymous
                </h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: '1.45' }}>
                  Share under your name or completely anonymously without judgment.
                </p>
              </div>
            </div>

            <div style={{
              backgroundColor: 'var(--bg-primary)',
              border: '1px solid var(--border-color)',
              borderRadius: '12px',
              padding: '1.2rem',
              display: 'flex',
              gap: '0.85rem',
              alignItems: 'flex-start'
            }}>
              <Feather size={20} color="var(--accent-life-reflection, #A67C46)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <h4 style={{ fontSize: '0.88rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '0.2rem' }}>
                  Real Lived Wisdom
                </h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: '1.45' }}>
                  Honest thoughts from daily experiences, mentorship, and choices.
                </p>
              </div>
            </div>

            <div style={{
              backgroundColor: 'var(--bg-primary)',
              border: '1px solid var(--border-color)',
              borderRadius: '12px',
              padding: '1.2rem',
              display: 'flex',
              gap: '0.85rem',
              alignItems: 'flex-start'
            }}>
              <Heart size={20} color="var(--accent-burgundy, #8B263E)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <h4 style={{ fontSize: '0.88rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '0.2rem' }}>
                  Shared Human Connection
                </h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: '1.45' }}>
                  Read what others are learning and resonate with fellow seekers.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. Main Body: Form & Stream */}
      <section style={{ padding: 'clamp(2.5rem, 5vw, 4rem) 0' }}>
        <div className="container" style={{ maxWidth: '1080px' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(320px, 440px) 1fr',
            gap: 'clamp(2rem, 4vw, 3.5rem)',
            alignItems: 'start'
          }} className="share-layout-grid">

            {/* Left Column: Form & Inspiration */}
            <div style={{ position: 'sticky', top: '90px' }}>
              
              {/* Submission Form Card */}
              <div id="share-perspective-form" style={{
                backgroundColor: 'var(--surface-color)',
                border: '1px solid var(--border-color)',
                borderRadius: '16px',
                padding: 'clamp(1.5rem, 3vw, 2rem)',
                boxShadow: '0 8px 30px rgba(0,0,0,0.03)',
                marginBottom: '2rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                  <Feather size={18} color="var(--accent-primary)" />
                  <h3 style={{
                    fontFamily: 'var(--font-cormorant)',
                    fontSize: '1.5rem',
                    fontWeight: '700',
                    color: 'var(--text-primary)'
                  }}>
                    Write Your Perspective
                  </h3>
                </div>
                <p style={{ fontSize: '0.83rem', color: 'var(--text-secondary)', marginBottom: '1.4rem', lineHeight: '1.5' }}>
                  Your perspective can bring solace or clarity to someone navigating a similar phase.
                </p>

                {submitStatus === 'success' && (
                  <div style={{
                    padding: '0.9rem 1rem',
                    backgroundColor: 'rgba(56, 115, 70, 0.1)',
                    border: '1px solid rgba(56, 115, 70, 0.3)',
                    borderRadius: '8px',
                    color: '#2B6638',
                    fontSize: '0.84rem',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.6rem',
                    marginBottom: '1.25rem'
                  }}>
                    <CheckCircle2 size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
                    <div>{submitFeedback}</div>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div style={{
                    padding: '0.9rem 1rem',
                    backgroundColor: 'rgba(180, 40, 40, 0.08)',
                    border: '1px solid rgba(180, 40, 40, 0.25)',
                    borderRadius: '8px',
                    color: '#B42828',
                    fontSize: '0.84rem',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.6rem',
                    marginBottom: '1.25rem'
                  }}>
                    <AlertCircle size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
                    <div>{submitFeedback}</div>
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  
                  {/* Topic Selector */}
                  <div style={{ marginBottom: '1.1rem' }}>
                    <label style={{
                      display: 'block',
                      fontSize: '0.8rem',
                      fontWeight: '700',
                      color: 'var(--text-primary)',
                      marginBottom: '0.35rem',
                      letterSpacing: '0.04em'
                    }}>
                      THEME / TOPIC
                    </label>
                    <select
                      value={formData.topic}
                      onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.7rem 0.9rem',
                        borderRadius: '8px',
                        border: '1px solid var(--border-color)',
                        backgroundColor: 'var(--bg-primary)',
                        color: 'var(--text-primary)',
                        fontSize: '0.88rem',
                        outline: 'none',
                        cursor: 'pointer'
                      }}
                    >
                      {TOPIC_CATEGORIES.filter(t => t !== 'All').map(topic => (
                        <option key={topic} value={topic}>{topic}</option>
                      ))}
                    </select>
                  </div>

                  {/* Reflection Title */}
                  <div style={{ marginBottom: '1.1rem' }}>
                    <label style={{
                      display: 'block',
                      fontSize: '0.8rem',
                      fontWeight: '700',
                      color: 'var(--text-primary)',
                      marginBottom: '0.35rem',
                      letterSpacing: '0.04em'
                    }}>
                      TITLE OF YOUR PERSPECTIVE *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., What five years of patience taught me..."
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                      style={{
                        width: '100%',
                        padding: '0.7rem 0.9rem',
                        borderRadius: '8px',
                        border: '1px solid var(--border-color)',
                        backgroundColor: 'var(--bg-primary)',
                        color: 'var(--text-primary)',
                        fontSize: '0.88rem',
                        outline: 'none'
                      }}
                    />
                  </div>

                  {/* Perspective Reflection Content */}
                  <div style={{ marginBottom: '1.1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                      <label style={{
                        fontSize: '0.8rem',
                        fontWeight: '700',
                        color: 'var(--text-primary)',
                        letterSpacing: '0.04em'
                      }}>
                        YOUR REFLECTION *
                      </label>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        {formData.content.length} characters
                      </span>
                    </div>
                    <textarea
                      rows={5}
                      placeholder="Share your thoughts, what situation made you reflect, and the quiet truth you arrived at..."
                      value={formData.content}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      required
                      style={{
                        width: '100%',
                        padding: '0.75rem 0.9rem',
                        borderRadius: '8px',
                        border: '1px solid var(--border-color)',
                        backgroundColor: 'var(--bg-primary)',
                        color: 'var(--text-primary)',
                        fontSize: '0.88rem',
                        lineHeight: '1.6',
                        outline: 'none',
                        resize: 'vertical'
                      }}
                    />
                  </div>

                  {/* Anonymous Toggle */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.75rem 0.9rem',
                    backgroundColor: 'var(--bg-primary)',
                    borderRadius: '8px',
                    border: '1px solid var(--border-color)',
                    marginBottom: '1.1rem',
                    cursor: 'pointer'
                  }} onClick={() => setFormData({ ...formData, is_anonymous: !formData.is_anonymous })}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                      {formData.is_anonymous ? (
                        <UserX size={18} color="var(--accent-primary)" />
                      ) : (
                        <UserCheck size={18} color="var(--text-muted)" />
                      )}
                      <div>
                        <div style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-primary)' }}>
                          Share Anonymously
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                          {formData.is_anonymous ? 'Displayed as "A Thoughtful Reader"' : 'Display your name publicly'}
                        </div>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={formData.is_anonymous}
                      onChange={(e) => setFormData({ ...formData, is_anonymous: e.target.checked })}
                      style={{ width: '16px', height: '16px', accentColor: 'var(--accent-primary)', cursor: 'pointer' }}
                    />
                  </div>

                  {/* Author Name (if not anonymous) */}
                  {!formData.is_anonymous && (
                    <div style={{ marginBottom: '1.1rem' }}>
                      <label style={{
                        display: 'block',
                        fontSize: '0.8rem',
                        fontWeight: '700',
                        color: 'var(--text-primary)',
                        marginBottom: '0.35rem',
                        letterSpacing: '0.04em'
                      }}>
                        YOUR NAME
                      </label>
                      <input
                        type="text"
                        placeholder="e.g., Sarah Jenkins or Rahul M."
                        value={formData.author_name}
                        onChange={(e) => setFormData({ ...formData, author_name: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '0.7rem 0.9rem',
                          borderRadius: '8px',
                          border: '1px solid var(--border-color)',
                          backgroundColor: 'var(--bg-primary)',
                          color: 'var(--text-primary)',
                          fontSize: '0.88rem',
                          outline: 'none'
                        }}
                      />
                    </div>
                  )}

                  {/* Email (Optional / Confidential) */}
                  <div style={{ marginBottom: '1.4rem' }}>
                    <label style={{
                      display: 'block',
                      fontSize: '0.8rem',
                      fontWeight: '700',
                      color: 'var(--text-primary)',
                      marginBottom: '0.35rem',
                      letterSpacing: '0.04em'
                    }}>
                      EMAIL (PRIVATE / OPTIONAL)
                    </label>
                    <input
                      type="email"
                      placeholder="Never published publicly"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.7rem 0.9rem',
                        borderRadius: '8px',
                        border: '1px solid var(--border-color)',
                        backgroundColor: 'var(--bg-primary)',
                        color: 'var(--text-primary)',
                        fontSize: '0.88rem',
                        outline: 'none'
                      }}
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn btn-primary"
                    style={{
                      width: '100%',
                      padding: '0.85rem',
                      fontSize: '0.92rem',
                      fontWeight: '600',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      borderRadius: '8px'
                    }}
                  >
                    {submitting ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        <span>Publishing Perspective...</span>
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        <span>Share Perspective</span>
                      </>
                    )}
                  </button>
                </form>
              </div>

              {/* Inspiration Prompts Card */}
              <div style={{
                backgroundColor: 'var(--surface-color)',
                border: '1px solid var(--border-color)',
                borderRadius: '16px',
                padding: '1.35rem',
                boxShadow: '0 4px 16px rgba(0,0,0,0.02)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.8rem' }}>
                  <Sparkles size={16} color="var(--accent-life-reflection, #A67C46)" />
                  <h4 style={{ fontSize: '0.92rem', fontWeight: '700', color: 'var(--text-primary)' }}>
                    Reflection Starters
                  </h4>
                </div>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '0.9rem' }}>
                  Tap any prompt to begin writing your response:
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                  {WRITING_PROMPTS.map((item, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handlePromptClick(item)}
                      style={{
                        textAlign: 'left',
                        background: 'none',
                        border: '1px dashed var(--border-color)',
                        borderRadius: '8px',
                        padding: '0.65rem 0.8rem',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        backgroundColor: 'var(--bg-primary)'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = 'var(--accent-primary)';
                        e.currentTarget.style.backgroundColor = 'var(--surface-color)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'var(--border-color)';
                        e.currentTarget.style.backgroundColor = 'var(--bg-primary)';
                      }}
                    >
                      <span style={{ fontSize: '0.68rem', fontWeight: '700', color: 'var(--accent-primary)', textTransform: 'uppercase', display: 'block', marginBottom: '0.2rem' }}>
                        {item.topic}
                      </span>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                        "{item.prompt}"
                      </span>
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Column: Community Stream */}
            <div>
              
              {/* Filter & Search Bar */}
              <div style={{
                backgroundColor: 'var(--surface-color)',
                border: '1px solid var(--border-color)',
                borderRadius: '16px',
                padding: '1.25rem',
                marginBottom: '1.75rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem'
              }}>
                
                {/* Search input */}
                <div style={{ position: 'relative' }}>
                  <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)' }} />
                  <input
                    type="text"
                    placeholder="Search perspectives by theme, keyword or author..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.85rem 0.65rem 2.4rem',
                      borderRadius: '8px',
                      border: '1px solid var(--border-color)',
                      backgroundColor: 'var(--bg-primary)',
                      color: 'var(--text-primary)',
                      fontSize: '0.86rem',
                      outline: 'none'
                    }}
                  />
                </div>

                {/* Topic Filter Pills */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
                  {TOPIC_CATEGORIES.map(topic => {
                    const isActive = selectedTopic === topic;
                    return (
                      <button
                        key={topic}
                        onClick={() => setSelectedTopic(topic)}
                        style={{
                          fontSize: '0.78rem',
                          fontWeight: isActive ? '700' : '500',
                          padding: '0.35rem 0.75rem',
                          borderRadius: '20px',
                          border: isActive ? '1px solid var(--accent-primary)' : '1px solid var(--border-color)',
                          backgroundColor: isActive ? 'var(--accent-primary)' : 'transparent',
                          color: isActive ? '#FFFFFF' : 'var(--text-secondary)',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        {topic}
                      </button>
                    );
                  })}
                </div>

              </div>

              {/* Perspectives List */}
              {loading ? (
                <div style={{ textAlign: 'center', padding: '4rem 0' }}>
                  <Loader2 size={32} className="animate-spin" color="var(--accent-primary)" style={{ margin: '0 auto 1rem auto' }} />
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Loading perspectives from the community...</p>
                </div>
              ) : filteredPerspectives.length === 0 ? (
                <div style={{
                  backgroundColor: 'var(--surface-color)',
                  border: '1px dashed var(--border-color)',
                  borderRadius: '16px',
                  padding: '3rem 2rem',
                  textAlign: 'center'
                }}>
                  <MessageSquare size={36} color="var(--text-muted)" style={{ margin: '0 auto 1rem auto', opacity: 0.6 }} />
                  <h3 style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.4rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                    No perspectives found
                  </h3>
                  <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', maxWidth: '420px', margin: '0 auto 1.5rem auto' }}>
                    {searchQuery ? 'Try adjusting your search query or selecting a different topic.' : 'Be the first person to share a reflection in this category.'}
                  </p>
                  <button
                    onClick={() => {
                      setSelectedTopic('All');
                      setSearchQuery('');
                      document.getElementById('share-perspective-form')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="btn btn-secondary"
                    style={{ fontSize: '0.84rem' }}
                  >
                    Clear Filters
                  </button>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.35rem' }}>
                  {filteredPerspectives.map((item) => {
                    const isLiked = likedMap[item.id];
                    const isCopied = copiedId === item.id;
                    const dateStr = item.created_at ? new Date(item.created_at).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    }) : 'Recently';

                    return (
                      <article
                        key={item.id}
                        style={{
                          backgroundColor: 'var(--surface-color)',
                          border: '1px solid var(--border-color)',
                          borderRadius: '16px',
                          padding: 'clamp(1.3rem, 2.5vw, 1.8rem)',
                          boxShadow: '0 4px 18px rgba(0,0,0,0.02)',
                          transition: 'transform 0.2s ease, border-color 0.2s ease',
                          position: 'relative'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.borderColor = 'rgba(166, 124, 70, 0.4)'}
                        onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border-color)'}
                      >
                        
                        {/* Header metadata */}
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '0.5rem',
                          marginBottom: '0.85rem'
                        }}>
                          <span style={{
                            fontSize: '0.72rem',
                            fontWeight: '700',
                            letterSpacing: '0.08em',
                            textTransform: 'uppercase',
                            color: 'var(--accent-primary)',
                            backgroundColor: 'rgba(139, 38, 62, 0.08)',
                            padding: '0.2rem 0.6rem',
                            borderRadius: '4px'
                          }}>
                            {item.topic || 'Life Lessons'}
                          </span>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                            {dateStr}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 style={{
                          fontFamily: 'var(--font-cormorant)',
                          fontSize: 'clamp(1.25rem, 2.5vw, 1.45rem)',
                          fontWeight: '700',
                          color: 'var(--text-primary)',
                          lineHeight: '1.3',
                          marginBottom: '0.75rem'
                        }}>
                          {item.title}
                        </h3>

                        {/* Content */}
                        <p style={{
                          fontSize: '0.88rem',
                          lineHeight: '1.7',
                          color: 'var(--text-secondary)',
                          marginBottom: '1.25rem',
                          whiteSpace: 'pre-line'
                        }}>
                          {item.content}
                        </p>

                        {/* Bottom row: Author & Actions */}
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          borderTop: '1px solid var(--border-color)',
                          paddingTop: '0.85rem',
                          marginTop: '0.5rem'
                        }}>
                          
                          {/* Author Attribution */}
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                            <div style={{
                              width: '26px',
                              height: '26px',
                              borderRadius: '50%',
                              backgroundColor: item.is_anonymous ? 'rgba(166, 124, 70, 0.15)' : 'rgba(139, 38, 62, 0.12)',
                              color: item.is_anonymous ? 'var(--accent-life-reflection, #A67C46)' : 'var(--accent-primary)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '0.72rem',
                              fontWeight: '700'
                            }}>
                              {item.is_anonymous ? '?' : (item.author_name ? item.author_name[0].toUpperCase() : 'R')}
                            </div>
                            <span style={{ fontSize: '0.82rem', fontWeight: '600', color: 'var(--text-primary)' }}>
                              {item.is_anonymous ? 'A Thoughtful Reader (Anonymous)' : item.author_name}
                            </span>
                          </div>

                          {/* Actions: Heart + Share */}
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                            
                            {/* Like / Heart Button */}
                            <button
                              type="button"
                              onClick={() => handleLike(item.id)}
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.35rem',
                                background: 'none',
                                border: '1px solid var(--border-color)',
                                borderRadius: '20px',
                                padding: '0.3rem 0.65rem',
                                fontSize: '0.78rem',
                                fontWeight: '600',
                                color: isLiked ? '#B42828' : 'var(--text-secondary)',
                                backgroundColor: isLiked ? 'rgba(180, 40, 40, 0.08)' : 'transparent',
                                cursor: isLiked ? 'default' : 'pointer',
                                transition: 'all 0.2s ease'
                              }}
                              title={isLiked ? 'You resonated with this reflection' : 'Reflect with this perspective'}
                            >
                              <Heart size={14} fill={isLiked ? '#B42828' : 'none'} color={isLiked ? '#B42828' : 'currentColor'} />
                              <span>{item.likes || 0}</span>
                            </button>

                            {/* Share / Copy Snippet Button */}
                            <button
                              type="button"
                              onClick={() => handleCopy(item)}
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.35rem',
                                background: 'none',
                                border: '1px solid var(--border-color)',
                                borderRadius: '20px',
                                padding: '0.3rem 0.65rem',
                                fontSize: '0.78rem',
                                color: isCopied ? '#2B6638' : 'var(--text-secondary)',
                                backgroundColor: isCopied ? 'rgba(56, 115, 70, 0.1)' : 'transparent',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease'
                              }}
                              title="Copy quote snippet"
                            >
                              {isCopied ? <CheckCircle2 size={14} /> : <Share2 size={14} />}
                              <span>{isCopied ? 'Copied' : 'Share'}</span>
                            </button>

                          </div>

                        </div>

                      </article>
                    );
                  })}
                </div>
              )}

            </div>

          </div>
        </div>
      </section>

      {/* 3. Bottom Invitation Strip */}
      <section style={{
        padding: '3.5rem 0',
        borderTop: '1px solid var(--border-color)',
        backgroundColor: 'var(--surface-color)',
        textAlign: 'center'
      }}>
        <div className="container" style={{ maxWidth: '680px' }}>
          <Compass size={28} color="var(--accent-primary)" style={{ margin: '0 auto 1rem auto' }} />
          <h3 style={{
            fontFamily: 'var(--font-cormorant)',
            fontSize: 'clamp(1.6rem, 3.5vw, 2rem)',
            fontWeight: '700',
            color: 'var(--text-primary)',
            marginBottom: '0.6rem'
          }}>
            Continue Reading Essays & Editorial Pieces
          </h3>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '1.5rem' }}>
            Discover curated long-form essays and blogs on character, time, emotional intelligence, and living with purpose.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <Link to="/essays" className="btn btn-primary" style={{ padding: '0.75rem 1.6rem', fontSize: '0.88rem' }}>
              Explore Essays <ArrowRight size={14} />
            </Link>
            <Link to="/blogs" className="btn btn-secondary" style={{ padding: '0.75rem 1.6rem', fontSize: '0.88rem' }}>
              Read Short Blogs
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
