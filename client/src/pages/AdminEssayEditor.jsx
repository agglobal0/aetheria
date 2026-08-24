import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom';
import { Save, ArrowLeft, Eye, Sparkles, Image, HelpCircle } from 'lucide-react';
import { essayService, categoryService } from '../services/api';
import { slugify, calculateReadingTime } from '../utils/helpers';
import Breadcrumbs from '../components/Breadcrumbs';

export default function AdminEssayEditor() {
  const { id } = useParams();
  const isEditing = Boolean(id);
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const defaultType = queryParams.get('type') || 'essay';

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    subtitle: '',
    excerpt: '',
    content: '',
    featured_image: '',
    category_id: '',
    author_id: 1,
    type: defaultType,
    status: 'published',
    featured: false,
    reading_time: 5,
    seo_title: '',
    seo_description: ''
  });

  useEffect(() => {
    async function loadEditorData() {
      setLoading(true);
      try {
        const catRes = await categoryService.getAll();

        if (catRes.data.success) {
          setCategories(catRes.data.data);
          if (!formData.category_id && catRes.data.data.length > 0) {
            setFormData(prev => ({
              ...prev,
              category_id: catRes.data.data[0].id,
              type: prev.type || defaultType
            }));
          }
        }

        if (isEditing) {
          const essayRes = await essayService.getAll({ status: 'all', limit: 100 });
          if (essayRes.data.success) {
            const found = essayRes.data.data.find(e => String(e.id) === String(id));
            if (found) {
              const fullDetails = await essayService.getBySlug(found.slug);
              if (fullDetails.data.success) {
                const ed = fullDetails.data.data;
                setFormData({
                  title: ed.title || '',
                  slug: ed.slug || '',
                  subtitle: ed.subtitle || '',
                  excerpt: ed.excerpt || '',
                  content: ed.content || '',
                  featured_image: ed.featured_image || '',
                  category_id: ed.category_id || '',
                  author_id: ed.author_id || 1,
                  type: ed.type || defaultType,
                  status: ed.status || 'published',
                  featured: Boolean(ed.featured),
                  reading_time: ed.reading_time || 5,
                  seo_title: ed.seo_title || '',
                  seo_description: ed.seo_description || ''
                });
              }
            }
          }
        }
      } catch (err) {
        console.error('Error loading editor:', err);
      } finally {
        setLoading(false);
      }
    }

    loadEditorData();
  }, [id, location.search]);

  const handleTitleChange = (e) => {
    const titleVal = e.target.value;
    setFormData(prev => ({
      ...prev,
      title: titleVal,
      slug: !isEditing ? slugify(titleVal) : prev.slug,
      seo_title: !isEditing ? titleVal : prev.seo_title
    }));
  };

  const handleContentChange = (e) => {
    const val = e.target.value;
    const computedTime = calculateReadingTime(val);
    setFormData(prev => ({
      ...prev,
      content: val,
      reading_time: computedTime
    }));
  };

  const handleInsertHtml = (tag) => {
    let snippet = '';
    if (tag === 'h2') snippet = '<h2>Section Title</h2>\n<p>Write section paragraphs...</p>\n';
    if (tag === 'quote') snippet = '<blockquote class="editorial-quote">\n  "Insert thought-provoking quote here."\n</blockquote>\n';
    if (tag === 'list') snippet = '<ul>\n  <li>First point</li>\n  <li>Second point</li>\n</ul>\n';

    setFormData(prev => ({
      ...prev,
      content: prev.content + '\n' + snippet
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.slug || !formData.content) {
      alert('Please complete required fields (Title, Slug, Content).');
      return;
    }

    setSaving(true);
    const payload = {
      ...formData,
      type: formData.type || defaultType
    };
    try {
      if (isEditing) {
        await essayService.update(id, payload);
      } else {
        await essayService.create(payload);
      }
      navigate('/admin');
    } catch (err) {
      alert(err.response?.data?.message || 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="container" style={{ padding: '4rem 1.5rem', textAlign: 'center' }}>
        <p>Loading editor...</p>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '2.5rem 1.5rem 6rem 1.5rem' }}>
      <Breadcrumbs items={[{ label: 'Admin Dashboard', link: '/admin' }, { label: isEditing ? 'Edit Essay' : 'New Essay' }]} />

      <form onSubmit={handleSubmit}>
        
        {/* Editor Top Control Bar */}
        <div style={{
          display: 'flex',
          justify: 'space-between',
          alignItems: 'center',
          backgroundColor: 'var(--bg-secondary)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-md)',
          padding: '1.25rem 2rem',
          marginBottom: '2.5rem',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div>
            <h1 className="serif-heading" style={{ fontSize: '1.8rem' }}>
              {isEditing ? 'Edit Essay' : 'Compose New Essay'}
            </h1>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Estimated Reading Time: <strong>{formData.reading_time} min</strong>
            </span>
          </div>

          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <Link to="/admin" className="btn btn-outline" style={{ gap: '0.4rem' }}>
              <ArrowLeft size={16} /> Cancel
            </Link>
            <button type="submit" disabled={saving} className="btn btn-primary" style={{ gap: '0.5rem' }}>
              <Save size={18} /> {saving ? 'Saving...' : 'Save & Publish'}
            </button>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '2.5rem' }}>
          
          {/* Main Content Area */}
          <div style={{ gridColumn: 'span 8' }} className="editor-main">
            
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', marginBottom: '0.4rem', color: 'var(--text-muted)' }}>
                Article Title *
              </label>
              <input
                type="text"
                required
                placeholder="Enter compelling headline..."
                value={formData.title}
                onChange={handleTitleChange}
                style={{
                  width: '100%',
                  padding: '0.85rem 1rem',
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-color)',
                  backgroundColor: 'var(--bg-input)',
                  color: 'var(--text-primary)',
                  outline: 'none'
                }}
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', marginBottom: '0.4rem', color: 'var(--text-muted)' }}>
                Subtitle / Deck
              </label>
              <input
                type="text"
                placeholder="Short editorial summary statement..."
                value={formData.subtitle}
                onChange={e => setFormData({ ...formData, subtitle: e.target.value })}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.1rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-color)',
                  backgroundColor: 'var(--bg-input)',
                  color: 'var(--text-primary)',
                  outline: 'none'
                }}
              />
            </div>

            {/* Quick HTML Snippet Helper Toolbar */}
            <div style={{
              display: 'flex',
              gap: '0.5rem',
              alignItems: 'center',
              marginBottom: '0.5rem',
              padding: '0.5rem 0.75rem',
              backgroundColor: 'var(--bg-tertiary)',
              borderRadius: 'var(--radius-sm) var(--radius-sm) 0 0',
              border: '1px solid var(--border-color)',
              borderBottom: 'none'
            }}>
              <span style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--text-muted)', marginRight: '0.5rem' }}>
                Rich Format Helpers:
              </span>
              <button type="button" onClick={() => handleInsertHtml('h2')} className="btn btn-outline" style={{ padding: '0.25rem 0.6rem', fontSize: '0.75rem' }}>+ H2 Section</button>
              <button type="button" onClick={() => handleInsertHtml('quote')} className="btn btn-outline" style={{ padding: '0.25rem 0.6rem', fontSize: '0.75rem' }}>+ Pull Quote</button>
              <button type="button" onClick={() => handleInsertHtml('list')} className="btn btn-outline" style={{ padding: '0.25rem 0.6rem', fontSize: '0.75rem' }}>+ Bullet List</button>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <textarea
                required
                rows={16}
                placeholder="Write full long-form essay body in HTML/paragraphs..."
                value={formData.content}
                onChange={handleContentChange}
                style={{
                  width: '100%',
                  padding: '1.25rem',
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.1rem',
                  lineHeight: '1.7',
                  borderRadius: '0 0 var(--radius-sm) var(--radius-sm)',
                  border: '1px solid var(--border-color)',
                  backgroundColor: 'var(--bg-input)',
                  color: 'var(--text-primary)',
                  outline: 'none',
                  resize: 'vertical'
                }}
              />
            </div>

            {/* SEO Settings Panel */}
            <div style={{
              backgroundColor: 'var(--bg-secondary)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)',
              padding: '1.5rem',
              marginTop: '2rem'
            }}>
              <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Sparkles size={16} /> SEO & Open Graph Meta Tags
              </h3>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', marginBottom: '0.3rem', color: 'var(--text-muted)' }}>
                  SEO Meta Title
                </label>
                <input
                  type="text"
                  value={formData.seo_title}
                  onChange={e => setFormData({ ...formData, seo_title: e.target.value })}
                  style={{ width: '100%', padding: '0.65rem', fontSize: '0.9rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-input)', color: 'var(--text-primary)' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', marginBottom: '0.3rem', color: 'var(--text-muted)' }}>
                  SEO Meta Description
                </label>
                <textarea
                  rows={3}
                  value={formData.seo_description}
                  onChange={e => setFormData({ ...formData, seo_description: e.target.value })}
                  style={{ width: '100%', padding: '0.65rem', fontSize: '0.9rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-input)', color: 'var(--text-primary)' }}
                />
              </div>
            </div>

          </div>

          {/* Sidebar Publishing Controls */}
          <div style={{ gridColumn: 'span 4' }} className="editor-sidebar">
            <div style={{
              backgroundColor: 'var(--bg-secondary)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)',
              padding: '1.75rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
              position: 'sticky',
              top: '6rem'
            }}>
              
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', marginBottom: '0.4rem', color: 'var(--text-muted)' }}>
                  Publication Status
                </label>
                <select
                  value={formData.status}
                  onChange={e => setFormData({ ...formData, status: e.target.value })}
                  style={{ width: '100%', padding: '0.65rem', fontSize: '0.9rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-input)', color: 'var(--text-primary)' }}
                >
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', marginBottom: '0.4rem', color: 'var(--text-muted)' }}>
                  Category World *
                </label>
                <select
                  value={formData.category_id}
                  onChange={e => setFormData({ ...formData, category_id: Number(e.target.value) })}
                  style={{ width: '100%', padding: '0.65rem', fontSize: '0.9rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-input)', color: 'var(--text-primary)' }}
                >
                  {categories.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', marginBottom: '0.4rem', color: 'var(--text-muted)' }}>
                  Content Type *
                </label>
                <select
                  value={formData.type}
                  onChange={e => setFormData({ ...formData, type: e.target.value })}
                  style={{ width: '100%', padding: '0.65rem', fontSize: '0.9rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-input)', color: 'var(--text-primary)' }}
                >
                  <option value="essay">Academic Essay</option>
                  <option value="blog">Blog Post</option>
                </select>
              </div>



              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', marginBottom: '0.4rem', color: 'var(--text-muted)' }}>
                  URL Slug *
                </label>
                <input
                  type="text"
                  required
                  value={formData.slug}
                  onChange={e => setFormData({ ...formData, slug: slugify(e.target.value) })}
                  style={{ width: '100%', padding: '0.65rem', fontSize: '0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-input)', color: 'var(--text-primary)' }}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <input
                  type="checkbox"
                  id="featuredCheck"
                  checked={formData.featured}
                  onChange={e => setFormData({ ...formData, featured: e.target.checked })}
                />
                <label htmlFor="featuredCheck" style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--text-primary)', cursor: 'pointer' }}>
                  Mark as Homepage Featured Essay
                </label>
              </div>

            </div>
          </div>

        </div>

      </form>

      <style>{`
        @media (max-width: 900px) {
          .editor-main { grid-column: span 12 !important; }
          .editor-sidebar { grid-column: span 12 !important; }
        }
      `}</style>
    </div>
  );
}
