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
        if (token.startsWith('oraanis_master_') || user?.role === 'admin') {
          if (isMounted) setLoading(false);
          return;
        }
        try {
          const res = await authService.getMe();
          if (res.data?.success && isMounted) {
            setUser(res.data.user);
            localStorage.setItem('aetheria_user', JSON.stringify(res.data.user));
          } else if (isMounted) {
            logout();
          }
        } catch (err) {
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
    const cleanEmail = (email || '').trim().toLowerCase();
    const cleanPassword = (password || '').trim();

    // 1. Direct Instant Master Admin Authentication
    if (
      (cleanEmail === 'oraanis@admin.com' || cleanEmail === 'admin@oraanis.com' || cleanEmail === 'admin@aetheria.com') &&
      cleanPassword === 'oraanisbymonika'
    ) {
      const masterUser = {
        id: 1,
        name: 'ORAANIS Administrator',
        email: 'oraanis@admin.com',
        role: 'admin'
      };
      const masterToken = 'oraanis_master_token_' + Date.now();
      setUser(masterUser);
      setToken(masterToken);
      localStorage.setItem('aetheria_token', masterToken);
      localStorage.setItem('aetheria_user', JSON.stringify(masterUser));

      // Attempt to sync with backend in background
      try {
        const res = await authService.login({ email: cleanEmail, password: cleanPassword });
        if (res.data?.token) {
          setToken(res.data.token);
          localStorage.setItem('aetheria_token', res.data.token);
        }
      } catch (syncErr) {
        // Fallback is active, ignore backend sync error
      }

      return masterUser;
    }

    // 2. Standard Backend API Authentication
    const res = await authService.login({ email: cleanEmail, password: cleanPassword });
    if (res.data?.success) {
      const { user: userData, token: userToken } = res.data;
      setUser(userData);
      setToken(userToken);
      localStorage.setItem('aetheria_token', userToken);
      localStorage.setItem('aetheria_user', JSON.stringify(userData));
      return userData;
    } else {
      throw new Error(res.data?.message || 'Invalid email or password');
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
