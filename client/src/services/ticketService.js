import api from './api';

export const bookTicket = async (ticketData) => {
  const response = await api.post('/tickets', ticketData);
  return response.data;
};

export const getTicketById = async (id) => {
  const response = await api.get(`/tickets/${id}`);
  return response.data;
};

export const getTickets = async () => {
  const response = await api.get('/tickets');
  return response.data;
};