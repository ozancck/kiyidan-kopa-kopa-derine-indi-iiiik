import React from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // LinkContainer yerine Link kullan

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
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  // Calculate flight duration
  const calculateDuration = (departure, arrival) => {
    const dep = new Date(departure);
    const arr = new Date(arrival);
    const diff = arr - dep;
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${hours}h ${minutes}m`;
  };
  
  return (
    <Card className="flight-card">
      <Card.Body>
        <Row>
          <Col md={3}>
            <h5>{flight.from_city?.city_name}</h5>
            <p className="text-muted">{formatDate(flight.departure_time)}</p>
          </Col>
          
          <Col md={2} className="text-center d-flex flex-column justify-content-center">
            <p className="text-muted mb-0">{calculateDuration(flight.departure_time, flight.arrival_time)}</p>
            <hr className="my-1" />
            <p className="text-muted mb-0">Direct</p>
          </Col>
          
          <Col md={3}>
            <h5>{flight.to_city?.city_name}</h5>
            <p className="text-muted">{formatDate(flight.arrival_time)}</p>
          </Col>
          
          <Col md={2} className="d-flex flex-column justify-content-center">
            <h5 className="text-primary">{flight.price} ₺</h5>
            <p className="text-muted">{flight.seats_available} seats left</p>
          </Col>
          
          <Col md={2} className="d-flex align-items-center">
            {/* Çözüm 1: Button as={Link} kullanarak (önerilen) */}
            <Button 
              as={Link} 
              to={`/flight/${flight._id}`}
              variant="primary" 
              className="w-100"
            >
              Book Now
            </Button>
            
            {/* Alternatif Çözüm 2: Link component ile Button'u wrap etmek */}
            {/*
            <Link to={`/flight/${flight._id}`} className="w-100">
              <Button variant="primary" className="w-100">
                Book Now
              </Button>
            </Link>
            */}
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default FlightCard;