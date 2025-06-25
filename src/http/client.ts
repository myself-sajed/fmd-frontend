import { refreshToken } from "@/app/authentication/api/auth-api";
import env from "@/lib/env";
import { useAuthStore } from "@/store/auth-store";
import axios from "axios";

export const client = axios.create({
  baseURL: env.BACKEND_URL,
  withCredentials: true,
  headers: {
    Accept: "application/json",
  },
});

client.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._isRetry) {
      try {
        originalRequest._isRetry = true;
        const headers = { ...originalRequest.headers };
        await refreshToken();
        return client.request({ ...originalRequest, headers });
      } catch (err) {
        useAuthStore.getState().logoutUser();
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export type AxiosError = {
  response?: {
    data?: {
      status: string;
      error: string;
      message?: string;
      details: {
        messages: string[];
      };
    };
  };
};
