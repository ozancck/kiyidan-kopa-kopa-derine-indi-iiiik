import React from 'react';
import { Card, Row, Col, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const FlightCard = ({ flight }) => {
  // Format date
  const formatDate = (dateString) => {
    const options = { 
      hour: 'numeric', 
      minute: 'numeric',
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    };
    return new Date(dateString).toLocaleDateString('tr-TR', options);
  };

  const formatTime = (dateString) => {
    const options = { 
      hour: 'numeric', 
      minute: 'numeric'
    };
    return new Date(dateString).toLocaleTimeString('tr-TR', options);
  };
  
  // Calculate flight duration
  const calculateDuration = (departure, arrival) => {
    const dep = new Date(departure);
    const arr = new Date(arrival);
    const diff = arr - dep;
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${hours}s ${minutes}d`;
  };

  // Get seat availability status
  const getSeatStatus = (seatsAvailable) => {
    if (seatsAvailable > 10) return { variant: 'success', text: 'Bol Koltuk', emoji: '✅' };
    if (seatsAvailable > 5) return { variant: 'warning', text: 'Az Koltuk', emoji: '⚠️' };
    if (seatsAvailable > 0) return { variant: 'danger', text: 'Son Koltuklar', emoji: '🔥' };
    return { variant: 'secondary', text: 'Dolu', emoji: '❌' };
  };

  const seatStatus = getSeatStatus(flight.seats_available);
  
  return (
    <Card className="flight-card fade-in">
      <Card.Body>
        <Row className="align-items-center">
          {/* Departure Info */}
          <Col md={3} className="text-center">
            <div className="departure-info">
              <h4 className="fw-bold text-primary mb-1">
                <span style={{marginRight: '8px'}}>🛫</span>
                {flight.from_city?.city_name}
              </h4>
              <div className="time-info">
                <div className="fs-3 fw-bold text-dark">
                  {formatTime(flight.departure_time)}
                </div>
                <div className="text-muted small">
                  {formatDate(flight.departure_time)}
                </div>
              </div>
            </div>
          </Col>
          
          {/* Flight Duration & Route */}
          <Col md={2} className="text-center">
            <div className="flight-route-info">
              <div className="text-muted small mb-1">
                <span style={{marginRight: '5px'}}>⏱️</span>
                {calculateDuration(flight.departure_time, flight.arrival_time)}
              </div>
              <div className="route-line position-relative">
                <hr style={{
                  border: '2px solid #667eea',
                  margin: '10px 0',
                  position: 'relative'
                }} />
                <span style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  background: 'white',
                  padding: '0 8px',
                  fontSize: '1.2rem'
                }}>
                  ✈️
                </span>
              </div>
              <div className="text-muted small">
                <span style={{marginRight: '5px'}}>🎯</span>
                Direkt Uçuş
              </div>
            </div>
          </Col>
          
          {/* Arrival Info */}
          <Col md={3} className="text-center">
            <div className="arrival-info">
              <h4 className="fw-bold text-success mb-1">
                <span style={{marginRight: '8px'}}>🛬</span>
                {flight.to_city?.city_name}
              </h4>
              <div className="time-info">
                <div className="fs-3 fw-bold text-dark">
                  {formatTime(flight.arrival_time)}
                </div>
                <div className="text-muted small">
                  {formatDate(flight.arrival_time)}
                </div>
              </div>
            </div>
          </Col>
          
          {/* Price & Seat Info */}
          <Col md={2} className="text-center">
            <div className="price-info">
              <div className="price-tag mb-2">
                <span className="fs-1 fw-bold text-primary">
                  {flight.price}
                </span>
                <span className="fs-5 text-muted ms-1">₺</span>
              </div>
              <Badge 
                bg={seatStatus.variant} 
                className="rounded-pill px-3 py-2"
                style={{fontSize: '0.8rem'}}
              >
                <span style={{marginRight: '5px'}}>{seatStatus.emoji}</span>
                {flight.seats_available} {seatStatus.text}
              </Badge>
            </div>
          </Col>
          
          {/* Book Button */}
          <Col md={2} className="text-center">
            <Button 
              as={Link} 
              to={`/flight/${flight._id}`}
              variant="primary" 
              size="lg"
              className="w-100 book-btn"
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                border: 'none',
                borderRadius: '15px',
                padding: '15px',
                fontWeight: '600',
                fontSize: '1rem',
                transition: 'all 0.3s ease',
                boxShadow: '0 8px 20px rgba(102, 126, 234, 0.3)'
              }}
            >
              <div>
                <span style={{fontSize: '1.3rem', display: 'block'}}>🎫</span>
                <span>Rezervasyon Yap</span>
              </div>
            </Button>
          </Col>
        </Row>
        
        {/* Additional Info Row */}
        <Row className="mt-3 pt-3 border-top">
          <Col className="d-flex justify-content-center align-items-center">
            <small className="text-muted d-flex align-items-center flex-wrap justify-content-center">
              <span style={{marginRight: '15px'}}>
                <span style={{marginRight: '5px'}}>💼</span>
                20kg Bagaj Dahil
              </span>
              <span style={{marginRight: '15px'}}>
                <span style={{marginRight: '5px'}}>🍽️</span>
                İkram Dahil
              </span>
              <span style={{marginRight: '15px'}}>
                <span style={{marginRight: '5px'}}>📱</span>
                Online Check-in
              </span>
              <span>
                <span style={{marginRight: '5px'}}>🔄</span>
                Ücretsiz İptal
              </span>
            </small>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default FlightCard;