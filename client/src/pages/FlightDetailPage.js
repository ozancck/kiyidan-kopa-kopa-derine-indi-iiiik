import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Row, Col, Card, Form, Button } from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getFlightById } from '../services/flightService';
import { bookTicket } from '../services/ticketService';

const FlightDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [flight, setFlight] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [passengerName, setPassengerName] = useState('');
  const [passengerSurname, setPassengerSurname] = useState('');
  const [passengerEmail, setPassengerEmail] = useState('');
  
  useEffect(() => {
    const fetchFlight = async () => {
      try {
        const data = await getFlightById(id);
        setFlight(data);
        setLoading(false);
      } catch (error) {
        setError('Failed to load flight details');
        setLoading(false);
      }
    };
    
    fetchFlight();
  }, [id]);
  
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
  
  const submitHandler = async (e) => {
    e.preventDefault();
    
    try {
      const data = await bookTicket({
        passenger_name: passengerName,
        passenger_surname: passengerSurname,
        passenger_email: passengerEmail,
        flight_id: flight._id
      });
      
      navigate(`/booking/${data._id}`);
    } catch (error) {
      setError('Failed to book ticket');
    }
  };
  
  return (
    <>
      <Button 
        variant="light" 
        className="mb-3" 
        onClick={() => navigate('/')}
      >
        Go Back
      </Button>
      
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <h2 className="mb-4">Flight Details</h2>
          
          <Row>
            <Col md={6}>
              <Card>
                <Card.Header as="h5">Flight Information</Card.Header>
                <Card.Body>
                  <Row className="mb-3">
                    <Col md={6}>
                      <h6>Flight Number</h6>
                      <p>{flight.flight_id}</p>
                    </Col>
                    <Col md={6}>
                      <h6>Price</h6>
                      <p className="text-primary fw-bold">{flight.price} ₺</p>
                    </Col>
                  </Row>
                  
                  <Row className="mb-3">
                    <Col md={6}>
                      <h6>From</h6>
                      <p>{flight.from_city.city_name}</p>
                      <p className="text-muted">{formatDate(flight.departure_time)}</p>
                    </Col>
                    <Col md={6}>
                      <h6>To</h6>
                      <p>{flight.to_city.city_name}</p>
                      <p className="text-muted">{formatDate(flight.arrival_time)}</p>
                    </Col>
                  </Row>
                  
                  <Row>
                    <Col>
                      <h6>Available Seats</h6>
                      <p>{flight.seats_available} out of {flight.seats_total}</p>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
            
            <Col md={6}>
              <Card>
                <Card.Header as="h5">Passenger Information</Card.Header>
                <Card.Body>
                  {flight.seats_available === 0 ? (
                    <Message variant="danger">
                      Sorry, this flight is fully booked.
                    </Message>
                  ) : (
                    <Form onSubmit={submitHandler}>
                      <Form.Group className="mb-3" controlId="passengerName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control 
                          type="text"
                          placeholder="Enter first name"
                          value={passengerName}
                          onChange={(e) => setPassengerName(e.target.value)}
                          required
                        />
                      </Form.Group>
                      
                      <Form.Group className="mb-3" controlId="passengerSurname">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control 
                          type="text"
                          placeholder="Enter last name"
                          value={passengerSurname}
                          onChange={(e) => setPassengerSurname(e.target.value)}
                          required
                        />
                      </Form.Group>
                      
                      <Form.Group className="mb-3" controlId="passengerEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control 
                          type="email"
                          placeholder="Enter email"
                          value={passengerEmail}
                          onChange={(e) => setPassengerEmail(e.target.value)}
                          required
                        />
                      </Form.Group>
                      
                      <Button type="submit" variant="primary" className="w-100">
                        Book Ticket
                      </Button>
                    </Form>
                  )}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default FlightDetailPage;