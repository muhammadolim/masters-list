<template>
  <div
    class="grid gap-3 bg-white text-gray-600 rounded-lg shadow-md p-4 transition-transform duration-300 transform hover:scale-105 cursor-pointer"
    @click="goToMasterDetails(master.id)"
  >
    <h3 class="text-lg font-semibold text-gray-800">{{ master.name }}</h3>

    <!-- Use grid layout for additional information -->
    <div class="grid grid-cols-[auto,1fr] gap-y-2 gap-x-4 mt-2">
      <div class="font-bold">Reyting:</div>
      <div class="flex items-center gap-2">
        <StarRating :rating="master.total_rating" />
      </div>

      <div class="font-bold">Ishlar soni:</div>
      <div class="font-bold">{{ master.caount_of_jobs }}</div>

      <div class="font-bold">Viloyat:</div>
      <div class="font-bold">{{ master.viloyat }}</div>

      <div class="font-bold">Narxi:</div>
      <div class="font-bold">{{ formatPrice(master.workers_price) }}</div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import { useRouter } from "vue-router";
import StarRating from "./StarRating.vue";

defineProps({
  master: {
    type: Object,
    required: true,
  },
});

const router = useRouter();

const goToMasterDetails = (id) => {
  router.push(`/master/${id}`);
};

const formatPrice = (price) => {
  return price > 0 ? `${price.toLocaleString()} UZS` : "Yoʻq";
};
</script>
