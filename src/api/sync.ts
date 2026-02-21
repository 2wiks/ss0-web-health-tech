import { authService } from './auth';
import axios, { AxiosResponse } from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://hacking-health.teoechavarria.com';

export interface SyncResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface HealthRecord {
  id?: string;
  timestamp?: string;
  value?: any;
  metadata?: Record<string, any>;
  [key: string]: any;
}

export interface SyncAggregate {
  value?: number | null;
  total?: number;
  recordCount?: number;
  dailyAverage?: number;
  dailyAvg?: number;
  dailyMin?: number;
  dailyMax?: number;
  totalSamples?: number;
  timestamp?: string;
  totalSessions?: number;
  totalDurationMinutes?: number;
  [key: string]: any; // Allow additional dynamic fields from MongoDB
}

export interface HourlyData {
  hour: number;
  avg?: number;
  min?: number;
  max?: number;
  samples?: number;
}

export interface MeasurementEntry {
  timestamp: string;
  data: any;
  [key: string]: any;
}

export interface SyncDailyDoc {
  _id: string;
  type: string;
  date: string;
  aggregate: SyncAggregate;
  dataOrigins: string[];
  hourly?: HourlyData[];
  measurements?: MeasurementEntry[];
  sessions?: any[];
  entries?: { timestamp: string; data: any }[];
}

export type HealthMethod = 
  | 'heartRate'
  | 'restingHeartRate'
  | 'vo2Max'
  | 'bloodPressure'
  | 'bodyFat'
  | 'leanBodyMass'
  | 'weight'
  | 'respiratoryRate'
  | 'oxygenSaturation'
  | 'bloodGlucose'
  | 'sleepSession'
  | 'steps';

class SyncService {
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
   * POST /sync/{method} - Push new health data to the server
   * @param method - Health data category (e.g., 'steps', 'heartRate')
   * @param data - Health record(s) to push
   */
  async pushData(method: HealthMethod, data: HealthRecord | HealthRecord[]): Promise<SyncResponse> {
    try {
      const response = await this.makeRequest<any>('POST', `/sync/${method}`, { data });
      return {
        success: true,
        data: response.data,
        message: 'Data pushed successfully',
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          success: false,
          error: error.response?.data?.message || error.message || 'Failed to push data',
        };
      }
      return {
        success: false,
        error: 'Network error occurred',
      };
    }
  }

  /**
   * POST /sync/{method}/fetch - Retrieve stored health data from the server
   * @param method - Health data category
   * @param options - Optional configuration for the fetch
   * @param options.queries - Custom queries to filter data (e.g., [{_id: "2025-10-15"}])
   * @param options.granularity - Data granularity: 'raw' for detailed data, undefined for summary
   * @param options.daysBack - Number of days to fetch back from today (default: 7)
   */
  async fetchData(
    method: HealthMethod, 
    options?: {
      queries?: Record<string, any>[];
      granularity?: 'raw';
      daysBack?: number;
    }
  ): Promise<SyncResponse<SyncDailyDoc[]>> {
    try {
      const daysBack = options?.daysBack ?? 7;

      // Calcular fecha de inicio (YYYY-MM-DD)
      const start = new Date();
      start.setDate(start.getDate() - daysBack);
      const startDate = start.toISOString().split('T')[0];

      // Si no se pasan queries, aplicar filtro por fecha (ajusta a 'date' si tu API lo espera)
      const queries =
        options?.queries && options.queries.length > 0
          ? options.queries
          : [{ _id: { $gte: startDate } }];

      const queryParams = new URLSearchParams();
      if (options?.granularity) {
        queryParams.append('granularity', options.granularity);
      }
      const queryString = queryParams.toString() ? `?${queryParams.toString()}` : '';

      const response = await this.makeRequest<SyncDailyDoc[]>(
        'POST',
        `/sync/${method}/fetch${queryString}`,
        { queries }
      );

      return {
        success: true,
        data: response.data,
        message: 'Data fetched successfully',
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          success: false,
          error: error.response?.data?.message || error.message || 'Failed to fetch data',
        };
      }
      return {
        success: false,
        error: 'Network error occurred',
      };
    }
  }

  /**
   * PATCH /sync/{method}/update - Update sub-records or specific fields
   * @param method - Health data category
   * @param updates - Data to update (usually includes record ID and updated fields)
   */
  async updateData(method: HealthMethod, updates: Partial<HealthRecord>): Promise<SyncResponse> {
    try {
      const response = await this.makeRequest<any>('PATCH', `/sync/${method}/update`, updates);
      return {
        success: true,
        data: response.data,
        message: 'Data updated successfully',
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          success: false,
          error: error.response?.data?.message || error.message || 'Failed to update data',
        };
      }
      return {
        success: false,
        error: 'Network error occurred',
      };
    }
  }

  /**
   * PUT /sync/{method}/push - Send FCM push notification to device
   * @param method - Health data category
   * @param payload - Notification payload
   */
  async sendPushNotification(method: HealthMethod, payload: Record<string, any>): Promise<SyncResponse> {
    try {
      const response = await this.makeRequest<any>('PUT', `/sync/${method}/push`, { data: payload });
      return {
        success: true,
        data: response.data,
        message: 'Push notification sent successfully',
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          success: false,
          error: error.response?.data?.message || error.message || 'Failed to send push notification',
        };
      }
      return {
        success: false,
        error: 'Network error occurred',
      };
    }
  }

  /**
   * DELETE /sync/{method}/delete - Delete records from device
   * @param method - Health data category
   * @param recordIds - IDs of records to delete from device
   */
  async deleteFromDevice(method: HealthMethod, recordIds: string[]): Promise<SyncResponse> {
    try {
      const response = await this.makeRequest<any>('DELETE', `/sync/${method}/delete`, { recordIds });
      return {
        success: true,
        data: response.data,
        message: 'Records deleted from device successfully',
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          success: false,
          error: error.response?.data?.message || error.message || 'Failed to delete from device',
        };
      }
      return {
        success: false,
        error: 'Network error occurred',
      };
    }
  }

  /**
   * DELETE /sync/{method} - Delete records from database
   * @param method - Health data category
   * @param recordIds - IDs of records to delete from database
   */
  async deleteFromDatabase(method: HealthMethod, recordIds: string[]): Promise<SyncResponse> {
    try {
      const response = await this.makeRequest<any>('DELETE', `/sync/${method}`, { recordIds });
      return {
        success: true,
        data: response.data,
        message: 'Records deleted from database successfully',
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          success: false,
          error: error.response?.data?.message || error.message || 'Failed to delete from database',
        };
      }
      return {
        success: false,
        error: 'Network error occurred',
      };
    }
  }
}

export const syncService = new SyncService();
