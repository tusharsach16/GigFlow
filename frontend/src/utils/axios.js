import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    },
});

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            if (window.location.pathname !== '/login' && window.location.pathname !== '/register') {
                console.warn('Unauthorized - authentication required');
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;