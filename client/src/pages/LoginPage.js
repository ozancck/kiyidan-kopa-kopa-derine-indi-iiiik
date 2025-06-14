import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col, Card, Alert } from 'react-bootstrap';
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
      setSuccess('Already logged in! Redirecting to dashboard...');
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
      setSuccess('✅ Login successful! Redirecting to dashboard...');
      
      setTimeout(() => {
        navigate('/admin/dashboard');
      }, 1000);
      
    } catch (error) {
      console.error('❌ Auto login error:', error);
      setError(error.response?.data?.message || 'Auto login failed');
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
      setSuccess('✅ Login successful! Redirecting to dashboard...');
      
      setTimeout(() => {
        navigate('/admin/dashboard');
      }, 1000);
      
    } catch (error) {
      console.error('❌ Manual login error:', error);
      setError(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Row className="justify-content-center">
      <Col md={6} lg={4}>
        <Card>
          <Card.Header className="text-center">
            <h3>Admin Login</h3>
          </Card.Header>
          <Card.Body>
            {error && (
              <Alert variant="danger" className="mb-3">
                {error}
              </Alert>
            )}
            
            {success && (
              <Alert variant="success" className="mb-3">
                {success}
              </Alert>
            )}
            
            {/* Quick Login Button */}
            <div className="mb-3 text-center">
              <Button 
                variant="success" 
                onClick={autoLogin}
                disabled={loading}
                className="w-100"
                size="lg"
              >
                {loading ? '⏳ Logging in...' : '🚀 Quick Login (Admin)'}
              </Button>
            </div>
            
            <hr />
            <p className="text-center text-muted mb-3">or login manually</p>
            
            <Form onSubmit={submitHandler}>
              <Form.Group className="mb-3" controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control 
                  type="text"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  disabled={loading}
                />
              </Form.Group>
              
              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control 
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                />
              </Form.Group>
              
              <Button 
                type="submit"
                variant="primary"
                className="w-100"
                disabled={loading}
              >
                {loading ? '⏳ Logging in...' : '📝 Manual Login'}
              </Button>
            </Form>
            
            <div className="mt-3 text-center">
              <small className="text-muted">
                Default: admin / admin123
              </small>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default LoginPage;