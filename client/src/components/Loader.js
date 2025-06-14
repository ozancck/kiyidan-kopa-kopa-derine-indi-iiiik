import React from 'react';
import { Spinner } from 'react-bootstrap';

const Loader = ({ size = 'lg', text = 'Yükleniyor...', variant = 'primary' }) => {
  return (
    <div className="loader-container">
      <div className="loader-content">
        <div className="spinner-wrapper">
          <Spinner animation="border" variant={variant} size={size} />
          <div className="spinner-glow"></div>
        </div>
        {text && <p className="loader-text">{text}</p>}
      </div>

      <style jsx>{`
        .loader-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 200px;
          padding: var(--space-8);
        }

        .loader-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--space-4);
        }

        .spinner-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .spinner-glow {
          position: absolute;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(99, 102, 241, 0.3) 0%, transparent 70%);
          animation: pulse 2s ease-in-out infinite;
        }

        .loader-text {
          font-size: var(--font-size-base);
          font-weight: var(--font-weight-medium);
          color: var(--gray-600);
          margin: 0;
          text-align: center;
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.4; transform: scale(0.8); }
          50% { opacity: 0.8; transform: scale(1.2); }
        }

        :global(.spinner-border) {
          color: var(--primary-500) !important;
          width: 3rem !important;
          height: 3rem !important;
          border-width: 3px !important;
        }
      `}</style>
    </div>
  );
};

export default Loader;
