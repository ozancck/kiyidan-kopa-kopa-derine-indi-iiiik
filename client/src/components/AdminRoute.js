// components/AdminRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
  const adminInfo = localStorage.getItem('adminInfo');
  
  // Admin giriş yapmışsa children'ı render et, yoksa login sayfasına yönlendir
  return adminInfo ? children : <Navigate to="/admin/login" replace />;
};

export default AdminRoute;