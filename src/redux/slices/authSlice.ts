

// src/slices/authSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface AuthState {
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  user: any | null;
  isRegistered: boolean;
  resendAvailable: boolean;
  countdown: number;
}

const initialState: AuthState = {
  isLoading: false,
  error: null,
  isAuthenticated: false,
  user: null,
  isRegistered: false,
  resendAvailable: false,
  countdown: 60,
};

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData: FormData) => {
    const response = await axios.post('http://localhost:5000/api/auth/register', userData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (loginData: { email: string; password: string }) => {
    const response = await axios.post('http://localhost:5000/api/auth/login', loginData);
    return response.data;
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async () => {
    await axios.post('http://localhost:5000/api/auth/logout');
  }
);

export const resendVerificationCode = createAsyncThunk(
  'auth/resendVerificationCode',
  async (email: string) => {
    const response = await axios.post('http://localhost:5000/api/auth/resend-verification', { email });
    return response.data;
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetCountdown: (state) => {
      state.countdown = 60;
      state.resendAvailable = false;
    },
    decrementCountdown: (state) => {
      if (state.countdown > 0) {
        state.countdown -= 1;
        if (state.countdown === 0) {
          state.resendAvailable = true;
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false;
        state.isRegistered = true;
        state.resendAvailable = false;
        state.countdown = 60;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'An error occurred';
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'An error occurred';
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(resendVerificationCode.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(resendVerificationCode.fulfilled, (state) => {
        state.isLoading = false;
        state.countdown = 60; // Reset countdown when resend is successful
        state.resendAvailable = false; // Reset resend availability
        state.error = null;
      })
      .addCase(resendVerificationCode.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'An error occurred';
      });
  },
});

export const { resetCountdown, decrementCountdown } = authSlice.actions;
export default authSlice.reducer;



