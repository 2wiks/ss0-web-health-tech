import axios from "axios";
import { authService } from "@/api/auth";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://apihealth.echavarrias.com";

// Create axios instance with base configuration
export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor to include auth token if available
api.interceptors.request.use(
  async (config) => {
    const token = await authService.getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;

