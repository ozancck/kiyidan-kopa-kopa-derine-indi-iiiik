import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Row, Col, Card, Button, Alert, Spinner, Container } from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getTicketById } from '../services/ticketService';
import { sendTicketEmail } from '../services/emailService';

const BookingConfirmationPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Email state'leri
  const [emailSending, setEmailSending] = useState(false);
  const [emailSuccess, setEmailSuccess] = useState(false);
  const [emailError, setEmailError] = useState('');
  
  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const data = await getTicketById(id);
        setTicket(data);
        setLoading(false);
      } catch (error) {
        setError('Rezervasyon detayları yüklenirken hata oluştu');
        setLoading(false);
      }
    };
    
    fetchTicket();
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
  
  // Email gönderme fonksiyonu
  const handleSendEmail = async () => {
    setEmailSending(true);
    setEmailError('');
    setEmailSuccess(false);
    
    try {
      await sendTicketEmail(ticket._id);
      setEmailSuccess(true);
      
      // 3 saniye sonra success mesajını gizle
      setTimeout(() => {
        setEmailSuccess(false);
      }, 3000);
      
    } catch (error) {
      setEmailError(error.message || 'E-posta gönderilirken hata oluştu');
    } finally {
      setEmailSending(false);
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
          <span style={{marginRight: '8px'}}>🏠</span>
          Ana Sayfaya Dön
        </Button>
        
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <>
            {/* Success Header */}
            <div className="text-center mb-5">
              <div style={{fontSize: '5rem', marginBottom: '20px'}} className="floating">🎉</div>
              <h1 className="text-white fw-bold mb-3">
                Tebrikler! Rezervasyonunuz Tamamlandı
              </h1>
              <p className="text-white opacity-75 fs-5">
                <span style={{marginRight: '8px'}}>✅</span>
                Biletiniz başarıyla rezerve edildi
              </p>
            </div>

            <Row className="justify-content-center">
              <Col lg={10} xl={8}>
                {/* Success Message */}
                <div className="ticket-confirmation mb-4">
                  <h3 className="mb-3">
                    <span style={{marginRight: '10px'}}>🎫</span>
                    Rezervasyon Başarıyla Oluşturuldu!
                  </h3>
                  <p className="mb-0 opacity-90">
                    Bilet detaylarınız aşağıda yer almaktadır. E-posta adresinize onay mesajı gönderebilirsiniz.
                  </p>
                </div>
                
                {/* Email Status Messages */}
                {emailSuccess && (
                  <Alert 
                    variant="success" 
                    className="d-flex align-items-center border-0 rounded-4 mb-4"
                    style={{
                      background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
                      color: 'white',
                      boxShadow: '0 10px 25px rgba(17, 153, 142, 0.3)'
                    }}
                  >
                    <span style={{marginRight: '10px', fontSize: '1.5rem'}}>📧</span>
                    E-bilet <strong>{ticket.passenger_email}</strong> adresine başarıyla gönderildi!
                  </Alert>
                )}
                
                {emailError && (
                  <Alert 
                    variant="danger" 
                    className="d-flex align-items-center border-0 rounded-4 mb-4"
                    style={{
                      background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)',
                      color: 'white',
                      boxShadow: '0 10px 25px rgba(255, 107, 107, 0.3)'
                    }}
                  >
                    <span style={{marginRight: '10px', fontSize: '1.5rem'}}>❌</span>
                    E-posta gönderilirken hata oluştu: {emailError}
                  </Alert>
                )}
                
                {/* Ticket Information Card */}
                <Card className="glass-card border-0 mb-4" style={{
                  background: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(15px)',
                  borderRadius: '25px',
                  boxShadow: '0 20px 40px rgba(31, 38, 135, 0.2)',
                  overflow: 'hidden'
                }}>
                  {/* Ticket Header */}
                  <div className="ticket-header text-center" style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    padding: '30px',
                    position: 'relative'
                  }}>
                    <div style={{
                      position: 'absolute',
                      top: '20px',
                      right: '30px',
                      fontSize: '3rem',
                      opacity: 0.2
                    }}>🎫</div>
                    <h3 className="mb-2 fw-bold">
                      <span style={{marginRight: '10px'}}>📋</span>
                      Rezervasyon Onayı
                    </h3>
                    <p className="mb-0 opacity-90">
                      Bilet ID: <strong>{ticket.ticket_id}</strong>
                    </p>
                  </div>

                  <Card.Body className="p-4">
                    {/* Passenger & Seat Info */}
                    <Row className="mb-4">
                      <Col md={4}>
                        <div className="info-box text-center p-3 rounded-4" style={{background: 'rgba(102, 126, 234, 0.1)'}}>
                          <h6 className="text-muted mb-2">
                            <span style={{marginRight: '8px'}}>👤</span>
                            Yolcu Adı
                          </h6>
                          <p className="fs-5 fw-bold text-primary mb-0">
                            {ticket.passenger_name} {ticket.passenger_surname}
                          </p>
                        </div>
                      </Col>
                      <Col md={4}>
                        <div className="info-box text-center p-3 rounded-4" style={{background: 'rgba(40, 167, 69, 0.1)'}}>
                          <h6 className="text-muted mb-2">
                            <span style={{marginRight: '8px'}}>📧</span>
                            E-posta
                          </h6>
                          <p className="fs-6 fw-semibold text-success mb-0">
                            {ticket.passenger_email}
                          </p>
                        </div>
                      </Col>
                      <Col md={4}>
                        <div className="info-box text-center p-3 rounded-4" style={{background: 'rgba(255, 193, 7, 0.1)'}}>
                          <h6 className="text-muted mb-2">
                            <span style={{marginRight: '8px'}}>💺</span>
                            Koltuk Numarası
                          </h6>
                          <p className="fs-5 fw-bold text-warning mb-0">
                            {ticket.seat_number || 'Atanmadı'}
                          </p>
                        </div>
                      </Col>
                    </Row>
                    
                    <hr style={{margin: '30px 0', opacity: 0.3}} />
                    
                    {/* Flight Details Header */}
                    <div className="text-center mb-4">
                      <h4 className="gradient-text fw-bold">
                        <span style={{marginRight: '10px'}}>✈️</span>
                        Uçuş Detayları
                      </h4>
                    </div>
                    
                    {/* Flight Number & Price */}
                    <Row className="mb-4">
                      <Col md={6}>
                        <div className="info-box text-center p-3 rounded-4" style={{background: 'rgba(102, 126, 234, 0.05)'}}>
                          <h6 className="text-muted mb-2">
                            <span style={{marginRight: '8px'}}>🔢</span>
                            Uçuş Numarası
                          </h6>
                          <p className="fs-4 fw-bold text-primary mb-0">
                            {ticket.flight_id.flight_id}
                          </p>
                        </div>
                      </Col>
                      <Col md={6}>
                        <div className="info-box text-center p-3 rounded-4" style={{background: 'rgba(40, 167, 69, 0.05)'}}>
                          <h6 className="text-muted mb-2">
                            <span style={{marginRight: '8px'}}>💰</span>
                            Ücret
                          </h6>
                          <p className="fs-3 fw-bold text-success mb-0">
                            {ticket.flight_id.price} ₺
                          </p>
                        </div>
                      </Col>
                    </Row>
                    
                    {/* Route Information */}
                    <Row className="mb-4">
                      <Col md={5}>
                        <div className="departure-info text-center p-4 rounded-4" style={{background: 'rgba(102, 126, 234, 0.05)'}}>
                          <h5 className="fw-bold text-primary mb-3">
                            <span style={{marginRight: '8px'}}>🛫</span>
                            {ticket.flight_id.from_city.city_name}
                          </h5>
                          <div className="fs-1 fw-bold text-dark mb-2">
                            {formatTime(ticket.flight_id.departure_time)}
                          </div>
                          <div className="text-muted">
                            {formatDate(ticket.flight_id.departure_time)}
                          </div>
                        </div>
                      </Col>
                      
                      <Col md={2} className="d-flex align-items-center justify-content-center">
                        <div className="text-center">
                          <div style={{fontSize: '3rem', marginBottom: '10px'}}>✈️</div>
                          <div className="text-muted small">
                            <span style={{marginRight: '5px'}}>🎯</span>
                            Direkt Uçuş
                          </div>
                        </div>
                      </Col>
                      
                      <Col md={5}>
                        <div className="arrival-info text-center p-4 rounded-4" style={{background: 'rgba(40, 167, 69, 0.05)'}}>
                          <h5 className="fw-bold text-success mb-3">
                            <span style={{marginRight: '8px'}}>🛬</span>
                            {ticket.flight_id.to_city.city_name}
                          </h5>
                          <div className="fs-1 fw-bold text-dark mb-2">
                            {formatTime(ticket.flight_id.arrival_time)}
                          </div>
                          <div className="text-muted">
                            {formatDate(ticket.flight_id.arrival_time)}
                          </div>
                        </div>
                      </Col>
                    </Row>
                    
                    {/* Booking Date */}
                    <div className="text-center">
                      <div className="booking-date p-3 rounded-4" style={{background: 'rgba(108, 117, 125, 0.1)'}}>
                        <h6 className="text-muted mb-2">
                          <span style={{marginRight: '8px'}}>📅</span>
                          Rezervasyon Tarihi
                        </h6>
                        <p className="fw-semibold mb-0">
                          {formatDate(ticket.booking_date)}
                        </p>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
                
                {/* Action Buttons */}
                <Row className="g-3">
                  <Col md={4}>
                    <Button 
                      variant="success" 
                      size="lg"
                      onClick={handleSendEmail}
                      disabled={emailSending}
                      className="w-100"
                      style={{
                        background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
                        border: 'none',
                        borderRadius: '15px',
                        padding: '15px',
                        fontWeight: '600',
                        boxShadow: '0 10px 25px rgba(17, 153, 142, 0.3)'
                      }}
                    >
                      {emailSending ? (
                        <>
                          <Spinner 
                            as="span" 
                            animation="border" 
                            size="sm" 
                            role="status" 
                            style={{marginRight: '10px'}}
                          />
                          Gönderiliyor...
                        </>
                      ) : (
                        <>
                          <span style={{marginRight: '8px', fontSize: '1.2rem'}}>📧</span>
                          E-bilet Gönder
                        </>
                      )}
                    </Button>
                  </Col>
                  
                  <Col md={4}>
                    <Button 
                      variant="primary" 
                      size="lg"
                      onClick={() => window.print()}
                      className="w-100"
                      style={{
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        border: 'none',
                        borderRadius: '15px',
                        padding: '15px',
                        fontWeight: '600',
                        boxShadow: '0 10px 25px rgba(102, 126, 234, 0.3)'
                      }}
                    >
                      <span style={{marginRight: '8px', fontSize: '1.2rem'}}>🖨️</span>
                      Bileti Yazdır
                    </Button>
                  </Col>
                  
                  <Col md={4}>
                    <Button 
                      variant="outline-light" 
                      size="lg"
                      onClick={() => navigate('/')}
                      className="w-100"
                      style={{
                        borderRadius: '15px',
                        padding: '15px',
                        fontWeight: '600',
                        borderColor: 'white',
                        color: 'white',
                        background: 'rgba(255, 255, 255, 0.1)',
                        backdropFilter: 'blur(10px)'
                      }}
                    >
                      <span style={{marginRight: '8px', fontSize: '1.2rem'}}>✈️</span>
                      Yeni Uçuş Ara
                    </Button>
                  </Col>
                </Row>

                {/* Additional Info */}
                <div className="mt-5">
                  <Row>
                    <Col md={6} className="mb-3">
                      <div className="info-card glass-card p-4 rounded-4 h-100">
                        <h5 className="text-white mb-3">
                          <span style={{marginRight: '8px'}}>ℹ️</span>
                          Önemli Bilgiler
                        </h5>
                        <ul className="list-unstyled text-white opacity-75">
                          <li className="mb-2">
                            <span style={{marginRight: '8px'}}>🕐</span>
                            Havalimanında 2 saat önceden bulunun
                          </li>
                          <li className="mb-2">
                            <span style={{marginRight: '8px'}}>🆔</span>
                            Kimlik belgenizi yanınızda bulundurun
                          </li>
                          <li className="mb-2">
                            <span style={{marginRight: '8px'}}>📱</span>
                            Mobil boarding pass kullanabilirsiniz
                          </li>
                          <li>
                            <span style={{marginRight: '8px'}}>💼</span>
                            20kg bagaj hakkınız mevcuttur
                          </li>
                        </ul>
                      </div>
                    </Col>
                    <Col md={6} className="mb-3">
                      <div className="info-card glass-card p-4 rounded-4 h-100">
                        <h5 className="text-white mb-3">
                          <span style={{marginRight: '8px'}}>📞</span>
                          Destek
                        </h5>
                        <ul className="list-unstyled text-white opacity-75">
                          <li className="mb-2">
                            <span style={{marginRight: '8px'}}>📞</span>
                            7/24 Müşteri Hizmetleri: 0850 123 45 67
                          </li>
                          <li className="mb-2">
                            <span style={{marginRight: '8px'}}>📧</span>
                            E-posta: destek@flyticket.com
                          </li>
                          <li className="mb-2">
                            <span style={{marginRight: '8px'}}>💬</span>
                            Canlı destek mevcut
                          </li>
                          <li>
                            <span style={{marginRight: '8px'}}>🔄</span>
                            24 saat ücretsiz iptal hakkı
                          </li>
                        </ul>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
          </>
        )}
      </Container>
    </div>
  );
};

export default BookingConfirmationPage;