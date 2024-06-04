import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosRequestConfig } from "axios";
import store from "../index";
import { logout } from "./index";
import instance from "../../configs/axios.config";

const SignIn = createAsyncThunk(
  "user/SignIn",
  async (
    data: { type: string; data?: any; role?: string },
    { rejectWithValue }
  ) => {
    try {
      const options: AxiosRequestConfig =
        data.type === "login"
          ? { url: "auth/jwt/create", method: "POST", data: data?.data ?? null }
          : { url: "auth/me", method: "GET", params: {} };
      const response = await instance(options);
      const _data = response.data;

      if (_data?.token) {
        localStorage.setItem("access_token", _data.token);
      }
      return _data;
    } catch (error: any) {
      return rejectWithValue(error.response);
    }
  }
);

export default SignIn;

// export const refreshToken = async () => {
//   try {
//     const refresh_token = localStorage.getItem("refresh_token");

//     if (refresh_token) {
//       const response = await instance({
//         url: "auth/jwt/refresh",
//         method: "POST",
//         data: { refresh: refresh_token },
//       });

//       if (response.status === 200) {
//         localStorage.setItem("access_token", response.data.access);
//         localStorage.setItem("refresh_token", response.data.refresh);
//         store.dispatch(SignIn({ data: null, type: "" }));
//       }
//     } else {
//       store.dispatch(logout());
//     }
//   } catch (error) {
//     localStorage.removeItem("access_token");
//     localStorage.removeItem("refresh_token");
//   }
// };
export const logOut = async () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
};
