import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <Container>
        <Row className="g-4">
          {/* Brand Section */}
          <Col lg={4} md={6}>
            <div className="footer-brand">
              <div className="brand-logo">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" fill="currentColor"/>
                </svg>
                <span>SkyVoyage</span>
              </div>
              <p className="brand-description">
                Türkiye'nin en güvenilir uçuş rezervasyon platformu. 
                En uygun fiyatlı biletleri bulun ve güvenle seyahat edin.
              </p>
            </div>
          </Col>

          {/* Quick Links */}
          <Col lg={2} md={6}>
            <div className="footer-section">
              <h5 className="footer-title">Hızlı Linkler</h5>
              <ul className="footer-links">
                <li><a href="/">Ana Sayfa</a></li>
                <li><a href="#search">Uçuş Ara</a></li>
                <li><a href="/admin/login">Admin Panel</a></li>
              </ul>
            </div>
          </Col>

          {/* Popular Routes */}
          <Col lg={3} md={6}>
            <div className="footer-section">
              <h5 className="footer-title">Popüler Rotalar</h5>
              <ul className="footer-links">
                <li><a href="#">İstanbul → Ankara</a></li>
                <li><a href="#">İstanbul → İzmir</a></li>
                <li><a href="#">Ankara → Antalya</a></li>
                <li><a href="#">İzmir → Ankara</a></li>
              </ul>
            </div>
          </Col>

          {/* Contact Info */}
          <Col lg={3} md={6}>
            <div className="footer-section">
              <h5 className="footer-title">İletişim</h5>
              <div className="contact-info">
                <div className="contact-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" fill="currentColor"/>
                  </svg>
                  <span>+90 (212) 555 0123</span>
                </div>
                <div className="contact-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" fill="currentColor"/>
                  </svg>
                  <span>info@skyvoyage.com</span>
                </div>
              </div>
            </div>
          </Col>
        </Row>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <Row className="align-items-center">
            <Col md={6}>
              <p className="copyright">
                © {currentYear} SkyVoyage. Tüm hakları saklıdır.
              </p>
            </Col>
            <Col md={6} className="text-md-end">
              <div className="footer-social">
                <span>Bizi takip edin:</span>
                <div className="social-links">
                  <a href="#" aria-label="Facebook">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" fill="currentColor"/>
                    </svg>
                  </a>
                  <a href="#" aria-label="Twitter">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" fill="currentColor"/>
                    </svg>
                  </a>
                  <a href="#" aria-label="Instagram">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12.017 0C8.396 0 7.989.016 6.756.072 5.526.128 4.73.307 4.032.598 3.306.906 2.696 1.315 2.086 1.926c-.61.61-1.02 1.22-1.328 1.946C.467 4.569.289 5.365.233 6.596.177 7.828.161 8.235.161 11.855c0 3.621.016 4.028.072 5.261.056 1.23.235 2.027.526 2.725.308.726.717 1.336 1.328 1.946.61.61 1.22 1.02 1.946 1.328.698.291 1.494.47 2.725.526 1.233.056 1.64.072 5.261.072 3.621 0 4.028-.016 5.261-.072 1.23-.056 2.027-.235 2.725-.526.726-.308 1.336-.717 1.946-1.328.61-.61 1.02-1.22 1.328-1.946.291-.698.47-1.494.526-2.725.056-1.233.072-1.64.072-5.261 0-3.621-.016-4.028-.072-5.261-.056-1.23-.235-2.027-.526-2.725a5.468 5.468 0 00-1.328-1.946A5.46 5.46 0 0017.502.598C16.804.307 16.008.128 14.778.072 13.546.016 13.139 0 9.517 0h2.5zm-.566 5.83a6.17 6.17 0 110 12.34 6.17 6.17 0 010-12.34zm0 10.167a4.002 4.002 0 100-8.003 4.002 4.002 0 000 8.003zm7.845-10.405a1.441 1.441 0 11-2.883 0 1.441 1.441 0 012.883 0z" fill="currentColor"/>
                    </svg>
                  </a>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </Container>

      <style jsx>{`
        .site-footer {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-top: 1px solid rgba(255, 255, 255, 0.3);
          padding: var(--space-12) 0 var(--space-6);
          margin-top: var(--space-20);
        }

        .footer-brand {
          margin-bottom: var(--space-6);
        }

        .brand-logo {
          display: flex;
          align-items: center;
          gap: var(--space-3);
          margin-bottom: var(--space-4);
          color: var(--primary-600);
          font-size: var(--font-size-xl);
          font-weight: var(--font-weight-extrabold);
        }

        .brand-description {
          color: var(--gray-600);
          font-size: var(--font-size-base);
          line-height: var(--line-height-relaxed);
          margin: 0;
        }

        .footer-section {
          margin-bottom: var(--space-6);
        }

        .footer-title {
          font-size: var(--font-size-lg);
          font-weight: var(--font-weight-bold);
          color: var(--gray-900);
          margin-bottom: var(--space-4);
        }

        .footer-links {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .footer-links li {
          margin-bottom: var(--space-2);
        }

        .footer-links a {
          color: var(--gray-600);
          text-decoration: none;
          font-size: var(--font-size-base);
          font-weight: var(--font-weight-medium);
          transition: var(--transition-normal);
        }

        .footer-links a:hover {
          color: var(--primary-600);
          transform: translateX(4px);
        }

        .contact-info {
          display: flex;
          flex-direction: column;
          gap: var(--space-3);
        }

        .contact-item {
          display: flex;
          align-items: center;
          gap: var(--space-3);
          color: var(--gray-600);
          font-size: var(--font-size-base);
        }

        .footer-bottom {
          border-top: 1px solid rgba(99, 102, 241, 0.1);
          padding-top: var(--space-6);
          margin-top: var(--space-8);
        }

        .copyright {
          color: var(--gray-500);
          font-size: var(--font-size-sm);
          margin: 0;
        }

        .footer-social {
          display: flex;
          align-items: center;
          gap: var(--space-4);
          color: var(--gray-600);
          font-size: var(--font-size-sm);
        }

        .social-links {
          display: flex;
          gap: var(--space-3);
        }

        .social-links a {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          background: rgba(99, 102, 241, 0.1);
          border-radius: var(--radius-full);
          color: var(--primary-600);
          transition: var(--transition-normal);
        }

        .social-links a:hover {
          background: var(--primary-600);
          color: white;
          transform: translateY(-2px);
        }

        @media (max-width: 767.98px) {
          .site-footer {
            padding: var(--space-8) 0 var(--space-4);
          }

          .footer-social {
            justify-content: center;
            margin-top: var(--space-4);
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
