import axios from 'axios';

const API_URL = 'http://localhost:4000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests for protected routes
api.interceptors.request.use(
  (config) => {
    const adminInfo = localStorage.getItem('adminInfo');
    
    if (adminInfo) {
      const { token } = JSON.parse(adminInfo);
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;