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
      <Header />
      <main className="py-3">
        <Container>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/flight/:id" element={<FlightDetailPage />} />
            <Route path="/booking/:id" element={<BookingConfirmationPage />} />
            <Route path="/admin/login" element={<LoginPage />} />
            
            {/* Admin Routes */}
            <Route
              path="/admin/dashboard"
              element={
                <AdminRoute>
                  <AdminDashboardPage />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/flights"
              element={
                <AdminRoute>
                  <AdminFlightListPage />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/flights/create"
              element={
                <AdminRoute>
                  <AdminFlightCreatePage />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/flights/:id/edit"
              element={
                <AdminRoute>
                  <AdminFlightEditPage />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/tickets"
              element={
                <AdminRoute>
                  <AdminTicketListPage />
                </AdminRoute>
              }
            />
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;