import axios, { InternalAxiosRequestConfig } from "axios";

let instance = axios.create();

const onRequest = (
  config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig => {
  config.headers!.Accept = "application/json";
  const access_token = localStorage.getItem("access_token") ?? "";
  config.headers.Authorization = `Bearer ${access_token}`;
  config.baseURL = import.meta.env.VITE_PUBLIC_BASE_URL;
  return config;
};

instance.interceptors.request.use(onRequest);

export default instance;
