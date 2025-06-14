import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Alert, Spinner } from 'react-bootstrap';
import { getCities } from '../services/cityService';

const SearchForm = ({ onSearch }) => {
  const [cities, setCities] = useState([]);
  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');
  const [date, setDate] = useState('');
  const [passengers, setPassengers] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  
  useEffect(() => {
    const fetchCities = async () => {
      try {
        const data = await getCities();
        setCities(data);
        setLoading(false);
      } catch (error) {
        setError('Şehirler yüklenirken bir hata oluştu');
        setLoading(false);
      }
    };
    
    fetchCities();
  }, []);

  // Set minimum date to today
  const today = new Date().toISOString().split('T')[0];
  
  const submitHandler = async (e) => {
    e.preventDefault();
    setIsSearching(true);
    
    try {
      await onSearch({ 
        from_city: fromCity, 
        to_city: toCity, 
        date,
        passengers 
      });
    } catch (error) {
      setError('Arama sırasında bir hata oluştu');
    } finally {
      setIsSearching(false);
    }
  };

  const swapCities = () => {
    const temp = fromCity;
    setFromCity(toCity);
    setToCity(temp);
  };
  
  return (
    <div className="search-form-container">
      <div className="search-form-wrapper">
        
        {/* Header Section */}
        <div className="search-header">
          <div className="search-icon-wrapper">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" fill="currentColor"/>
            </svg>
          </div>
          <div className="search-text">
            <h2 className="search-title">Uçuş Arama</h2>
            <p className="search-subtitle">Hayallerinizdeki destinasyonu keşfedin</p>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <Alert variant="danger" className="custom-alert" onClose={() => setError('')} dismissible>
            <div className="alert-content">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="currentColor"/>
              </svg>
              <span>{error}</span>
            </div>
          </Alert>
        )}
        
        {/* Search Form */}
        <Form onSubmit={submitHandler} className="search-form">
          <Row className="g-4">
            
            {/* From City */}
            <Col lg={3} md={6}>
              <div className="form-group-custom">
                <Form.Label className="form-label-custom">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="currentColor"/>
                  </svg>
                  <span>Nereden</span>
                </Form.Label>
                <Form.Select 
                  value={fromCity}
                  onChange={(e) => setFromCity(e.target.value)}
                  required
                  disabled={loading}
                  className="form-control-custom"
                >
                  <option value="">Kalkış şehri seçin</option>
                  {cities.map((city) => (
                    <option key={city._id} value={city._id}>
                      {city.city_name}
                    </option>
                  ))}
                </Form.Select>
              </div>
            </Col>

            {/* Swap Button */}
            <Col lg={1} md={12} className="d-flex align-items-end justify-content-center">
              <Button 
                type="button" 
                variant="outline-primary" 
                onClick={swapCities}
                className="swap-btn"
                disabled={!fromCity || !toCity}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.99 11L3 15l3.99 4v-3H14v-2H6.99v-3zM21 9l-3.99-4v3H10v2h7.01v3L21 9z" fill="currentColor"/>
                </svg>
              </Button>
            </Col>
            
            {/* To City */}
            <Col lg={3} md={6}>
              <div className="form-group-custom">
                <Form.Label className="form-label-custom">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="currentColor"/>
                  </svg>
                  <span>Nereye</span>
                </Form.Label>
                <Form.Select 
                  value={toCity}
                  onChange={(e) => setToCity(e.target.value)}
                  required
                  disabled={loading}
                  className="form-control-custom"
                >
                  <option value="">Varış şehri seçin</option>
                  {cities.map((city) => (
                    <option key={city._id} value={city._id}>
                      {city.city_name}
                    </option>
                  ))}
                </Form.Select>
              </div>
            </Col>
            
            {/* Date */}
            <Col lg={2} md={6}>
              <div className="form-group-custom">
                <Form.Label className="form-label-custom">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z" fill="currentColor"/>
                  </svg>
                  <span>Tarih</span>
                </Form.Label>
                <Form.Control 
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  min={today}
                  required
                  className="form-control-custom"
                />
              </div>
            </Col>

            {/* Passengers */}
            <Col lg={2} md={6}>
              <div className="form-group-custom">
                <Form.Label className="form-label-custom">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63c-.34-1.02-1.28-1.74-2.46-1.74s-2.12.72-2.46 1.74L12.5 16H15v6h5zM12.5 11.5c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5S11 9.17 11 10s.67 1.5 1.5 1.5zM5.5 6c1.11 0 2-.89 2-2s-.89-2-2-2-2 .89-2 2 .89 2 2 2zm2 16v-7H9V9.5c0-.28-.22-.5-.5-.5h-6c-.28 0-.5.22-.5.5V15h1.5v7h3.5z" fill="currentColor"/>
                  </svg>
                  <span>Yolcu</span>
                </Form.Label>
                <Form.Select 
                  value={passengers}
                  onChange={(e) => setPassengers(parseInt(e.target.value))}
                  className="form-control-custom"
                >
                  {[1,2,3,4,5,6,7,8].map(num => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? 'Yolcu' : 'Yolcu'}
                    </option>
                  ))}
                </Form.Select>
              </div>
            </Col>
            
            {/* Search Button */}
            <Col lg={1} md={12} className="d-flex align-items-end">
              <Button 
                type="submit" 
                variant="primary"
                disabled={loading || isSearching}
                className="search-btn"
              >
                {loading || isSearching ? (
                  <>
                    <Spinner size="sm" />
                    <span>{loading ? 'Yükleniyor...' : 'Aranıyor...'}</span>
                  </>
                ) : (
                  <>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" fill="currentColor"/>
                    </svg>
                    <span>Ara</span>
                  </>
                )}
              </Button>
            </Col>
          </Row>
        </Form>

        {/* Quick Actions */}
        <div className="quick-actions">
          <div className="quick-actions-title">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="currentColor"/>
            </svg>
            <span>Popüler Rotalar</span>
          </div>
          <div className="quick-routes">
            <button type="button" className="quick-route-btn" onClick={() => {
              // Auto-fill popular routes
              const istanbul = cities.find(c => c.city_name.toLowerCase().includes('istanbul'));
              const ankara = cities.find(c => c.city_name.toLowerCase().includes('ankara'));
              if (istanbul && ankara) {
                setFromCity(istanbul._id);
                setToCity(ankara._id);
              }
            }}>
              İstanbul → Ankara
            </button>
            <button type="button" className="quick-route-btn" onClick={() => {
              const istanbul = cities.find(c => c.city_name.toLowerCase().includes('istanbul'));
              const izmir = cities.find(c => c.city_name.toLowerCase().includes('izmir'));
              if (istanbul && izmir) {
                setFromCity(istanbul._id);
                setToCity(izmir._id);
              }
            }}>
              İstanbul → İzmir
            </button>
            <button type="button" className="quick-route-btn" onClick={() => {
              const ankara = cities.find(c => c.city_name.toLowerCase().includes('ankara'));
              const antalya = cities.find(c => c.city_name.toLowerCase().includes('antalya'));
              if (ankara && antalya) {
                setFromCity(ankara._id);
                setToCity(antalya._id);
              }
            }}>
              Ankara → Antalya
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        /* Search Form Container */
        .search-form-container {
          margin-bottom: var(--space-12);
          position: relative;
        }

        .search-form-wrapper {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: var(--radius-2xl);
          padding: var(--space-10);
          box-shadow: var(--shadow-2xl);
          position: relative;
          overflow: hidden;
        }

        .search-form-wrapper::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, var(--primary-500), var(--secondary-500), var(--primary-600));
          border-radius: var(--radius-2xl) var(--radius-2xl) 0 0;
        }

        /* Header Section */
        .search-header {
          display: flex;
          align-items: center;
          gap: var(--space-6);
          margin-bottom: var(--space-8);
          text-align: center;
          justify-content: center;
        }

        .search-icon-wrapper {
          background: linear-gradient(135deg, var(--primary-500), var(--secondary-500));
          border-radius: var(--radius-xl);
          padding: var(--space-4);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: var(--shadow-lg);
        }

        .search-text {
          text-align: left;
        }

        .search-title {
          font-size: var(--font-size-3xl);
          font-weight: var(--font-weight-extrabold);
          margin-bottom: var(--space-2);
          background: linear-gradient(135deg, var(--primary-600), var(--secondary-600));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .search-subtitle {
          font-size: var(--font-size-lg);
          color: var(--gray-600);
          margin-bottom: 0;
          font-weight: var(--font-weight-medium);
        }

        /* Alert Styles */
        .custom-alert {
          border: none !important;
          border-radius: var(--radius-lg) !important;
          background: rgba(239, 68, 68, 0.1) !important;
          border-left: 4px solid var(--error-500) !important;
          margin-bottom: var(--space-6) !important;
        }

        .alert-content {
          display: flex;
          align-items: center;
          gap: var(--space-3);
          color: var(--error-700) !important;
          font-weight: var(--font-weight-medium);
        }

        /* Form Groups */
        .form-group-custom {
          height: 100%;
        }

        .form-label-custom {
          display: flex !important;
          align-items: center !important;
          gap: var(--space-2) !important;
          font-size: var(--font-size-sm) !important;
          font-weight: var(--font-weight-semibold) !important;
          color: var(--gray-800) !important;
          margin-bottom: var(--space-3) !important;
        }

        .form-control-custom {
          min-height: 48px !important;
          font-size: var(--font-size-base) !important;
          font-weight: var(--font-weight-medium) !important;
          padding: var(--space-4) var(--space-5) !important;
          border: 2px solid rgba(99, 102, 241, 0.2) !important;
          border-radius: var(--radius-lg) !important;
          background: rgba(255, 255, 255, 0.9) !important;
          backdrop-filter: blur(10px) !important;
          transition: var(--transition-normal) !important;
          color: var(--gray-800) !important;
        }

        .form-control-custom:focus {
          border-color: var(--primary-500) !important;
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1) !important;
          background: rgba(255, 255, 255, 0.95) !important;
          outline: none !important;
        }

        .form-control-custom:disabled {
          background: rgba(243, 244, 246, 0.8) !important;
          cursor: not-allowed !important;
        }

        /* Swap Button */
        .swap-btn {
          min-height: 48px !important;
          width: 48px !important;
          padding: 0 !important;
          border-radius: var(--radius-full) !important;
          background: rgba(255, 255, 255, 0.9) !important;
          border: 2px solid var(--primary-500) !important;
          color: var(--primary-600) !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          transition: var(--transition-normal) !important;
          margin-bottom: var(--space-6) !important;
        }

        .swap-btn:hover:not(:disabled) {
          background: var(--primary-500) !important;
          color: white !important;
          transform: rotate(180deg) !important;
          box-shadow: var(--shadow-lg) !important;
        }

        .swap-btn:disabled {
          opacity: 0.5 !important;
          cursor: not-allowed !important;
        }

        /* Search Button */
        .search-btn {
          min-height: 48px !important;
          width: 100% !important;
          font-weight: var(--font-weight-semibold) !important;
          font-size: var(--font-size-base) !important;
          padding: var(--space-4) var(--space-6) !important;
          border-radius: var(--radius-lg) !important;
          background: linear-gradient(135deg, var(--primary-600), var(--primary-700)) !important;
          border: none !important;
          color: white !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          gap: var(--space-2) !important;
          transition: var(--transition-normal) !important;
          box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3) !important;
          margin-bottom: var(--space-6) !important;
        }

        .search-btn:hover:not(:disabled) {
          background: linear-gradient(135deg, var(--primary-700), var(--primary-800)) !important;
          transform: translateY(-2px) !important;
          box-shadow: 0 6px 20px rgba(99, 102, 241, 0.4) !important;
        }

        .search-btn:disabled {
          opacity: 0.7 !important;
          cursor: not-allowed !important;
          transform: none !important;
        }

        /* Quick Actions */
        .quick-actions {
          margin-top: var(--space-8);
          padding-top: var(--space-6);
          border-top: 1px solid rgba(99, 102, 241, 0.1);
        }

        .quick-actions-title {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          font-size: var(--font-size-sm);
          font-weight: var(--font-weight-semibold);
          color: var(--gray-700);
          margin-bottom: var(--space-4);
        }

        .quick-routes {
          display: flex;
          gap: var(--space-3);
          flex-wrap: wrap;
        }

        .quick-route-btn {
          background: rgba(99, 102, 241, 0.1);
          border: 1px solid rgba(99, 102, 241, 0.2);
          border-radius: var(--radius-full);
          padding: var(--space-2) var(--space-4);
          font-size: var(--font-size-sm);
          font-weight: var(--font-weight-medium);
          color: var(--primary-700);
          cursor: pointer;
          transition: var(--transition-normal);
        }

        .quick-route-btn:hover {
          background: var(--primary-100);
          border-color: var(--primary-300);
          transform: translateY(-1px);
        }

        /* Mobile Responsive */
        @media (max-width: 991.98px) {
          .search-header {
            flex-direction: column;
            gap: var(--space-4);
          }

          .search-text {
            text-align: center;
          }

          .swap-btn {
            order: 1;
            margin: var(--space-4) auto;
          }

          .quick-routes {
            justify-content: center;
          }
        }

        @media (max-width: 767.98px) {
          .search-form-wrapper {
            padding: var(--space-6);
          }

          .search-title {
            font-size: var(--font-size-2xl);
          }

          .search-subtitle {
            font-size: var(--font-size-base);
          }
        }
      `}</style>
    </div>
  );
};

export default SearchForm;
