<template>
  <PageLoader v-if="loading" />
  <div v-else class="container mx-auto p-6">
    <h1 class="text-3xl font-bold text-center mb-8 text-gray-800">
      {{ masterList.name }}
    </h1>

    <div class="bg-white rounded-lg shadow-lg p-6 mb-6">
      <div class="mt-4">
        <h3 class="text-lg font-semibold text-gray-700">Kategoriyalar</h3>
        <div class="flex flex-wrap gap-2 mt-2">
          <CategoryItem
            v-for="category in masterList.category"
            :key="category.id"
            :category="category"
          />
        </div>
      </div>

      <div class="mt-6">
        <h3 class="text-lg font-semibold text-gray-700">Subkategoriyalar</h3>
        <div class="flex flex-wrap gap-2 mt-2">
          <CategoryItem
            v-for="subCategory in masterList.sub_category"
            :key="subCategory.id"
            :category="subCategory"
          />
        </div>
      </div>
    </div>

    <h2 class="text-2xl font-bold text-center mb-6 text-gray-800">Ustalar</h2>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <MasterCard
        v-for="master in masterList.masters"
        :key="master.id"
        :master="master"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";
import CategoryItem from "../components/CategoryItem.vue";
import MasterCard from "../components/MasterCard.vue";
import PageLoader from "../components/PageLoader.vue";

const masterList = ref({ masters: [], category: [], sub_category: [] });
const route = useRoute();
const loading = ref(true);

onMounted(async () => {
  try {
    const response = await axios.get(
      `https://crm.greatsoft.uz/api/master_list/${route.params.id}`
    );
    masterList.value = response.data;
  } catch (error) {
    console.error("Ma'lumotlarni olishda xatolik:", error);
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
.container {
  max-width: 1200px;
}
</style>
