import React from 'react';
import { Alert } from 'react-bootstrap';

const Message = ({ 
  variant = 'info', 
  children, 
  dismissible = false, 
  onClose,
  className = '',
  icon = true 
}) => {
  const getIcon = () => {
    switch (variant) {
      case 'success':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" fill="currentColor"/>
          </svg>
        );
      case 'danger':
      case 'error':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" fill="currentColor"/>
          </svg>
        );
      case 'warning':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" fill="currentColor"/>
          </svg>
        );
      default:
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="currentColor"/>
          </svg>
        );
    }
  };

  return (
    <Alert 
      variant={variant} 
      dismissible={dismissible} 
      onClose={onClose}
      className={`custom-message ${className}`}
    >
      <div className="message-content">
        {icon && (
          <div className="message-icon">
            {getIcon()}
          </div>
        )}
        <div className="message-text">
          {children}
        </div>
      </div>

      <style jsx>{`
        :global(.custom-message) {
          border: none !important;
          border-radius: var(--radius-lg) !important;
          padding: var(--space-4) var(--space-6) !important;
          margin-bottom: var(--space-4) !important;
          backdrop-filter: blur(10px) !important;
          border-left: 4px solid currentColor !important;
        }

        :global(.custom-message.alert-success) {
          background: rgba(34, 197, 94, 0.1) !important;
          color: var(--success-700) !important;
          border-left-color: var(--success-500) !important;
        }

        :global(.custom-message.alert-danger) {
          background: rgba(239, 68, 68, 0.1) !important;
          color: var(--error-700) !important;
          border-left-color: var(--error-500) !important;
        }

        :global(.custom-message.alert-warning) {
          background: rgba(251, 191, 36, 0.1) !important;
          color: var(--warning-700) !important;
          border-left-color: var(--warning-500) !important;
        }

        :global(.custom-message.alert-info) {
          background: rgba(99, 102, 241, 0.1) !important;
          color: var(--primary-700) !important;
          border-left-color: var(--primary-500) !important;
        }

        .message-content {
          display: flex;
          align-items: flex-start;
          gap: var(--space-3);
        }

        .message-icon {
          flex-shrink: 0;
          margin-top: 2px;
        }

        .message-text {
          flex: 1;
          font-size: var(--font-size-base);
          font-weight: var(--font-weight-medium);
          line-height: var(--line-height-normal);
        }

        :global(.custom-message .btn-close) {
          background-size: 16px !important;
          opacity: 0.6 !important;
        }

        :global(.custom-message .btn-close:hover) {
          opacity: 1 !important;
        }
      `}</style>
    </Alert>
  );
};

export default Message;
