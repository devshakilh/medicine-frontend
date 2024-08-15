// src/redux/slices/productSlice.ts

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '@/utils/axios'; // Adjust the import path according to your project structure

// Define TypeScript interfaces for Product and State
interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  photos: string[];
  discount: number;
}

interface ProductState {
  products: Product[];
  product: Product | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// Initial state
const initialState: ProductState = {
  products: [],
  product: null,
  status: 'idle',
  error: null,
};

// Async thunk to fetch products
export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await axios.get('/products');
  return response.data;
});

// Async thunk to fetch a product by ID
export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (id: string) => {
    const response = await axios.get(`/products/${id}`);
    return response.data;
  }
);

// Create slice
const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    // You can add reducers for other actions here if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch products';
      })
      .addCase(fetchProductById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.product = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch product by ID';
      });
  },
});

// Export actions if you add any reducers
// export const { actionName } = productSlice.actions;

// Export the reducer
export default productSlice.reducer;
