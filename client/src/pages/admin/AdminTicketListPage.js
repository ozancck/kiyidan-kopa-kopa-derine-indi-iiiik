import React, { useState, useEffect } from 'react';
import { Container, Table, Badge } from 'react-bootstrap';
import { getTickets } from '../../services/ticketService';

const AdminTicketListPage = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const data = await getTickets();
      setTickets(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('tr-TR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
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
        <h1>Rezervasyon Yönetimi</h1>
        <Badge bg="primary" className="fs-6">
          Toplam: {tickets.length} rezervasyon
        </Badge>
      </div>

      <Table responsive striped>
        <thead>
          <tr>
            <th>Yolcu Adı</th>
            <th>E-posta</th>
            <th>Telefon</th>
            <th>Koltuklar</th>
            <th>Tutar</th>
            <th>Tarih</th>
            <th>Durum</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <tr key={ticket._id}>
              <td><strong>{ticket.passengerName}</strong></td>
              <td>{ticket.passengerEmail}</td>
              <td>{ticket.passengerPhone}</td>
              <td>
                <Badge bg="secondary">
                  {ticket.seatNumbers?.join(', ') || 'N/A'}
                </Badge>
              </td>
              <td>₺{ticket.totalPrice?.toLocaleString('tr-TR')}</td>
              <td>{formatDate(ticket.createdAt)}</td>
              <td>
                <Badge bg="success">Onaylandı</Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {tickets.length === 0 && (
        <div className="text-center py-5">
          <h4>Henüz rezervasyon bulunmuyor</h4>
          <p>Müşteriler rezervasyon yaptıkça burada görünecektir.</p>
        </div>
      )}
    </Container>
  );
};

export default AdminTicketListPage;
