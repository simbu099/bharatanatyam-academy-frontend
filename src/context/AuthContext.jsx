import React, { createContext, useState, useEffect } from 'react';
import API from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUserLoggedIn = async () => {
      const token = localStorage.getItem('natya_token');
      if (token) {
        try {
          const res = await API.get('/auth/me');
          if (res.data.success) {
            setUser(res.data.data);
          } else {
            localStorage.removeItem('natya_token');
          }
        } catch (err) {
          console.error('Auth verification failed:', err);
          localStorage.removeItem('natya_token');
        }
      }
      setLoading(false);
    };
    checkUserLoggedIn();
  }, []);

  const login = async (email, password) => {
    try {
      const res = await API.post('/auth/login', { email, password });
      if (res.data.success) {
        // Response structural safety check (res.data.token or res.data.data.token)
        const token = res.data.token || res.data.data?.token;
        const userData = res.data.user || res.data.data;

        localStorage.setItem('natya_token', token);
        setUser(userData);
        return { success: true };
      }
      return { success: false, message: res.data.message };
    } catch (err) {
      return {
        success: false,
        message:
          err.response?.data?.message ||
          'Login failed. Please verify server connection.',
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('natya_token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};