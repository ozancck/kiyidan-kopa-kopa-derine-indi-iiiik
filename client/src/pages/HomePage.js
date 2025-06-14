import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Alert, Button, Spinner } from 'react-bootstrap';
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
  const [searchParams, setSearchParams] = useState(null);
  const [sortBy, setSortBy] = useState('price'); // price, duration, departure
  const [filterBy, setFilterBy] = useState('all'); // all, morning, afternoon, evening
  
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
      setError('Uçuşlar yüklenirken bir hata oluştu');
      setLoading(false);
    }
  };
  
  const searchHandler = async (searchData) => {
    try {
      setLoading(true);
      setSearchPerformed(true);
      setSearchParams(searchData);
      const data = await searchFlights(searchData);
      setFlights(data);
      setLoading(false);
    } catch (error) {
      setError('Arama sırasında bir hata oluştu');
      setLoading(false);
    }
  };

  const resetSearch = () => {
    setSearchPerformed(false);
    setSearchParams(null);
    setSortBy('price');
    setFilterBy('all');
    fetchFlights();
  };

  // Sort flights
  const sortFlights = (flights, sortBy) => {
    const sorted = [...flights];
    switch (sortBy) {
      case 'price':
        return sorted.sort((a, b) => a.price - b.price);
      case 'duration':
        return sorted.sort((a, b) => {
          const durationA = new Date(a.arrival_time) - new Date(a.departure_time);
          const durationB = new Date(b.arrival_time) - new Date(b.departure_time);
          return durationA - durationB;
        });
      case 'departure':
        return sorted.sort((a, b) => new Date(a.departure_time) - new Date(b.departure_time));
      default:
        return sorted;
    }
  };

  // Filter flights by time
  const filterFlights = (flights, filterBy) => {
    if (filterBy === 'all') return flights;
    
    return flights.filter(flight => {
      const hour = new Date(flight.departure_time).getHours();
      switch (filterBy) {
        case 'morning':
          return hour >= 6 && hour < 12;
        case 'afternoon':
          return hour >= 12 && hour < 18;
        case 'evening':
          return hour >= 18 || hour < 6;
        default:
          return true;
      }
    });
  };

  const processedFlights = sortFlights(filterFlights(flights, filterBy), sortBy);

  const getTimeFilterLabel = (filter) => {
    switch (filter) {
      case 'morning': return '🌅 Sabah (06:00-12:00)';
      case 'afternoon': return '☀️ Öğleden Sonra (12:00-18:00)';
      case 'evening': return '🌙 Akşam (18:00-06:00)';
      default: return '🕐 Tüm Saatler';
    }
  };

  const getSortLabel = (sort) => {
    switch (sort) {
      case 'price': return 'Fiyat';
      case 'duration': return 'Uçuş Süresi';
      case 'departure': return 'Kalkış Saati';
      default: return 'Fiyat';
    }
  };
  
  return (
    <div className="homepage-container">
      {/* Hero Section with Search */}
      <section className="hero-section">
        <Container>
          <div className="hero-content">
            <div className="hero-header">
              <h1 className="hero-title">
                <span className="title-line-1">Hayallerinizdeki</span>
                <span className="title-line-2">Seyahati Keşfedin</span>
              </h1>
              <p className="hero-subtitle">
                Türkiye'nin en güvenilir uçuş rezervasyon platformu ile
                <br />
                en uygun fiyatlı biletleri bulun ve anında rezervasyon yapın.
              </p>
            </div>
            
            <SearchForm onSearch={searchHandler} />
          </div>
        </Container>
      </section>

      {/* Results Section */}
      <section className="results-section">
        <Container>
          {loading ? (
            <div className="loading-container">
              <Loader />
            </div>
          ) : error ? (
            <div className="error-container">
              <Alert variant="danger" className="error-alert">
                <div className="error-content">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="currentColor"/>
                  </svg>
                  <div>
                    <h5>Bir hata oluştu</h5>
                    <p>{error}</p>
                  </div>
                </div>
                <Button variant="outline-danger" onClick={fetchFlights}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z" fill="currentColor"/>
                  </svg>
                  Tekrar Dene
                </Button>
              </Alert>
            </div>
          ) : (
            <>
              {/* Results Header */}
              <div className="results-header">
                <div className="results-info">
                  <h2 className="results-title">
                    {searchPerformed ? (
                      <>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" fill="currentColor"/>
                        </svg>
                        Arama Sonuçları
                      </>
                    ) : (
                      <>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" fill="currentColor"/>
                        </svg>
                        Mevcut Uçuşlar
                      </>
                    )}
                  </h2>
                  
                  <div className="results-count">
                    <span className="count-number">{processedFlights.length}</span>
                    <span className="count-text">uçuş bulundu</span>
                  </div>
                </div>

                {searchPerformed && (
                  <div className="search-actions">
                    <Button variant="outline-primary" onClick={resetSearch}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" fill="currentColor"/>
                      </svg>
                      Aramayı Temizle
                    </Button>
                  </div>
                )}
              </div>

              {/* Search Parameters Display */}
              {searchPerformed && searchParams && (
                <div className="search-summary">
                  <div className="search-summary-content">
                    <div className="search-param">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="currentColor"/>
                      </svg>
                      <span>Kalkış şehri arandı</span>
                    </div>
                    <div className="search-param">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z" fill="currentColor"/>
                      </svg>
                      <span>{new Date(searchParams.date).toLocaleDateString('tr-TR')}</span>
                    </div>
                    {searchParams.passengers > 1 && (
                      <div className="search-param">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63c-.34-1.02-1.28-1.74-2.46-1.74s-2.12.72-2.46 1.74L12.5 16H15v6h5z" fill="currentColor"/>
                        </svg>
                        <span>{searchParams.passengers} yolcu</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Filter and Sort Controls */}
              {processedFlights.length > 0 && (
                <div className="controls-section">
                  <Row className="g-3">
                    <Col md={6}>
                      <div className="control-group">
                        <label className="control-label">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z" fill="currentColor"/>
                          </svg>
                          Sıralama
                        </label>
                        <select 
                          value={sortBy} 
                          onChange={(e) => setSortBy(e.target.value)}
                          className="control-select"
                        >
                          <option value="price">Fiyata Göre (Düşük → Yüksek)</option>
                          <option value="duration">Uçuş Süresine Göre</option>
                          <option value="departure">Kalkış Saatine Göre</option>
                        </select>
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className="control-group">
                        <label className="control-label">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="currentColor"/>
                          </svg>
                          Kalkış Zamanı
                        </label>
                        <select 
                          value={filterBy} 
                          onChange={(e) => setFilterBy(e.target.value)}
                          className="control-select"
                        >
                          <option value="all">Tüm Saatler</option>
                          <option value="morning">Sabah (06:00-12:00)</option>
                          <option value="afternoon">Öğleden Sonra (12:00-18:00)</option>
                          <option value="evening">Akşam (18:00-06:00)</option>
                        </select>
                      </div>
                    </Col>
                  </Row>
                </div>
              )}

              {/* Flight Results */}
              <div className="flights-container">
                {processedFlights.length === 0 ? (
                  <div className="empty-state">
                    <div className="empty-icon">
                      <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" fill="currentColor"/>
                      </svg>
                    </div>
                    <h3 className="empty-title">
                      {searchPerformed 
                        ? 'Arama kriterlerinize uygun uçuş bulunamadı' 
                        : 'Henüz uçuş bulunmuyor'
                      }
                    </h3>
                    <p className="empty-description">
                      {searchPerformed 
                        ? 'Farklı tarih veya şehir seçerek tekrar deneyebilirsiniz.' 
                        : 'Uçuş araması yapmak için yukarıdaki formu kullanın.'
                      }
                    </p>
                    {searchPerformed && (
                      <Button variant="primary" onClick={resetSearch} className="empty-action">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" fill="currentColor"/>
                        </svg>
                        Yeni Arama Yap
                      </Button>
                    )}
                  </div>
                ) : (
                  <div className="flights-list">
                    {processedFlights.map((flight, index) => (
                      <div key={flight._id} className="flight-item" style={{ animationDelay: `${index * 0.1}s` }}>
                        <FlightCard flight={flight} />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </Container>
      </section>

      <style jsx>{`
        /* Homepage Container */
        .homepage-container {
          min-height: 100vh;
        }

        /* Hero Section */
        .hero-section {
          background: linear-gradient(135deg, var(--primary-600) 0%, var(--secondary-600) 100%);
          position: relative;
          overflow: hidden;
          padding: var(--space-16) 0 var(--space-20);
          margin-bottom: var(--space-12);
        }

        .hero-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="20" cy="20" r="2" fill="rgba(255,255,255,0.1)"/><circle cx="80" cy="40" r="1" fill="rgba(255,255,255,0.1)"/><circle cx="40" cy="80" r="1.5" fill="rgba(255,255,255,0.1)"/><circle cx="90" cy="90" r="1" fill="rgba(255,255,255,0.1)"/></svg>') repeat;
          opacity: 0.3;
        }

        .hero-content {
          position: relative;
          z-index: 2;
        }

        .hero-header {
          text-align: center;
          margin-bottom: var(--space-12);
          color: white;
        }

        .hero-title {
          font-size: var(--font-size-5xl);
          font-weight: var(--font-weight-extrabold);
          line-height: var(--line-height-tight);
          margin-bottom: var(--space-6);
          display: flex;
          flex-direction: column;
          gap: var(--space-2);
        }

        .title-line-1 {
          background: linear-gradient(90deg, rgba(255,255,255,0.9), rgba(255,255,255,1));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .title-line-2 {
          background: linear-gradient(90deg, rgba(255,255,255,1), rgba(255,255,255,0.8));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-subtitle {
          font-size: var(--font-size-lg);
          font-weight: var(--font-weight-medium);
          opacity: 0.9;
          max-width: 600px;
          margin: 0 auto;
          line-height: var(--line-height-relaxed);
        }

        /* Results Section */
        .results-section {
          padding-bottom: var(--space-20);
        }

        /* Loading/Error States */
        .loading-container,
        .error-container {
          text-align: center;
          padding: var(--space-16) 0;
        }

        .error-alert {
          background: rgba(239, 68, 68, 0.1) !important;
          border: 1px solid rgba(239, 68, 68, 0.2) !important;
          border-radius: var(--radius-xl) !important;
          padding: var(--space-8) !important;
          margin: 0 !important;
        }

        .error-content {
          display: flex;
          align-items: center;
          gap: var(--space-4);
          margin-bottom: var(--space-6);
          color: var(--error-700);
        }

        .error-content h5 {
          margin: 0;
          font-weight: var(--font-weight-bold);
        }

        .error-content p {
          margin: 0;
          color: var(--error-600);
        }

        /* Results Header */
        .results-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: var(--space-8);
          flex-wrap: wrap;
          gap: var(--space-4);
        }

        .results-info {
          display: flex;
          align-items: center;
          gap: var(--space-6);
        }

        .results-title {
          font-size: var(--font-size-2xl);
          font-weight: var(--font-weight-bold);
          color: var(--gray-900);
          margin: 0;
          display: flex;
          align-items: center;
          gap: var(--space-2);
        }

        .results-count {
          display: flex;
          flex-direction: column;
          align-items: center;
          background: rgba(99, 102, 241, 0.1);
          border: 1px solid rgba(99, 102, 241, 0.2);
          border-radius: var(--radius-lg);
          padding: var(--space-3) var(--space-4);
        }

        .count-number {
          font-size: var(--font-size-xl);
          font-weight: var(--font-weight-bold);
          color: var(--primary-700);
          line-height: 1;
        }

        .count-text {
          font-size: var(--font-size-xs);
          color: var(--primary-600);
          font-weight: var(--font-weight-medium);
        }

        /* Search Summary */
        .search-summary {
          background: rgba(99, 102, 241, 0.05);
          border: 1px solid rgba(99, 102, 241, 0.1);
          border-radius: var(--radius-lg);
          padding: var(--space-4);
          margin-bottom: var(--space-6);
        }

        .search-summary-content {
          display: flex;
          gap: var(--space-6);
          flex-wrap: wrap;
        }

        .search-param {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          color: var(--primary-700);
          font-size: var(--font-size-sm);
          font-weight: var(--font-weight-medium);
        }

        /* Controls Section */
        .controls-section {
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: var(--radius-xl);
          padding: var(--space-6);
          margin-bottom: var(--space-8);
        }

        .control-group {
          display: flex;
          flex-direction: column;
          gap: var(--space-2);
        }

        .control-label {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          font-size: var(--font-size-sm);
          font-weight: var(--font-weight-semibold);
          color: var(--gray-700);
        }

        .control-select {
          background: rgba(255, 255, 255, 0.9);
          border: 2px solid rgba(99, 102, 241, 0.2);
          border-radius: var(--radius-lg);
          padding: var(--space-3) var(--space-4);
          font-size: var(--font-size-base);
          font-weight: var(--font-weight-medium);
          color: var(--gray-800);
          transition: var(--transition-normal);
          width: 100%;
        }

        .control-select:focus {
          border-color: var(--primary-500);
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
          outline: none;
        }

        /* Flights Container */
        .flights-container {
          min-height: 400px;
        }

        .flights-list {
          display: flex;
          flex-direction: column;
          gap: var(--space-6);
        }

        .flight-item {
          animation: slideInUp 0.6s ease forwards;
          opacity: 0;
          transform: translateY(30px);
        }

        @keyframes slideInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Empty State */
        .empty-state {
          text-align: center;
          padding: var(--space-16) var(--space-8);
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: var(--radius-2xl);
        }

        .empty-icon {
          color: var(--gray-400);
          margin-bottom: var(--space-6);
          opacity: 0.7;
        }

        .empty-title {
          font-size: var(--font-size-xl);
          font-weight: var(--font-weight-bold);
          color: var(--gray-800);
          margin-bottom: var(--space-4);
        }

        .empty-description {
          font-size: var(--font-size-base);
          color: var(--gray-600);
          margin-bottom: var(--space-8);
          max-width: 500px;
          margin-left: auto;
          margin-right: auto;
        }

        .empty-action {
          margin-top: var(--space-4);
        }

        /* Mobile Responsive */
        @media (max-width: 991.98px) {
          .hero-section {
            padding: var(--space-12) 0 var(--space-16);
          }

          .hero-title {
            font-size: var(--font-size-4xl);
          }

          .results-header {
            flex-direction: column;
            align-items: flex-start;
          }

          .results-info {
            flex-direction: column;
            align-items: flex-start;
            gap: var(--space-4);
          }

          .search-summary-content {
            flex-direction: column;
            gap: var(--space-3);
          }
        }

        @media (max-width: 767.98px) {
          .hero-title {
            font-size: var(--font-size-3xl);
          }

          .hero-subtitle {
            font-size: var(--font-size-base);
          }

          .controls-section {
            padding: var(--space-4);
          }

          .empty-state {
            padding: var(--space-12) var(--space-4);
          }
        }
      `}</style>
    </div>
  );
};

export default HomePage;
