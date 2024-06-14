import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { QueryClient } from "@tanstack/react-query";
import SignIn from "./service";
const queryClient = new QueryClient();

export type TypeInitialStateAuth = {
  access_token?: string | null;
  error?: string;
  message?: string;
  isAuthenticated?: boolean;
  isLoading?: boolean;
  refreshLoading: boolean;
};

const initialState: TypeInitialStateAuth = {
  access_token: null,
  error: "",
  message: "",
  isAuthenticated: false,
  isLoading: false,
  refreshLoading: true,
};

const SignInSlice = createSlice({
  name: "Login",
  initialState: initialState,
  reducers: {
    login(state) {
      state.isAuthenticated = true;
      state.isLoading = false;
      state.access_token = "";
    },
    logout(state) {
      state.isAuthenticated = false;
      state.message = "";
      state.error = "";
      state.access_token = null;
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      queryClient.clear();
    },
    loadingAuth(state) {
      state.refreshLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(SignIn.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(SignIn.fulfilled, (state, action: PayloadAction<any>) => {
        console.log(action);
        if (action.payload) {
          state.access_token = action?.payload?.access_token || "";
          state.message = action.payload.message;
          state.isLoading = false;
          state.isAuthenticated = true;
        } else {
          state.isLoading = false;
          state.isAuthenticated = false;
        }
      })
      .addCase(SignIn.rejected, (state, action: PayloadAction<any>) => {
        if (action?.payload?.data?.status === 0) {
          state.error = action?.payload.data?.error?.message;
          state.isLoading = false;
        } else {
          state.error = "disconnect";
          state.isLoading = false;
        }
      });
  },
});

export const { login, logout, loadingAuth } = SignInSlice.actions;

export default SignInSlice.reducer;
