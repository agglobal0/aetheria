import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FileText, FolderKanban, Users, MessageSquare, Mail, Inbox, Plus, BookOpen,
  Edit, Trash2, CheckCircle, XCircle, Eye, LogOut, Download, ShieldCheck
} from 'lucide-react';
import {
  adminService, essayService, categoryService,
  commentService, newsletterService, contactService
} from '../services/api';
import { useAuth } from '../context/AuthContext';
import { formatDate } from '../utils/helpers';
import Breadcrumbs from '../components/Breadcrumbs';

export default function AdminDashboard() {
  const { user, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('essays'); // essays, categories, authors, comments, newsletter, contact
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  // Tab Data States
  const [essays, setEssays] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [comments, setComments] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [messages, setMessages] = useState([]);

  // Category Form Modal State
  const [catModalOpen, setCatModalOpen] = useState(false);
  const [editingCat, setEditingCat] = useState(null);
  const [catFormData, setCatFormData] = useState({ name: '', slug: '', description: '', accent_color: '#8B263E' });



  useEffect(() => {
    if (!isAdmin) {
      navigate('/login');
      return;
    }

    loadDashboardData();
  }, [isAdmin, activeTab]);

  async function loadDashboardData() {
    setLoading(true);
    try {
      const statsRes = await adminService.getStats();
      if (statsRes.data.success) {
        setStats(statsRes.data.data);
      }

      if (activeTab === 'essays') {
        const res = await essayService.getAll({ type: 'essay', status: 'all', limit: 50 });
        if (res.data.success) setEssays(res.data.data);
      } else if (activeTab === 'blogs') {
        const res = await essayService.getAll({ type: 'blog', status: 'all', limit: 50 });
        if (res.data.success) setBlogs(res.data.data);
      } else if (activeTab === 'categories') {
        const res = await categoryService.getAll();
        if (res.data.success) setCategories(res.data.data);
      } else if (activeTab === 'comments') {
        const res = await commentService.getAllAdmin();
        if (res.data.success) setComments(res.data.data);
      } else if (activeTab === 'newsletter') {
        const res = await newsletterService.getSubscribersAdmin();
        if (res.data.success) setSubscribers(res.data.data);
      } else if (activeTab === 'contact') {
        const res = await contactService.getMessagesAdmin();
        if (res.data.success) setMessages(res.data.data);
      }
    } catch (err) {
      console.error('Failed to load admin data:', err);
    } finally {
      setLoading(false);
    }
  }

  // --- Essay Actions ---
  const handleDeleteEssay = async (id) => {
    if (!window.confirm('Are you sure you want to delete this essay?')) return;
    try {
      await essayService.delete(id);
      setEssays(prev => prev.filter(e => e.id !== id));
    } catch (err) {
      alert('Delete failed');
    }
  };

  // --- Category Actions ---
  const handleSaveCategory = async (e) => {
    e.preventDefault();
    try {
      if (editingCat) {
        await categoryService.update(editingCat.id, catFormData);
      } else {
        await categoryService.create(catFormData);
      }
      setCatModalOpen(false);
      setEditingCat(null);
      setCatFormData({ name: '', slug: '', description: '', accent_color: '#8B263E' });
      loadDashboardData();
    } catch (err) {
      alert('Failed to save category');
    }
  };

  const handleDeleteCategory = async (id) => {
    if (!window.confirm('Delete category? All associated essays will be deleted.')) return;
    try {
      await categoryService.delete(id);
      setCategories(prev => prev.filter(c => c.id !== id));
    } catch (err) {
      alert('Delete failed');
    }
  };



  // --- Comment Actions ---
  const handleCommentStatus = async (id, status) => {
    try {
      await commentService.updateStatusAdmin(id, status);
      setComments(prev => prev.map(c => c.id === id ? { ...c, status } : c));
    } catch (err) {
      alert('Status update failed');
    }
  };

  const handleDeleteComment = async (id) => {
    if (!window.confirm('Delete comment?')) return;
    try {
      await commentService.deleteAdmin(id);
      setComments(prev => prev.filter(c => c.id !== id));
    } catch (err) {
      alert('Delete failed');
    }
  };

  // --- Newsletter Export ---
  const handleExportSubscribers = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + ["Email,Subscribed At,Status", ...subscribers.map(s => `"${s.email}","${s.subscribed_at}","${s.status}"`)].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `aetheria_subscribers_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // --- Message Actions ---
  const handleMessageStatus = async (id, status) => {
    try {
      await contactService.updateStatusAdmin(id, status);
      setMessages(prev => prev.map(m => m.id === id ? { ...m, status } : m));
    } catch (err) {
      alert('Update failed');
    }
  };

  const handleDeleteMessage = async (id) => {
    if (!window.confirm('Delete message?')) return;
    try {
      await contactService.deleteMessageAdmin(id);
      setMessages(prev => prev.filter(m => m.id !== id));
    } catch (err) {
      alert('Delete failed');
    }
  };

  return (
    <div className="container" style={{ padding: '2.5rem 1.5rem 6rem 1.5rem' }}>
      <Breadcrumbs items={[{ label: 'Admin Dashboard' }]} />

      {/* Admin Top Header */}
      <div style={{
        backgroundColor: 'var(--bg-secondary)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-color)',
        padding: '2rem 2.5rem',
        marginBottom: '3rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1.5rem'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
            <ShieldCheck size={22} className="category-ethics" />
            <h1 className="serif-heading" style={{ fontSize: '2.2rem' }}>
              Editorial Control Room
            </h1>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.925rem' }}>
            Logged in as <strong>{user?.name || 'Administrator'}</strong> ({user?.email})
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <Link to="/admin/essay/new?type=essay" className="btn btn-primary" style={{ gap: '0.4rem', fontSize: '0.85rem' }}>
            <Plus size={16} /> New Essay
          </Link>
          <Link to="/admin/essay/new?type=blog" className="btn btn-outline" style={{ gap: '0.4rem', fontSize: '0.85rem' }}>
            <Plus size={16} /> New Blog
          </Link>
          <button onClick={logout} className="btn btn-outline" style={{ gap: '0.4rem', fontSize: '0.85rem' }}>
            <LogOut size={16} /> Sign Out
          </button>
        </div>
      </div>

      {/* Dashboard Metrics Stats Cards */}
      {stats && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '1.25rem',
          marginBottom: '3rem'
        }}>
          <div style={{ padding: '1.25rem', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: '700' }}>Essays</span>
            <span style={{ display: 'block', fontSize: '2rem', fontWeight: '700', fontFamily: 'var(--font-serif)', marginTop: '0.3rem' }}>{stats.essays.total}</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Academic essays</span>
          </div>

          <div style={{ padding: '1.25rem', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: '700' }}>Blogs</span>
            <span style={{ display: 'block', fontSize: '2rem', fontWeight: '700', fontFamily: 'var(--font-serif)', marginTop: '0.3rem' }}>{stats.blogs?.total || 0}</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Blog posts</span>
          </div>

          <div style={{ padding: '1.25rem', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: '700' }}>Categories</span>
            <span style={{ display: 'block', fontSize: '2rem', fontWeight: '700', fontFamily: 'var(--font-serif)', marginTop: '0.3rem' }}>{stats.categories}</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Editorial categories</span>
          </div>

          <div style={{ padding: '1.25rem', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: '700' }}>Subscribers</span>
            <span style={{ display: 'block', fontSize: '2rem', fontWeight: '700', fontFamily: 'var(--font-serif)', marginTop: '0.3rem' }}>{stats.subscribers}</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Sunday Newsletter</span>
          </div>

          <div style={{ padding: '1.25rem', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: '700' }}>Comments</span>
            <span style={{ display: 'block', fontSize: '2rem', fontWeight: '700', fontFamily: 'var(--font-serif)', marginTop: '0.3rem' }}>{stats.comments}</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Reader thoughts</span>
          </div>

          <div style={{ padding: '1.25rem', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: '700' }}>Inbox Messages</span>
            <span style={{ display: 'block', fontSize: '2rem', fontWeight: '700', fontFamily: 'var(--font-serif)', marginTop: '0.3rem', color: stats.unreadMessages > 0 ? 'var(--accent-ethics)' : 'inherit' }}>
              {stats.unreadMessages}
            </span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Unread contact queries</span>
          </div>
        </div>
      )}

      {/* Navigation Tabs */}
      <div style={{
        display: 'flex',
        gap: '0.75rem',
        borderBottom: '1px solid var(--border-color)',
        marginBottom: '2.5rem',
        overflowX: 'auto',
        paddingBottom: '0.5rem'
      }}>
        {[
          { id: 'essays', label: 'Essays', icon: FileText },
          { id: 'blogs', label: 'Blogs', icon: BookOpen },
          { id: 'categories', label: 'Categories', icon: FolderKanban },
          { id: 'comments', label: 'Comments', icon: MessageSquare },
          { id: 'newsletter', label: 'Subscribers', icon: Mail },
          { id: 'contact', label: 'Contact Messages', icon: Inbox }
        ].map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1.25rem',
                fontSize: '0.9rem',
                fontWeight: '600',
                borderRadius: 'var(--radius-sm) var(--radius-sm) 0 0',
                borderBottom: activeTab === tab.id ? '2px solid var(--text-primary)' : '2px solid transparent',
                color: activeTab === tab.id ? 'var(--text-primary)' : 'var(--text-muted)',
                backgroundColor: activeTab === tab.id ? 'var(--bg-secondary)' : 'transparent'
              }}
            >
              <Icon size={16} /> {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab 1: Essays Table */}
      {activeTab === 'essays' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h2 className="serif-heading" style={{ fontSize: '1.6rem' }}>All Published & Draft Essays</h2>
            <Link to="/admin/essay/new?type=essay" className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
              <Plus size={16} /> New Essay
            </Link>
          </div>

          <div style={{ overflowX: 'auto', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-color)', backgroundColor: 'var(--bg-tertiary)' }}>
                  <th style={{ padding: '1rem' }}>Article</th>
                  <th style={{ padding: '1rem' }}>Category</th>
                  <th style={{ padding: '1rem' }}>Status</th>
                  <th style={{ padding: '1rem', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {essays.map(essay => (
                  <tr key={essay.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '1rem' }}>
                      <strong style={{ display: 'block', color: 'var(--text-primary)' }}>{essay.title}</strong>
                      <span style={{ fontSize: '0.775rem', color: 'var(--text-muted)' }}>{formatDate(essay.published_at)}</span>
                    </td>
                    <td style={{ padding: '1rem' }}>{essay.category_name}</td>
                    <td style={{ padding: '1rem' }}>
                      <span style={{
                        padding: '0.2rem 0.6rem',
                        borderRadius: 'var(--radius-full)',
                        fontSize: '0.75rem',
                        fontWeight: '700',
                        textTransform: 'uppercase',
                        backgroundColor: essay.status === 'published' ? 'rgba(46, 139, 128, 0.15)' : 'rgba(166, 124, 70, 0.15)',
                        color: essay.status === 'published' ? 'var(--accent-technology)' : 'var(--accent-life-reflection)'
                      }}>
                        {essay.status}
                      </span>
                    </td>
                    <td style={{ padding: '1rem', textAlign: 'right' }}>
                      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                        <Link to={`/essay/${essay.slug}`} target="_blank" className="btn btn-outline" style={{ padding: '0.35rem 0.6rem' }} title="View">
                          <Eye size={14} />
                        </Link>
                        <Link to={`/admin/essay/edit/${essay.id}`} className="btn btn-outline" style={{ padding: '0.35rem 0.6rem' }} title="Edit">
                          <Edit size={14} />
                        </Link>
                        <button onClick={() => handleDeleteEssay(essay.id)} className="btn btn-outline" style={{ padding: '0.35rem 0.6rem', color: 'var(--accent-ethics)' }} title="Delete">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Blogs Table */}
      {activeTab === 'blogs' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h2 className="serif-heading" style={{ fontSize: '1.6rem' }}>All Published & Draft Blogs</h2>
            <Link to="/admin/essay/new?type=blog" className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
              <Plus size={16} /> New Blog
            </Link>
          </div>

          <div style={{ overflowX: 'auto', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-color)', backgroundColor: 'var(--bg-tertiary)' }}>
                  <th style={{ padding: '1rem' }}>Blog Post</th>
                  <th style={{ padding: '1rem' }}>Category</th>
                  <th style={{ padding: '1rem' }}>Status</th>
                  <th style={{ padding: '1rem', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {blogs.map(blog => (
                  <tr key={blog.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '1rem' }}>
                      <strong style={{ display: 'block', color: 'var(--text-primary)' }}>{blog.title}</strong>
                      <span style={{ fontSize: '0.775rem', color: 'var(--text-muted)' }}>{formatDate(blog.published_at)}</span>
                    </td>
                    <td style={{ padding: '1rem' }}>{blog.category_name}</td>
                    <td style={{ padding: '1rem' }}>
                      <span style={{
                        padding: '0.2rem 0.6rem',
                        borderRadius: 'var(--radius-full)',
                        fontSize: '0.75rem',
                        fontWeight: '700',
                        textTransform: 'uppercase',
                        backgroundColor: blog.status === 'published' ? 'rgba(46, 139, 128, 0.15)' : 'rgba(166, 124, 70, 0.15)',
                        color: blog.status === 'published' ? 'var(--accent-technology)' : 'var(--accent-life-reflection)'
                      }}>
                        {blog.status}
                      </span>
                    </td>
                    <td style={{ padding: '1rem', textAlign: 'right' }}>
                      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                        <Link to={`/essay/${blog.slug}`} target="_blank" className="btn btn-outline" style={{ padding: '0.35rem 0.6rem' }} title="View">
                          <Eye size={14} />
                        </Link>
                        <Link to={`/admin/essay/edit/${blog.id}`} className="btn btn-outline" style={{ padding: '0.35rem 0.6rem' }} title="Edit">
                          <Edit size={14} />
                        </Link>
                        <button onClick={() => handleDeleteEssay(blog.id)} className="btn btn-outline" style={{ padding: '0.35rem 0.6rem', color: 'var(--accent-ethics)' }} title="Delete">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Categories */}
      {activeTab === 'categories' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h2 className="serif-heading" style={{ fontSize: '1.6rem' }}>Editorial Categories</h2>
            <button onClick={() => { setEditingCat(null); setCatFormData({ name: '', slug: '', description: '', accent_color: '#8B263E' }); setCatModalOpen(true); }} className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
              <Plus size={16} /> Add Category
            </button>
          </div>

          <div style={{ overflowX: 'auto', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-color)', backgroundColor: 'var(--bg-tertiary)' }}>
                  <th style={{ padding: '1rem' }}>Category</th>
                  <th style={{ padding: '1rem' }}>Slug</th>
                  <th style={{ padding: '1rem' }}>Description</th>
                  <th style={{ padding: '1rem' }}>Essays</th>
                  <th style={{ padding: '1rem', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map(cat => (
                  <tr key={cat.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '1rem', fontWeight: '600', color: cat.accent_color }}>{cat.name}</td>
                    <td style={{ padding: '1rem' }}><code>{cat.slug}</code></td>
                    <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>{cat.description}</td>
                    <td style={{ padding: '1rem' }}>{cat.essay_count || 0}</td>
                    <td style={{ padding: '1rem', textAlign: 'right' }}>
                      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                        <button onClick={() => { setEditingCat(cat); setCatFormData(cat); setCatModalOpen(true); }} className="btn btn-outline" style={{ padding: '0.35rem 0.6rem' }}>
                          <Edit size={14} />
                        </button>
                        <button onClick={() => handleDeleteCategory(cat.id)} className="btn btn-outline" style={{ padding: '0.35rem 0.6rem', color: 'var(--accent-ethics)' }}>
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}



      {/* Tab 4: Comments */}
      {activeTab === 'comments' && (
        <div>
          <h2 className="serif-heading" style={{ fontSize: '1.6rem', marginBottom: '1.5rem' }}>Reader Comments Moderation</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {comments.map(c => (
              <div key={c.id} style={{ padding: '1.25rem', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', gap: '1.5rem', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', marginBottom: '0.4rem' }}>
                    <strong style={{ fontSize: '0.95rem' }}>{c.name}</strong>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>({c.email})</span>
                    <span style={{ fontSize: '0.75rem', padding: '0.15rem 0.5rem', borderRadius: 'var(--radius-full)', backgroundColor: c.status === 'approved' ? 'rgba(46,139,128,0.15)' : 'rgba(139,38,62,0.15)', color: c.status === 'approved' ? 'var(--accent-technology)' : 'var(--accent-ethics)' }}>
                      {c.status}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>"{c.content}"</p>
                  <span style={{ fontSize: '0.775rem', color: 'var(--text-muted)' }}>Essay: <em>{c.essay_title}</em> • {formatDate(c.created_at)}</span>
                </div>
                <div style={{ display: 'flex', gap: '0.4rem' }}>
                  {c.status !== 'approved' && (
                    <button onClick={() => handleCommentStatus(c.id, 'approved')} className="btn btn-outline" style={{ padding: '0.35rem 0.6rem', color: 'var(--accent-technology)' }} title="Approve"><CheckCircle size={14} /></button>
                  )}
                  {c.status !== 'rejected' && (
                    <button onClick={() => handleCommentStatus(c.id, 'rejected')} className="btn btn-outline" style={{ padding: '0.35rem 0.6rem', color: 'var(--accent-ethics)' }} title="Reject"><XCircle size={14} /></button>
                  )}
                  <button onClick={() => handleDeleteComment(c.id)} className="btn btn-outline" style={{ padding: '0.35rem 0.6rem' }} title="Delete"><Trash2 size={14} /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 5: Subscribers */}
      {activeTab === 'newsletter' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h2 className="serif-heading" style={{ fontSize: '1.6rem' }}>Sunday Newsletter Subscribers</h2>
            <button onClick={handleExportSubscribers} className="btn btn-outline" style={{ gap: '0.4rem', fontSize: '0.85rem' }}>
              <Download size={16} /> Export CSV ({subscribers.length})
            </button>
          </div>

          <div style={{ overflowX: 'auto', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-color)', backgroundColor: 'var(--bg-tertiary)' }}>
                  <th style={{ padding: '1rem' }}>Email</th>
                  <th style={{ padding: '1rem' }}>Subscribed Date</th>
                  <th style={{ padding: '1rem' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {subscribers.map(s => (
                  <tr key={s.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '1rem', fontWeight: '500' }}>{s.email}</td>
                    <td style={{ padding: '1rem' }}>{formatDate(s.subscribed_at)}</td>
                    <td style={{ padding: '1rem' }}>{s.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 6: Contact Messages */}
      {activeTab === 'contact' && (
        <div>
          <h2 className="serif-heading" style={{ fontSize: '1.6rem', marginBottom: '1.5rem' }}>Editorial Contact Inbox</h2>
          {messages.length === 0 ? (
            <div style={{ padding: '3.5rem 2rem', textAlign: 'center', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', border: '1px dashed var(--border-color)', color: 'var(--text-muted)' }}>
              <Inbox size={44} style={{ marginBottom: '0.75rem', opacity: 0.5 }} />
              <p style={{ fontSize: '1.05rem', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>No messages in inbox</p>
              <p style={{ fontSize: '0.875rem' }}>Messages submitted through the Editorial Correspondence contact form will appear here.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {messages.map(m => (
                <div key={m.id} style={{ padding: '1.5rem', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <div>
                      <strong style={{ fontSize: '1.05rem', color: 'var(--text-primary)' }}>{m.subject}</strong>
                      <div style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>From: {m.name} ({m.email}) • {formatDate(m.created_at)}</div>
                    </div>
                    <button onClick={() => handleDeleteMessage(m.id)} className="btn btn-outline" style={{ padding: '0.35rem 0.6rem', color: 'var(--accent-ethics)' }}><Trash2 size={14} /></button>
                  </div>
                  <p style={{ fontSize: '0.925rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginTop: '0.75rem', whiteSpace: 'pre-line' }}>
                    {m.message}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Category Modal */}
      {catModalOpen && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <form onSubmit={handleSaveCategory} style={{ backgroundColor: 'var(--bg-secondary)', padding: '2rem', borderRadius: 'var(--radius-md)', width: '100%', maxWidth: '480px', border: '1px solid var(--border-color)' }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', marginBottom: '1.25rem' }}>{editingCat ? 'Edit Category' : 'New Category'}</h3>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', marginBottom: '0.3rem' }}>Name</label>
              <input type="text" required value={catFormData.name} onChange={e => setCatFormData({ ...catFormData, name: e.target.value })} style={{ width: '100%', padding: '0.6rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-input)', color: 'var(--text-primary)' }} />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', marginBottom: '0.3rem' }}>Slug</label>
              <input type="text" required value={catFormData.slug} onChange={e => setCatFormData({ ...catFormData, slug: e.target.value })} style={{ width: '100%', padding: '0.6rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-input)', color: 'var(--text-primary)' }} />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', marginBottom: '0.3rem' }}>Description</label>
              <textarea rows={3} value={catFormData.description} onChange={e => setCatFormData({ ...catFormData, description: e.target.value })} style={{ width: '100%', padding: '0.6rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-input)', color: 'var(--text-primary)' }} />
            </div>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', marginBottom: '0.3rem' }}>Accent Color</label>
              <input type="text" value={catFormData.accent_color} onChange={e => setCatFormData({ ...catFormData, accent_color: e.target.value })} style={{ width: '100%', padding: '0.6rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-input)', color: 'var(--text-primary)' }} />
            </div>
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
              <button type="button" onClick={() => setCatModalOpen(false)} className="btn btn-outline">Cancel</button>
              <button type="submit" className="btn btn-primary">Save Category</button>
            </div>
          </form>
        </div>
      )}



    </div>
  );
}
