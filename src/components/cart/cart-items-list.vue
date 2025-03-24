<template>
  <div class="cart-items">
    <cart-item
      v-for="item in items"
      :key="item.product.id"
      :cart="item"
      @remove-item="$emit('remove-item', $event)"
    />
  </div>
</template>

<script setup lang="ts">
import CartItem from "@/components/cart/cart-item.vue";

defineProps<{
  items: CartItem[];
}>();

defineEmits(["remove-item"]);
</script>

<style scoped>
.cart-items {
  margin-top: 20px;
}
</style>
