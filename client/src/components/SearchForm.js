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

  const swapCities = () => {
    const temp = fromCity;
    setFromCity(toCity);
    setToCity(temp);
  };
  
  return (
    <div className="search-form-container fade-in">
      <div className="text-center mb-4">
        <h3 className="gradient-text mb-3">
          <span style={{marginRight: '10px', fontSize: '2rem'}}>🔍</span>
          Uçuş Ara
        </h3>
        <p className="text-muted">
          <span style={{marginRight: '5px'}}>✨</span>
          En uygun uçuşları bulun ve hemen rezervasyon yapın
        </p>
      </div>
      
      {error && (
        <div className="alert alert-danger border-0 rounded-4 mb-4" role="alert">
          <span style={{marginRight: '8px'}}>⚠️</span>
          {error}
        </div>
      )}
      
      <Form onSubmit={submitHandler}>
        <Row className="g-4">
          <Col md={3}>
            <Form.Group controlId="fromCity">
              <Form.Label className="d-flex align-items-center">
                <span style={{marginRight: '8px'}}>🛫</span>
                Nereden
              </Form.Label>
              <Form.Select 
                value={fromCity}
                onChange={(e) => setFromCity(e.target.value)}
                required
                className="shadow-sm"
              >
                <option value="">Kalkış şehri seçin</option>
                {cities.map((city) => (
                  <option key={city._id} value={city._id}>
                    {city.city_name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          
          <Col md={1} className="d-flex align-items-end justify-content-center">
            <Button 
              variant="outline-primary" 
              className="rounded-circle p-2 mb-3"
              onClick={swapCities}
              type="button"
              style={{
                width: '40px',
                height: '40px',
                border: '2px solid #667eea',
                background: 'rgba(102, 126, 234, 0.1)'
              }}
              title="Şehirleri değiştir"
            >
              🔄
            </Button>
          </Col>
          
          <Col md={3}>
            <Form.Group controlId="toCity">
              <Form.Label className="d-flex align-items-center">
                <span style={{marginRight: '8px'}}>🛬</span>
                Nereye
              </Form.Label>
              <Form.Select 
                value={toCity}
                onChange={(e) => setToCity(e.target.value)}
                required
                className="shadow-sm"
              >
                <option value="">Varış şehri seçin</option>
                {cities.map((city) => (
                  <option key={city._id} value={city._id}>
                    {city.city_name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          
          <Col md={3}>
            <Form.Group controlId="date">
              <Form.Label className="d-flex align-items-center">
                <span style={{marginRight: '8px'}}>📅</span>
                Tarih
              </Form.Label>
              <Form.Control 
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                className="shadow-sm"
                min={new Date().toISOString().split('T')[0]}
              />
            </Form.Group>
          </Col>
          
          <Col md={2} className="d-flex align-items-end">
            <Button 
              type="submit" 
              variant="primary" 
              className="w-100 mb-3 pulse-animation"
              disabled={loading}
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                border: 'none',
                padding: '12px',
                fontSize: '1rem',
                fontWeight: '600'
              }}
            >
              {loading ? (
                <>
                  <span style={{marginRight: '8px'}}>⏳</span>
                  Yükleniyor...
                </>
              ) : (
                <>
                  <span style={{marginRight: '8px'}}>🚀</span>
                  Uçuş Ara
                </>
              )}
            </Button>
          </Col>
        </Row>
        
        <div className="text-center mt-4">
          <small className="text-muted">
            <span style={{marginRight: '5px'}}>💡</span>
            İpucu: En uygun fiyatları bulmak için farklı tarihleri deneyin
          </small>
        </div>
      </Form>
    </div>
  );
};

export default SearchForm;