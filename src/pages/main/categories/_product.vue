<template>
  <div class="product-details-page">
    <app-loading v-if="loading" />

    <product-details-main
      v-if="!loading"
      :product="product"
      :main-image="mainImage"
      :is-in-cart="isInCart"
      @change-image="changeMainImage"
      @toggle-cart="toggleCart"
    />

    <similar-products-section
      v-if="similarProducts.length > 0"
      :products="similarProducts"
      @product-click="goToProduct"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onBeforeUnmount, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useCartStore, useProductStore } from "@/store";
import { IProduct } from "@/models";
import AppLoading from "@/components/ui/app-loading.vue";
import ProductDetailsMain from "@/components/product/product-details-main.vue";
import SimilarProductsSection from "@/components/product/similar-products-section.vue";

const route = useRoute();
const router = useRouter();
const productStore = useProductStore();
const cartStore = useCartStore();

const loading = ref(true);
const mainImage = ref("");

const product = computed<IProduct>(() => productStore.currentProduct || ({} as IProduct));
const similarProducts = computed(() =>
  productStore.products.filter((e) => e.id !== product.value.id)
);
const isInCart = computed(() =>
  cartStore.cartItems.some((item) => item.product.id === product.value.id)
);

onMounted(async () => {
  await loadProductData();
});

onBeforeUnmount(() => {
  productStore.clearCurrentProduct();
});

watch(
  () => route.params.productId,
  async (newId) => {
    if (newId) await loadProductData();
  }
);

const loadProductData = async () => {
  try {
    loading.value = true;
    const productId = route.params.productId as string;
    const categoryId = route.params.id as string;
    await Promise.all([
      productStore.loadProduct(productId),
      productStore.loadProducts(categoryId),
    ]);
    mainImage.value = product.value.imageUrl;
  } catch (error) {
    console.error("Error loading product data:", error);
  } finally {
    loading.value = false;
  }
};

const changeMainImage = (newImage: string) => {
  mainImage.value = newImage;
};

const toggleCart = () => {
  if (isInCart.value) {
    cartStore.removeFromCart(product.value.id);
  } else {
    cartStore.addToCart(product.value);
  }
};

const goToProduct = (product: IProduct) => {
  router.push(`/category/${route.params.id}/${product.id}`);
};
</script>

<style scoped lang="scss">
.product-details-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}
</style>
