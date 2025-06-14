import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
  const adminInfo = localStorage.getItem('adminInfo');
  
  return adminInfo ? children : <Navigate to="/admin/login" replace />;
};

export default AdminRoute;
