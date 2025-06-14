import React, { useState } from 'react';
import { Card, Row, Col, Button, Badge, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const FlightCard = ({ flight }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Format date and time
  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString('tr-TR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('tr-TR', { 
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const formatDateShort = (dateString) => {
    return new Date(dateString).toLocaleDateString('tr-TR', { 
      day: 'numeric',
      month: 'short'
    });
  };
  
  // Calculate flight duration
  const calculateDuration = (departure, arrival) => {
    const dep = new Date(departure);
    const arr = new Date(arrival);
    const diff = arr - dep;
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${hours}sa ${minutes}dk`;
  };

  // Get seat availability status
  const getSeatStatus = (available) => {
    if (available > 10) return { variant: 'success', text: 'Bol koltuk', icon: '✓' };
    if (available > 5) return { variant: 'warning', text: 'Az koltuk', icon: '⚠' };
    if (available > 0) return { variant: 'danger', text: 'Son koltuklar', icon: '!' };
    return { variant: 'secondary', text: 'Dolu', icon: '✕' };
  };

  // Get price tier
  const getPriceTier = (price) => {
    if (price < 200) return { tier: 'economy', label: 'Ekonomik' };
    if (price < 500) return { tier: 'standard', label: 'Standart' };
    return { tier: 'premium', label: 'Premium' };
  };

  const seatStatus = getSeatStatus(flight.seats_available);
  const priceTier = getPriceTier(flight.price);
  const duration = calculateDuration(flight.departure_time, flight.arrival_time);

  return (
    <div className="flight-card-container">
      <Card 
        className={`flight-card ${isHovered ? 'hovered' : ''}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Status Bar */}
        <div className="flight-status-bar">
          <div className="status-indicator"></div>
          <div className="flight-tier">
            <span className={`tier-badge tier-${priceTier.tier}`}>
              {priceTier.label}
            </span>
          </div>
        </div>

        <Card.Body className="flight-card-body">
          <Row className="align-items-center g-4">
            
            {/* Departure Info */}
            <Col lg={3} md={6} className="departure-section">
              <div className="airport-info">
                <div className="city-header">
                  <h4 className="city-name">{flight.from_city?.city_name}</h4>
                  <span className="date-badge">{formatDateShort(flight.departure_time)}</span>
                </div>
                <div className="time-info">
                  <span className="main-time">{formatTime(flight.departure_time)}</span>
                  <span className="date-info">{formatDate(flight.departure_time)}</span>
                </div>
                <div className="airport-code">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="currentColor"/>
                  </svg>
                  <span>Kalkış</span>
                </div>
              </div>
            </Col>

            {/* Flight Route */}
            <Col lg={2} md={12} className="flight-route-section">
              <div className="route-container">
                <div className="flight-duration">
                  <span className="duration-text">{duration}</span>
                </div>
                <div className="route-line">
                  <div className="route-start"></div>
                  <div className="route-path">
                    <div className="plane-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" fill="currentColor"/>
                      </svg>
                    </div>
                  </div>
                  <div className="route-end"></div>
                </div>
                <div className="flight-type">
                  <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip>Direkt uçuş - Aktarmasız</Tooltip>}
                  >
                    <Badge bg="success" className="direct-badge">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" fill="currentColor"/>
                      </svg>
                      Direkt
                    </Badge>
                  </OverlayTrigger>
                </div>
              </div>
            </Col>

            {/* Arrival Info */}
            <Col lg={3} md={6} className="arrival-section">
              <div className="airport-info">
                <div className="city-header">
                  <h4 className="city-name">{flight.to_city?.city_name}</h4>
                  <span className="date-badge">{formatDateShort(flight.arrival_time)}</span>
                </div>
                <div className="time-info">
                  <span className="main-time">{formatTime(flight.arrival_time)}</span>
                  <span className="date-info">{formatDate(flight.arrival_time)}</span>
                </div>
                <div className="airport-code">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="currentColor"/>
                  </svg>
                  <span>Varış</span>
                </div>
              </div>
            </Col>

            {/* Price & Booking Info */}
            <Col lg={4} md={12} className="booking-section">
              <div className="price-container">
                <div className="price-header">
                  <span className="price-label">Kişi başı fiyat</span>
                  <div className="seat-status">
                    <Badge bg={seatStatus.variant} className="seat-badge">
                      <span className="seat-icon">{seatStatus.icon}</span>
                      <span>{flight.seats_available} koltuk</span>
                    </Badge>
                  </div>
                </div>
                <div className="price-main">
                  <span className="currency">₺</span>
                  <span className="amount">{flight.price.toLocaleString('tr-TR')}</span>
                </div>
                <div className="price-details">
                  <small className="tax-info">Vergiler ve ücretler dahil</small>
                </div>
              </div>

              <div className="booking-actions">
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip>Detayları görüntüle ve rezervasyon yap</Tooltip>}
                >
                  <Button 
                    as={Link} 
                    to={`/flight/${flight._id}`}
                    variant="primary"
                    size="lg"
                    className="book-btn"
                    disabled={flight.seats_available === 0}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z" fill="currentColor"/>
                    </svg>
                    <span>{flight.seats_available === 0 ? 'Dolu' : 'Rezervasyon Yap'}</span>
                  </Button>
                </OverlayTrigger>

                <div className="quick-actions">
                  <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip>Uçuş detaylarını görüntüle</Tooltip>}
                  >
                    <button className="quick-action-btn">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="currentColor"/>
                      </svg>
                      <span>Detaylar</span>
                    </button>
                  </OverlayTrigger>

                  <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip>Favorilere ekle</Tooltip>}
                  >
                    <button className="quick-action-btn">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="currentColor"/>
                      </svg>
                      <span>Favorile</span>
                    </button>
                  </OverlayTrigger>
                </div>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <style jsx>{`
        /* Flight Card Container */
        .flight-card-container {
          margin-bottom: var(--space-6);
        }

        .flight-card {
          background: rgba(255, 255, 255, 0.95) !important;
          backdrop-filter: blur(20px) !important;
          border: 1px solid rgba(255, 255, 255, 0.3) !important;
          border-radius: var(--radius-2xl) !important;
          box-shadow: var(--shadow-lg) !important;
          transition: var(--transition-normal) !important;
          overflow: hidden !important;
          position: relative;
        }

        .flight-card.hovered {
          transform: translateY(-8px) scale(1.02) !important;
          box-shadow: var(--shadow-2xl) !important;
          border-color: var(--primary-300) !important;
        }

        /* Status Bar */
        .flight-status-bar {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, var(--primary-500), var(--secondary-500), var(--primary-600));
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 var(--space-6);
        }

        .flight-tier {
          position: absolute;
          top: var(--space-4);
          right: var(--space-6);
        }

        .tier-badge {
          font-size: var(--font-size-xs);
          font-weight: var(--font-weight-semibold);
          padding: var(--space-1) var(--space-3);
          border-radius: var(--radius-full);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .tier-economy {
          background: rgba(34, 197, 94, 0.1);
          color: var(--success-700);
          border: 1px solid var(--success-200);
        }

        .tier-standard {
          background: rgba(251, 191, 36, 0.1);
          color: var(--warning-700);
          border: 1px solid var(--warning-200);
        }

        .tier-premium {
          background: rgba(99, 102, 241, 0.1);
          color: var(--primary-700);
          border: 1px solid var(--primary-200);
        }

        /* Card Body */
        .flight-card-body {
          padding: var(--space-8) !important;
          padding-top: var(--space-12) !important;
        }

        /* Airport Info Sections */
        .departure-section,
        .arrival-section {
          text-align: center;
        }

        .airport-info {
          display: flex;
          flex-direction: column;
          gap: var(--space-3);
        }

        .city-header {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--space-2);
          flex-wrap: wrap;
        }

        .city-name {
          font-size: var(--font-size-xl);
          font-weight: var(--font-weight-bold);
          color: var(--gray-900);
          margin: 0;
        }

        .date-badge {
          background: rgba(99, 102, 241, 0.1);
          color: var(--primary-700);
          font-size: var(--font-size-xs);
          font-weight: var(--font-weight-semibold);
          padding: var(--space-1) var(--space-2);
          border-radius: var(--radius-md);
        }

        .time-info {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--space-1);
        }

        .main-time {
          font-size: var(--font-size-3xl);
          font-weight: var(--font-weight-extrabold);
          color: var(--primary-600);
          line-height: 1;
        }

        .date-info {
          font-size: var(--font-size-sm);
          color: var(--gray-600);
          font-weight: var(--font-weight-medium);
        }

        .airport-code {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--space-2);
          color: var(--gray-500);
          font-size: var(--font-size-sm);
          font-weight: var(--font-weight-medium);
        }

        /* Flight Route Section */
        .flight-route-section {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .route-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--space-3);
          width: 100%;
        }

        .flight-duration {
          text-align: center;
        }

        .duration-text {
          background: linear-gradient(135deg, var(--primary-600), var(--secondary-600));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-size: var(--font-size-base);
          font-weight: var(--font-weight-bold);
        }

        .route-line {
          display: flex;
          align-items: center;
          width: 100%;
          position: relative;
        }

        .route-start,
        .route-end {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--primary-500);
          border: 2px solid white;
          box-shadow: 0 0 0 2px var(--primary-500);
        }

        .route-path {
          flex: 1;
          height: 2px;
          background: linear-gradient(90deg, var(--primary-500), var(--secondary-500));
          position: relative;
          margin: 0 var(--space-2);
        }

        .plane-icon {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: white;
          border-radius: 50%;
          padding: var(--space-2);
          color: var(--primary-600);
          box-shadow: var(--shadow-md);
        }

        .flight-type {
          text-align: center;
        }

        .direct-badge {
          font-size: var(--font-size-xs) !important;
          font-weight: var(--font-weight-semibold) !important;
          padding: var(--space-1) var(--space-2) !important;
          display: flex !important;
          align-items: center !important;
          gap: var(--space-1) !important;
        }

        /* Booking Section */
        .booking-section {
          text-align: center;
        }

        .price-container {
          background: rgba(99, 102, 241, 0.05);
          border: 1px solid rgba(99, 102, 241, 0.1);
          border-radius: var(--radius-xl);
          padding: var(--space-6);
          margin-bottom: var(--space-6);
        }

        .price-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: var(--space-4);
        }

        .price-label {
          font-size: var(--font-size-sm);
          color: var(--gray-600);
          font-weight: var(--font-weight-medium);
        }

        .seat-status {
          display: flex;
          align-items: center;
        }

        .seat-badge {
          font-size: var(--font-size-xs) !important;
          font-weight: var(--font-weight-semibold) !important;
          padding: var(--space-1) var(--space-2) !important;
          display: flex !important;
          align-items: center !important;
          gap: var(--space-1) !important;
        }

        .price-main {
          display: flex;
          align-items: baseline;
          justify-content: center;
          gap: var(--space-1);
          margin-bottom: var(--space-2);
        }

        .currency {
          font-size: var(--font-size-lg);
          font-weight: var(--font-weight-bold);
          color: var(--gray-600);
        }

        .amount {
          font-size: var(--font-size-4xl);
          font-weight: var(--font-weight-extrabold);
          color: var(--primary-600);
          line-height: 1;
        }

        .tax-info {
          color: var(--gray-500);
          font-size: var(--font-size-xs);
        }

        /* Booking Actions */
        .booking-actions {
          display: flex;
          flex-direction: column;
          gap: var(--space-4);
        }

        .book-btn {
          min-height: 48px !important;
          font-size: var(--font-size-base) !important;
          font-weight: var(--font-weight-semibold) !important;
          padding: var(--space-4) var(--space-6) !important;
          border-radius: var(--radius-lg) !important;
          background: linear-gradient(135deg, var(--primary-600), var(--primary-700)) !important;
          border: none !important;
          color: white !important;
          text-decoration: none !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          gap: var(--space-2) !important;
          transition: var(--transition-normal) !important;
          box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3) !important;
          width: 100% !important;
        }

        .book-btn:hover:not(:disabled) {
          background: linear-gradient(135deg, var(--primary-700), var(--primary-800)) !important;
          transform: translateY(-2px) !important;
          box-shadow: 0 6px 20px rgba(99, 102, 241, 0.4) !important;
          color: white !important;
        }

        .book-btn:disabled {
          background: var(--gray-400) !important;
          cursor: not-allowed !important;
          transform: none !important;
        }

        .quick-actions {
          display: flex;
          gap: var(--space-3);
          justify-content: center;
        }

        .quick-action-btn {
          background: rgba(255, 255, 255, 0.8);
          border: 1px solid rgba(99, 102, 241, 0.2);
          border-radius: var(--radius-md);
          padding: var(--space-2) var(--space-3);
          font-size: var(--font-size-xs);
          font-weight: var(--font-weight-medium);
          color: var(--gray-700);
          cursor: pointer;
          transition: var(--transition-normal);
          display: flex;
          align-items: center;
          gap: var(--space-1);
        }

        .quick-action-btn:hover {
          background: rgba(99, 102, 241, 0.1);
          border-color: var(--primary-300);
          color: var(--primary-700);
          transform: translateY(-1px);
        }

        /* Mobile Responsive */
        @media (max-width: 991.98px) {
          .flight-route-section {
            order: 3;
            margin-top: var(--space-4);
          }

          .booking-section {
            order: 4;
          }

          .route-container {
            flex-direction: row;
            align-items: center;
            justify-content: center;
          }

          .flight-duration,
          .flight-type {
            order: 2;
          }

          .route-line {
            order: 1;
            width: 60px;
            margin: 0 var(--space-4);
          }
        }

        @media (max-width: 767.98px) {
          .flight-card-body {
            padding: var(--space-6) !important;
            padding-top: var(--space-10) !important;
          }

          .city-name {
            font-size: var(--font-size-lg);
          }

          .main-time {
            font-size: var(--font-size-2xl);
          }

          .amount {
            font-size: var(--font-size-3xl);
          }

          .quick-actions {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
};

export default FlightCard;
