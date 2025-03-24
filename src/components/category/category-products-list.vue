<template>
  <div class="category-products">
    <app-loading v-if="loading" />

    <div v-else class="product-grid">
      <card-product
        v-for="(product, index) in products"
        :key="`product-${index}`"
        :product="product"
        class="product-card"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import CardProduct from "@/components/cards/card-product.vue";
import AppLoading from "@/components/ui/app-loading.vue";

defineProps({
  products: {
    type: Array,
    required: true,
  },
  loading: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped lang="scss">
.category-products {
  max-width: 1200px;
  margin: 0 auto;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  padding: 10px;
}

.loading-spinner {
  display: flex;
  justify-content: center;
  padding: 50px;
}

@media (max-width: 768px) {
  .product-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
}
</style>
