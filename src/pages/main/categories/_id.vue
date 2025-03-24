<template>
  <div class="category-products-page">
    <category-products-list :products="productStore.products" :loading="loading" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useRoute } from "vue-router";
import { useProductStore } from "@/store";
import CategoryProductsList from "@/components/category/category-products-list.vue";

const productStore = useProductStore();
const route = useRoute();
const loading = ref(false);

onMounted(async () => {
  await loadProducts();
});

onBeforeUnmount(() => {
  productStore.$reset();
});

const loadProducts = async (): Promise<void> => {
  const categoryId = route.params.id as string;
  try {
    loading.value = true;
    await productStore.loadProducts(categoryId);
  } catch (error) {
    console.error("Error loading products:", error);
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped lang="scss">
.category-products-page {
  padding: 20px;
  background: #f6f6f6;
  min-height: 100vh;
}
</style>
