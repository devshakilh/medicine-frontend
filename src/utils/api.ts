import axios from 'axios';
import { useQuery } from 'react-query';

const fetchProducts = async () => {
  const { data } = await axios.get('/api/products');
  return data;
};

const fetchProductById = async (id: string) => {
  const { data } = await axios.get(`/api/products/${id}`);
  return data;
};

export const useGetProductsQuery = () => useQuery('products', fetchProducts);
export const useGetProductByIdQuery = (id: string) => useQuery(['product', id], () => fetchProductById(id));



const API_URL = 'http://localhost:5000/api';

export const api = axios.create({
  baseURL: API_URL,
});

export const registerUser = (data: FormData) => api.post('/auth/register', data);
export const loginUser = (data: { email: string; password: string }) => api.post('/auth/login', data);
export const verifyEmail = (token: string) => api.get(`/auth/verify-email?token=${token}`);
export const refreshToken = (token: string) => api.post('/auth/refresh-token', { token });
