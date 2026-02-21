import { authService } from './auth';
import { UserResponse, userService } from './user';
import axios, { AxiosResponse } from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://hacking-health.teoechavarria.com';

// Request types
export interface CreateFamilyRequest {
  name?: string;
  members?: string[];
}

export interface AddMemberRequest {
  user_id: string;
}

export interface UpdateFridgeRequest {
  fridge: Record<string, any>;
}

// Response types
export interface SuccessResponse {
  success: boolean;
  message?: string;
  family_id?: string;
}

export interface FamilyResponse {
  id?: string;
  _id?: string;
  name: string | null;
  members: string[];
  fridge: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface FamilyMember {
  id: string;
  username: string;
  name?: string;
  email?: string;
}

export interface FamilyDetailsResponse {
  id?: string;
  _id?: string;
  name: string | null;
  members: FamilyMember[];
  fridge: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface FamilyListResponse {
  families: FamilyResponse[];
}

class FamilyService {
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
   * POST /family - Create a new family
   */
  async createFamily(request: CreateFamilyRequest): Promise<SuccessResponse> {
    try {
      const response = await this.makeRequest<SuccessResponse>('POST', '/family', request);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || error.message || 'Failed to create family');
      }
      throw new Error('Network error occurred');
    }
  }

  /**
   * GET /family - List all families the user belongs to
   */
  async getFamilies(): Promise<FamilyListResponse> {
    try {
      const response = await this.makeRequest<FamilyListResponse>('GET', '/family');
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || error.message || 'Failed to fetch families');
      }
      throw new Error('Network error occurred');
    }
  }

  /**
   * GET /family/{family_id} - Get details of a specific family
   */
  async getFamilyById(familyId: string): Promise<FamilyResponse> {
    try {
      const response = await this.makeRequest<FamilyResponse>('GET', `/family/${familyId}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || error.message || 'Failed to fetch family details');
      }
      throw new Error('Network error occurred');
    }
  }

  /**
   * GET /family/{family_id}/details - Get family details with member information
   */
  async getFamilyDetails(familyId: string): Promise<FamilyDetailsResponse> {
    try {
      // Try the new endpoint first
      const response = await this.makeRequest<FamilyDetailsResponse>('GET', `/family/${familyId}/details`);
      return response.data;
    } catch (error) {
      // Fallback: use existing endpoint and fetch user details separately
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        return this.getFamilyDetailsFallback(familyId);
      }
      throw new Error(error.response?.data?.message || error.message || 'Failed to fetch family details');
    }
  }

  /**
   * Fallback method to get family details by fetching family and user info separately
   */
  private async getFamilyDetailsFallback(familyId: string): Promise<FamilyDetailsResponse> {
    try {
      // Get basic family info
      const familyResponse = await this.getFamilyById(familyId);
      
      // Get user details for all members
      const memberDetails = await userService.getUsersByIds(familyResponse.members);
      
      // Transform to FamilyDetailsResponse format
      const familyDetails: FamilyDetailsResponse = {
        ...familyResponse,
        members: memberDetails.map(user => ({
          id: user.id,
          username: user.username,
          name: user.name,
          email: user.email
        }))
      };
      
      return familyDetails;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || error.message || 'Failed to fetch family details');
      }
      throw new Error('Network error occurred');
    }
  }

  /**
   * POST /family/{family_id}/member - Add a member to a family
   */
  async addMember(familyId: string, request: AddMemberRequest): Promise<SuccessResponse> {
    try {
      const response = await this.makeRequest<SuccessResponse>('POST', `/family/${familyId}/member`, request);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || error.message || 'Failed to add member');
      }
      throw new Error('Network error occurred');
    }
  }

  /**
   * DELETE /family/{family_id}/member/{member_id} - Remove a member from a family
   */
  async removeMember(familyId: string, memberId: string): Promise<SuccessResponse> {
    try {
      const response = await this.makeRequest<SuccessResponse>('DELETE', `/family/${familyId}/member/${memberId}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || error.message || 'Failed to remove member');
      }
      throw new Error('Network error occurred');
    }
  }

  /**
   * PUT /family/{family_id}/fridge - Replace fridge data
   */
  async replaceFridge(familyId: string, request: UpdateFridgeRequest): Promise<SuccessResponse> {
    try {
      const response = await this.makeRequest<SuccessResponse>('PUT', `/family/${familyId}/fridge`, request);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || error.message || 'Failed to update fridge');
      }
      throw new Error('Network error occurred');
    }
  }

  /**
   * PATCH /family/{family_id}/fridge - Merge fridge data
   */
  async mergeFridge(familyId: string, request: UpdateFridgeRequest): Promise<SuccessResponse> {
    try {
      const response = await this.makeRequest<SuccessResponse>('PATCH', `/family/${familyId}/fridge`, request);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || error.message || 'Failed to merge fridge data');
      }
      throw new Error('Network error occurred');
    }
  }

  /**
   * DELETE /family/{family_id} - Delete a family
   */
  async deleteFamily(familyId: string): Promise<SuccessResponse> {
    try {
      const response = await this.makeRequest<SuccessResponse>('DELETE', `/family/${familyId}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || error.message || 'Failed to delete family');
      }
      throw new Error('Network error occurred');
    }
  }
}

export const familyService = new FamilyService();


