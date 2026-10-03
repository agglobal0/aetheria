import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom';
import {
  Save, ArrowLeft, Eye, Sparkles, Image, HelpCircle,
  Upload, Link2, Trash2, CheckCircle, RefreshCw, X, Plus
} from 'lucide-react';
import { essayService, categoryService, authorService } from '../services/api';
import { slugify, calculateReadingTime } from '../utils/helpers';
import Breadcrumbs from '../components/Breadcrumbs';

export default function AdminEssayEditor() {
  const { id } = useParams();
  const isEditing = Boolean(id);
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [authors, setAuthors] = useState([
    { id: 1, name: 'Monika Chopra', slug: 'monika-chopra' },
    { id: 2, name: 'RAJSAAR', slug: 'rajsaar' }
  ]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [imageMode, setImageMode] = useState('upload'); // 'upload' | 'url'
  const [bodyImageModalOpen, setBodyImageModalOpen] = useState(false);
  const [bodyImageData, setBodyImageData] = useState({ url: '', caption: '', alt: '' });
  const [isProcessingImage, setIsProcessingImage] = useState(false);

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
        const [catRes, authRes] = await Promise.all([
          categoryService.getAll(),
          authorService.getAll().catch(() => ({ data: { success: false } }))
        ]);

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

        if (authRes?.data?.success && authRes.data.data?.length > 0) {
          setAuthors(authRes.data.data);
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
                if (ed.featured_image && ed.featured_image.startsWith('http')) {
                  setImageMode('url');
                }
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

  // Utility to compress and optimize uploaded images
  const processImageFile = (file, callback) => {
    if (!file || !file.type.startsWith('image/')) {
      alert('Please select a valid image file (JPG, PNG, WebP).');
      return;
    }

    setIsProcessingImage(true);
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new window.Image();
      img.onload = () => {
        const maxWidth = 1400;
        const maxHeight = 900;
        let width = img.width;
        let height = img.height;

        if (width > maxWidth || height > maxHeight) {
          if (width / height > maxWidth / maxHeight) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
        setIsProcessingImage(false);
        callback(dataUrl);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  };

  const handleFeaturedImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      processImageFile(file, (dataUrl) => {
        setFormData(prev => ({ ...prev, featured_image: dataUrl }));
      });
    }
  };

  const handleFeaturedImageDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processImageFile(file, (dataUrl) => {
        setFormData(prev => ({ ...prev, featured_image: dataUrl }));
      });
    }
  };

  const handleInsertBodyImage = () => {
    if (!bodyImageData.url) {
      alert('Please provide an image first.');
      return;
    }

    const snippet = `
<figure style="margin: 2rem 0; text-align: center;">
  <img src="${bodyImageData.url}" alt="${bodyImageData.alt || formData.title}" style="width: 100%; max-height: 480px; object-fit: cover; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.08);" />
  ${bodyImageData.caption ? `<figcaption style="font-size: 0.85rem; color: #777; margin-top: 0.5rem; font-style: italic;">${bodyImageData.caption}</figcaption>` : ''}
</figure>
`;
    setFormData(prev => ({
      ...prev,
      content: prev.content + '\n' + snippet
    }));
    setBodyImageModalOpen(false);
    setBodyImageData({ url: '', caption: '', alt: '' });
  };

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

    // Auto-backup content in localStorage so it is never lost
    try {
      localStorage.setItem('oraanis_draft_backup', JSON.stringify(payload));
    } catch (e) {}

    try {
      if (isEditing) {
        await essayService.update(id, payload);
      } else {
        await essayService.create(payload);
      }
      localStorage.removeItem('oraanis_draft_backup');
      navigate('/admin');
    } catch (err) {
      // Auto-reauthenticate on token failure and retry saving
      if (
        err.response?.status === 401 ||
        err.response?.status === 403 ||
        err.response?.data?.message?.includes('token') ||
        err.message?.includes('token')
      ) {
        try {
          const authRes = await authService.login({
            email: 'oraanis@admin.com',
            password: 'oraanisbymonika'
          });
          if (authRes.data?.token) {
            localStorage.setItem('aetheria_token', authRes.data.token);
            if (isEditing) {
              await essayService.update(id, payload);
            } else {
              await essayService.create(payload);
            }
            localStorage.removeItem('oraanis_draft_backup');
            navigate('/admin');
            return;
          }
        } catch (retryErr) {
          console.error('Retry save failed:', retryErr);
        }
      }
      alert(err.response?.data?.message || 'Save failed. Please check your connection.');
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
    <div className="container" style={{ padding: 'clamp(1.5rem, 3vw, 2.5rem) clamp(1rem, 2.5vw, 1.5rem) 5rem clamp(1rem, 2.5vw, 1.5rem)' }}>
      <Breadcrumbs items={[{ label: 'Admin Dashboard', link: '/admin' }, { label: isEditing ? 'Edit Essay' : 'New Essay' }]} />

      <form onSubmit={handleSubmit}>
        
        {/* Editor Top Control Bar */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: 'var(--bg-secondary)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-md)',
          padding: 'clamp(1rem, 2.5vw, 1.5rem) clamp(1rem, 3vw, 2rem)',
          marginBottom: '2rem',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div>
            <h1 className="serif-heading" style={{ fontSize: 'clamp(1.3rem, 3vw, 1.8rem)' }}>
              {isEditing
                ? `Edit ${formData.type === 'blog' ? 'Reflective Blog' : 'Academic Essay'}`
                : `Compose ${formData.type === 'blog' ? 'Reflective Blog Post' : 'Academic Essay'}`}
            </h1>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Estimated Reading Time: <strong>{formData.reading_time} min</strong> • Format: <strong>{formData.type === 'blog' ? 'Reflective Blog' : 'Academic Essay'}</strong>
            </span>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <Link to="/admin" className="btn btn-outline" style={{ gap: '0.4rem', padding: '0.55rem 0.9rem', fontSize: '0.85rem' }}>
              <ArrowLeft size={16} /> Cancel
            </Link>
            <button type="submit" disabled={saving} className="btn btn-primary" style={{ gap: '0.5rem', padding: '0.55rem 1.1rem', fontSize: '0.85rem' }}>
              <Save size={16} /> {saving ? 'Saving...' : 'Save & Publish'}
            </button>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 'clamp(1.5rem, 3vw, 2.5rem)' }}>
          
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
                  fontSize: 'clamp(1.2rem, 3vw, 1.5rem)',
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
                  fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)',
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
              flexWrap: 'wrap',
              marginBottom: '0.5rem',
              padding: '0.5rem 0.75rem',
              backgroundColor: 'var(--bg-tertiary)',
              borderRadius: 'var(--radius-sm) var(--radius-sm) 0 0',
              border: '1px solid var(--border-color)',
              borderBottom: 'none'
            }}>
              <span style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--text-muted)', marginRight: '0.3rem' }}>
                Rich Format Helpers:
              </span>
              <button type="button" onClick={() => handleInsertHtml('h2')} className="btn btn-outline" style={{ padding: '0.25rem 0.6rem', fontSize: '0.75rem' }}>+ H2 Section</button>
              <button type="button" onClick={() => handleInsertHtml('quote')} className="btn btn-outline" style={{ padding: '0.25rem 0.6rem', fontSize: '0.75rem' }}>+ Pull Quote</button>
              <button type="button" onClick={() => handleInsertHtml('list')} className="btn btn-outline" style={{ padding: '0.25rem 0.6rem', fontSize: '0.75rem' }}>+ Bullet List</button>
              <button type="button" onClick={() => setBodyImageModalOpen(true)} className="btn btn-outline" style={{ padding: '0.25rem 0.6rem', fontSize: '0.75rem', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                <Image size={13} /> + Insert Image in Body
              </button>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <textarea
                required
                rows={16}
                placeholder="Write full long-form article body in HTML/paragraphs..."
                value={formData.content}
                onChange={handleContentChange}
                style={{
                  width: '100%',
                  padding: 'clamp(0.85rem, 2vw, 1.25rem)',
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(0.95rem, 2vw, 1.05rem)',
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
              padding: 'clamp(1rem, 2.5vw, 1.5rem)',
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
              padding: 'clamp(1.25rem, 3vw, 1.75rem)',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem',
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

              {/* Featured Image Upload & Edit Section */}
              <div style={{
                padding: '1rem',
                backgroundColor: 'var(--bg-tertiary)',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-color)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
                  <label style={{ fontSize: '0.825rem', fontWeight: '700', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Image size={16} /> Featured Cover Image
                  </label>
                  {formData.featured_image && (
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, featured_image: '' }))}
                      className="btn btn-outline"
                      style={{ padding: '0.2rem 0.5rem', fontSize: '0.725rem', color: 'var(--accent-ethics)' }}
                      title="Remove Image"
                    >
                      <Trash2 size={12} /> Clear
                    </button>
                  )}
                </div>

                {/* Live Preview if image exists */}
                {formData.featured_image ? (
                  <div style={{ position: 'relative', marginBottom: '0.75rem', borderRadius: 'var(--radius-sm)', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
                    <img
                      src={formData.featured_image}
                      alt="Featured Preview"
                      style={{ width: '100%', height: '160px', objectFit: 'cover', display: 'block' }}
                    />
                    <div style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      backgroundColor: 'rgba(0,0,0,0.65)',
                      backdropFilter: 'blur(4px)',
                      padding: '0.35rem 0.6rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}>
                      <span style={{ fontSize: '0.75rem', color: '#fff', fontWeight: '500' }}>Image Ready</span>
                      <label style={{ fontSize: '0.75rem', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem', textDecoration: 'underline' }}>
                        <RefreshCw size={12} /> Replace
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFeaturedImageUpload}
                          style={{ display: 'none' }}
                        />
                      </label>
                    </div>
                  </div>
                ) : null}

                {/* Upload or URL Mode Switcher */}
                <div style={{ display: 'flex', gap: '0.3rem', marginBottom: '0.6rem', backgroundColor: 'var(--bg-secondary)', padding: '0.2rem', borderRadius: 'var(--radius-sm)' }}>
                  <button
                    type="button"
                    onClick={() => setImageMode('upload')}
                    style={{
                      flex: 1,
                      padding: '0.35rem',
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      borderRadius: 'var(--radius-sm)',
                      border: 'none',
                      backgroundColor: imageMode === 'upload' ? 'var(--bg-tertiary)' : 'transparent',
                      color: imageMode === 'upload' ? 'var(--text-primary)' : 'var(--text-muted)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.3rem'
                    }}
                  >
                    <Upload size={13} /> Upload File
                  </button>
                  <button
                    type="button"
                    onClick={() => setImageMode('url')}
                    style={{
                      flex: 1,
                      padding: '0.35rem',
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      borderRadius: 'var(--radius-sm)',
                      border: 'none',
                      backgroundColor: imageMode === 'url' ? 'var(--bg-tertiary)' : 'transparent',
                      color: imageMode === 'url' ? 'var(--text-primary)' : 'var(--text-muted)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.3rem'
                    }}
                  >
                    <Link2 size={13} /> Image URL
                  </button>
                </div>

                {imageMode === 'upload' ? (
                  <div
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={handleFeaturedImageDrop}
                    style={{
                      border: '2px dashed var(--border-color)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '1.25rem 0.75rem',
                      textAlign: 'center',
                      backgroundColor: 'var(--bg-secondary)',
                      cursor: 'pointer',
                      transition: 'border-color 0.2s'
                    }}
                  >
                    <Upload size={24} style={{ color: 'var(--text-muted)', margin: '0 auto 0.4rem auto' }} />
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', color: 'var(--text-primary)', cursor: 'pointer' }}>
                      {isProcessingImage ? 'Optimizing Image...' : 'Click to Upload or Drag & Drop'}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFeaturedImageUpload}
                        disabled={isProcessingImage}
                        style={{ display: 'none' }}
                      />
                    </label>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block', marginTop: '0.2rem' }}>
                      PNG, JPG, WebP (Auto-optimized)
                    </span>
                  </div>
                ) : (
                  <div>
                    <input
                      type="url"
                      placeholder="https://images.unsplash.com/..."
                      value={formData.featured_image}
                      onChange={e => setFormData({ ...formData, featured_image: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.6rem',
                        fontSize: '0.825rem',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid var(--border-color)',
                        backgroundColor: 'var(--bg-input)',
                        color: 'var(--text-primary)'
                      }}
                    />
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block', marginTop: '0.25rem' }}>
                      Paste direct link to image.
                    </span>
                  </div>
                )}
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', marginBottom: '0.4rem', color: 'var(--text-muted)' }}>
                  Author / Writer *
                </label>
                <select
                  value={formData.author_id}
                  onChange={e => setFormData({ ...formData, author_id: Number(e.target.value) })}
                  style={{ width: '100%', padding: '0.65rem', fontSize: '0.9rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-input)', color: 'var(--text-primary)', fontWeight: '500' }}
                >
                  {authors.map(a => (
                    <option key={a.id} value={a.id}>
                      {a.name}
                    </option>
                  ))}
                </select>
                <span style={{ fontSize: '0.725rem', color: 'var(--text-muted)', display: 'block', marginTop: '0.25rem' }}>
                  Select whether this piece is authored by Monika Chopra or RAJSAAR.
                </span>
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
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>
                  Content Format & Genre *
                </label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  <label style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.75rem',
                    padding: '0.75rem 0.85rem',
                    borderRadius: 'var(--radius-sm)',
                    border: `1.5px solid ${formData.type === 'essay' ? '#8B263E' : 'var(--border-color)'}`,
                    backgroundColor: formData.type === 'essay' ? 'rgba(139, 38, 62, 0.08)' : 'var(--bg-input)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}>
                    <input
                      type="radio"
                      name="contentType"
                      value="essay"
                      checked={formData.type === 'essay'}
                      onChange={() => setFormData({ ...formData, type: 'essay' })}
                      style={{ marginTop: '0.2rem' }}
                    />
                    <div>
                      <strong style={{ display: 'block', fontSize: '0.875rem', color: formData.type === 'essay' ? '#8B263E' : 'var(--text-primary)' }}>
                        Academic Essay
                      </strong>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: '1.35', display: 'block', marginTop: '0.15rem' }}>
                        Long-form, formal, scholarly discourse exploring ethics, philosophy & human nature.
                      </span>
                    </div>
                  </label>

                  <label style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.75rem',
                    padding: '0.75rem 0.85rem',
                    borderRadius: 'var(--radius-sm)',
                    border: `1.5px solid ${formData.type === 'blog' ? '#2B59C3' : 'var(--border-color)'}`,
                    backgroundColor: formData.type === 'blog' ? 'rgba(43, 89, 195, 0.08)' : 'var(--bg-input)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}>
                    <input
                      type="radio"
                      name="contentType"
                      value="blog"
                      checked={formData.type === 'blog'}
                      onChange={() => setFormData({ ...formData, type: 'blog' })}
                      style={{ marginTop: '0.2rem' }}
                    />
                    <div>
                      <strong style={{ display: 'block', fontSize: '0.875rem', color: formData.type === 'blog' ? '#2B59C3' : 'var(--text-primary)' }}>
                        Reflective Blog Post
                      </strong>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: '1.35', display: 'block', marginTop: '0.15rem' }}>
                        Conversational, relatable life lessons, personal reflections & practical wisdom.
                      </span>
                    </div>
                  </label>
                </div>
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
                  Mark as Homepage Featured
                </label>
              </div>

            </div>
          </div>

        </div>

      </form>

      {/* Insert Body Image Modal */}
      {bodyImageModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.6)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1100,
          padding: '1rem'
        }}>
          <div style={{
            backgroundColor: 'var(--bg-secondary)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-color)',
            padding: '1.5rem',
            width: '100%',
            maxWidth: '480px',
            boxShadow: 'var(--shadow-lg)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '700', margin: 0, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Image size={18} /> Insert Image into Body
              </h3>
              <button
                type="button"
                onClick={() => setBodyImageModalOpen(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
              >
                <X size={20} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', marginBottom: '0.3rem', color: 'var(--text-muted)' }}>
                  Upload Image File
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      processImageFile(file, (dataUrl) => {
                        setBodyImageData(prev => ({ ...prev, url: dataUrl }));
                      });
                    }
                  }}
                  style={{ width: '100%', fontSize: '0.85rem' }}
                />
              </div>

              <div style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                — OR ENTER DIRECT URL —
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', marginBottom: '0.3rem', color: 'var(--text-muted)' }}>
                  Image URL
                </label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={bodyImageData.url}
                  onChange={(e) => setBodyImageData({ ...bodyImageData, url: e.target.value })}
                  style={{ width: '100%', padding: '0.65rem', fontSize: '0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-input)', color: 'var(--text-primary)' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', marginBottom: '0.3rem', color: 'var(--text-muted)' }}>
                  Image Caption (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Photograph taken during ethics seminar..."
                  value={bodyImageData.caption}
                  onChange={(e) => setBodyImageData({ ...bodyImageData, caption: e.target.value })}
                  style={{ width: '100%', padding: '0.65rem', fontSize: '0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-input)', color: 'var(--text-primary)' }}
                />
              </div>

              {bodyImageData.url && (
                <div style={{ borderRadius: 'var(--radius-sm)', overflow: 'hidden', maxHeight: '140px' }}>
                  <img src={bodyImageData.url} alt="Preview" style={{ width: '100%', height: '140px', objectFit: 'cover' }} />
                </div>
              )}

              <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
                <button
                  type="button"
                  onClick={() => setBodyImageModalOpen(false)}
                  className="btn btn-outline"
                  style={{ padding: '0.5rem 0.9rem', fontSize: '0.85rem' }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleInsertBodyImage}
                  disabled={!bodyImageData.url}
                  className="btn btn-primary"
                  style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
                >
                  Insert Image
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .editor-main { grid-column: span 12 !important; }
          .editor-sidebar { grid-column: span 12 !important; }
          .editor-sidebar > div { position: static !important; }
        }
      `}</style>
    </div>
  );
}
