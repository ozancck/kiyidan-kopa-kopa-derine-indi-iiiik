// pages/admin/AdminFlightListPage.js
import React, { useState, useEffect } from 'react';
import { Row, Col, Table, Button, Alert, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AdminSidebar from '../../components/AdminSidebar';

const AdminFlightListPage = () => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchFlights();
  }, []);

  const fetchFlights = async () => {
    try {
      setLoading(true);
      setError('');
      
      const response = await fetch('http://localhost:4000/api/flights');
      const data = await response.json();
      
      if (response.ok) {
        setFlights(data);
      } else {
        setError(data.message || 'Uçuşlar yüklenirken hata oluştu');
      }
    } catch (error) {
      console.error('Fetch flights error:', error);
      setError('Sunucu bağlantı hatası');
    } finally {
      setLoading(false);
    }
  };

  const deleteFlight = async (id) => {
    if (window.confirm('Bu uçuşu silmek istediğinizden emin misiniz?')) {
      try {
        const response = await fetch(`http://localhost:4000/api/flights/${id}`, {
          method: 'DELETE',
        });
        
        if (response.ok) {
          setFlights(flights.filter(flight => flight._id !== id));
        } else {
          setError('Uçuş silinirken hata oluştu');
        }
      } catch (error) {
        console.error('Delete flight error:', error);
        setError('Sunucu bağlantı hatası');
      }
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('tr-TR');
  };

  return (
    <Row>
      <Col md={3}>
        <AdminSidebar />
      </Col>
      <Col md={9}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Uçuş Listesi</h2>
          <Button 
            as={Link} 
            to="/admin/flights/create" 
            variant="success"
          >
            + Yeni Uçuş Ekle
          </Button>
        </div>

        {error && <Alert variant="danger">{error}</Alert>}

        {loading ? (
          <div className="text-center">
            <Spinner animation="border" />
            <p>Uçuşlar yükleniyor...</p>
          </div>
        ) : (
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Uçuş No</th>
                <th>Kalkış</th>
                <th>Varış</th>
                <th>Tarih/Saat</th>
                <th>Fiyat</th>
                <th>Müsait Koltuk</th>
                <th>İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {flights.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center">
                    Henüz uçuş bulunmuyor. 
                    <Link to="/admin/flights/create" className="ms-2">
                      İlk uçuşu ekleyin
                    </Link>
                  </td>
                </tr>
              ) : (
                flights.map((flight) => (
                  <tr key={flight._id}>
                    <td>{flight.flight_id}</td>
                    <td>
                      {flight.from_city?.city_name || 'Bilinmiyor'}
                    </td>
                    <td>
                      {flight.to_city?.city_name || 'Bilinmiyor'}
                    </td>
                    <td>
                      <div>
                        <strong>Kalkış:</strong> {formatDate(flight.departure_time)}
                        <br />
                        <strong>Varış:</strong> {formatDate(flight.arrival_time)}
                      </div>
                    </td>
                    <td>₺{flight.price}</td>
                    <td>
                      {flight.seats_available} / {flight.seats_total}
                    </td>
                    <td>
                      <div className="d-flex gap-2">
                        <Button
                          as={Link}
                          to={`/admin/flights/${flight._id}/edit`}
                          variant="warning"
                          size="sm"
                        >
                          Düzenle
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => deleteFlight(flight._id)}
                        >
                          Sil
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        )}

        {flights.length > 0 && (
          <div className="mt-3">
            <small className="text-muted">
              Toplam {flights.length} uçuş bulundu
            </small>
          </div>
        )}
      </Col>
    </Row>
  );
};

export default AdminFlightListPage;