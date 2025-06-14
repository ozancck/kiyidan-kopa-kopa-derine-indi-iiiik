import React, { useState, useEffect } from 'react';
import { Row, Col, Container, Table, Card, Badge } from 'react-bootstrap';
import AdminSidebar from '../../components/AdminSidebar';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { getTickets } from '../../services/ticketService';

const AdminTicketListPage = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const data = await getTickets();
        setTickets(data);
        setLoading(false);
      } catch (error) {
        setError('Failed to load tickets');
        setLoading(false);
      }
    };
    
    fetchTickets();
  }, []);
  
  const formatDate = (dateString) => {
    const options = { 
      hour: 'numeric', 
      minute: 'numeric',
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  const getFlightStatus = (departureTime) => {
    const now = new Date();
    const departure = new Date(departureTime);
    
    if (departure < now) {
      return <Badge bg="secondary">Completed</Badge>;
    } else if (departure - now < 24 * 60 * 60 * 1000) { // Within 24 hours
      return <Badge bg="warning">Upcoming</Badge>;
    } else {
      return <Badge bg="success">Scheduled</Badge>;
    }
  };
  
  return (
    <Container fluid>
      <Row>
        <Col md={2} className="px-0">
          <AdminSidebar />
        </Col>
        
        <Col md={10}>
          <div className="p-4">
            <h2 className="mb-4">Ticket Bookings</h2>
            
            {loading ? (
              <Loader />
            ) : error ? (
              <Message variant="danger">{error}</Message>
            ) : (
              <Card>
                <Card.Body>
                  {tickets.length === 0 ? (
                    <Message>No tickets found.</Message>
                  ) : (
                    <>
                      <div className="mb-3">
                        <p className="text-muted">
                          Total Bookings: <strong>{tickets.length}</strong>
                          {' | '}
                          Total Revenue: <strong>
                            {tickets.reduce((sum, ticket) => sum + ticket.flight_id.price, 0)} ₺
                          </strong>
                        </p>
                      </div>
                      
                      <Table striped bordered hover responsive>
                        <thead>
                          <tr>
                            <th>Ticket ID</th>
                            <th>Passenger</th>
                            <th>Email</th>
                            <th>Flight</th>
                            <th>Route</th>
                            <th>Departure</th>
                            <th>Seat</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Booked Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          {tickets.map((ticket) => (
                            <tr key={ticket._id}>
                              <td>
                                <strong>{ticket.ticket_id}</strong>
                              </td>
                              <td>
                                {ticket.passenger_name} {ticket.passenger_surname}
                              </td>
                              <td>{ticket.passenger_email}</td>
                              <td>{ticket.flight_id.flight_id}</td>
                              <td>
                                {ticket.flight_id.from_city.city_name} → {ticket.flight_id.to_city.city_name}
                              </td>
                              <td>{formatDate(ticket.flight_id.departure_time)}</td>
                              <td>
                                <Badge bg="light" text="dark">
                                  {ticket.seat_number}
                                </Badge>
                              </td>
                              <td>
                                <strong>{ticket.flight_id.price} ₺</strong>
                              </td>
                              <td>
                                {getFlightStatus(ticket.flight_id.departure_time)}
                              </td>
                              <td>{formatDate(ticket.booking_date)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </>
                  )}
                </Card.Body>
              </Card>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminTicketListPage;