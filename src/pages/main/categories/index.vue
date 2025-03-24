<template>
  <div class="categories-page">
    <categories-data-table
      :data="categoryStore.categories.items"
      :columns="tableColumns"
      :pagination="pagination"
      @page-change="handlePageChange"
      @row-detail="handleRowDetail"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { useCategoryStore } from "@/store";
import CategoriesDataTable from "@/components/tables/categories-data-table.vue";

const categoryStore = useCategoryStore();
const router = useRouter();

const currentPage = ref(1);
const pageSize = ref(10);
const pagination = computed(() => ({
  pageSize: pageSize.value,
  current: currentPage.value,
  total: categoryStore.categories?.total || 0,
}));

const tableColumns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    width: 120,
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    ellipsis: true,
  },
  {
    title: "Product Count",
    dataIndex: "productCount",
    key: "productCount",
    align: "center",
    width: 150,
  },
  {
    title: "Actions",
    key: "actions",
    width: 120,
    align: "center",
  },
];

onMounted(async () => {
  await loadCategories();
});

const loadCategories = async () => {
  await categoryStore.list({
    pageSize: pageSize.value,
    page: currentPage.value,
  });
};

const handlePageChange = (page: number) => {
  currentPage.value = page;
  loadCategories();
};

const handleRowDetail = (id: number) => {
  router.push(`/category/${id}`);
};
</script>

<style scoped lang="scss">
.categories-page {
  padding: 20px;
  background: #f6f6f6;
  min-height: 100vh;
}
</style>
