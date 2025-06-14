// components/Header.js
import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const adminInfo = localStorage.getItem('adminInfo');

  const logoutHandler = () => {
    localStorage.removeItem('adminInfo');
    navigate('/admin/login');
  };

  return (
    <header className="sticky-top">
      <Navbar expand="lg" className="navbar-custom">
        <Container>
          {/* Brand Logo */}
          <Navbar.Brand as={Link} to="/" className="brand-logo">
            <div className="d-flex align-items-center gap-2">
              <div className="logo-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" fill="currentColor"/>
                </svg>
              </div>
              <span className="brand-text">SkyVoyage</span>
            </div>
          </Navbar.Brand>

          {/* Mobile Toggle */}
          <Navbar.Toggle aria-controls="navbar-nav" className="custom-toggler">
            <span></span>
            <span></span>
            <span></span>
          </Navbar.Toggle>

          {/* Navigation Menu */}
          <Navbar.Collapse id="navbar-nav">
            <Nav className="ms-auto align-items-lg-center">
              
              {/* Home Link */}
              <Nav.Link as={Link} to="/" className="nav-link-custom">
                <div className="nav-item-content">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" fill="currentColor"/>
                  </svg>
                  <span>Ana Sayfa</span>
                </div>
              </Nav.Link>

              {adminInfo ? (
                <>
                  {/* Admin Dashboard */}
                  <Nav.Link as={Link} to="/admin/dashboard" className="nav-link-custom">
                    <div className="nav-item-content">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" fill="currentColor"/>
                      </svg>
                      <span>Admin Panel</span>
                    </div>
                  </Nav.Link>

                  {/* Logout Button */}
                  <div className="nav-button-wrapper">
                    <Button 
                      variant="outline-primary" 
                      onClick={logoutHandler}
                      className="logout-btn"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.59L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" fill="currentColor"/>
                      </svg>
                      <span>Çıkış</span>
                    </Button>
                  </div>
                </>
              ) : (
                /* Admin Login Button */
                <div className="nav-button-wrapper">
                  <Button 
                    as={Link} 
                    to="/admin/login" 
                    variant="primary"
                    className="login-btn"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="currentColor"/>
                    </svg>
                    <span>Admin Girişi</span>
                  </Button>
                </div>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <style jsx>{`
        /* Header Specific Styles */
        .navbar-custom {
          background: rgba(255, 255, 255, 0.95) !important;
          backdrop-filter: blur(20px) !important;
          border-bottom: 1px solid rgba(255, 255, 255, 0.3) !important;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08) !important;
          padding: 1rem 0 !important;
          transition: all 0.3s ease !important;
        }

        .brand-logo {
          text-decoration: none !important;
          color: var(--primary-600) !important;
          font-weight: var(--font-weight-extrabold) !important;
          font-size: 1.5rem !important;
          transition: var(--transition-normal) !important;
        }

        .brand-logo:hover {
          color: var(--primary-700) !important;
          transform: translateY(-1px) !important;
        }

        .logo-icon {
          background: linear-gradient(135deg, var(--primary-500), var(--secondary-500));
          border-radius: var(--radius-md);
          padding: 0.5rem;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .brand-text {
          background: linear-gradient(135deg, var(--primary-600), var(--secondary-600));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* Custom Mobile Toggle */
        .custom-toggler {
          border: none !important;
          padding: 0.5rem !important;
          background: rgba(99, 102, 241, 0.1) !important;
          border-radius: var(--radius-md) !important;
          position: relative;
          width: 40px;
          height: 40px;
        }

        .custom-toggler span {
          display: block;
          width: 20px;
          height: 2px;
          background: var(--primary-600);
          margin: 4px auto;
          transition: var(--transition-normal);
          border-radius: 1px;
        }

        .custom-toggler:hover span {
          background: var(--primary-700);
        }

        /* Navigation Links */
        .nav-link-custom {
          color: var(--gray-700) !important;
          text-decoration: none !important;
          padding: 0.75rem 1rem !important;
          border-radius: var(--radius-lg) !important;
          transition: var(--transition-normal) !important;
          margin: 0 0.25rem !important;
          font-weight: var(--font-weight-medium) !important;
        }

        .nav-link-custom:hover {
          color: var(--primary-600) !important;
          background: rgba(99, 102, 241, 0.1) !important;
          transform: translateY(-2px) !important;
        }

        .nav-item-content {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        /* Navigation Buttons */
        .nav-button-wrapper {
          margin-left: 0.5rem;
        }

        .login-btn,
        .logout-btn {
          font-weight: var(--font-weight-semibold) !important;
          padding: 0.75rem 1.5rem !important;
          border-radius: var(--radius-lg) !important;
          display: flex !important;
          align-items: center !important;
          gap: 0.5rem !important;
          transition: var(--transition-normal) !important;
          min-height: 44px !important;
          border: 2px solid transparent !important;
        }

        .login-btn {
          background: linear-gradient(135deg, var(--primary-600), var(--primary-700)) !important;
          color: white !important;
          box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3) !important;
        }

        .login-btn:hover {
          background: linear-gradient(135deg, var(--primary-700), var(--primary-800)) !important;
          transform: translateY(-2px) !important;
          box-shadow: 0 6px 20px rgba(99, 102, 241, 0.4) !important;
          color: white !important;
        }

        .logout-btn {
          background: rgba(255, 255, 255, 0.9) !important;
          color: var(--error-600) !important;
          border: 2px solid var(--error-600) !important;
        }

        .logout-btn:hover {
          background: var(--error-600) !important;
          color: white !important;
          transform: translateY(-2px) !important;
          box-shadow: 0 6px 20px rgba(239, 68, 68, 0.3) !important;
        }

        /* Mobile Responsive */
        @media (max-width: 991.98px) {
          .navbar-nav {
            padding-top: 1rem;
            gap: 0.5rem;
          }

          .nav-link-custom {
            text-align: center;
            margin: 0.25rem 0;
          }

          .nav-button-wrapper {
            margin-left: 0;
            margin-top: 0.5rem;
          }

          .login-btn,
          .logout-btn {
            width: 100%;
            justify-content: center;
          }
        }

        /* Sticky behavior enhancement */
        .sticky-top {
          z-index: 1020;
        }

        /* Scroll effect */
        .navbar-scrolled {
          background: rgba(255, 255, 255, 0.98) !important;
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12) !important;
        }
      `}</style>
    </header>
  );
};

export default Header;
