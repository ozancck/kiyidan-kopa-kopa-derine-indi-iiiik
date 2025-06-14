import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const adminInfo = localStorage.getItem('adminInfo');
    if (adminInfo) {
      setAdmin(JSON.parse(adminInfo));
    }
    setLoading(false);
  }, []);
  
  const login = (adminData) => {
    localStorage.setItem('adminInfo', JSON.stringify(adminData));
    setAdmin(adminData);
  };
  
  const logout = () => {
    localStorage.removeItem('adminInfo');
    setAdmin(null);
  };
  
  const value = {
    admin,
    login,
    logout,
    loading
  };
  
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};