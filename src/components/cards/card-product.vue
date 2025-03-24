<template>
  <div class="product-card">
    <a-card hoverable class="card">
      <template #cover>
        <router-link
          :to="`/category/${route.params.id}/${product.id}`"
          class="product-link"
        >
          <img
            :src="product.imageUrl"
            :alt="product.name"
            class="product-image"
            loading="lazy"
          />
        </router-link>
      </template>

      <a-card-meta :title="product.name" class="product-meta">
        <template #description>
          <div class="product-info">
            <p class="price">{{ product.defaultDisplayedPriceFormatted }}</p>
            <p v-if="product.inStock" class="stock in-stock">In Stock</p>
            <p v-else class="stock out-of-stock">Out of Stock</p>
          </div>
        </template>
      </a-card-meta>

      <a-button
        type="primary"
        :class="['add-to-cart-btn', { 'remove-btn': isInCart }]"
        block
        @click.stop="toggleCart"
        :disabled="!product.inStock"
      >
        {{ isInCart ? "Remove from cart" : "Add to cart" }}
      </a-button>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { IProduct } from "@/models";
import { useCartStore } from "@/store";
import { computed } from "vue";
import { useRoute } from "vue-router";

const props = defineProps<{
  product: IProduct;
}>();

const route = useRoute();
const cartStore = useCartStore();

const isInCart = computed(() =>
  cartStore.cartItems.some((item) => item.product.id === props.product.id)
);

const toggleCart = () => {
  if (isInCart.value) {
    cartStore.removeFromCart(props.product.id);
  } else {
    cartStore.addToCart(props.product);
  }
};
</script>

<style scoped>
.product-card {
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
}

.card {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.product-link {
  display: block;
}

.product-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.product-image:hover {
  transform: scale(1.02);
}

.product-meta {
  margin-bottom: 12px;
}

.product-info {
  text-align: left;
}

.price {
  font-weight: 600;
  color: #42b983;
  margin-bottom: 4px;
}

.stock {
  font-size: 12px;
  margin-bottom: 0;
}

.in-stock {
  color: #52c41a;
}

.out-of-stock {
  color: #ff4d4f;
}

.cart-btn {
  margin-top: auto;
  transition: all 0.3s ease;
}

.cart-btn.remove-btn {
  background-color: #ff4d4f;
  border-color: #ff4d4f;
}

.cart-btn.remove-btn:hover {
  background-color: #ff7875;
  border-color: #ff7875;
}

.cart-btn:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}
</style>
