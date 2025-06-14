// components/AdminSidebar.js
import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

const AdminSidebar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="admin-sidebar bg-light p-3" style={{ minHeight: '500px' }}>
      <h5 className="mb-3">Admin Panel</h5>
      
      <Nav className="flex-column">
        <Nav.Item className="mb-2">
          <Nav.Link 
            as={Link} 
            to="/admin/dashboard"
            className={isActive('/admin/dashboard') ? 'active' : ''}
          >
            📊 Dashboard
          </Nav.Link>
        </Nav.Item>
        
        <Nav.Item className="mb-2">
          <Nav.Link 
            as={Link} 
            to="/admin/flights"
            className={isActive('/admin/flights') ? 'active' : ''}
          >
            ✈️ Uçuşlar
          </Nav.Link>
        </Nav.Item>
        
        <Nav.Item className="mb-2">
          <Nav.Link 
            as={Link} 
            to="/admin/flights/create"
            className={isActive('/admin/flights/create') ? 'active' : ''}
          >
            ➕ Yeni Uçuş
          </Nav.Link>
        </Nav.Item>
        
        <Nav.Item className="mb-2">
          <Nav.Link 
            as={Link} 
            to="/admin/tickets"
            className={isActive('/admin/tickets') ? 'active' : ''}
          >
            🎫 Biletler
          </Nav.Link>
        </Nav.Item>
        
        <hr />
        
        <Nav.Item className="mb-2">
          <Nav.Link 
            onClick={() => {
              localStorage.removeItem('adminInfo');
              window.location.href = '/admin/login';
            }}
            style={{ cursor: 'pointer', color: '#dc3545' }}
          >
            🚪 Çıkış Yap
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  );
};

export default AdminSidebar;