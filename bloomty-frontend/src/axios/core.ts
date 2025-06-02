import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

export const axiosInstance = axios.create({
    baseURL: `${API_URL}/`,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Интерцептор для добавления токена в заголовки
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('auth-token');

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);