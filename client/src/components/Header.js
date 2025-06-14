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
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <Navbar.Brand as={Link} to="/">
            Flight Booking
          </Navbar.Brand>
          
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/">
                Home Page
              </Nav.Link>
              
              {adminInfo ? (
                <>
                  <Nav.Link as={Link} to="/admin/dashboard">
                    Admin Panel
                  </Nav.Link>
                  <Nav.Link onClick={logoutHandler} style={{ cursor: 'pointer' }}>
                    Logout
                  </Nav.Link>
                </>
              ) : (
                <Nav.Link as={Link} to="/admin/login">
                  Admin Login
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