import React from 'react';
import { Alert } from 'react-bootstrap';

const Message = ({ variant, children }) => {
  
  const getEmoji = (variant) => {
    switch(variant) {
      case 'success': return '✅';
      case 'danger': return '❌';
      case 'warning': return '⚠️';
      case 'info': return 'ℹ️';
      default: return '📢';
    }
  };

  const getGradient = (variant) => {
    switch(variant) {
      case 'success': 
        return 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)';
      case 'danger': 
        return 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)';
      case 'warning': 
        return 'linear-gradient(135deg, #feca57 0%, #ff9ff3 100%)';
      case 'info': 
        return 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
      default: 
        return 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    }
  };

  return (
    <Alert 
      variant={variant}
      className="border-0 rounded-4 shadow-lg fade-in"
      style={{
        background: getGradient(variant),
        color: 'white',
        padding: '20px 25px',
        fontSize: '1rem',
        fontWeight: '500',
        border: 'none',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
        backdropFilter: 'blur(10px)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div className="d-flex align-items-center">
        <span 
          style={{
            fontSize: '1.5rem',
            marginRight: '15px',
            filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))'
          }}
        >
          {getEmoji(variant)}
        </span>
        <div className="flex-grow-1">
          {children}
        </div>
      </div>
      
      {/* Animated background pattern */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          width: '100px',
          background: 'rgba(255, 255, 255, 0.1)',
          transform: 'skewX(-20deg)',
          opacity: 0.3
        }}
      />
    </Alert>
  );
};

Message.defaultProps = {
  variant: 'info',
};

export default Message;