import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Row, Col, Card, Form, Button, Badge, Container } from 'react-bootstrap';
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
  const [bookingLoading, setBookingLoading] = useState(false);
  
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
        setError('Uçuş detayları yüklenirken hata oluştu');
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
    return new Date(dateString).toLocaleDateString('tr-TR', options);
  };

  const formatTime = (dateString) => {
    const options = { 
      hour: 'numeric', 
      minute: 'numeric'
    };
    return new Date(dateString).toLocaleTimeString('tr-TR', options);
  };

  const calculateDuration = (departure, arrival) => {
    const dep = new Date(departure);
    const arr = new Date(arrival);
    const diff = arr - dep;
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${hours}s ${minutes}d`;
  };

  const getSeatStatus = (seatsAvailable, seatsTotal) => {
    const percentage = (seatsAvailable / seatsTotal) * 100;
    if (percentage > 50) return { variant: 'success', text: 'Bol Koltuk', emoji: '✅' };
    if (percentage > 20) return { variant: 'warning', text: 'Az Koltuk', emoji: '⚠️' };
    if (percentage > 0) return { variant: 'danger', text: 'Son Koltuklar', emoji: '🔥' };
    return { variant: 'secondary', text: 'Dolu', emoji: '❌' };
  };
  
  const submitHandler = async (e) => {
    e.preventDefault();
    
    try {
      setBookingLoading(true);
      const data = await bookTicket({
        passenger_name: passengerName,
        passenger_surname: passengerSurname,
        passenger_email: passengerEmail,
        flight_id: flight._id
      });
      
      navigate(`/booking/${data._id}`);
    } catch (error) {
      setError('Bilet rezervasyonu yapılırken hata oluştu');
      setBookingLoading(false);
    }
  };
  
  return (
    <div style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      minHeight: '100vh',
      paddingTop: '40px',
      paddingBottom: '40px'
    }}>
      <Container>
        <Button 
          variant="light" 
          className="mb-4 shadow-sm"
          onClick={() => navigate('/')}
          style={{
            borderRadius: '15px',
            padding: '12px 25px',
            fontWeight: '600',
            border: 'none',
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)'
          }}
        >
          <span style={{marginRight: '8px'}}>⬅️</span>
          Geri Dön
        </Button>
        
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <>
            {/* Flight Header */}
            <div className="text-center mb-5">
              <h1 className="text-white fw-bold mb-3">
                <span style={{marginRight: '15px', fontSize: '3rem'}}>✈️</span>
                Uçuş Detayları
              </h1>
              <p className="text-white opacity-75 fs-5">
                <span style={{marginRight: '8px'}}>🎫</span>
                Rezervasyon işleminizi tamamlayın
              </p>
            </div>

            <Row className="g-4">
              {/* Flight Information Card */}
              <Col lg={6}>
                <Card className="glass-card border-0 h-100" style={{
                  background: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(15px)',
                  borderRadius: '25px',
                  boxShadow: '0 20px 40px rgba(31, 38, 135, 0.2)'
                }}>
                  <Card.Header className="border-0 text-center" style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    borderRadius: '25px 25px 0 0',
                    padding: '25px'
                  }}>
                    <h4 className="mb-0 fw-bold">
                      <span style={{marginRight: '10px'}}>📋</span>
                      Uçuş Bilgileri
                    </h4>
                  </Card.Header>
                  <Card.Body className="p-4">
                    {/* Flight Number & Price */}
                    <Row className="mb-4">
                      <Col md={6}>
                        <div className="text-center p-3 rounded-4" style={{background: 'rgba(102, 126, 234, 0.1)'}}>
                          <h6 className="text-muted mb-2">
                            <span style={{marginRight: '8px'}}>🔢</span>
                            Uçuş Numarası
                          </h6>
                          <p className="fs-4 fw-bold text-primary mb-0">{flight.flight_id}</p>
                        </div>
                      </Col>
                      <Col md={6}>
                        <div className="text-center p-3 rounded-4" style={{background: 'rgba(40, 167, 69, 0.1)'}}>
                          <h6 className="text-muted mb-2">
                            <span style={{marginRight: '8px'}}>💰</span>
                            Fiyat
                          </h6>
                          <p className="fs-3 fw-bold text-success mb-0">{flight.price} ₺</p>
                        </div>
                      </Col>
                    </Row>
                    
                    {/* Route Information */}
                    <div className="route-info mb-4">
                      <Row>
                        <Col md={5} className="text-center">
                          <div className="city-info p-3 rounded-4" style={{background: 'rgba(102, 126, 234, 0.05)'}}>
                            <h5 className="fw-bold text-primary mb-2">
                              <span style={{marginRight: '8px'}}>🛫</span>
                              {flight.from_city.city_name}
                            </h5>
                            <div className="fs-2 fw-bold text-dark mb-1">
                              {formatTime(flight.departure_time)}
                            </div>
                            <div className="text-muted">
                              {formatDate(flight.departure_time)}
                            </div>
                          </div>
                        </Col>
                        
                        <Col md={2} className="d-flex align-items-center justify-content-center">
                          <div className="text-center">
                            <div className="text-muted small mb-2">
                              <span style={{marginRight: '5px'}}>⏱️</span>
                              {calculateDuration(flight.departure_time, flight.arrival_time)}
                            </div>
                            <div style={{fontSize: '2rem'}}>✈️</div>
                            <div className="text-muted small mt-2">
                              <span style={{marginRight: '5px'}}>🎯</span>
                              Direkt
                            </div>
                          </div>
                        </Col>
                        
                        <Col md={5} className="text-center">
                          <div className="city-info p-3 rounded-4" style={{background: 'rgba(40, 167, 69, 0.05)'}}>
                            <h5 className="fw-bold text-success mb-2">
                              <span style={{marginRight: '8px'}}>🛬</span>
                              {flight.to_city.city_name}
                            </h5>
                            <div className="fs-2 fw-bold text-dark mb-1">
                              {formatTime(flight.arrival_time)}
                            </div>
                            <div className="text-muted">
                              {formatDate(flight.arrival_time)}
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </div>
                    
                    {/* Seat Information */}
                    <div className="seat-info text-center">
                      <h6 className="text-muted mb-3">
                        <span style={{marginRight: '8px'}}>💺</span>
                        Koltuk Durumu
                      </h6>
                      <div className="d-flex justify-content-center align-items-center">
                        <Badge 
                          bg={getSeatStatus(flight.seats_available, flight.seats_total).variant}
                          className="rounded-pill px-4 py-3 fs-6"
                        >
                          <span style={{marginRight: '8px'}}>
                            {getSeatStatus(flight.seats_available, flight.seats_total).emoji}
                          </span>
                          {flight.seats_available} / {flight.seats_total} Koltuk Müsait
                        </Badge>
                      </div>
                    </div>

                    {/* Flight Features */}
                    <hr className="my-4" />
                    <div className="flight-features">
                      <h6 className="text-center text-muted mb-3">
                        <span style={{marginRight: '8px'}}>🎁</span>
                        Dahil Olan Hizmetler
                      </h6>
                      <Row className="text-center">
                        <Col xs={6} md={3} className="mb-3">
                          <div className="feature-item">
                            <div style={{fontSize: '1.5rem', marginBottom: '5px'}}>💼</div>
                            <small className="text-muted">20kg Bagaj</small>
                          </div>
                        </Col>
                        <Col xs={6} md={3} className="mb-3">
                          <div className="feature-item">
                            <div style={{fontSize: '1.5rem', marginBottom: '5px'}}>🍽️</div>
                            <small className="text-muted">İkram</small>
                          </div>
                        </Col>
                        <Col xs={6} md={3} className="mb-3">
                          <div className="feature-item">
                            <div style={{fontSize: '1.5rem', marginBottom: '5px'}}>📱</div>
                            <small className="text-muted">Online Check-in</small>
                          </div>
                        </Col>
                        <Col xs={6} md={3} className="mb-3">
                          <div className="feature-item">
                            <div style={{fontSize: '1.5rem', marginBottom: '5px'}}>🔄</div>
                            <small className="text-muted">Ücretsiz İptal</small>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
              
              {/* Passenger Information Card */}
              <Col lg={6}>
                <Card className="glass-card border-0 h-100" style={{
                  background: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(15px)',
                  borderRadius: '25px',
                  boxShadow: '0 20px 40px rgba(31, 38, 135, 0.2)'
                }}>
                  <Card.Header className="border-0 text-center" style={{
                    background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
                    color: 'white',
                    borderRadius: '25px 25px 0 0',
                    padding: '25px'
                  }}>
                    <h4 className="mb-0 fw-bold">
                      <span style={{marginRight: '10px'}}>👤</span>
                      Yolcu Bilgileri
                    </h4>
                  </Card.Header>
                  <Card.Body className="p-4">
                    {flight.seats_available === 0 ? (
                      <div className="text-center py-5">
                        <div style={{fontSize: '4rem', marginBottom: '20px'}}>😔</div>
                        <Message variant="danger">
                          <div className="text-center">
                            <h5 className="mb-3">Üzgünüz!</h5>
                            <p className="mb-0">Bu uçuşta müsait koltuk kalmamıştır.</p>
                          </div>
                        </Message>
                        <div className="mt-4">
                          <Button 
                            variant="outline-primary"
                            onClick={() => navigate('/')}
                            className="rounded-pill px-4"
                          >
                            <span style={{marginRight: '8px'}}>🔍</span>
                            Başka Uçuşlara Bak
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="text-center mb-4">
                          <div style={{fontSize: '3rem', marginBottom: '15px'}}>🎫</div>
                          <p className="text-muted">
                            Lütfen yolcu bilgilerinizi eksiksiz doldurun
                          </p>
                        </div>
                        
                        <Form onSubmit={submitHandler}>
                          <Form.Group className="mb-4" controlId="passengerName">
                            <Form.Label className="fw-semibold">
                              <span style={{marginRight: '8px'}}>👤</span>
                              Ad
                            </Form.Label>
                            <Form.Control 
                              type="text"
                              placeholder="Adınızı girin"
                              value={passengerName}
                              onChange={(e) => setPassengerName(e.target.value)}
                              required
                              style={{
                                borderRadius: '15px',
                                border: '2px solid #e9ecef',
                                padding: '15px',
                                fontSize: '1rem'
                              }}
                            />
                          </Form.Group>
                          
                          <Form.Group className="mb-4" controlId="passengerSurname">
                            <Form.Label className="fw-semibold">
                              <span style={{marginRight: '8px'}}>👤</span>
                              Soyad
                            </Form.Label>
                            <Form.Control 
                              type="text"
                              placeholder="Soyadınızı girin"
                              value={passengerSurname}
                              onChange={(e) => setPassengerSurname(e.target.value)}
                              required
                              style={{
                                borderRadius: '15px',
                                border: '2px solid #e9ecef',
                                padding: '15px',
                                fontSize: '1rem'
                              }}
                            />
                          </Form.Group>
                          
                          <Form.Group className="mb-4" controlId="passengerEmail">
                            <Form.Label className="fw-semibold">
                              <span style={{marginRight: '8px'}}>📧</span>
                              E-posta
                            </Form.Label>
                            <Form.Control 
                              type="email"
                              placeholder="E-posta adresinizi girin"
                              value={passengerEmail}
                              onChange={(e) => setPassengerEmail(e.target.value)}
                              required
                              style={{
                                borderRadius: '15px',
                                border: '2px solid #e9ecef',
                                padding: '15px',
                                fontSize: '1rem'
                              }}
                            />
                            <Form.Text className="text-muted">
                              <span style={{marginRight: '5px'}}>ℹ️</span>
                              Bilet bilgileriniz bu adrese gönderilecektir
                            </Form.Text>
                          </Form.Group>
                          
                          <div className="text-center">
                            <Button 
                              type="submit" 
                              size="lg"
                              disabled={bookingLoading}
                              style={{
                                background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
                                border: 'none',
                                borderRadius: '15px',
                                padding: '15px 40px',
                                fontSize: '1.1rem',
                                fontWeight: '600',
                                width: '100%',
                                boxShadow: '0 10px 25px rgba(17, 153, 142, 0.3)'
                              }}
                            >
                              {bookingLoading ? (
                                <>
                                  <span style={{marginRight: '10px'}}>⏳</span>
                                  İşleniyor...
                                </>
                              ) : (
                                <>
                                  <span style={{marginRight: '10px'}}>🎫</span>
                                  Bileti Rezerve Et
                                </>
                              )}
                            </Button>
                          </div>
                          
                          <div className="text-center mt-3">
                            <small className="text-muted">
                              <span style={{marginRight: '5px'}}>🔒</span>
                              Güvenli rezervasyon sistemi
                            </small>
                          </div>
                        </Form>
                      </>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </>
        )}
      </Container>
    </div>
  );
};

export default FlightDetailPage;