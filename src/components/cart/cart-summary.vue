<template>
  <div class="cart-summary">
    <p class="total">Total: {{ total }} €</p>
    <button @click="$emit('checkout')" class="checkout-btn">Place an order</button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  total: string;
}>();

defineEmits(["checkout"]);
</script>

<style scoped>
.cart-summary {
  margin-top: 20px;
  text-align: right;
}

.total {
  font-size: 24px;
  font-weight: bold;
  color: #333;
}

.checkout-btn {
  padding: 12px 24px;
  background-color: #001529;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

.checkout-btn:hover {
  background-color: #011120;
}
</style>
