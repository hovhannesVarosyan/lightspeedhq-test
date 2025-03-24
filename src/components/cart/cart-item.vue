<template>
  <div class="cart-item">
    <router-link
      :to="`/category/${cart.product.defaultCategoryId}/${cart.product.id}`"
      class="item-image"
    >
      <img :src="cart.product.imageUrl" :alt="cart.product.name" />
    </router-link>

    <div class="item-details">
      <h3>{{ cart.product.name }}</h3>
      <p class="price">{{ cart.product.defaultDisplayedPriceFormatted }}</p>
    </div>
    <button @click="removeItem" class="remove-btn">
      <DeleteOutlined />
    </button>
  </div>
</template>

<script setup lang="ts">
import { DeleteOutlined } from "@ant-design/icons-vue";
const props = defineProps({
  cart: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["remove-item"]);

const removeItem = () => {
  emit("remove-item", props.cart.product.id);
};
</script>

<style scoped lang="scss">
.cart-item {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 1rem;
  margin-bottom: 1rem;
  background: #fff;
  border-radius: 0.75rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
}

.item-image {
  width: 5rem;
  height: 5rem;
  object-fit: cover;
  border-radius: 0.5rem;
}

.item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.item-details {
  flex-grow: 1;
  min-width: 0;
}

.remove-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  padding: 0;
  background: transparent;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #f5f5f5;

    .icon {
      color: #ff4d4f;
    }
  }
}

.icon {
  width: 1.25rem;
  height: 1.25rem;
  color: #999;
  transition: color 0.2s ease;
}
</style>
