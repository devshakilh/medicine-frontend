// slices/userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  token: string | null;
  role: string | null;
}

const initialState: UserState = {
  token: null,
  role: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ token: string; role: string }>) => {
      state.token = action.payload.token;
      state.role = action.payload.role;
    },
    clearCredentials: (state) => {
      state.token = null;
      state.role = null;
    },
  },
});

export const { setCredentials, clearCredentials } = userSlice.actions;
export { userSlice };
