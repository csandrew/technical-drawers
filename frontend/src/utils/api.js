import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'https://technical-drawers-backend.onrender.com';

export const api = axios.create({
    baseURL: API_URL.replace(/\/+$/, ''),
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});