import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const FormContainer = ({ children, title, subtitle, maxWidth = 'md' }) => {
  const getMaxWidth = () => {
    switch (maxWidth) {
      case 'sm': return '540px';
      case 'md': return '720px';
      case 'lg': return '960px';
      case 'xl': return '1140px';
      default: return '720px';
    }
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col style={{ maxWidth: getMaxWidth() }}>
          <div className="form-container">
            {(title || subtitle) && (
              <div className="form-header">
                {title && <h1 className="form-title">{title}</h1>}
                {subtitle && <p className="form-subtitle">{subtitle}</p>}
              </div>
            )}
            
            <div className="form-content">
              {children}
            </div>
          </div>
        </Col>
      </Row>

      <style jsx>{`
        .form-container {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: var(--radius-2xl);
          padding: var(--space-10);
          box-shadow: var(--shadow-xl);
          margin: var(--space-8) 0;
          position: relative;
          overflow: hidden;
        }

        .form-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, var(--primary-500), var(--secondary-500), var(--primary-600));
          border-radius: var(--radius-2xl) var(--radius-2xl) 0 0;
        }

        .form-header {
          text-align: center;
          margin-bottom: var(--space-8);
        }

        .form-title {
          font-size: var(--font-size-3xl);
          font-weight: var(--font-weight-extrabold);
          color: var(--gray-900);
          margin-bottom: var(--space-4);
          background: linear-gradient(135deg, var(--primary-600), var(--secondary-600));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .form-subtitle {
          font-size: var(--font-size-lg);
          color: var(--gray-600);
          font-weight: var(--font-weight-medium);
          margin: 0;
          line-height: var(--line-height-relaxed);
        }

        .form-content {
          position: relative;
        }

        @media (max-width: 767.98px) {
          .form-container {
            padding: var(--space-6);
            margin: var(--space-4) 0;
          }

          .form-title {
            font-size: var(--font-size-2xl);
          }

          .form-subtitle {
            font-size: var(--font-size-base);
          }
        }
      `}</style>
    </Container>
  );
};

export default FormContainer;
