import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

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



// =========================
// AUTH SERVICE
// =========================

export const authService = {

  async register(name, email, password) {
    const response = await apiClient.post('/auth/register', {
      name,
      email,
      password
    });

    return response.data;
  },

  async login(email, password) {
    const response = await apiClient.post('/auth/login', {
      email,
      password
    });

    return response.data;
  },

  async getProfile() {
    const response = await apiClient.get('/users/profile');

    return response.data;
  }
};



// =========================
// USER SERVICE
// =========================

export const userService = {

  async submitOnboarding(onboardingData) {
    const response = await apiClient.put(
      '/users/onboarding',
      onboardingData
    );

    return response.data;
  },

  async getProfile() {
    const response = await apiClient.get('/users/profile');

    return response.data;
  },

  async updateProfile(data) {
    const response = await apiClient.put(
      '/users/profile',
      data
    );

    return response.data;
  }
};



// =========================
// CHECK-IN SERVICE
// =========================

export const checkinService = {

  async submitCheckIn(payload) {
    const response = await apiClient.post(
      '/dashboard/checkin',
      payload
    );

    return response.data;
  }
};



// =========================
// DASHBOARD SERVICE
// =========================

export const dashboardService = {

  async getDashboardData() {
    const response = await apiClient.get('/dashboard');

    return response.data;
  }
};
