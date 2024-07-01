import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { QueryClient } from "@tanstack/react-query";
import SignIn from "./service";
const queryClient = new QueryClient();

export type TypeInitialStateAuth = {
  isAuthenticated: boolean;
  isLoading?: boolean;
  status: "pending" | "success" | "error";
  access_token?: string | null;
};

export const initialState: TypeInitialStateAuth = {
  isAuthenticated: false,
  isLoading: false,
  status: "success",
};

const SignInSlice = createSlice({
  name: "Login",
  initialState: initialState,
  reducers: {
    login(state) {
      state.isAuthenticated = true;
      state.isLoading = false;
      state.status = "success";
    },
    logout(state) {
      state.isAuthenticated = false;
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      queryClient.clear();
    },
  },
  extraReducers: (builder) => {
    builder.addCase(SignIn.pending, (state) => {
      state.isLoading = true;
      state.status = "pending";
    });
    builder.addCase(
      SignIn.fulfilled,
      (state, action: PayloadAction<{ access: string }>) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.status = "success";
        state.access_token = action.payload.access;
      }
    );
    builder.addCase(SignIn.rejected, (state) => {
      state.isLoading = false;
      state.status = "error";
    });
  },
});

export const { login, logout } = SignInSlice.actions;

export default SignInSlice.reducer;
