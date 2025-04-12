import axios from 'axios';
import { useAuthStore } from '@/store/auth';

const api = axios.create({
  // baseURL: 'https://www.caboomlog.site/gateway',
  baseURL: 'http://localhost:8090',
  withCredentials: true,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});


api.interceptors.response.use(
  response => response,
  async error => {
    const authStore = useAuthStore();
    const originalRequest = error.config;

    const excludedUrls = ['/auth/login', '/token/refresh', '/api/members'];
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      authStore.token &&
      !excludedUrls.includes(originalRequest.url)
    ) {
      originalRequest._retry = true;
      try {
        const res = await api.post('/token/refresh', {}, { withCredentials: true });

        const newToken = res.data.accessToken;
        authStore.setToken(newToken);

        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        authStore.logout();
        window.location.href = '/auth/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);


api.interceptors.request.use(config => {
  const authStore = useAuthStore();
  const excludedUrls = ['/auth/login'];

  if (!excludedUrls.includes(config.url) && authStore.token) {
    console.log('add header : ' + authStore.token);
    config.headers.Authorization = `Bearer ${authStore.token}`;
  }
  return config;
});


export default api;
