import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-3">
      <Container>
        <Row>
          <Col className="text-center py-3">
            <p>FlyTicket &copy; {new Date().getFullYear()}</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
