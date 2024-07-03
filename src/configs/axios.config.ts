import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { ResponseError } from "./error";

const instance = axios.create();

const onRequest = (
  config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig => {
  config.headers!.Accept = "application/json";
  const access_token = localStorage.getItem("access_token") ?? "";
  if (!config.url?.includes("auth/jwt/create")) {
    config.headers.Authorization = `Bearer ${access_token}`;
  }
  config.baseURL = import.meta.env.VITE_PUBLIC_BASE_URL;
  return config;
};
const onRequestError = async (error: AxiosError): Promise<AxiosError> => {
  new ResponseError(error);
  return Promise.reject(error);
};
const onResponse = (response: AxiosResponse): AxiosResponse => {
  return response;
};
const onResponseError = (error: AxiosError): Promise<AxiosError> => {
  if (error.response?.status === 403) {
    // instance(originalRequest)
  }

  if (error.response?.status === 401) {
    localStorage.removeItem("access_token");
    // localStorage.removeItem("refresh_token");
  }

  new ResponseError(error);
  return Promise.reject(error);
};

instance.interceptors.request.use(onRequest, onRequestError);
instance.interceptors.response.use(onResponse, onResponseError);

export default instance;
