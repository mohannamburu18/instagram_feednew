// src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://instagram-feednew.onrender.com/api',
  timeout: 60000, // 👈 important for Render cold start
});

export default api;
