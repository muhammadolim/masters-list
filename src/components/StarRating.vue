<template>
  <span class="flex space-x-1">
    <template v-for="i in 5" :key="i">
      <svg
        v-if="i <= rating"
        xmlns="http://www.w3.org/2000/svg"
        :class="`h-${size} w-${size} text-yellow-500`"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          d="M0,0.054V20h21V0.054H0z M15.422,18.129l-5.264-2.768l-5.265,2.768l1.006-5.863L1.64,8.114l5.887-0.855
	l2.632-5.334l2.633,5.334l5.885,0.855l-4.258,4.152L15.422,18.129z"
        />
      </svg>
      <svg
        v-else
        xmlns="http://www.w3.org/2000/svg"
        :class="`h-${size} w-${size} text-gray-300`"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          d="M0,0.054V20h21V0.054H0z M15.422,18.129l-5.264-2.768l-5.265,2.768l1.006-5.863L1.64,8.114l5.887-0.855
	l2.632-5.334l2.633,5.334l5.885,0.855l-4.258,4.152L15.422,18.129z"
        />
      </svg>
    </template>
  </span>
</template>

<script setup>
import { defineProps } from "vue";

defineProps({
  rating: {
    type: Number,
    required: true,
  },
  size: {
    type: Number,
    default: 5,
  },
});
</script>

<style scoped>
/* Add any specific styles for StarRating here */
</style>
