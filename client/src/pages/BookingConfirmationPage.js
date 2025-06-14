import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { createTicket } from '../services/ticketService';
import Message from '../components/Message';

const BookingConfirmationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [bookingData, setBookingData] = useState({
    passengerName: '',
    passengerEmail: '',
    passengerPhone: '',
    emergencyContact: '',
    specialRequests: ''
  });

  const { flight, selectedSeats, totalPrice } = location.state || {};

  useEffect(() => {
    if (!flight || !selectedSeats || selectedSeats.length === 0) {
      navigate('/');
    }
  }, [flight, selectedSeats, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const ticketData = {
        flight: flight._id,
        passengerName: bookingData.passengerName,
        passengerEmail: bookingData.passengerEmail,
        passengerPhone: bookingData.passengerPhone,
        seatNumbers: selectedSeats,
        totalPrice: totalPrice,
        emergencyContact: bookingData.emergencyContact,
        specialRequests: bookingData.specialRequests
      };

      await createTicket(ticketData);
      setSuccess(true);
      setLoading(false);
    } catch (error) {
      setError('Rezervasyon oluşturulurken bir hata oluştu. Lütfen tekrar deneyin.');
      setLoading(false);
    }
  };

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString('tr-TR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('tr-TR', { 
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      weekday: 'long'
    });
  };

  if (!flight) {
    return null;
  }

  if (success) {
    return (
      <Container className="py-5">
        <div style={{
          minHeight: '60vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center'
        }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            borderRadius: 'var(--radius-2xl)',
            padding: 'var(--space-12)',
            boxShadow: 'var(--shadow-xl)',
            maxWidth: '500px',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              content: '',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '4px',
              background: 'linear-gradient(90deg, var(--success-500), var(--success-600))',
              borderRadius: 'var(--radius-2xl) var(--radius-2xl) 0 0'
            }}></div>
            
            <div style={{
              color: 'var(--success-500)',
              marginBottom: 'var(--space-6)',
              animation: 'successPulse 2s ease-in-out infinite'
            }}>
              <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" fill="currentColor"/>
              </svg>
            </div>
            
            <h1 style={{
              fontSize: 'var(--font-size-3xl)',
              fontWeight: 'var(--font-weight-extrabold)',
              color: 'var(--gray-900)',
              marginBottom: 'var(--space-4)'
            }}>
              Rezervasyonunuz Tamamlandı!
            </h1>
            
            <p style={{
              fontSize: 'var(--font-size-lg)',
              color: 'var(--gray-600)',
              marginBottom: 'var(--space-8)',
              lineHeight: 'var(--line-height-relaxed)'
            }}>
              Bilet bilgileriniz e-posta adresinize gönderilmiştir.
              <br />
              İyi uçuşlar dileriz!
            </p>
            
            <div style={{
              display: 'flex',
              gap: 'var(--space-4)',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <Button variant="primary" size="lg" onClick={() => navigate('/')}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" fill="currentColor"/>
                </svg>
                Ana Sayfaya Dön
              </Button>
              <Button variant="outline-primary" size="lg" onClick={() => window.print()}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 8H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zm-3 11H8v-5h8v5zm3-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-1-9H6v4h12V3z" fill="currentColor"/>
                </svg>
                Bileti Yazdır
              </Button>
            </div>
          </div>
        </div>
      </Container>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      padding: 'var(--space-8) 0 var(--space-12)'
    }}>
      <Container>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-6)',
          marginBottom: 'var(--space-8)',
          flexWrap: 'wrap'
        }}>
          <Button 
            variant="outline-primary" 
            onClick={() => navigate(-1)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-2)',
              minHeight: '44px'
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" fill="currentColor"/>
            </svg>
            Geri Dön
          </Button>
          <div style={{ flex: 1 }}>
            <h1 style={{
              fontSize: 'var(--font-size-3xl)',
              fontWeight: 'var(--font-weight-bold)',
              color: 'var(--gray-900)',
              margin: '0 0 var(--space-2) 0'
            }}>
              Rezervasyon Onayı
            </h1>
            <p style={{
              color: 'var(--gray-600)',
              fontSize: 'var(--font-size-lg)',
              margin: 0
            }}>
              Bilgilerinizi kontrol edin ve rezervasyonunuzu tamamlayın
            </p>
          </div>
        </div>

        {error && (
          <Message variant="danger" dismissible onClose={() => setError('')}>
            {error}
          </Message>
        )}

        <Row className="g-4">
          <Col lg={8}>
            <Card style={{
              border: 'none',
              borderRadius: 'var(--radius-xl)',
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(20px)',
              boxShadow: 'var(--shadow-lg)',
              marginBottom: 'var(--space-6)'
            }}>
              <div style={{
                background: 'rgba(99, 102, 241, 0.05)',
                borderBottom: '1px solid rgba(99, 102, 241, 0.1)',
                padding: 'var(--space-6)',
                borderRadius: 'var(--radius-xl) var(--radius-xl) 0 0'
              }}>
                <h3 style={{
                  margin: 0,
                  fontSize: 'var(--font-size-xl)',
                  fontWeight: 'var(--font-weight-bold)',
                  color: 'var(--gray-900)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-3)'
                }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 6.5V7.5C15 8.3 14.3 9 13.5 9S12 8.3 12 7.5V6L10.5 6.5V7.5C10.5 8.3 9.8 9 9 9S7.5 8.3 7.5 7.5V6.5L2 7V9C2 10.1 2.9 11 4 11V19C4 20.1 4.9 21 6 21H18C19.1 21 20 20.1 20 19V11C21.1 11 22 10.1 22 9H21Z" fill="currentColor"/>
                  </svg>
                  Yolcu Bilgileri
                </h3>
              </div>
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  <Row className="g-4">
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 'var(--space-2)',
                          fontSize: 'var(--font-size-sm)',
                          fontWeight: 'var(--font-weight-semibold)',
                          color: 'var(--gray-800)',
                          marginBottom: 'var(--space-2)'
                        }}>
                          Ad Soyad *
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="passengerName"
                          value={bookingData.passengerName}
                          onChange={handleInputChange}
                          placeholder="Ad ve soyadınızı girin"
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 'var(--space-2)',
                          fontSize: 'var(--font-size-sm)',
                          fontWeight: 'var(--font-weight-semibold)',
                          color: 'var(--gray-800)',
                          marginBottom: 'var(--space-2)'
                        }}>
                          E-posta *
                        </Form.Label>
                        <Form.Control
                          type="email"
                          name="passengerEmail"
                          value={bookingData.passengerEmail}
                          onChange={handleInputChange}
                          placeholder="ornek@email.com"
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 'var(--space-2)',
                          fontSize: 'var(--font-size-sm)',
                          fontWeight: 'var(--font-weight-semibold)',
                          color: 'var(--gray-800)',
                          marginBottom: 'var(--space-2)'
                        }}>
                          Telefon *
                        </Form.Label>
                        <Form.Control
                          type="tel"
                          name="passengerPhone"
                          value={bookingData.passengerPhone}
                          onChange={handleInputChange}
                          placeholder="+90 5xx xxx xx xx"
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 'var(--space-2)',
                          fontSize: 'var(--font-size-sm)',
                          fontWeight: 'var(--font-weight-semibold)',
                          color: 'var(--gray-800)',
                          marginBottom: 'var(--space-2)'
                        }}>
                          Acil Durum İletişim
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="emergencyContact"
                          value={bookingData.emergencyContact}
                          onChange={handleInputChange}
                          placeholder="Acil durum için iletişim bilgisi"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={12}>
                      <Form.Group>
                        <Form.Label style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 'var(--space-2)',
                          fontSize: 'var(--font-size-sm)',
                          fontWeight: 'var(--font-weight-semibold)',
                          color: 'var(--gray-800)',
                          marginBottom: 'var(--space-2)'
                        }}>
                          Özel İstekler
                        </Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={3}
                          name="specialRequests"
                          value={bookingData.specialRequests}
                          onChange={handleInputChange}
                          placeholder="Özel yemek, engelli erişimi vb. isteklerinizi belirtin"
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                </Form>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={4}>
            <div style={{ position: 'sticky', top: 'var(--space-8)' }}>
              <Card style={{
                border: 'none',
                borderRadius: 'var(--radius-xl)',
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(20px)',
                boxShadow: 'var(--shadow-lg)'
              }}>
                <div style={{
                  background: 'rgba(99, 102, 241, 0.05)',
                  borderBottom: '1px solid rgba(99, 102, 241, 0.1)',
                  padding: 'var(--space-6)',
                  borderRadius: 'var(--radius-xl) var(--radius-xl) 0 0'
                }}>
                  <h3 style={{
                    margin: 0,
                    fontSize: 'var(--font-size-xl)',
                    fontWeight: 'var(--font-weight-bold)',
                    color: 'var(--gray-900)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--space-3)'
                  }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" fill="currentColor"/>
                    </svg>
                    Uçuş Özeti
                  </h3>
                </div>
                <Card.Body>
                  <div style={{
                    background: 'rgba(99, 102, 241, 0.05)',
                    borderRadius: 'var(--radius-lg)',
                    padding: 'var(--space-6)',
                    marginBottom: 'var(--space-6)',
                    textAlign: 'center'
                  }}>
                    <div style={{ marginBottom: 'var(--space-4)' }}>
                      <div style={{
                        fontSize: 'var(--font-size-lg)',
                        fontWeight: 'var(--font-weight-bold)',
                        color: 'var(--gray-900)'
                      }}>
                        {flight.from_city?.city_name} → {flight.to_city?.city_name}
                      </div>
                      <div style={{
                        fontSize: 'var(--font-size-sm)',
                        color: 'var(--gray-600)',
                        marginTop: 'var(--space-1)'
                      }}>
                        {formatDate(flight.departure_time)}
                      </div>
                    </div>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <div style={{ textAlign: 'center' }}>
                        <div style={{
                          fontSize: 'var(--font-size-xs)',
                          color: 'var(--gray-500)',
                          fontWeight: 'var(--font-weight-medium)'
                        }}>Kalkış</div>
                        <div style={{
                          fontSize: 'var(--font-size-lg)',
                          fontWeight: 'var(--font-weight-bold)',
                          color: 'var(--primary-700)'
                        }}>{formatTime(flight.departure_time)}</div>
                      </div>
                      <div style={{ color: 'var(--primary-500)' }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" fill="currentColor"/>
                        </svg>
                      </div>
                      <div style={{ textAlign: 'center' }}>
                        <div style={{
                          fontSize: 'var(--font-size-xs)',
                          color: 'var(--gray-500)',
                          fontWeight: 'var(--font-weight-medium)'
                        }}>Varış</div>
                        <div style={{
                          fontSize: 'var(--font-size-lg)',
                          fontWeight: 'var(--font-weight-bold)',
                          color: 'var(--primary-700)'
                        }}>{formatTime(flight.arrival_time)}</div>
                      </div>
                    </div>
                  </div>

                  <div style={{ marginBottom: 'var(--space-6)' }}>
                    <h5 style={{
                      fontSize: 'var(--font-size-base)',
                      fontWeight: 'var(--font-weight-bold)',
                      color: 'var(--gray-900)',
                      marginBottom: 'var(--space-3)'
                    }}>Seçilen Koltuklar</h5>
                    <div style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: 'var(--space-2)'
                    }}>
                      {selectedSeats.map(seat => (
                        <div key={seat} style={{
                          background: 'var(--primary-100)',
                          border: '1px solid var(--primary-200)',
                          borderRadius: 'var(--radius-md)',
                          padding: 'var(--space-2) var(--space-3)'
                        }}>
                          <span style={{
                            fontSize: 'var(--font-size-sm)',
                            fontWeight: 'var(--font-weight-bold)',
                            color: 'var(--primary-700)'
                          }}>{seat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={{ marginBottom: 'var(--space-6)' }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: 'var(--space-3) 0',
                      fontSize: 'var(--font-size-base)'
                    }}>
                      <span>Bilet Fiyatı</span>
                      <span>₺{flight.price.toLocaleString('tr-TR')}</span>
                    </div>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: 'var(--space-3) 0',
                      fontSize: 'var(--font-size-base)'
                    }}>
                      <span>Koltuk Sayısı</span>
                      <span>{selectedSeats.length}</span>
                    </div>
                    <hr />
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: 'var(--space-3) 0',
                      fontSize: 'var(--font-size-lg)',
                      fontWeight: 'var(--font-weight-bold)',
                      color: 'var(--gray-900)'
                    }}>
                      <span>Toplam Tutar</span>
                      <span style={{
                        color: 'var(--primary-600)',
                        fontSize: 'var(--font-size-2xl)'
                      }}>₺{totalPrice.toLocaleString('tr-TR')}</span>
                    </div>
                  </div>

                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'var(--space-4)'
                  }}>
                    <Button 
                      variant="primary" 
                      size="lg" 
                      className="w-100"
                      onClick={handleSubmit}
                      disabled={loading || !bookingData.passengerName || !bookingData.passengerEmail || !bookingData.passengerPhone}
                      style={{
                        minHeight: '48px',
                        fontWeight: 'var(--font-weight-semibold)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 'var(--space-2)'
                      }}
                    >
                      {loading ? (
                        <>
                          <div className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></div>
                          Rezervasyon Yapılıyor...
                        </>
                      ) : (
                        <>
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" fill="currentColor"/>
                          </svg>
                          Rezervasyonu Onayla
                        </>
                      )}
                    </Button>
                    
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--space-2)',
                      fontSize: 'var(--font-size-sm)',
                      color: 'var(--gray-600)',
                      textAlign: 'center',
                      justifyContent: 'center'
                    }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="currentColor"/>
                      </svg>
                      <span>Güvenli ödeme sistemi ile korunuyorsunuz</span>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default BookingConfirmationPage;
