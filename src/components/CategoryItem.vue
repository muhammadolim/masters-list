<template>
  <div class="bg-blue-200 rounded-full px-4 py-1 text-gray-800 text-center">
    {{ category.name }}
  </div>
</template>

<script setup>
import { defineProps } from "vue";

defineProps({
  category: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped>
/* Add any specific styles for CategoryItem here */
</style>
