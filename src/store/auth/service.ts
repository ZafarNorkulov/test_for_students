import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosRequestConfig } from "axios";
import instance from "../../configs/axios.config";
import { message } from "antd";
import store from "..";

const SignIn = createAsyncThunk(
  "user/SignIn",
  async (data: { data?: any }, { rejectWithValue }) => {
    try {
      const isHasToken = localStorage.getItem("access_token");
      const options: AxiosRequestConfig = !isHasToken
        ? { url: "auth/jwt/create", method: "POST", data: data?.data ?? null }
        : { url: "api/v1/user/profile", method: "GET", params: {} };
      const response = await instance(options);
      const _data = response.data;
      if (response.status !== 200) {
        return rejectWithValue(new Error("Authorization error!"));
      }
      if (!isHasToken) {
        localStorage.setItem("access_token", _data.access);
        localStorage.setItem("refresh_token", _data.refresh);
      }

      return _data;
    } catch (error:any) {
      message.error(error.response.statusText);
      return rejectWithValue(error.response);
    }
  }
);

export default SignIn;

export const refreshToken = async () => {
  try {
    const refresh_token = localStorage.getItem("refresh_token");

    if (refresh_token) {
      const response = await instance({
        url: "auth/jwt/refresh",
        method: "POST",
        data: { refresh: refresh_token },
      });
console.log(response)
      if (response.status === 200) {
        localStorage.setItem("access_token", response.data.access);
        store.dispatch(SignIn({}));
      }
    }
  } catch (error) {
    window.location.href = "/signin";
  }
};

export const logOut = async () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
};
