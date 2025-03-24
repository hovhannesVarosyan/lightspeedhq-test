<template>
  <canvas ref="canvas" class="confetti-canvas" aria-hidden="true" />
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import confetti from "canvas-confetti";

const canvas = ref<HTMLCanvasElement | null>(null);

const fire = () => {
  if (!canvas.value) return;

  const myConfetti = confetti.create(canvas.value, {
    resize: true,
    useWorker: true,
  });

  myConfetti({
    particleCount: 150,
    spread: 70,
    origin: { y: 0.6 },
    colors: ["#42b983", "#1890ff", "#52c41a", "#faad14", "#f5222d"],
  });
};

defineExpose({ fire });
</script>

<style scoped>
.confetti-canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1000;
}
</style>
