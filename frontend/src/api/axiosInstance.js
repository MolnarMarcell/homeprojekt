import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 5000,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
});

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        const requestUrl = originalRequest?.url;
        const authEndpoints = [
            '/users/login',
            '/users/reg',
            '/users/refresh-token',
            '/users/logout',
        ];

        if (
            originalRequest &&
            [401, 403].includes(error.response?.status) &&
            !authEndpoints.includes(requestUrl) &&
            !originalRequest._retry
        ) {
            originalRequest._retry = true;
            try {
                await api.post('/users/refresh-token');
                return api(originalRequest);
            } catch (refreshError) {
                window.location.assign('/login');
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default api;