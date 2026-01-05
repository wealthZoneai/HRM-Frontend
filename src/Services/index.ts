import axios from "axios";
import { refreshAccessToken } from "./authHelpers";

declare module "axios" {
  export interface AxiosRequestConfig {
    requiresAuth?: boolean;
    _retry?: boolean;
  }
}

const httpClient = axios.create({
  baseURL: "http://127.0.0.1:8000/",
  timeout: 30000,
});

/* ===========================
   REQUEST INTERCEPTOR
=========================== */
httpClient.interceptors.request.use(
  async (config) => {
    if (config.requiresAuth) {
      const access = localStorage.getItem("access");

      if (access) {
        config.headers = config.headers ?? {};
        config.headers["Authorization"] = `Bearer ${access}`;
      }
    }

    if (config.data instanceof FormData) {
      config.headers = config.headers ?? {};
      config.headers["Content-Type"] = "multipart/form-data";
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/* ===========================
   RESPONSE INTERCEPTOR
   AUTO REFRESH TOKEN
=========================== */
httpClient.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    // no response available
    if (!error.response) {
      return Promise.reject(error);
    }

    // Unauthorized and not retried before
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const newAccessToken = await refreshAccessToken();

      if (newAccessToken) {
        httpClient.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`;
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

        return httpClient(originalRequest); // retry request
      }
    }

    // second 401 or refresh failed → logout
    if (error.response.status === 401) {
      localStorage.clear();
      window.location.href = "/";
    }

    return Promise.reject(error);
  }
);

export default httpClient;
