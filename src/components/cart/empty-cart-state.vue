<template>
  <div class="empty-cart">
    <p>Your cart is empty.</p>
    <button @click="$emit('continue-shopping')" class="shop-btn">
      Continue Shopping
    </button>
  </div>
</template>

<script setup lang="ts">
defineEmits(["continue-shopping"]);
</script>

<style scoped>
.empty-cart {
  text-align: center;
  margin-top: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.empty-cart p {
  font-size: 20px;
  font-weight: 500;
  color: #666;
}
</style>
