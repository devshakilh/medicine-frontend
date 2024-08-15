import { login, logout } from '@/redux/slices/authSlice';
import { store } from '@/redux/store';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api',
});

axiosInstance.interceptors.request.use((config) => {
  const state = store.getState();
  const token = state.auth.accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { response } = error;
    if (response && response.status === 401) {
      // Refresh token logic
      const refreshToken = store.getState().auth.refreshToken;
      if (refreshToken) {
        try {
          const { data } = await axios.post('http://localhost:5000/api/auth/refresh-token', {
            refreshToken,
          });
          store.dispatch(login({ accessToken: data.accessToken, refreshToken: data.refreshToken }));
          return axiosInstance(error.config);
        } catch (refreshError) {
          store.dispatch(logout());
        }
      } else {
        store.dispatch(logout());
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
