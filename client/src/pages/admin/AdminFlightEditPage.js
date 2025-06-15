import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Row, Col, Container, Form, Button, Card } from 'react-bootstrap';
import AdminSidebar from '../../components/AdminSidebar';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { getCities } from '../../services/cityService';
import { getFlightById, updateFlight } from '../../services/flightService';

const AdminFlightEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [flightData, setFlightData] = useState({
    flight_id: '',
    from_city: '',
    to_city: '',
    departure_time: '',
    arrival_time: '',
    price: '',
    seats_total: '',
    seats_available: ''
  });
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [citiesData, flightData] = await Promise.all([
          getCities(),
          getFlightById(id)
        ]);
        
        setCities(citiesData);
        
        // Format datetime for input fields
        const departureTime = new Date(flightData.departure_time).toISOString().slice(0, 16);
        const arrivalTime = new Date(flightData.arrival_time).toISOString().slice(0, 16);
        
        setFlightData({
          flight_id: flightData.flight_id,
          from_city: flightData.from_city._id,
          to_city: flightData.to_city._id,
          departure_time: departureTime,
          arrival_time: arrivalTime,
          price: flightData.price,
          seats_total: flightData.seats_total,
          seats_available: flightData.seats_available
        });
        
        setLoading(false);
      } catch (error) {
        setError('Failed to load flight data');
        setLoading(false);
      }
    };
    
    fetchData();
  }, [id]);
  
  const handleInputChange = (e) => {
    setFlightData({
      ...flightData,
      [e.target.name]: e.target.value
    });
  };
  
  const submitHandler = async (e) => {
    e.preventDefault();
    
    try {
      setUpdateLoading(true);
      setError('');
      
      await updateFlight(id, flightData);
      navigate('/admin/flights');
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to update flight');
    } finally {
      setUpdateLoading(false);
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
            <h2 className="mb-4">Edit Flight</h2>
            
            {loading ? (
              <Loader />
            ) : (
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
                            value={flightData.flight_id}
                            onChange={handleInputChange}
                            required
                          />
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
                      <Col md={4}>
                        <Form.Group className="mb-3" controlId="seats_total">
                          <Form.Label>Total Seats</Form.Label>
                          <Form.Control 
                            type="number"
                            name="seats_total"
                            value={flightData.seats_total}
                            onChange={handleInputChange}
                            required
                          />
                        </Form.Group>
                      </Col>
                      
                      <Col md={4}>
                        <Form.Group className="mb-3" controlId="seats_available">
                          <Form.Label>Available Seats</Form.Label>
                          <Form.Control 
                            type="number"
                            name="seats_available"
                            value={flightData.seats_available}
                            onChange={handleInputChange}
                            required
                          />
                        </Form.Group>
                      </Col>
                      
                      <Col md={4}>
                        <Form.Group className="mb-3">
                          <Form.Label>Booked Seats</Form.Label>
                          <Form.Control 
                            type="number"
                            value={flightData.seats_total - flightData.seats_available}
                            disabled
                            readOnly
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    
                    <div className="d-flex gap-2">
                      <Button 
                        type="submit" 
                        variant="primary"
                        disabled={updateLoading}
                      >
                        {updateLoading ? 'Updating...' : 'Update Flight'}
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
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminFlightEditPage;