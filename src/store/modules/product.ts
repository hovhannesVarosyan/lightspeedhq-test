import { defineStore } from 'pinia'
import ApiProduct from '@/api/product'
import type { IProduct } from '@/models'

interface ProductState {
  products: IProduct[]
  product: IProduct | null
}

export const useProductStore = defineStore('product', {
  state: (): ProductState => ({
    products: [],
    product: null
  }),

  getters: {
    allProducts: (state) => state.products,
    currentProduct: (state) => state.product,
  },

  actions: {

    async loadProducts(categoryId: number) {
      try {
        const response = await ApiProduct.list(categoryId)
        this.products = response.items
      } catch (error) {
        console.error('Failed to load products:', error)
        throw error
      }
    },

    async loadProduct(id: number) {
      try {
        this.product = await ApiProduct.get(id)
      } catch (error) {
        console.error(`Failed to load product with ID ${id}:`, error)
        throw error
      }
    },

    clearCurrentProduct() {
      this.product = null
    },

    clearProducts() {
      this.products = []
    }
  }
})
