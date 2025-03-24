<template>
  <MainLayout>
    <a-result
      status="404"
      title="404"
      sub-title="Sorry, the page you visited does not exist."
    >
      <template #extra>
        <router-link to="/categories">Back Categories</router-link>
      </template>
    </a-result>
  </MainLayout>
</template>
<script setup lang="ts">
import MainLayout from "./main-layout.vue";
</script>
