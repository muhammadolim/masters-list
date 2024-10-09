<template>
  <PageLoader v-if="loading" />
  <div v-else class="container mx-auto p-6">
    <!-- Master Name -->
    <h1 class="text-4xl font-bold text-center mb-10 text-gray-900">
      {{ master.name }}
    </h1>

    <div class="flex justify-between mb-4">
      <button
        @click="goBack"
        class="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
      >
        &larr; Orqaga qaytish
      </button>

      <a
        :href="`tel:${master.phone_number}`"
        class="bg-green-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-green-700 transition duration-200"
      >
        Qo'ng'iroq qilish &#128222;
      </a>
    </div>

    <div class="bg-white rounded-lg shadow-xl p-8 mb-8">
      <div class="flex justify-between max-md:flex-col">
        <div class="grid grid-cols-[auto,1fr] gap-y-4 gap-x-8 mb-8">
          <div class="font-bold text-lg text-gray-700">Telefon raqami:</div>
          <div>{{ master.phone_number }}</div>

          <div class="font-bold text-lg text-gray-700">Narxi:</div>
          <div>{{ formatPrice(master.workers_price) }}</div>

          <div class="font-bold text-lg text-gray-700">Viloyat:</div>
          <div>{{ master.viloyat }}</div>

          <div class="font-bold text-lg text-gray-700">Ishlar soni:</div>
          <div>{{ master.caount_of_jobs }}</div>
        </div>

        <!-- <div class="flex">
          <img
            v-if="master.passport_photo"
            :src="imgUrl"
            alt="Master Photo"
            class="w-40 h-40 rounded-md shadow-sm object-cover"
          />

          <img
            v-if="master.passport_with_person_photo"
            :src="master.passport_with_person_photo"
            alt="Master Photo"
            class="w-40 h-40 rounded-md shadow-sm object-cover ml-4"
          />
        </div> -->
      </div>

      <!-- Rating Information -->
      <div class="mb-8">
        <h3 class="text-2xl font-semibold mb-4">Reytinglar:</h3>
        <div class="grid grid-cols-[auto,1fr] gap-y-2 gap-x-8">
          <div class="font-bold text-lg text-gray-700 mb-4">
            Umumiy Reyting:
          </div>
          <div>
            <StarRating class="mb-4" :rating="master.total_rating" />
          </div>

          <div class="font-bold text-lg text-gray-700">Ish sifatlari:</div>
          <div>
            <StarRating :rating="master.quality_of_work" />
          </div>

          <div class="font-bold text-lg text-gray-700">
            Vaqtida yetib kelish:
          </div>
          <div><StarRating :rating="master.punctuality" /></div>

          <div class="font-bold text-lg text-gray-700">Muloyimlik:</div>
          <div><StarRating :rating="master.politeness" /></div>
        </div>
      </div>

      <!-- Master Categories -->
      <div v-if="master.master_categories?.length" class="mt-8">
        <h3 class="text-xl font-semibold mb-2">Kategoriyalar</h3>
        <div class="flex gap-2 flex-wrap">
          <CategoryItem
            v-for="category in master.master_categories"
            :key="category.id"
            :category="category"
          />
        </div>
      </div>

      <!-- Master Subcategories -->
      <div v-if="master.master_sub_categories?.length" class="mt-8">
        <h3 class="text-xl font-semibold mb-2">Subkategoriyalar</h3>
        <div class="flex gap-2 flex-wrap">
          <CategoryItem
            v-for="subCategory in master.master_sub_categories"
            :key="subCategory.id"
            :category="subCategory"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";

import PageLoader from "../components/PageLoader.vue";
import StarRating from "../components/StarRating.vue";
import CategoryItem from "../components/CategoryItem.vue";

const master = ref({});
const route = useRoute();
const router = useRouter(); // Add this to use router
const loading = ref(true);

const imgUrl = ref();

onMounted(async () => {
  try {
    const response = await axios.get(
      `https://crm.greatsoft.uz/api/masters/${route.params.id}`
    );
    master.value = response.data;
    formatImage(master.value.passport_photo);
  } catch (error) {
    console.error("Failed to fetch master details:", error);
  } finally {
    loading.value = false;
  }
});

const formatPrice = (price) => {
  return price > 0 ? `${price.toLocaleString()} UZS` : "Yoʻq";
};

const formatImage = (photo) => {
  const byteString = atob(photo.split(",")[1]);
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  const blob = new Blob([ab], { type: "image/png" });
  imgUrl.value = URL.createObjectURL(blob);
};

// Add goBack method to navigate back
const goBack = () => {
  router.go(-1); // Go back to the previous page
};
</script>
