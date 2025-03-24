import type { ICategory, IPagination } from "@/models";
import { apiClient } from "./client";

export default {
  async list(params?: { page?: number; pageSize?: number }): Promise<IPagination<ICategory[]>> {
    const queryParams = new URLSearchParams();

    if (params?.page) {
      queryParams.append('page', params.page.toString());
    }

    if (params?.pageSize) {
      queryParams.append('pageSize', params.pageSize.toString());
    }

    const url = `/categories${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    const data = await apiClient.get<IPagination<ICategory[]>>(url);
    return data;
  }
};
