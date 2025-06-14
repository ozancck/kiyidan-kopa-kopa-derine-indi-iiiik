import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getFlights } from '../../services/flightService';
import { getTickets } from '../../services/ticketService';

const AdminDashboardPage = () => {
  const [stats, setStats] = useState({
    totalFlights: 0,
    totalBookings: 0,
    totalRevenue: 0,
    recentBookings: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [flightsData, ticketsData] = await Promise.all([
        getFlights(),
        getTickets()
      ]);

      const totalRevenue = ticketsData.reduce((sum, ticket) => sum + ticket.totalPrice, 0);
      
      setStats({
        totalFlights: flightsData.length,
        totalBookings: ticketsData.length,
        totalRevenue,
        recentBookings: ticketsData.slice(0, 5)
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY'
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('tr-TR');
  };

  if (loading) {
    return (
      <Container className="py-5">
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Yükleniyor...</span>
          </div>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Admin Dashboard</h1>
        <Link to="/admin/flights/create">
          <Button variant="primary">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" fill="currentColor"/>
            </svg>
            Yeni Uçuş
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <Row className="g-4 mb-5">
        <Col md={3}>
          <Card className="h-100" style={{ 
            border: 'none', 
            borderRadius: 'var(--radius-xl)',
            background: 'linear-gradient(135deg, var(--primary-500), var(--primary-600))',
            color: 'white'
          }}>
            <Card.Body className="text-center">
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✈️</div>
              <h3>{stats.totalFlights}</h3>
              <p className="mb-0">Toplam Uçuş</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="h-100" style={{ 
            border: 'none', 
            borderRadius: 'var(--radius-xl)',
            background: 'linear-gradient(135deg, var(--success-500), var(--success-600))',
            color: 'white'
          }}>
            <Card.Body className="text-center">
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎫</div>
              <h3>{stats.totalBookings}</h3>
              <p className="mb-0">Rezervasyon</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="h-100" style={{ 
            border: 'none', 
            borderRadius: 'var(--radius-xl)',
            background: 'linear-gradient(135deg, var(--warning-500), var(--warning-600))',
            color: 'white'
          }}>
            <Card.Body className="text-center">
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>💰</div>
              <h3>{formatCurrency(stats.totalRevenue)}</h3>
              <p className="mb-0">Toplam Gelir</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="h-100" style={{ 
            border: 'none', 
            borderRadius: 'var(--radius-xl)',
            background: 'linear-gradient(135deg, var(--secondary-500), var(--secondary-600))',
            color: 'white'
          }}>
            <Card.Body className="text-center">
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📊</div>
              <h3>%{stats.totalBookings > 0 ? ((stats.totalRevenue / stats.totalBookings) / 500 * 100).toFixed(1) : 0}</h3>
              <p className="mb-0">Doluluk Oranı</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Quick Actions */}
      <Row className="g-4 mb-5">
        <Col md={6}>
          <Card style={{ border: 'none', borderRadius: 'var(--radius-xl)' }}>
            <Card.Header style={{ 
              background: 'rgba(99, 102, 241, 0.05)',
              borderBottom: '1px solid rgba(99, 102, 241, 0.1)',
              borderRadius: 'var(--radius-xl) var(--radius-xl) 0 0'
            }}>
              <h5 className="mb-0">Hızlı İşlemler</h5>
            </Card.Header>
            <Card.Body>
              <div className="d-grid gap-3">
                <Link to="/admin/flights" className="text-decoration-none">
                  <Button variant="outline-primary" className="w-100 text-start">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="me-2">
                      <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" fill="currentColor"/>
                    </svg>
                    Uçuşları Yönet
                  </Button>
                </Link>
                <Link to="/admin/tickets" className="text-decoration-none">
                  <Button variant="outline-success" className="w-100 text-start">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="me-2">
                      <path d="M22 10V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v4c1.1 0 2 .9 2 2s-.9 2-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4c-1.1 0-2-.9-2-2s.9-2 2-2z" fill="currentColor"/>
                    </svg>
                    Rezervasyonları Görüntüle
                  </Button>
                </Link>
                <Link to="/admin/flights/create" className="text-decoration-none">
                  <Button variant="outline-warning" className="w-100 text-start">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="me-2">
                      <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" fill="currentColor"/>
                    </svg>
                    Yeni Uçuş Ekle
                  </Button>
                </Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={6}>
          <Card style={{ border: 'none', borderRadius: 'var(--radius-xl)' }}>
            <Card.Header style={{ 
              background: 'rgba(99, 102, 241, 0.05)',
              borderBottom: '1px solid rgba(99, 102, 241, 0.1)',
              borderRadius: 'var(--radius-xl) var(--radius-xl) 0 0'
            }}>
              <h5 className="mb-0">Son Rezervasyonlar</h5>
            </Card.Header>
            <Card.Body>
              {stats.recentBookings.length > 0 ? (
                <Table responsive className="mb-0">
                  <thead>
                    <tr>
                      <th>Yolcu</th>
                      <th>Tutar</th>
                      <th>Tarih</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.recentBookings.map((booking, index) => (
                      <tr key={index}>
                        <td>{booking.passengerName}</td>
                        <td>{formatCurrency(booking.totalPrice)}</td>
                        <td>{formatDate(booking.createdAt)}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <div className="text-center text-muted py-3">
                  <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>📝</div>
                  <p>Henüz rezervasyon bulunmuyor</p>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDashboardPage;
