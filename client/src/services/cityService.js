import api from './api';

export const getCities = async () => {
  const response = await api.get('/cities');
  return response.data;
};