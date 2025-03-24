<template>
  <a-table
    :dataSource="data"
    :columns="columns"
    :pagination="pagination"
    :bordered="true"
    class="categories-table"
    @change="handleTableChange"
  >
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'actions'">
        <a-button
          type="primary"
          @click="$emit('row-detail', record.id)"
          class="detail-btn"
        >
          Details
        </a-button>
      </template>
    </template>
  </a-table>
</template>

<script setup lang="ts">
defineProps({
  data: {
    type: Array,
    required: true,
  },
  columns: {
    type: Array,
    required: true,
  },
  pagination: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["page-change", "row-detail"]);

const handleTableChange = (pag: { current: number }) => {
  emit("page-change", pag.current);
};
</script>

<style scoped lang="scss">
.categories-table {
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

  :deep(.ant-table-thead > tr > th) {
    background-color: #fafafa;
    font-weight: 500;
  }
}

.detail-btn {
  font-weight: 500;
}
</style>
