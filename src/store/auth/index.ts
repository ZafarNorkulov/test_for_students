import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { QueryClient } from "@tanstack/react-query";
import SignIn from "./service";

const queryClient = new QueryClient();

interface IAuth {
  isLoading: boolean;
  message?: string;
  error?: string;
  isAuthenticated: boolean;
  access_token: string | null;
  refreshLoading?: boolean;
}

const initialState: IAuth = {
  isLoading: false,
  message: "",
  error: "",
  isAuthenticated: false,
  access_token: null,
};

const SignInSlice = createSlice({
  name: "Login",
  initialState,
  reducers: {
    login(state) {
      state.isAuthenticated = true;
      state.isLoading = false;
      state.access_token = "";
    },
    logout(state) {
      state.isAuthenticated = false;
      state.access_token = null;
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      queryClient.clear();
    },
    loadingAuth(state) {
      state.refreshLoading = false;
    },
  },
  extraReducers: (building) => {
    building
      .addCase(SignIn.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(SignIn.fulfilled, (state, action: PayloadAction<any>) => {
        if (action.payload) {
          state.access_token = action?.payload?.access_token || "";
          state.message = action.payload.message;
          state.isLoading = false;
          state.isAuthenticated = false;
        }
      })
      .addCase(SignIn.rejected, (state, action: PayloadAction<any>) => {
        if (action?.payload?.data?.status === 0) {
          state.error = action?.payload?.data?.error?.message;
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