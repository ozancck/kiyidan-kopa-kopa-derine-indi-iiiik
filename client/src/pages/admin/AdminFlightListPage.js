import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getFlights, deleteFlight } from '../../services/flightService';

const AdminFlightListPage = () => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFlights();
  }, []);

  const fetchFlights = async () => {
    try {
      const data = await getFlights();
      setFlights(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bu uçuşu silmek istediğinizden emin misiniz?')) {
      try {
        await deleteFlight(id);
        setFlights(flights.filter(flight => flight._id !== id));
      } catch (error) {
        alert('Uçuş silinirken bir hata oluştu');
      }
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
        <h1>Uçuş Yönetimi</h1>
        <Link to="/admin/flights/create">
          <Button variant="primary">Yeni Uçuş Ekle</Button>
        </Link>
      </div>

      <Table responsive striped>
        <thead>
          <tr>
            <th>Rota</th>
            <th>Kalkış</th>
            <th>Varış</th>
            <th>Fiyat</th>
            <th>Koltuk</th>
            <th>İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {flights.map((flight) => (
            <tr key={flight._id}>
              <td>
                <strong>{flight.from_city?.city_name} → {flight.to_city?.city_name}</strong>
              </td>
              <td>{formatDate(flight.departure_time)}</td>
              <td>{formatDate(flight.arrival_time)}</td>
              <td>₺{flight.price.toLocaleString('tr-TR')}</td>
              <td>
                <Badge bg={flight.seats_available > 10 ? 'success' : flight.seats_available > 0 ? 'warning' : 'danger'}>
                  {flight.seats_available} koltuk
                </Badge>
              </td>
              <td>
                <div className="d-flex gap-2">
                  <Link to={`/admin/flights/${flight._id}/edit`}>
                    <Button variant="outline-primary" size="sm">Düzenle</Button>
                  </Link>
                  <Button 
                    variant="outline-danger" 
                    size="sm"
                    onClick={() => handleDelete(flight._id)}
                  >
                    Sil
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {flights.length === 0 && (
        <div className="text-center py-5">
          <h4>Henüz uçuş bulunmuyor</h4>
          <p>Yeni uçuş eklemek için yukarıdaki butona tıklayın.</p>
        </div>
      )}
    </Container>
  );
};

export default AdminFlightListPage;
