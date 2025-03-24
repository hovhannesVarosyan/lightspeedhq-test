<template>
  <div class="loading-container">
    <a-spin size="large" class="loading-spinner" />
  </div>
</template>

<style scoped>
.loading-container {
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 1;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
