import React, { createContext, useState, useContext, useEffect } from 'react';
import API from '../api/axios'; 

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dailyCount, setDailyCount] = useState(0);
  const [summaryHistory, setSummaryHistory] = useState([]);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      API.get('/auth/me', {
        headers: { Authorization: `Bearer ${storedToken}` }
      })
        .then((res) => {
          setUser(res.data);
        })
        .catch(() => {
          logout();
        });
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const res = await API.post('/auth/login', { email, password });
    const receivedToken = res.data.token;
    localStorage.setItem('token', receivedToken);
    setToken(receivedToken);

    const userRes = await API.get('/auth/me', {
      headers: { Authorization: `Bearer ${receivedToken}` }
    });
    setUser(userRes.data);
    return userRes.data;
  };

  const signup = async (email, password) => {
    const res = await API.post('/auth/signup', { email, password });
    const receivedToken = res.data.token;
    localStorage.setItem('token', receivedToken);
    setToken(receivedToken);

    const userRes = await API.get('/auth/me', {
      headers: { Authorization: `Bearer ${receivedToken}` }
    });
    setUser(userRes.data);
    return userRes.data;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    setDailyCount(0);
    setSummaryHistory([]);
  };

  const addSummary = (summary) => {
    setSummaryHistory((prev) => [summary, ...prev]);
    setDailyCount((prev) => prev + 1);
  };

  const upgrade = () => {
    if (user) {
      const upgraded = { ...user, isPremium: true };
      setUser(upgraded);
    }
  };

  const value = {
    user,
    token,
    isAuthenticated: !!user,
    login,
    signup,
    logout,
    upgrade,
    summaryHistory,
    dailyCount,
    addSummary,
    setDailyCount
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
