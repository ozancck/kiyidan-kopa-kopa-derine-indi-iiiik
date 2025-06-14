import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Badge, Spinner } from 'react-bootstrap';
import { getFlightById } from '../services/flightService';
import SimpleSeatSelection from '../components/SimpleSeatSelection';
import Message from '../components/Message';

const FlightDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [flight, setFlight] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedSeats, setSelectedSeats] = useState([]);

  useEffect(() => {
    fetchFlight();
  }, [id]);

  const fetchFlight = async () => {
    try {
      setLoading(true);
      const data = await getFlightById(id);
      setFlight(data);
      setLoading(false);
    } catch (error) {
      setError('Uçuş bilgileri yüklenirken bir hata oluştu');
      setLoading(false);
    }
  };

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString('tr-TR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('tr-TR', { 
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      weekday: 'long'
    });
  };

  const calculateDuration = (departure, arrival) => {
    const dep = new Date(departure);
    const arr = new Date(arrival);
    const diff = arr - dep;
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${hours}sa ${minutes}dk`;
  };

  const getTotalPrice = () => {
    return flight ? flight.price * selectedSeats.length : 0;
  };

  const proceedToBooking = () => {
    if (selectedSeats.length === 0) {
      setError('Lütfen en az bir koltuk seçin');
      return;
    }
    
    navigate('/booking-confirmation', {
      state: {
        flight,
        selectedSeats,
        totalPrice: getTotalPrice()
      }
    });
  };

  if (loading) {
    return (
      <Container className="py-5">
        <div className="text-center" style={{ padding: '3rem' }}>
          <Spinner animation="border" variant="primary" size="lg" />
          <p style={{ marginTop: '1rem', color: 'var(--gray-600)' }}>Uçuş detayları yükleniyor...</p>
        </div>
      </Container>
    );
  }

  if (error && !flight) {
    return (
      <Container className="py-5">
        <Message variant="danger">
          {error}
          <div className="mt-3">
            <Button variant="outline-danger" onClick={() => navigate('/')}>
              Ana Sayfaya Dön
            </Button>
          </div>
        </Message>
      </Container>
    );
  }

  if (!flight) {
    return (
      <Container className="py-5">
        <Message variant="warning">
          Uçuş bulunamadı.
          <div className="mt-3">
            <Button variant="outline-warning" onClick={() => navigate('/')}>
              Ana Sayfaya Dön
            </Button>
          </div>
        </Message>
      </Container>
    );
  }

  return (
    <div className="flight-detail-page">
      <Container>
        {/* Header */}
        <div className="page-header">
          <div className="header-content">
            <Button 
              variant="outline-primary" 
              onClick={() => navigate(-1)}
              className="back-btn"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" fill="currentColor"/>
              </svg>
              Geri Dön
            </Button>
            <div className="header-info">
              <h1 className="page-title">Uçuş Detayları</h1>
              <p className="page-subtitle">Koltuk seçimi yapın ve rezervasyonunuzu tamamlayın</p>
            </div>
          </div>
        </div>

        {error && (
          <Message variant="danger" dismissible onClose={() => setError('')}>
            {error}
          </Message>
        )}

        <Row className="g-4">
          {/* Flight Information */}
          <Col lg={8}>
            <Card className="flight-info-card">
              <div className="card-header-custom">
                <h3>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" fill="currentColor"/>
                  </svg>
                  Uçuş Bilgileri
                </h3>
              </div>
              <Card.Body>
                {/* Route */}
                <div className="flight-route">
                  <div className="route-item departure">
                    <div className="location-info">
                      <h4>{flight.from_city?.city_name}</h4>
                      <div className="time-info">
                        <span className="time">{formatTime(flight.departure_time)}</span>
                        <span className="date">{formatDate(flight.departure_time)}</span>
                      </div>
                    </div>
                    <div className="location-label">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="currentColor"/>
                      </svg>
                      Kalkış
                    </div>
                  </div>

                  <div className="route-middle">
                    <div className="duration-info">
                      <span className="duration">{calculateDuration(flight.departure_time, flight.arrival_time)}</span>
                      <div className="route-line">
                        <div className="line"></div>
                        <div className="plane-icon">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" fill="currentColor"/>
                          </svg>
                        </div>
                        <div className="line"></div>
                      </div>
                      <Badge bg="success" className="direct-badge">Direkt Uçuş</Badge>
                    </div>
                  </div>

                  <div className="route-item arrival">
                    <div className="location-info">
                      <h4>{flight.to_city?.city_name}</h4>
                      <div className="time-info">
                        <span className="time">{formatTime(flight.arrival_time)}</span>
                        <span className="date">{formatDate(flight.arrival_time)}</span>
                      </div>
                    </div>
                    <div className="location-label">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="currentColor"/>
                      </svg>
                      Varış
                    </div>
                  </div>
                </div>

                {/* Flight Details */}
                <div className="flight-details">
                  <Row className="g-4">
                    <Col md={6}>
                      <div className="detail-item">
                        <div className="detail-icon">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" fill="currentColor"/>
                            <path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z" fill="currentColor"/>
                          </svg>
                        </div>
                        <div>
                          <span className="detail-label">Uçuş Süresi</span>
                          <span className="detail-value">{calculateDuration(flight.departure_time, flight.arrival_time)}</span>
                        </div>
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className="detail-item">
                        <div className="detail-icon">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15 6H3v2h12V6zm0 4H3v2h12v-2zM3 16h8v-2H3v2zM17 6v8.18c-.31-.11-.65-.18-1-.18-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3V8h3V6h-5z" fill="currentColor"/>
                          </svg>
                        </div>
                        <div>
                          <span className="detail-label">Uçuş Numarası</span>
                          <span className="detail-value">SV{flight._id.slice(-6).toUpperCase()}</span>
                        </div>
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className="detail-item">
                        <div className="detail-icon">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63c-.34-1.02-1.28-1.74-2.46-1.74s-2.12.72-2.46 1.74L12.5 16H15v6h5z" fill="currentColor"/>
                          </svg>
                        </div>
                        <div>
                          <span className="detail-label">Müsait Koltuk</span>
                          <span className="detail-value">{flight.seats_available} koltuk</span>
                        </div>
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className="detail-item">
                        <div className="detail-icon">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z" fill="currentColor"/>
                          </svg>
                        </div>
                        <div>
                          <span className="detail-label">Bilet Fiyatı</span>
                          <span className="detail-value">₺{flight.price.toLocaleString('tr-TR')}</span>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Card.Body>
            </Card>

            {/* Seat Selection */}
            <Card className="seat-selection-card">
              <div className="card-header-custom">
                <h3>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 13c1.66 0 3-1.34 3-3S8.66 7 7 7s-3 1.34-3 3 1.34 3 3 3zm12-6h-8v7H9v5h2v-3h8V7z" fill="currentColor"/>
                  </svg>
                  Koltuk Seçimi
                </h3>
                {selectedSeats.length > 0 && (
                  <Badge bg="primary" className="selected-count">
                    {selectedSeats.length} koltuk seçildi
                  </Badge>
                )}
              </div>
              <Card.Body>
                <SimpleSeatSelection 
                  flight={flight}
                  selectedSeats={selectedSeats}
                  onSeatSelection={setSelectedSeats}
                />
              </Card.Body>
            </Card>
          </Col>

          {/* Booking Summary */}
          <Col lg={4}>
            <div className="booking-summary sticky-top">
              <Card className="summary-card">
                <div className="card-header-custom">
                  <h3>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" fill="currentColor"/>
                    </svg>
                    Rezervasyon Özeti
                  </h3>
                </div>
                <Card.Body>
                  <div className="summary-route">
                    <div className="summary-item">
                      <span className="route-text">
                        {flight.from_city?.city_name} → {flight.to_city?.city_name}
                      </span>
                      <span className="route-date">
                        {formatDate(flight.departure_time)}
                      </span>
                    </div>
                  </div>

                  <div className="summary-details">
                    <div className="summary-row">
                      <span>Bilet Fiyatı</span>
                      <span>₺{flight.price.toLocaleString('tr-TR')}</span>
                    </div>
                    <div className="summary-row">
                      <span>Seçilen Koltuk Sayısı</span>
                      <span>{selectedSeats.length}</span>
                    </div>
                    {selectedSeats.length > 0 && (
                      <div className="summary-row">
                        <span>Seçilen Koltuklar</span>
                        <span>{selectedSeats.join(', ')}</span>
                      </div>
                    )}
                    <hr />
                    <div className="summary-row total-row">
                      <span>Toplam Tutar</span>
                      <span className="total-price">₺{getTotalPrice().toLocaleString('tr-TR')}</span>
                    </div>
                  </div>

                  <div className="booking-actions">
                    <Button 
                      variant="primary" 
                      size="lg" 
                      className="w-100 book-now-btn"
                      onClick={proceedToBooking}
                      disabled={selectedSeats.length === 0}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z" fill="currentColor"/>
                      </svg>
                      {selectedSeats.length === 0 ? 'Koltuk Seçin' : 'Rezervasyonu Tamamla'}
                    </Button>
                    
                    <div className="booking-note">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="currentColor"/>
                      </svg>
                      <span>Fiyatlar vergiler ve ücretler dahildir</span>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </div>
          </Col>
        </Row>
      </Container>

      <style jsx>{`
        .flight-detail-page {
          min-height: 100vh;
          padding: var(--space-8) 0 var(--space-12);
        }

        .page-header {
          margin-bottom: var(--space-8);
        }

        .header-content {
          display: flex;
          align-items: center;
          gap: var(--space-6);
          flex-wrap: wrap;
        }

        .back-btn {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          min-height: 44px;
        }

        .header-info {
          flex: 1;
        }

        .page-title {
          font-size: var(--font-size-3xl);
          font-weight: var(--font-weight-bold);
          color: var(--gray-900);
          margin: 0 0 var(--space-2) 0;
        }

        .page-subtitle {
          color: var(--gray-600);
          font-size: var(--font-size-lg);
          margin: 0;
        }

        /* Cards */
        .flight-info-card,
        .seat-selection-card,
        .summary-card {
          border: none;
          border-radius: var(--radius-xl);
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          box-shadow: var(--shadow-lg);
          margin-bottom: var(--space-6);
        }

        .card-header-custom {
          background: rgba(99, 102, 241, 0.05);
          border-bottom: 1px solid rgba(99, 102, 241, 0.1);
          padding: var(--space-6);
          border-radius: var(--radius-xl) var(--radius-xl) 0 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .card-header-custom h3 {
          margin: 0;
          font-size: var(--font-size-xl);
          font-weight: var(--font-weight-bold);
          color: var(--gray-900);
          display: flex;
          align-items: center;
          gap: var(--space-3);
        }

        .selected-count {
          font-size: var(--font-size-sm);
        }

        /* Flight Route */
        .flight-route {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          gap: var(--space-6);
          align-items: center;
          margin-bottom: var(--space-8);
          padding: var(--space-6);
          background: rgba(99, 102, 241, 0.03);
          border-radius: var(--radius-lg);
        }

        .route-item {
          text-align: center;
        }

        .location-info h4 {
          font-size: var(--font-size-2xl);
          font-weight: var(--font-weight-bold);
          color: var(--gray-900);
          margin-bottom: var(--space-3);
        }

        .time-info {
          display: flex;
          flex-direction: column;
          gap: var(--space-1);
        }

        .time {
          font-size: var(--font-size-3xl);
          font-weight: var(--font-weight-extrabold);
          color: var(--primary-600);
        }

        .date {
          font-size: var(--font-size-sm);
          color: var(--gray-600);
          font-weight: var(--font-weight-medium);
        }

        .location-label {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--space-2);
          margin-top: var(--space-3);
          color: var(--gray-500);
          font-size: var(--font-size-sm);
          font-weight: var(--font-weight-medium);
        }

        .route-middle {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--space-3);
        }

        .duration-info {
          text-align: center;
        }

        .duration {
          font-size: var(--font-size-lg);
          font-weight: var(--font-weight-bold);
          color: var(--primary-700);
        }

        .route-line {
          display: flex;
          align-items: center;
          margin: var(--space-4) 0;
          width: 120px;
        }

        .line {
          height: 2px;
          background: linear-gradient(90deg, var(--primary-500), var(--secondary-500));
          flex: 1;
        }

        .plane-icon {
          background: white;
          border-radius: 50%;
          padding: var(--space-2);
          color: var(--primary-600);
          box-shadow: var(--shadow-md);
          margin: 0 var(--space-2);
        }

        .direct-badge {
          font-size: var(--font-size-xs);
        }

        /* Flight Details */
        .flight-details {
          padding-top: var(--space-6);
          border-top: 1px solid rgba(99, 102, 241, 0.1);
        }

        .detail-item {
          display: flex;
          align-items: center;
          gap: var(--space-4);
          padding: var(--space-4);
          background: rgba(255, 255, 255, 0.8);
          border-radius: var(--radius-lg);
          border: 1px solid rgba(99, 102, 241, 0.1);
        }

        .detail-icon {
          background: rgba(99, 102, 241, 0.1);
          border-radius: var(--radius-md);
          padding: var(--space-3);
          color: var(--primary-600);
          flex-shrink: 0;
        }

        .detail-label {
          font-size: var(--font-size-sm);
          color: var(--gray-600);
          display: block;
          font-weight: var(--font-weight-medium);
        }

        .detail-value {
          font-size: var(--font-size-base);
          color: var(--gray-900);
          font-weight: var(--font-weight-semibold);
          display: block;
        }

        /* Booking Summary */
        .booking-summary {
          top: var(--space-8);
        }

        .summary-route {
          margin-bottom: var(--space-6);
          padding: var(--space-4);
          background: rgba(99, 102, 241, 0.05);
          border-radius: var(--radius-lg);
          text-align: center;
        }

        .route-text {
          font-size: var(--font-size-lg);
          font-weight: var(--font-weight-bold);
          color: var(--gray-900);
          display: block;
        }

        .route-date {
          font-size: var(--font-size-sm);
          color: var(--gray-600);
          display: block;
          margin-top: var(--space-1);
        }

        .summary-details {
          margin-bottom: var(--space-6);
        }

        .summary-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: var(--space-3) 0;
          font-size: var(--font-size-base);
        }

        .summary-row:first-child {
          color: var(--gray-700);
        }

        .summary-row:last-child {
          font-weight: var(--font-weight-medium);
        }

        .total-row {
          font-size: var(--font-size-lg);
          font-weight: var(--font-weight-bold);
          color: var(--gray-900);
        }

        .total-price {
          color: var(--primary-600);
          font-size: var(--font-size-2xl);
        }

        .booking-actions {
          display: flex;
          flex-direction: column;
          gap: var(--space-4);
        }

        .book-now-btn {
          min-height: 48px;
          font-weight: var(--font-weight-semibold);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--space-2);
        }

        .booking-note {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          font-size: var(--font-size-sm);
          color: var(--gray-600);
          text-align: center;
          justify-content: center;
        }

        /* Mobile Responsive */
        @media (max-width: 991.98px) {
          .flight-route {
            grid-template-columns: 1fr;
            gap: var(--space-4);
          }

          .route-middle {
            order: 3;
          }

          .route-line {
            width: 80px;
          }

          .booking-summary {
            position: static;
          }
        }

        @media (max-width: 767.98px) {
          .header-content {
            flex-direction: column;
            align-items: flex-start;
          }

          .page-title {
            font-size: var(--font-size-2xl);
          }

          .location-info h4 {
            font-size: var(--font-size-xl);
          }

          .time {
            font-size: var(--font-size-2xl);
          }
        }
      `}</style>
    </div>
  );
};

export default FlightDetailPage;
