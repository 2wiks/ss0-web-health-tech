import axios, { AxiosInstance } from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://apihealth.echavarrias.com';

export interface LoginRequest {
  username: string;
  password: string;
  fcmToken?: string;
}

export interface TokenResponse {
  token: string;
  refresh: string;
  expiry: number; // Unix timestamp in seconds
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiry: number;
}

class AuthService {
  private axiosInstance: AxiosInstance;
  private accessToken: string | null = null;
  private refreshToken: string | null = null;
  private tokenExpiry: number | null = null;
  private isRefreshing = false;
  private refreshSubscribers: ((token: string) => void)[] = [];

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Load tokens from storage
    this.loadTokens();

    // Setup request interceptor to add token
    this.axiosInstance.interceptors.request.use(
      (config) => {
        if (this.accessToken) {
          config.headers.Authorization = `Bearer ${this.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Setup response interceptor to handle token expiration
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        // Check if error is 401 and we haven't already tried to refresh
        if (error.response?.status === 401 && !originalRequest._retry) {
          if (this.isRefreshing) {
            // Wait for the refresh to complete
            return new Promise((resolve) => {
              this.refreshSubscribers.push((token: string) => {
                originalRequest.headers.Authorization = `Bearer ${token}`;
                resolve(this.axiosInstance(originalRequest));
              });
            });
          }

          originalRequest._retry = true;
          this.isRefreshing = true;

          try {
            const newToken = await this.refreshTokenInternal();
            this.isRefreshing = false;
            this.onRefreshed(newToken);
            this.refreshSubscribers = [];

            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            return this.axiosInstance(originalRequest);
          } catch (refreshError) {
            this.isRefreshing = false;
            this.clearTokens();
            throw refreshError;
          }
        }

        return Promise.reject(error);
      }
    );
  }

  private onRefreshed(token: string) {
    this.refreshSubscribers.forEach((callback) => callback(token));
  }

  private loadTokens() {
    this.accessToken = localStorage.getItem('access_token');
    this.refreshToken = localStorage.getItem('refresh_token');
    const expiry = localStorage.getItem('token_expiry');
    this.tokenExpiry = expiry ? parseInt(expiry, 10) : null;
  }

  private saveTokens(tokens: AuthTokens) {
    this.accessToken = tokens.accessToken;
    this.refreshToken = tokens.refreshToken;
    this.tokenExpiry = tokens.expiry;
    
    localStorage.setItem('access_token', tokens.accessToken);
    localStorage.setItem('refresh_token', tokens.refreshToken);
    localStorage.setItem('token_expiry', tokens.expiry.toString());
  }

  private clearTokens() {
    this.accessToken = null;
    this.refreshToken = null;
    this.tokenExpiry = null;
    
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('token_expiry');
  }

  private isTokenExpired(): boolean {
    if (!this.tokenExpiry) return true;
    
    // Check if token expires in the next 60 seconds
    const currentTime = Math.floor(Date.now() / 1000);
    return this.tokenExpiry - currentTime < 60;
  }

  private async refreshTokenInternal(): Promise<string> {
    if (!this.refreshToken) {
      throw new Error('No refresh token available');
    }

    try {
      const response = await axios.post<TokenResponse>(
        `${API_BASE_URL}/refresh`,
        { refresh: this.refreshToken },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      this.saveTokens({
        accessToken: response.data.token,
        refreshToken: response.data.refresh,
        expiry: response.data.expiry,
      });

      return response.data.token;
    } catch (error) {
      this.clearTokens();
      throw new Error('Token refresh failed');
    }
  }

  /**
   * Login with username and password
   * @param username - User's username/email
   * @param password - User's password
   * @param fcmToken - Optional Firebase Cloud Messaging token for push notifications
   */
  async login(username: string, password: string, fcmToken?: string): Promise<TokenResponse> {
    try {
      const response = await axios.post<TokenResponse>(`${API_BASE_URL}/login`, {
        username,
        password,
        ...(fcmToken && { fcmToken }),
      });

      this.saveTokens({
        accessToken: response.data.token,
        refreshToken: response.data.refresh,
        expiry: response.data.expiry,
      });

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Login failed');
      }
      throw new Error('Network error during login');
    }
  }

  /**
   * Manually refresh the access token
   */
  async refreshAccessToken(): Promise<TokenResponse> {
    if (!this.refreshToken) {
      throw new Error('No refresh token available');
    }

    try {
      const response = await axios.post<TokenResponse>(
        `${API_BASE_URL}/refresh`,
        { refresh: this.refreshToken },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      this.saveTokens({
        accessToken: response.data.token,
        refreshToken: response.data.refresh,
        expiry: response.data.expiry,
      });

      return response.data;
    } catch (error) {
      this.clearTokens();
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Token refresh failed');
      }
      throw new Error('Network error during token refresh');
    }
  }

  /**
   * Revoke the current access token (logout)
   */
  async revokeToken(): Promise<void> {
    if (!this.accessToken) return;

    try {
      await axios.delete(`${API_BASE_URL}/revoke`, {
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
        },
      });
    } catch (error) {
      console.error('Error revoking token:', error);
      // Continue with local cleanup even if server request fails
    } finally {
      this.clearTokens();
    }
  }

  /**
   * Get the current access token, refreshing if necessary
   */
  async getAccessToken(): Promise<string | null> {
    if (!this.accessToken) return null;

    if (this.isTokenExpired()) {
      try {
        await this.refreshTokenInternal();
      } catch (error) {
        return null;
      }
    }

    return this.accessToken;
  }

  /**
   * Get the refresh token
   */
  getRefreshToken(): string | null {
    return this.refreshToken;
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return !!this.accessToken && !this.isTokenExpired();
  }

  /**
   * Get the axios instance with interceptors configured
   */
  getAxiosInstance(): AxiosInstance {
    return this.axiosInstance;
  }

  /**
   * Logout - clears tokens locally
   */
  logout() {
    this.clearTokens();
  }
}

export const authService = new AuthService();
