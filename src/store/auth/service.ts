import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosRequestConfig } from "axios";
import instance from "../../configs/axios.config";

const SignIn = createAsyncThunk(
  "user/SignIn",
  async (data: { type: string; data?: any; role?: string }, { rejectWithValue }) => {
    try {
      const options: AxiosRequestConfig =
        data.type === "login"
          ? { url: "auth/jwt/create/", method: "POST", data: data?.data ?? null }
          : { url: "auth/users/me", method: "GET", params: {} };

      const reponse = await instance(options);
      const _data = reponse.data;

      if(_data?.access){

        localStorage.setItem("access_token", _data.access);
      }
      return _data;
    } catch (error:any) {
      return rejectWithValue(error.response);
    }
  }
);

export default SignIn;

export const logOut = async () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  // window.location.href = "/signin";
};
