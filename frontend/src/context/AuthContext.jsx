import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('anu_foods_user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = async (credentials) => {
    const res = await api.loginUser(credentials);
    if (res.success) {
      setUser(res.user);
      localStorage.setItem('anu_foods_user', JSON.stringify(res.user));
      localStorage.setItem('anu_foods_token', res.token);
    }
    return res;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('anu_foods_user');
    localStorage.removeItem('anu_foods_token');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
