import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('aetheria_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [token, setToken] = useState(() => localStorage.getItem('aetheria_token'));
  const [loading, setLoading] = useState(Boolean(token && !user));

  useEffect(() => {
    let isMounted = true;
    async function loadUser() {
      if (token) {
        try {
          const res = await authService.getMe();
          if (res.data.success && isMounted) {
            setUser(res.data.user);
            localStorage.setItem('aetheria_user', JSON.stringify(res.data.user));
          } else if (isMounted) {
            logout();
          }
        } catch (err) {
          console.error('Auth verify error:', err);
          // Only logout if 401 Unauthorized (token invalid/expired), not on temporary network glitch
          if (err.response?.status === 401 && isMounted) {
            logout();
          }
        }
      }
      if (isMounted) setLoading(false);
    }
    loadUser();
    return () => { isMounted = false; };
  }, [token]);

  const login = async (email, password) => {
    const res = await authService.login({ email, password });
    if (res.data.success) {
      const { user: userData, token: userToken } = res.data;
      setUser(userData);
      setToken(userToken);
      localStorage.setItem('aetheria_token', userToken);
      localStorage.setItem('aetheria_user', JSON.stringify(userData));
      return userData;
    } else {
      throw new Error(res.data.message || 'Login failed');
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('aetheria_token');
    localStorage.removeItem('aetheria_user');
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout, isAdmin: user?.role === 'admin' }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
