import React, { useState, useEffect } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
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
      setError('Uçuşlar yüklenirken hata oluştu');
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
      setError('Uçuş arama işlemi başarısız oldu');
      setLoading(false);
    }
  };
  
  return (
    <>
      {/* Hero Section */}
      <div className="hero-section" style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        borderBottom: '1px solid rgba(71, 85, 105, 0.3)'
      }}>
        <Container>
          <div className="hero-content text-center">
            <h1 className="hero-title fade-in" style={{color: '#f8fafc'}}>
              <span style={{marginRight: '15px', fontSize: '4rem'}}>✈️</span>
              Hayalinizdeki Seyahat Başlıyor
            </h1>
            <p className="hero-subtitle slide-in-left" style={{color: '#cbd5e1'}}>
              <span style={{marginRight: '8px'}}>🌍</span>
              Dünyanın dört bir yanına en uygun fiyatlarla uçun
            </p>
            <div className="hero-features mt-4">
              <Row className="justify-content-center">
                <Col md={3} className="text-center mb-3">
                  <div className="feature-item glass-card p-3 rounded-4" style={{color: '#e2e8f0'}}>
                    <div style={{fontSize: '2rem', marginBottom: '10px'}}>💰</div>
                    <strong style={{color: '#06b6d4'}}>En İyi Fiyat</strong>
                    <br />
                    <small style={{color: '#94a3b8'}}>Garantisi</small>
                  </div>
                </Col>
                <Col md={3} className="text-center mb-3">
                  <div className="feature-item glass-card p-3 rounded-4" style={{color: '#e2e8f0'}}>
                    <div style={{fontSize: '2rem', marginBottom: '10px'}}>⚡</div>
                    <strong style={{color: '#06b6d4'}}>Hızlı</strong>
                    <br />
                    <small style={{color: '#94a3b8'}}>Rezervasyon</small>
                  </div>
                </Col>
                <Col md={3} className="text-center mb-3">
                  <div className="feature-item glass-card p-3 rounded-4" style={{color: '#e2e8f0'}}>
                    <div style={{fontSize: '2rem', marginBottom: '10px'}}>🛡️</div>
                    <strong style={{color: '#06b6d4'}}>Güvenli</strong>
                    <br />
                    <small style={{color: '#94a3b8'}}>Ödeme</small>
                  </div>
                </Col>
                <Col md={3} className="text-center mb-3">
                  <div className="feature-item glass-card p-3 rounded-4" style={{color: '#e2e8f0'}}>
                    <div style={{fontSize: '2rem', marginBottom: '10px'}}>📞</div>
                    <strong style={{color: '#06b6d4'}}>7/24</strong>
                    <br />
                    <small style={{color: '#94a3b8'}}>Destek</small>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </Container>
      </div>

      {/* Search Section */}
      <Container className="main-container" style={{marginTop: '100px'}}>
        <div className="search-section mb-5">
          <SearchForm onSearch={searchHandler} />
        </div>
        
        {/* Results Section */}
        <div className="results-section">
          {loading ? (
            <div className="loading-spinner">
              <div className="text-center">
                <div style={{fontSize: '4rem', marginBottom: '20px'}}>✈️</div>
                <h4 className="text-white">Uçuşlar Yükleniyor...</h4>
                <p className="text-white opacity-75">En uygun uçuşları sizin için buluyoruz</p>
              </div>
            </div>
          ) : error ? (
            <Message variant="danger">
              <div className="text-center">
                <div style={{fontSize: '3rem', marginBottom: '15px'}}>❌</div>
                <h5>{error}</h5>
                <p className="mb-0">Lütfen daha sonra tekrar deneyin</p>
              </div>
            </Message>
          ) : (
            <>
              <div className="results-header text-center mb-4">
                <h2 className="fw-bold" style={{color: '#f8fafc'}}>
                  {searchPerformed ? (
                    <>
                      <span style={{marginRight: '10px'}}>🔍</span>
                      Arama Sonuçları
                    </>
                  ) : (
                    <>
                      <span style={{marginRight: '10px'}}>✨</span>
                      Popüler Uçuşlar
                    </>
                  )}
                </h2>
                {flights.length > 0 && (
                  <p style={{color: '#cbd5e1', opacity: 0.8}}>
                    <span style={{marginRight: '5px'}}>📊</span>
                    {flights.length} uçuş bulundu
                  </p>
                )}
              </div>
              
              {flights.length === 0 ? (
                <div className="empty-state glass-card">
                  <div style={{fontSize: '5rem', marginBottom: '20px'}}>🛫</div>
                  <h4 className="text-muted mb-3">
                    {searchPerformed
                      ? 'Arama Kriterlerinize Uygun Uçuş Bulunamadı'
                      : 'Şu Anda Müsait Uçuş Bulunmuyor'}
                  </h4>
                  <p className="text-muted">
                    {searchPerformed ? (
                      <>
                        <span style={{marginRight: '5px'}}>💡</span>
                        Farklı tarih veya şehirler deneyebilirsiniz
                      </>
                    ) : (
                      <>
                        <span style={{marginRight: '5px'}}>⏰</span>
                        Yeni uçuşlar için daha sonra kontrol edin
                      </>
                    )}
                  </p>
                </div>
              ) : (
                <Row>
                  <Col>
                    <div className="flights-list">
                      {flights.map((flight, index) => (
                        <div 
                          key={flight._id} 
                          className="flight-item"
                          style={{
                            animationDelay: `${index * 0.1}s`
                          }}
                        >
                          <FlightCard flight={flight} />
                        </div>
                      ))}
                    </div>
                  </Col>
                </Row>
              )}
            </>
          )}
        </div>

        {/* Info Section */}
        {!loading && flights.length > 0 && (
          <div className="info-section mt-5">
            <Row>
              <Col md={6} className="mb-4">
                <div className="info-card glass-card p-4 rounded-4 h-100">
                  <h5 style={{color: '#f8fafc'}} className="mb-3">
                    <span style={{marginRight: '8px'}}>ℹ️</span>
                    Rezervasyon Bilgileri
                  </h5>
                  <ul className="list-unstyled" style={{color: '#cbd5e1', opacity: 0.8}}>
                    <li className="mb-2">
                      <span style={{marginRight: '8px'}}>🎫</span>
                      Online bilet düzenleme
                    </li>
                    <li className="mb-2">
                      <span style={{marginRight: '8px'}}>📱</span>
                      Mobil boarding pass
                    </li>
                    <li className="mb-2">
                      <span style={{marginRight: '8px'}}>💼</span>
                      20kg bagaj hakkı dahil
                    </li>
                    <li>
                      <span style={{marginRight: '8px'}}>🔄</span>
                      24 saat ücretsiz iptal
                    </li>
                  </ul>
                </div>
              </Col>
              <Col md={6} className="mb-4">
                <div className="info-card glass-card p-4 rounded-4 h-100">
                  <h5 style={{color: '#f8fafc'}} className="mb-3">
                    <span style={{marginRight: '8px'}}>💳</span>
                    Ödeme Seçenekleri
                  </h5>
                  <ul className="list-unstyled" style={{color: '#cbd5e1', opacity: 0.8}}>
                    <li className="mb-2">
                      <span style={{marginRight: '8px'}}>🏦</span>
                      Kredi kartı ile ödeme
                    </li>
                    <li className="mb-2">
                      <span style={{marginRight: '8px'}}>📲</span>
                      Havale/EFT ile ödeme
                    </li>
                    <li className="mb-2">
                      <span style={{marginRight: '8px'}}>⚡</span>
                      Anında onay
                    </li>
                    <li>
                      <span style={{marginRight: '8px'}}>🛡️</span>
                      SSL güvenlik sertifikası
                    </li>
                  </ul>
                </div>
              </Col>
            </Row>
          </div>
        )}
      </Container>
    </>
  );
};

export default HomePage;