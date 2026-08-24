import axios from 'axios';

const PRODUCTION_RENDER_URL = 'https://aetheria-4r21.onrender.com/api';
let rawBaseUrl = import.meta.env.VITE_API_URL || PRODUCTION_RENDER_URL;
rawBaseUrl = rawBaseUrl.trim().replace(/\/+$/, '');
if (!rawBaseUrl.endsWith('/api')) {
  rawBaseUrl += '/api';
}
const API_BASE_URL = rawBaseUrl;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor to inject JWT token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('aetheria_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Auth Services
export const authService = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (data) => api.post('/auth/register', data),
  getMe: () => api.get('/auth/me')
};

// Essay Services
export const essayService = {
  getAll: (params) => api.get('/essays', { params }),
  getBySlug: (slug) => api.get(`/essays/${slug}`),
  create: (data) => api.post('/essays', data),
  update: (id, data) => api.put(`/essays/${id}`, data),
  delete: (id) => api.delete(`/essays/${id}`)
};

// Category Services
export const categoryService = {
  getAll: () => api.get('/categories'),
  getBySlug: (slug) => api.get(`/categories/${slug}`),
  create: (data) => api.post('/categories', data),
  update: (id, data) => api.put(`/categories/${id}`, data),
  delete: (id) => api.delete(`/categories/${id}`)
};


// Comment Services
export const commentService = {
  getByEssay: (essayId) => api.get(`/comments/essay/${essayId}`),
  addComment: (essayId, data) => api.post(`/comments/essay/${essayId}`, data),
  getAllAdmin: () => api.get('/comments/admin/all'),
  updateStatusAdmin: (id, status) => api.put(`/comments/admin/${id}`, { status }),
  deleteAdmin: (id) => api.delete(`/comments/admin/${id}`)
};

// Newsletter Service
export const newsletterService = {
  subscribe: (email) => api.post('/newsletter/subscribe', { email }),
  getSubscribersAdmin: () => api.get('/newsletter/admin/subscribers'),
  deleteSubscriberAdmin: (id) => api.delete(`/newsletter/admin/subscribers/${id}`)
};

// Contact Service
export const contactService = {
  submit: (data) => api.post('/contact', data),
  getMessagesAdmin: () => api.get('/contact/admin/messages'),
  updateStatusAdmin: (id, status) => api.put(`/contact/admin/messages/${id}`, { status }),
  deleteMessageAdmin: (id) => api.delete(`/contact/admin/messages/${id}`)
};

// Admin Stats
export const adminService = {
  getStats: () => api.get('/admin/stats')
};

export default api;
