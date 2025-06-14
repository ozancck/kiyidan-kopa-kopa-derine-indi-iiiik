import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import SearchForm from '../components/SearchForm';
import FlightCard from '../components/FlightCard';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getFlights, searchFlights } from '../services/flightService';

const HomePage = () => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchPerformed, setSearchPerformed] = useState(false);
  
  useEffect(() => {
    fetchFlights();
  }, []);
  
  const fetchFlights = async () => {
    try {
      setLoading(true);
      const data = await getFlights();
      setFlights(data);
      setLoading(false);
    } catch (error) {
      setError('Failed to load flights');
      setLoading(false);
    }
  };
  
  const searchHandler = async (searchData) => {
    try {
      setLoading(true);
      setSearchPerformed(true);
      const data = await searchFlights(searchData);
      setFlights(data);
      setLoading(false);
    } catch (error) {
      setError('Failed to search flights');
      setLoading(false);
    }
  };
  
  return (
    <>
      <SearchForm onSearch={searchHandler} />
      
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <h2 className="mb-4">
            {searchPerformed ? 'Search Results' : 'Available Flights'}
          </h2>
          
          {flights.length === 0 ? (
            <Message>
              {searchPerformed
                ? 'No flights found matching your search criteria.'
                : 'No flights available at the moment.'}
            </Message>
          ) : (
            <Row>
              <Col>
                {flights.map((flight) => (
                  <FlightCard key={flight._id} flight={flight} />
                ))}
              </Col>
            </Row>
          )}
        </>
      )}
    </>
  );
};

export default HomePage;