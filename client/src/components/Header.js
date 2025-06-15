// components/Header.js
import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  // useNavigate hook'u Router içinde olduğu için güvenli kullanılabilir
  const navigate = useNavigate();
  
  const adminInfo = localStorage.getItem('adminInfo');

  const logoutHandler = () => {
    localStorage.removeItem('adminInfo');
    navigate('/admin/login');
  };

  return (
    <header>
      <Navbar className="navbar-custom" variant="light" expand="lg" collapseOnSelect fixed="top">
        <Container>
          <Navbar.Brand as={Link} to="/" className="brand-logo d-flex align-items-center">
            <span style={{marginRight: '10px', fontSize: '1.5rem'}}>✈️</span>
            <span className="gradient-text">FlyTicket</span>
          </Navbar.Brand>
          
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/" className="fw-semibold mx-2">
                <span style={{marginRight: '8px'}}>🏠</span>
                Ana Sayfa
              </Nav.Link>
              
              {adminInfo ? (
                <>
                  <Nav.Link as={Link} to="/admin/dashboard" className="fw-semibold mx-2">
                    <span style={{marginRight: '8px'}}>👨‍💼</span>
                    Admin Panel
                  </Nav.Link>
                  <Nav.Link onClick={logoutHandler} style={{ cursor: 'pointer' }} className="fw-semibold mx-2">
                    <span style={{marginRight: '8px'}}>🚪</span>
                    Çıkış Yap
                  </Nav.Link>
                </>
              ) : (
                <Nav.Link as={Link} to="/admin/login" className="fw-semibold mx-2">
                  <span style={{marginRight: '8px'}}>🔐</span>
                  Admin Girişi
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
