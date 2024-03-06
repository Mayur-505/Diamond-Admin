import { ErrorData, ErrorType } from "@/lib/types";
import axios, { AxiosError } from "axios";

export const BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface AxiosParams {
  baseURL?: string;
  headers?: { [key: string]: string }; // Explicitly type headers as an object
  method?: "get" | "post" | "patch" | "put" | "delete";
  data?:
    | unknown
    | null
    | FormData
    | { [key: string]: string | number | boolean };
  params?: { [key: string]: any };
  url: string;
  isFormData?: boolean;
}

const api = ({
  baseURL = BASE_URL,
  headers = {},
  method = "get",
  data = null,
  params,
  url,
  isFormData = false,
}: AxiosParams) => {
  const instance = axios.create({
    baseURL,
  });

  const config = {
    url,
    method,
    data,
    params,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJlNjE5ZjlhOC00OWQ5LTQwYzItYTExMi1kYjczMTk2NzI2ZjIiLCJpYXQiOjE3MDk1MzM5MjcsImV4cCI6MTcwOTk2NTkyN30.oQXjegRVIjMCxkRWJ8QfgxRrHLA1OGrLOyp3g9273uk`,
      ...headers,
    },
  };

  if (isFormData) {
    config.headers = {
      ...config.headers,
      "Content-Type": "multipart/form-data",
    };
  }

  instance.interceptors.response.use(
    (res) => {
      return res;
    },
    (error: AxiosError) => {
      const err: ErrorType = {
        code: error.response?.status || 0,
        data: error.response?.data as ErrorData,
      };
      return Promise.reject(err);
    }
  );

  return instance.request(config);
};

export default api;
