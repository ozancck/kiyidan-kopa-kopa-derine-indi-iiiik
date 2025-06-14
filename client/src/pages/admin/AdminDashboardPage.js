import React, { useState, useEffect } from 'react';
import AdminSidebar from '../../components/AdminSidebar';
import { getFlights } from '../../services/flightService';
import { getTickets } from '../../services/ticketService';
// At the top of src/pages/admin/AdminDashboardPage.js
import { Container, Row, Col, Card, Table, Button } from 'react-bootstrap';

const AdminDashboardPage = () => {
  const [stats, setStats] = useState({
    totalFlights: 0,
    totalTickets: 0,
    totalRevenue: 0,
    availableSeats: 0
  });
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [flightsData, ticketsData] = await Promise.all([
          getFlights(),
          getTickets()
        ]);
        
        const totalRevenue = ticketsData.reduce((sum, ticket) => 
          sum + ticket.flight_id.price, 0
        );
        
        const availableSeats = flightsData.reduce((sum, flight) => 
          sum + flight.seats_available, 0
        );
        
        setStats({
          totalFlights: flightsData.length,
          totalTickets: ticketsData.length,
          totalRevenue,
          availableSeats
        });
        
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch stats:', error);
        setLoading(false);
      }
    };
    
    fetchStats();
  }, []);
  
  return (
    <Container fluid>
      <Row>
        <Col md={2} className="px-0">
          <AdminSidebar />
        </Col>
        
        <Col md={10}>
          <div className="p-4">
            <h2 className="mb-4">Admin Dashboard</h2>
            
            <Row>
              <Col md={3} className="mb-4">
                <Card className="text-center">
                  <Card.Body>
                    <Card.Title className="text-primary">
                      <i className="fas fa-plane fa-2x"></i>
                    </Card.Title>
                    <Card.Text>
                      <h4>{stats.totalFlights}</h4>
                      <small className="text-muted">Total Flights</small>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              
              <Col md={3} className="mb-4">
                <Card className="text-center">
                  <Card.Body>
                    <Card.Title className="text-success">
                      <i className="fas fa-ticket-alt fa-2x"></i>
                    </Card.Title>
                    <Card.Text>
                      <h4>{stats.totalTickets}</h4>
                      <small className="text-muted">Tickets Sold</small>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              
              <Col md={3} className="mb-4">
                <Card className="text-center">
                  <Card.Body>
                    <Card.Title className="text-warning">
                      <i className="fas fa-lira-sign fa-2x"></i>
                    </Card.Title>
                    <Card.Text>
                      <h4>{stats.totalRevenue} ₺</h4>
                      <small className="text-muted">Total Revenue</small>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              
              <Col md={3} className="mb-4">
                <Card className="text-center">
                  <Card.Body>
                    <Card.Title className="text-info">
                      <i className="fas fa-chair fa-2x"></i>
                    </Card.Title>
                    <Card.Text>
                      <h4>{stats.availableSeats}</h4>
                      <small className="text-muted">Available Seats</small>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            
            <Row>
              <Col>
                <Card>
                  <Card.Header>
                    <h5>Quick Actions</h5>
                  </Card.Header>
                  <Card.Body>
                    <Row>
                      <Col md={4} className="mb-3">
                        <Card className="h-100">
                          <Card.Body className="text-center">
                            <i className="fas fa-plus-circle fa-3x text-primary mb-3"></i>
                            <Card.Title>Add New Flight</Card.Title>
                            <Card.Text>Create a new flight route</Card.Text>
                            <Button 
                              variant="primary" 
                              href="/admin/flights/create"
                            >
                              Add Flight
                            </Button>
                          </Card.Body>
                        </Card>
                      </Col>
                      
                      <Col md={4} className="mb-3">
                        <Card className="h-100">
                          <Card.Body className="text-center">
                            <i className="fas fa-list fa-3x text-success mb-3"></i>
                            <Card.Title>Manage Flights</Card.Title>
                            <Card.Text>View and edit existing flights</Card.Text>
                            <Button 
                              variant="success" 
                              href="/admin/flights"
                            >
                              View Flights
                            </Button>
                          </Card.Body>
                        </Card>
                      </Col>
                      
                      <Col md={4} className="mb-3">
                        <Card className="h-100">
                          <Card.Body className="text-center">
                            <i className="fas fa-users fa-3x text-info mb-3"></i>
                            <Card.Title>View Bookings</Card.Title>
                            <Card.Text>See all ticket bookings</Card.Text>
                            <Button 
                              variant="info" 
                              href="/admin/tickets"
                            >
                              View Tickets
                            </Button>
                          </Card.Body>
                        </Card>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDashboardPage;