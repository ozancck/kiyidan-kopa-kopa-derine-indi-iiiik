import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { adminLogin } from '../services/adminService';
import FormContainer from '../components/FormContainer';

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await adminLogin(formData.email, formData.password);
      localStorage.setItem('adminInfo', JSON.stringify(response));
      navigate('/admin/dashboard');
    } catch (error) {
      setError('Giriş başarısız. E-posta veya şifrenizi kontrol edin.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <FormContainer 
        title="Admin Girişi" 
        subtitle="Yönetim paneline erişmek için giriş yapın"
        maxWidth="sm"
      >
        {error && (
          <Alert variant="danger" className="mb-4">
            {error}
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-4">
            <Form.Label style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-2)',
              fontSize: 'var(--font-size-sm)',
              fontWeight: 'var(--font-weight-semibold)',
              color: 'var(--gray-800)',
              marginBottom: 'var(--space-2)'
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" fill="currentColor"/>
              </svg>
              E-posta Adresi
            </Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="admin@skyvoyage.com"
              required
              disabled={loading}
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-2)',
              fontSize: 'var(--font-size-sm)',
              fontWeight: 'var(--font-weight-semibold)',
              color: 'var(--gray-800)',
              marginBottom: 'var(--space-2)'
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" fill="currentColor"/>
              </svg>
              Şifre
            </Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
              disabled={loading}
            />
          </Form.Group>

          <div className="d-grid">
            <Button 
              type="submit" 
              variant="primary" 
              size="lg"
              disabled={loading}
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
                  <div className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></div>
                  Giriş yapılıyor...
                </>
              ) : (
                <>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" fill="currentColor"/>
                  </svg>
                  Giriş Yap
                </>
              )}
            </Button>
          </div>
        </Form>

        <div style={{
          textAlign: 'center',
          marginTop: 'var(--space-6)',
          padding: 'var(--space-4)',
          background: 'rgba(99, 102, 241, 0.05)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid rgba(99, 102, 241, 0.1)'
        }}>
          <small style={{
            color: 'var(--gray-600)',
            fontSize: 'var(--font-size-sm)'
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: 'var(--space-2)' }}>
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="currentColor"/>
            </svg>
            Sadece yetkili personel erişebilir
          </small>
        </div>
      </FormContainer>
    </Container>
  );
};

export default LoginPage;
