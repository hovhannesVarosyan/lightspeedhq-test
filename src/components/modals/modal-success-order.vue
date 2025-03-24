<template>
  <a-modal
    :visible="modelValue"
    title="Order Successful!"
    :footer="null"
    centered
    :closable="false"
    @cancel="handleClose"
  >
    <div class="success-modal-content">
      <a-result status="success" :title="title">
        <template #icon>
          <div class="success-icon">
            <check-circle-filled style="font-size: 72px; color: #52c41a" />
          </div>
        </template>
      </a-result>
      <a-button type="primary" block @click="handleContinue" class="continue-btn">
        Continue Shopping
      </a-button>
    </div>
  </a-modal>
</template>

<script setup lang="ts">
import { CheckCircleFilled } from "@ant-design/icons-vue";

defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  title: {
    type: String,
    default: "Thank you for your purchase!",
  },
});

const emit = defineEmits(["update:modelValue", "continue"]);

const handleContinue = () => {
  emit("update:modelValue", false);
  emit("continue");
};

const handleClose = () => {
  emit("update:modelValue", false);
};
</script>

<style scoped>
.success-modal-content {
  text-align: center;
}

.success-icon {
  margin-bottom: 24px;
  animation: bounce 0.5s;
}

.order-details {
  margin: 24px 0;
  padding: 16px;
  background-color: #f6f6f6;
  border-radius: 8px;
}

.continue-btn {
  margin-top: 16px;
}

@keyframes bounce {
  0%,
  20%,
  50%,
  80%,
  100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-30px);
  }
  60% {
    transform: translateY(-15px);
  }
}
</style>
