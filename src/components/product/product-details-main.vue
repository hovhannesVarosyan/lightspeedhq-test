<template>
  <div class="product-details">
    <div class="product-images">
      <img :src="mainImage" :alt="product.name" class="main-image" loading="lazy" />
      <div class="thumbnail-grid" v-if="product.media?.images?.length">
        <img
          v-for="(thumbnail, index) in product.media.images"
          :key="index"
          :src="thumbnail.imageOriginalUrl"
          :alt="`Thumbnail ${index + 1}`"
          class="thumbnail"
          @click="$emit('change-image', thumbnail.imageOriginalUrl)"
          loading="lazy"
        />
      </div>
    </div>

    <div class="product-info">
      <h1>{{ product.name }}</h1>

      <div class="price-availability">
        <p class="price">{{ product.defaultDisplayedPriceFormatted }}</p>
        <a-tag :color="product.inStock ? 'green' : 'red'">
          {{ product.inStock ? "In Stock" : "Out of Stock" }}
        </a-tag>
      </div>

      <div class="description" v-html="product.description"></div>

      <div class="actions">
        <a-button
          type="primary"
          :class="['add-to-cart-btn', { 'remove-btn': isInCart }]"
          @click="$emit('toggle-cart')"
          :disabled="!product.inStock"
        >
          {{ isInCart ? "Remove from Cart" : "Add to Cart" }}
        </a-button>
      </div>

      <div class="product-meta">
        <div v-if="product.sku" class="meta-item">
          <strong>SKU:</strong> {{ product.sku }}
        </div>
        <div class="meta-item">
          <strong>Category:</strong> {{ product.category?.name || "N/A" }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IProduct } from "@/models";

defineProps({
  product: {
    type: Object as () => IProduct,
    required: true,
  },
  mainImage: {
    type: String,
    required: true,
  },
  isInCart: {
    type: Boolean,
    default: false,
  },
});

defineEmits(["change-image", "toggle-cart"]);
</script>

<style scoped lang="scss">
.product-details {
  display: flex;
  gap: 40px;
  margin-bottom: 40px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
}

.product-images {
  flex: 1;
}

.main-image {
  width: 100%;
  height: 400px;
  object-fit: contain;
  border-radius: 8px;
  margin-bottom: 16px;
  background: #f5f5f5;
}

.thumbnail-grid {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.thumbnail {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
}

.product-info {
  flex: 1;
}

.product-info h1 {
  margin: 0;
  font-size: 28px;
  color: var(--text-primary);
}

.price {
  font-size: 24px;
  font-weight: bold;
  color: var(--color-primary);
  margin: 10px 0;
}

.description {
  font-size: 16px;
  color: var(--text-secondary);
  line-height: 1.6;
}

.actions {
  margin: 20px 0;
}

.add-to-cart-btn {
  width: 100%;
  max-width: 300px;
}

.remove-btn {
  background-color: var(--color-error);
}

.product-meta {
  margin-top: 20px;
  font-size: 14px;
  color: var(--text-secondary);

  .meta-item {
    margin-bottom: 8px;
  }
}
</style>
