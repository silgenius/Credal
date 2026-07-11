import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  isAuthenticated: boolean;
  phone: string | null;
  pin: string | null;
  credalId: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  phone: null,
  pin: null,
  credalId: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signupSuccess: (
      state,
      action: PayloadAction<{ phone: string; pin: string; credalId: string }>,
    ) => {
      state.isAuthenticated = true;
      state.phone = action.payload.phone;
      state.pin = action.payload.pin;
      state.credalId = action.payload.credalId;
    },
    loginSuccess: (state) => {
      state.isAuthenticated = true;
    },
    updatePin: (state, action: PayloadAction<string>) => {
      state.pin = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
    },
  },
});

export const { signupSuccess, loginSuccess, updatePin, logout } = authSlice.actions;
export default authSlice.reducer;