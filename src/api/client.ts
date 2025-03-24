import axios from 'axios';
import type { AxiosInstance, AxiosRequestConfig } from 'axios';

const storeId: string = import.meta.env.VITE_ECWID_STORE_ID;
const accessToken: string = import.meta.env.VITE_ECWID_ACCESS_TOKEN;

class ApiClient {
  private readonly instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: `https://app.ecwid.com/api/v3/${storeId}/`,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      }
    });

    this.initializeInterceptors();
  }

  private initializeInterceptors(): void {
    this.instance.interceptors.request.use(
      (config) => {
        if (config.headers) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => {
        console.error('Request Error:', error.message);
        return Promise.reject(error);
      }
    );

    this.instance.interceptors.response.use(
      (response) => response.data,
      (error) => Promise.reject(error)
    );
  }

  public get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.get(url, config);
  }

  public post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.post(url, data, config);
  }

  public put<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.put(url, data, config);
  }

  public delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.delete(url, config);
  }
}

export const apiClient = new ApiClient();
