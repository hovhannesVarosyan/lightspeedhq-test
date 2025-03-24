<template>
  <div class="cart-page">
    <confetti-canvas ref="confetti" />

    <h1>Cart</h1>
    <empty-cart-state v-if="isEmptyCart" @continue-shopping="navigateToCategories" />
    <template v-else>
      <cart-items-list :items="cartStore.cartItems" @remove-item="removeFromCart" />
      <cart-summary :total="totalPrice" @checkout="handleCheckout" />
    </template>

    <modal-success-order v-model:visible="showSuccessModal" @continue="closeModal" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useCartStore } from "@/store";
import ConfettiCanvas from "@/components/common/confetti-canvas.vue";
import EmptyCartState from "@/components/cart/empty-cart-state.vue";
import CartItemsList from "@/components/cart/cart-items-list.vue";
import CartSummary from "@/components/cart/cart-summary.vue";
import ModalSuccessOrder from "@/components/modals/modal-success-order.vue";

const cartStore = useCartStore();
const router = useRouter();
const confetti = ref();
const showSuccessModal = ref(false);

const isEmptyCart = computed(() => cartStore.cartItems.length === 0);
const totalPrice = computed<string>(() => {
  return cartStore.cartItems
    .reduce(
      (total, item) =>
        total + parseFloat(item.product.defaultDisplayedPrice.toString()) * item.quantity,
      0
    )
    .toFixed(2);
});

onMounted(async () => {
  await cartStore.loadCartItems();
});

const removeFromCart = (itemId: number) => {
  cartStore.removeFromCart(itemId);
};

const handleCheckout = () => {
  confetti.value.fire();
  setTimeout(() => {
    showSuccessModal.value = true;
  }, 800);
  cartStore.clearCart();
};

const closeModal = () => {
  showSuccessModal.value = false;
};

const navigateToCategories = () => {
  router.push("/categories");
};
</script>

<style scoped>
.cart-page {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
  position: relative;
}
</style>
