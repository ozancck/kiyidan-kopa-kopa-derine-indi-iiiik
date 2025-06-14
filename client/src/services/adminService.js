import api from './api';

export const login = async (username, password) => {
  const response = await api.post('/admin/login', { username, password });
  return response.data;
};