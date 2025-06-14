import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Container, Form, Button, Card } from 'react-bootstrap';
import AdminSidebar from '../../components/AdminSidebar';
import Message from '../../components/Message';
import { getCities } from '../../services/cityService';
import { createFlight } from '../../services/flightService';

const AdminFlightCreatePage = () => {
  const navigate = useNavigate();
  
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [flightData, setFlightData] = useState({
    flight_id: '',
    from_city: '',
    to_city: '',
    departure_time: '',
    arrival_time: '',
    price: '',
    seats_total: ''
  });
  
  useEffect(() => {
    const fetchCities = async () => {
      try {
        const data = await getCities();
        setCities(data);
      } catch (error) {
        setError('Failed to load cities');
      }
    };
    
    fetchCities();
  }, []);
  
  const handleInputChange = (e) => {
    setFlightData({
      ...flightData,
      [e.target.name]: e.target.value
    });
  };
  
  const submitHandler = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      setError('');
      
      await createFlight(flightData);
      navigate('/admin/flights');
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to create flight');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Container fluid>
      <Row>
        <Col md={2} className="px-0">
          <AdminSidebar />
        </Col>
        
        <Col md={10}>
          <div className="p-4">
            <h2 className="mb-4">Create New Flight</h2>
            
            <Card>
              <Card.Body>
                {error && <Message variant="danger">{error}</Message>}
                
                <Form onSubmit={submitHandler}>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="flight_id">
                        <Form.Label>Flight ID</Form.Label>
                        <Form.Control 
                          type="text"
                          name="flight_id"
                          placeholder="e.g., TK101"
                          value={flightData.flight_id}
                          onChange={handleInputChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                    
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="price">
                        <Form.Label>Price (₺)</Form.Label>
                        <Form.Control 
                          type="number"
                          name="price"
                          placeholder="0"
                          value={flightData.price}
                          onChange={handleInputChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="from_city">
                        <Form.Label>From City</Form.Label>
                        <Form.Select 
                          name="from_city"
                          value={flightData.from_city}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="">Select departure city</option>
                          {cities.map((city) => (
                            <option key={city._id} value={city._id}>
                              {city.city_name}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="to_city">
                        <Form.Label>To City</Form.Label>
                        <Form.Select 
                          name="to_city"
                          value={flightData.to_city}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="">Select arrival city</option>
                          {cities.map((city) => (
                            <option key={city._id} value={city._id}>
                              {city.city_name}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>
                  
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="departure_time">
                        <Form.Label>Departure Time</Form.Label>
                        <Form.Control 
                          type="datetime-local"
                          name="departure_time"
                          value={flightData.departure_time}
                          onChange={handleInputChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                    
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="arrival_time">
                        <Form.Label>Arrival Time</Form.Label>
                        <Form.Control 
                          type="datetime-local"
                          name="arrival_time"
                          value={flightData.arrival_time}
                          onChange={handleInputChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="seats_total">
                        <Form.Label>Total Seats</Form.Label>
                        <Form.Control 
                          type="number"
                          name="seats_total"
                          placeholder="0"
                          value={flightData.seats_total}
                          onChange={handleInputChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  
                  <div className="d-flex gap-2">
                    <Button 
                      type="submit" 
                      variant="primary"
                      disabled={loading}
                    >
                      {loading ? 'Creating...' : 'Create Flight'}
                    </Button>
                    
                    <Button 
                      variant="secondary"
                      onClick={() => navigate('/admin/flights')}
                    >
                      Cancel
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminFlightCreatePage;