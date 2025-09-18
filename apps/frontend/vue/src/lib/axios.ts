import type {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

import axios from "axios";

import { TIMEOUT } from "@/constants";
import {
  clearTokens,
  getAccessToken,
  getRefreshToken,
  refreshAccessToken,
  saveTokens,
} from "@/services/auth.service";
import { navigateTo } from "@/utils/navigate";

function createRequester() {
  const api: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || "",
    timeout: TIMEOUT,
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Track refresh state
  let isRefreshing = false;

  // ✅ Request Interceptor
  api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = getAccessToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error: AxiosError) => Promise.reject(error),
  );

  // ✅ Response Interceptor
  api.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as InternalAxiosRequestConfig & {
        _retry?: boolean;
      };

      if (!error.response) {
        console.error("Network error");
        return Promise.reject(error);
      }

      const status = error.response.status;

      // ✅ Handle 401 Unauthorized + try refresh
      if (status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        // This block checks if a token refresh is already in progress.
        // If so, it rejects the current request to prevent multiple simultaneous refresh attempts.
        if (isRefreshing)
          return Promise.reject(error);

        isRefreshing = true;

        try {
          const refreshToken = getRefreshToken();
          if (!refreshToken)
            throw new Error("Missing refresh token");

          const {
            accessToken,
            refreshToken: newRefreshToken,
          } = await refreshAccessToken(refreshToken);

          saveTokens(accessToken, newRefreshToken);

          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return api(originalRequest);
        }
        catch (err) {
          clearTokens();
          navigateTo("/sign-in");
          return Promise.reject(err);
        }
        finally {
          isRefreshing = false;
        }
      }

      // 🔴 Optional: handle other errors globally
      if (status === 403) {
        console.warn("Access denied");
      }
      else if (status >= 500) {
        console.error("Server error");
      }

      return Promise.reject(error);
    },
  );

  // ✅ HTTP methods
  const get = async <T>(url: string, config = {}): Promise<T> =>
    api.get<T>(url, config).then(res => res.data);

  const post = async <T, U = void>(url: string, data?: U, config = {}): Promise<T> => {
    if (!data)
      data = {} as U;
    return await api.post(url, { ...data }, config);
  };

  const put = async <T, U = void>(url: string, data?: U, config = {}): Promise<T> => {
    if (!data)
      data = {} as U;
    return await api.put(url, { ...data }, config);
  };

  const patch = async <T, U = void>(url: string, data?: U, config = {}): Promise<T> => {
    if (!data)
      data = {} as U;
    return await api.patch(url, { ...data }, config);
  };

  const del = async <T>(url: string): Promise<T> => {
    return await api.post(url);
  };

  return { get, post, put, patch, del, api };
}

export const { get, post, put, patch, del } = createRequester();
