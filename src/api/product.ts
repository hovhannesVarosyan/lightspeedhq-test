import type { IPagination, IProduct } from "@/models";
import { apiClient } from "./client";

export default {
  async list(id: number): Promise<IPagination<IProduct[]>> {
    const data = await apiClient.get<IPagination<IProduct[]>>(`/products?category=${id}`);
    return data;
  },

  async get(id: number): Promise<IProduct> {
    const data = await apiClient.get<IProduct>(`/products/${id}`);
    return data;
  }
};
