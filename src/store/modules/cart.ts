import { defineStore } from 'pinia';
import { notification } from 'ant-design-vue';
import type { ICartItem, IProduct } from '@/models';

const CART_ITEMS_KEY = "cartItems";

interface CartState {
  cartItems: ICartItem[];
}

export const useCartStore = defineStore('cart', {
  state: (): CartState => ({
    cartItems: JSON.parse(localStorage.getItem(CART_ITEMS_KEY) || '[]'),
  }),

  getters: {
    isProductInCart: (state) => (productId: number) => {
      return state.cartItems.some(item => item.product.id === productId);
    },
    cartTotalItems: (state) => {
      return state.cartItems.reduce((total, item) => total + item.quantity, 0);
    },
  },

  actions: {
    loadCartItems() {
      const storedItems = localStorage.getItem(CART_ITEMS_KEY);
      if (storedItems) {
        this.cartItems = JSON.parse(storedItems);
      }
    },

    addToCart(product: IProduct) {
      const existingItem = this.cartItems.find(item => item.product.id === product.id);

      if (existingItem) {
        existingItem.quantity += 1;
        notification.success({
          message: 'Quantity Updated',
          description: `"${product.name}" was already in your cart. Quantity increased to ${existingItem.quantity}.`,
        });
      } else {
        this.cartItems.push({ product, quantity: 1 });
        notification.success({
          message: 'Product Added',
          description: `"${product.name}" has been added to your cart.`,
          duration: 2,
        });
      }
      this.persistCart();
    },

    removeFromCart(productId: number) {
      const itemToRemove = this.cartItems.find(item => item.product.id === productId);
      if (!itemToRemove) return;

      this.cartItems = this.cartItems.filter(item => item.product.id !== productId);
      this.persistCart();

      notification.warning({
        message: 'Product Removed',
        description: `"${itemToRemove.product.name}" has been removed from your cart.`,
        duration: 2,
      });
    },

    clearCart() {
      this.cartItems = [];
      localStorage.removeItem(CART_ITEMS_KEY);
    },

    persistCart() {
      localStorage.setItem(CART_ITEMS_KEY, JSON.stringify(this.cartItems));
    },

    updateQuantity(productId: number, newQuantity: number) {
      const item = this.cartItems.find(item => item.product.id === productId);
      if (item && newQuantity > 0) {
        const action = newQuantity > item.quantity ? 'increased' : 'decreased';
        item.quantity = newQuantity;
        this.persistCart();

        notification.success({
          message: 'Quantity Updated',
          description: `Quantity of "${item.product.name}" has been ${action} to ${newQuantity}.`,
          duration: 2,
        });
      }
    },
  }
});
