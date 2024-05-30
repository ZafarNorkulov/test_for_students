import axios, { InternalAxiosRequestConfig } from "axios";

let instance = axios.create();

const onRequest = (
  config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig => {
  config.headers!.Accept = "application/json";
  config.headers!["Access-Control-Allow-Credentials"] = true;
  config.headers!["cross-origin-opener-policy"] = "same-origin";
  config.baseURL = import.meta.env.VITE_APP_BASE_URL;
  return config;
};

instance.interceptors.request.use(onRequest);

export default instance;
