import api from './api';

export const getFlights = async () => {
  const response = await api.get('/flights');
  return response.data;
};

export const getFlightById = async (id) => {
  const response = await api.get(`/flights/${id}`);
  return response.data;
};

export const searchFlights = async (searchData) => {
  const response = await api.post('/flights/search', searchData);
  return response.data;
};

export const createFlight = async (flightData) => {
  const response = await api.post('/flights', flightData);
  return response.data;
};

export const updateFlight = async (id, flightData) => {
  const response = await api.put(`/flights/${id}`, flightData);
  return response.data;
};

export const deleteFlight = async (id) => {
  const response = await api.delete(`/flights/${id}`);
  return response.data;
};

