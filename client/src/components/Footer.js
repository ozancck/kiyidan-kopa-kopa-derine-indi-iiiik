import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="footer-custom">
      <Container>
        <Row className="align-items-center">
          <Col md={6} className="text-center text-md-start">
            <div className="d-flex align-items-center justify-content-center justify-content-md-start">
              <span style={{marginRight: '10px', fontSize: '1.5rem'}}>✈️</span>
              <span className="fw-bold fs-5">FlyTicket</span>
            </div>
            <p className="mt-2 mb-0 opacity-75">
              <span style={{marginRight: '5px'}}>🌍</span>
              Dünyanın her yerine güvenli uçuş deneyimi
            </p>
          </Col>
          <Col md={6} className="text-center text-md-end">
            <p className="mb-0">
              <span style={{marginRight: '5px'}}>©️</span>
              {new Date().getFullYear()} FlyTicket - Tüm hakları saklıdır
            </p>
            <div className="mt-2">
              <span style={{marginRight: '10px'}}>📞 0850 123 45 67</span>
              <span style={{marginRight: '10px'}}>📧 info@flyticket.com</span>
              <span>🌐 www.flyticket.com</span>
            </div>
          </Col>
        </Row>
        <hr className="my-3 opacity-25" />
        <Row>
          <Col className="text-center">
            <small className="opacity-75">
              <span style={{marginRight: '15px'}}>💳 Güvenli Ödeme</span>
              <span style={{marginRight: '15px'}}>🛡️ SSL Korumalı</span>
              <span style={{marginRight: '15px'}}>⭐ 7/24 Destek</span>
              <span>🎯 En İyi Fiyat Garantisi</span>
            </small>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;