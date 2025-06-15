import React from 'react';

const Loader = () => {
  return (
    <div className="loading-spinner d-flex flex-column align-items-center justify-content-center">
      <div className="airplane-loader mb-4">
        <div 
          style={{
            fontSize: '4rem',
            animation: 'fly 2s ease-in-out infinite',
            filter: 'drop-shadow(0 5px 15px rgba(102, 126, 234, 0.3))'
          }}
        >
          ✈️
        </div>
      </div>
      
      <div className="loading-dots mb-3">
        <div 
          className="d-flex align-items-center"
          style={{
            fontSize: '1.5rem',
            color: '#667eea'
          }}
        >
          <span style={{animation: 'blink 1.4s ease-in-out infinite both', animationDelay: '0s'}}>●</span>
          <span style={{animation: 'blink 1.4s ease-in-out infinite both', animationDelay: '0.2s', margin: '0 8px'}}>●</span>
          <span style={{animation: 'blink 1.4s ease-in-out infinite both', animationDelay: '0.4s'}}>●</span>
        </div>
      </div>
      
      <h5 className="text-white fw-semibold mb-2">Yükleniyor...</h5>
      <p className="text-white opacity-75 text-center mb-0">
        <span style={{marginRight: '5px'}}>⏳</span>
        Lütfen bekleyin, veriler getiriliyor
      </p>
      
      <style jsx>{`
        @keyframes fly {
          0%, 100% { 
            transform: translateX(-30px) rotate(-10deg); 
          }
          50% { 
            transform: translateX(30px) rotate(10deg); 
          }
        }
        
        @keyframes blink {
          0%, 80%, 100% { 
            opacity: 0; 
          }
          40% { 
            opacity: 1; 
          }
        }
      `}</style>
    </div>
  );
};

export default Loader;