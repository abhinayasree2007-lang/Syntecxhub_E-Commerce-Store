import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('syntecx_user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState(() => localStorage.getItem('syntecx_token') || null);
  const [loading, setLoading] = useState(true);

  // Validate session on mount
  useEffect(() => {
    const checkAuth = async () => {
      if (token) {
        try {
          const profile = await api.auth.getProfile();
          setUser((prev) => ({ ...prev, ...profile }));
          localStorage.setItem('syntecx_user', JSON.stringify(profile));
        } catch (err) {
          console.warn('Session expired or invalid, logging out:', err.message);
          logout();
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, [token]);

  const login = async (email, password) => {
    const data = await api.auth.login(email, password);
    setToken(data.token);
    setUser(data);
    localStorage.setItem('syntecx_token', data.token);
    localStorage.setItem('syntecx_user', JSON.stringify(data));
    return data;
  };

  const register = async (name, email, password) => {
    const data = await api.auth.register(name, email, password);
    setToken(data.token);
    setUser(data);
    localStorage.setItem('syntecx_token', data.token);
    localStorage.setItem('syntecx_user', JSON.stringify(data));
    return data;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('syntecx_token');
    localStorage.removeItem('syntecx_user');
  };

  const updateUser = (updatedData) => {
    setUser((prev) => {
      const merged = { ...prev, ...updatedData };
      localStorage.setItem('syntecx_user', JSON.stringify(merged));
      return merged;
    });
  };

  const isAuthenticated = !!token && !!user;
  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthenticated,
        isAdmin,
        login,
        register,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
