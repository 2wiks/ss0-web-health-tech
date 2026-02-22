import { authService } from './auth';
import axios, { AxiosResponse } from 'axios';

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'https://hacking-health-api.vercel.app').replace(/\/$/, '');

// User types
export interface UserResponse {
  id: string;
  username: string;
  email?: string;
  name?: string;
  created_at: string;
  updated_at: string;
}

export interface UserListResponse {
  users: UserResponse[];
}

class UserService {
  /**
   * Make an authenticated request to the API
   */
  private async makeRequest<T>(
    method: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE',
    endpoint: string,
    data?: any
  ): Promise<AxiosResponse<T>> {
    const token = await authService.getAccessToken();
    
    if (!token) {
      throw new Error('No access token available. Please login.');
    }

    return axios({
      method,
      url: `${API_BASE_URL}${endpoint}`,
      data,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
  }

  /**
   * GET /user/{user_id} - Get user details by ID
   */
  async getUserById(userId: string): Promise<UserResponse> {
    try {
      const response = await this.makeRequest<UserResponse>('GET', `/user/${userId}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || error.message || 'Failed to fetch user details');
      }
      throw new Error('Network error occurred');
    }
  }

  /**
   * GET /users - Get multiple users by IDs
   */
  async getUsersByIds(userIds: string[]): Promise<UserResponse[]> {
    try {
      const response = await this.makeRequest<UserListResponse>('POST', '/users/batch', { user_ids: userIds });
      return response.data.users;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || error.message || 'Failed to fetch users');
      }
      throw new Error('Network error occurred');
    }
  }

  /**
   * GET /user/profile - Get current user profile
   */
  async getCurrentUser(): Promise<UserResponse> {
    try {
      const response = await this.makeRequest<UserResponse>('GET', '/user/profile');
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || error.message || 'Failed to fetch current user');
      }
      throw new Error('Network error occurred');
    }
  }
}

export const userService = new UserService();
