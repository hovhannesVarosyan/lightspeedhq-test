<template>
  <div class="similar-products">
    <h2>Similar Products</h2>
    <div class="similar-products-grid">
      <card-product
        v-for="product in products"
        :key="product.id"
        :product="product"
        @click="$emit('product-click', product)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IProduct } from "@/models";
import CardProduct from "@/components/cards/card-product.vue";

defineProps({
  products: {
    type: Array as () => IProduct[],
    required: true,
  },
});

defineEmits(["product-click"]);
</script>

<style scoped lang="scss">
.similar-products {
  margin-top: 40px;
  padding-top: 40px;
  border-top: 1px solid var(--border-color);

  h2 {
    font-size: 24px;
    color: var(--text-primary);
    margin-bottom: 20px;
  }
}

.similar-products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
}
</style>
