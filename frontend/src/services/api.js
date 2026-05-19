import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor: Menyuntikkan Bearer Token murni untuk otorisasi
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const authService = {
  async register(name, email, password) {
    const response = await apiClient.post('/auth/register', { name, email, password });
    return response.data;
  },
  async login(email, password) {
    const response = await apiClient.post('/auth/login', { email, password });
    return response.data;
  },
  async getProfile() {
    const response = await apiClient.get('/users/profile');
    return response.data;
  }
};

export const checkinService = {
  async submitCheckIn(workHours, sleepHours, cognitiveLoad) {
    const response = await apiClient.post('/dashboard/checkin', {
      workHours, sleepHours, cognitiveLoad
    });
    return response.data;
  }
};

export const dashboardService = {
  async getDashboardData() {
    // TIDAK ADA LAGI MOCK DATA. Murni memanggil RESTful API.
    const response = await apiClient.get('/dashboard');
    return response.data;
  }
};