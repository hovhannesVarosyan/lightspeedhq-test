import { defineStore } from 'pinia';
import ApiCategory from '@/api/category';
import type { ICategory, IPagination } from '@/models';

interface CategoryState {
  categories: IPagination<ICategory[]>;
}

export const useCategoryStore = defineStore('category', {
  state: (): CategoryState => ({
    categories: { items: [], total: 0 }
  }),
  actions: {
    async list(params?: { page?: number; pageSize?: number }) {
      try {
        this.categories = await ApiCategory.list(params);
      } catch (error) {
        console.error('Failed to load categories:', error);
        throw error;
      }
    }
  }
});
