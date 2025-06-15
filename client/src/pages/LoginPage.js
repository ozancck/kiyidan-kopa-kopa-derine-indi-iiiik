import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col, Card, Alert, Container } from 'react-bootstrap';
import { login } from '../services/adminService';

const LoginPage = () => {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  
  const navigate = useNavigate();
  
  useEffect(() => {
    const adminInfo = localStorage.getItem('adminInfo');
    if (adminInfo) {
      setSuccess('Zaten giriş yapılmış! Dashboard\'a yönlendiriliyorsunuz...');
      setTimeout(() => {
        navigate('/admin/dashboard');
      }, 1000);
    }
  }, [navigate]);

  const autoLogin = async () => {
    try {
      setLoading(true);
      setError('');
      setSuccess('');
      
      console.log('🚀 Attempting auto login...');
      const data = await login('admin', 'admin123');
      
      localStorage.setItem('adminInfo', JSON.stringify(data));
      setSuccess('✅ Giriş başarılı! Dashboard\'a yönlendiriliyorsunuz...');
      
      setTimeout(() => {
        navigate('/admin/dashboard');
      }, 1000);
      
    } catch (error) {
      console.error('❌ Auto login error:', error);
      setError(error.response?.data?.message || 'Otomatik giriş başarısız');
    } finally {
      setLoading(false);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      setError('');
      setSuccess('');
      
      console.log('📝 Attempting manual login:', { username, password });
      const data = await login(username, password);
      
      localStorage.setItem('adminInfo', JSON.stringify(data));
      setSuccess('✅ Giriş başarılı! Dashboard\'a yönlendiriliyorsunuz...');
      
      setTimeout(() => {
        navigate('/admin/dashboard');
      }, 1000);
      
    } catch (error) {
      console.error('❌ Manual login error:', error);
      setError(error.response?.data?.message || 'Giriş başarısız');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      minHeight: '100vh',
      paddingTop: '80px',
      paddingBottom: '40px'
    }}>
      <Container>
        <Row className="justify-content-center">
          <Col md={6} lg={4}>
            {/* Header */}
            <div className="text-center mb-5">
              <div style={{fontSize: '4rem', marginBottom: '20px'}} className="floating">🔐</div>
              <h1 className="text-white fw-bold mb-3">Admin Girişi</h1>
              <p className="text-white opacity-75">
                <span style={{marginRight: '8px'}}>👨‍💼</span>
                Yönetim paneline erişim
              </p>
            </div>

            <Card className="glass-card border-0" style={{
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(15px)',
              borderRadius: '25px',
              boxShadow: '0 20px 40px rgba(31, 38, 135, 0.2)',
              overflow: 'hidden'
            }}>
              <Card.Header className="border-0 text-center" style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                padding: '25px'
              }}>
                <h3 className="mb-0 fw-bold">
                  <span style={{marginRight: '10px'}}>🛡️</span>
                  Admin Paneli
                </h3>
              </Card.Header>
              <Card.Body className="p-4">
                {error && (
                  <Alert 
                    variant="danger" 
                    className="border-0 rounded-4 mb-4"
                    style={{
                      background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)',
                      color: 'white',
                      border: 'none'
                    }}
                  >
                    <div className="d-flex align-items-center">
                      <span style={{marginRight: '10px', fontSize: '1.5rem'}}>❌</span>
                      {error}
                    </div>
                  </Alert>
                )}
                
                {success && (
                  <Alert 
                    variant="success" 
                    className="border-0 rounded-4 mb-4"
                    style={{
                      background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
                      color: 'white',
                      border: 'none'
                    }}
                  >
                    <div className="d-flex align-items-center">
                      <span style={{marginRight: '10px', fontSize: '1.5rem'}}>✅</span>
                      {success}
                    </div>
                  </Alert>
                )}
                
                {/* Quick Login Button */}
                <div className="mb-4 text-center">
                  <Button 
                    onClick={autoLogin}
                    disabled={loading}
                    size="lg"
                    className="w-100"
                    style={{
                      background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
                      border: 'none',
                      borderRadius: '15px',
                      padding: '15px',
                      fontWeight: '600',
                      fontSize: '1.1rem',
                      boxShadow: '0 10px 25px rgba(17, 153, 142, 0.3)'
                    }}
                  >
                    {loading ? (
                      <>
                        <span style={{marginRight: '10px'}}>⏳</span>
                        Giriş yapılıyor...
                      </>
                    ) : (
                      <>
                        <span style={{marginRight: '10px', fontSize: '1.3rem'}}>🚀</span>
                        Hızlı Giriş (Admin)
                      </>
                    )}
                  </Button>
                </div>
                
                <div className="text-center my-4">
                  <hr style={{margin: '20px 0', opacity: 0.3}} />
                  <small className="text-muted bg-white px-3" style={{position: 'relative', top: '-12px'}}>
                    <span style={{marginRight: '5px'}}>🔀</span>
                    veya manuel giriş yapın
                  </small>
                </div>
                
                <Form onSubmit={submitHandler}>
                  <Form.Group className="mb-4" controlId="username">
                    <Form.Label className="fw-semibold">
                      <span style={{marginRight: '8px'}}>👤</span>
                      Kullanıcı Adı
                    </Form.Label>
                    <Form.Control 
                      type="text"
                      placeholder="Kullanıcı adınızı girin"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      disabled={loading}
                      style={{
                        borderRadius: '15px',
                        border: '2px solid #e9ecef',
                        padding: '15px',
                        fontSize: '1rem',
                        background: loading ? '#f8f9fa' : 'white'
                      }}
                    />
                  </Form.Group>
                  
                  <Form.Group className="mb-4" controlId="password">
                    <Form.Label className="fw-semibold">
                      <span style={{marginRight: '8px'}}>🔒</span>
                      Şifre
                    </Form.Label>
                    <Form.Control 
                      type="password"
                      placeholder="Şifrenizi girin"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      disabled={loading}
                      style={{
                        borderRadius: '15px',
                        border: '2px solid #e9ecef',
                        padding: '15px',
                        fontSize: '1rem',
                        background: loading ? '#f8f9fa' : 'white'
                      }}
                    />
                  </Form.Group>
                  
                  <Button 
                    type="submit"
                    size="lg"
                    className="w-100"
                    disabled={loading}
                    style={{
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      border: 'none',
                      borderRadius: '15px',
                      padding: '15px',
                      fontWeight: '600',
                      fontSize: '1.1rem',
                      boxShadow: '0 10px 25px rgba(102, 126, 234, 0.3)'
                    }}
                  >
                    {loading ? (
                      <>
                        <span style={{marginRight: '10px'}}>⏳</span>
                        Giriş yapılıyor...
                      </>
                    ) : (
                      <>
                        <span style={{marginRight: '10px', fontSize: '1.3rem'}}>📝</span>
                        Manuel Giriş
                      </>
                    )}
                  </Button>
                </Form>
                
                <div className="mt-4 text-center">
                  <div className="p-3 rounded-4" style={{background: 'rgba(102, 126, 234, 0.1)'}}>
                    <small className="text-muted">
                      <span style={{marginRight: '5px'}}>💡</span>
                      <strong>Varsayılan:</strong> admin / admin123
                    </small>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="row text-center">
                    <div className="col-4">
                      <div style={{fontSize: '1.5rem', marginBottom: '5px'}}>🛡️</div>
                      <small className="text-muted">Güvenli</small>
                    </div>
                    <div className="col-4">
                      <div style={{fontSize: '1.5rem', marginBottom: '5px'}}>⚡</div>
                      <small className="text-muted">Hızlı</small>
                    </div>
                    <div className="col-4">
                      <div style={{fontSize: '1.5rem', marginBottom: '5px'}}>🎯</div>
                      <small className="text-muted">Kolay</small>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>

            {/* Back to Home Button */}
            <div className="text-center mt-4">
              <Button 
                variant="outline-light"
                onClick={() => navigate('/')}
                style={{
                  borderRadius: '15px',
                  padding: '12px 25px',
                  fontWeight: '600',
                  borderColor: 'white',
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)'
                }}
              >
                <span style={{marginRight: '8px'}}>🏠</span>
                Ana Sayfaya Dön
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LoginPage;