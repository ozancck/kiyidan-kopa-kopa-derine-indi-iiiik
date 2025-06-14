import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { getCities } from '../services/cityService';

const SearchForm = ({ onSearch }) => {
  const [cities, setCities] = useState([]);
  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');
  const [date, setDate] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  useEffect(() => {
    const fetchCities = async () => {
      try {
        const data = await getCities();
        setCities(data);
        setLoading(false);
      } catch (error) {
        setError('Failed to load cities');
        setLoading(false);
      }
    };
    
    fetchCities();
  }, []);
  
  const submitHandler = (e) => {
    e.preventDefault();
    onSearch({ from_city: fromCity, to_city: toCity, date });
  };
  
  return (
    <div className="shadow p-4 mb-5 bg-white rounded">
      <h3 className="mb-4">Search Flights</h3>
      
      {error && <p className="text-danger">{error}</p>}
      
      <Form onSubmit={submitHandler}>
        <Row>
          <Col md={3}>
            <Form.Group className="mb-3" controlId="fromCity">
              <Form.Label>From</Form.Label>
              <Form.Select 
                value={fromCity}
                onChange={(e) => setFromCity(e.target.value)}
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
          
          <Col md={3}>
            <Form.Group className="mb-3" controlId="toCity">
              <Form.Label>To</Form.Label>
              <Form.Select 
                value={toCity}
                onChange={(e) => setToCity(e.target.value)}
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
          
          <Col md={3}>
            <Form.Group className="mb-3" controlId="date">
              <Form.Label>Date</Form.Label>
              <Form.Control 
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
          
          <Col md={3} className="d-flex align-items-end">
            <Button 
              type="submit" 
              variant="primary" 
              className="w-100 mb-3"
              disabled={loading}
            >
              Search Flights
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default SearchForm;