import axios from 'axios';

// Live Vercel Deployment-kku Render backend URL fallback-a set panni irukkom
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  'https://bharatanatyam-academy-backend.onrender.com/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to add JWT Token to requests
api.interceptors.request.use(
  (config) => {
    // 'token'-kku bathula AuthContext-la use pannura 'natya_token' key-a eadukkirom
    const token = localStorage.getItem('natya_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;