import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import FlightDetailPage from './pages/FlightDetailPage';
import BookingConfirmationPage from './pages/BookingConfirmationPage';
import LoginPage from './pages/LoginPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminFlightListPage from './pages/admin/AdminFlightListPage';
import AdminFlightCreatePage from './pages/admin/AdminFlightCreatePage';
import AdminFlightEditPage from './pages/admin/AdminFlightEditPage';
import AdminTicketListPage from './pages/admin/AdminTicketListPage';
import AdminRoute from './components/AdminRoute';

function App() {
  return (
    <Router>
      <div className="App" style={{minHeight: '100vh', display: 'flex', flexDirection: 'column'}}>
        <Header />
        
        <main style={{flex: 1, paddingTop: '80px'}}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/flight/:id" element={
              <Container style={{paddingTop: '20px'}}>
                <FlightDetailPage />
              </Container>
            } />
            <Route path="/booking/:id" element={
              <Container style={{paddingTop: '20px'}}>
                <BookingConfirmationPage />
              </Container>
            } />
            <Route path="/admin/login" element={
              <Container style={{paddingTop: '20px'}}>
                <LoginPage />
              </Container>
            } />
            
            {/* Admin Routes */}
            <Route
              path="/admin/dashboard"
              element={
                <AdminRoute>
                  <Container style={{paddingTop: '20px'}}>
                    <AdminDashboardPage />
                  </Container>
                </AdminRoute>
              }
            />
            <Route
              path="/admin/flights"
              element={
                <AdminRoute>
                  <Container style={{paddingTop: '20px'}}>
                    <AdminFlightListPage />
                  </Container>
                </AdminRoute>
              }
            />
            <Route
              path="/admin/flights/create"
              element={
                <AdminRoute>
                  <Container style={{paddingTop: '20px'}}>
                    <AdminFlightCreatePage />
                  </Container>
                </AdminRoute>
              }
            />
            <Route
              path="/admin/flights/:id/edit"
              element={
                <AdminRoute>
                  <Container style={{paddingTop: '20px'}}>
                    <AdminFlightEditPage />
                  </Container>
                </AdminRoute>
              }
            />
            <Route
              path="/admin/tickets"
              element={
                <AdminRoute>
                  <Container style={{paddingTop: '20px'}}>
                    <AdminTicketListPage />
                  </Container>
                </AdminRoute>
              }
            />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;