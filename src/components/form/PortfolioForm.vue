<template>
  <div class="portfolio-form">
    <!-- Portfolio inputs -->
    <el-form-item
      label="Portfolio Nomi"
      label-position="top"
      class="form-label text-2xl"
    >
      <el-input
        v-model="portfolio.title"
        placeholder="Portfolio nomini kiriting"
        class="text-xl p-2"
      ></el-input>
    </el-form-item>

    <el-form-item label="Izoh" label-position="top" class="form-label text-2xl">
      <el-input
        v-model="portfolio.description"
        placeholder="Izoh kiriting"
        class="text-xl p-2"
      ></el-input>
    </el-form-item>

    <el-form-item label="Sana" label-position="top" class="form-label text-2xl">
      <el-date-picker
        v-model="portfolio.date"
        type="date"
        placeholder="Sana tanlang"
        format="YYYY/MM/DD"
        value-format="YYYY-MM-DD"
        class="text-xl p-2"
      ></el-date-picker>
    </el-form-item>

    <el-form-item label="Rasm" label-position="top" class="form-label text-2xl">
      <el-upload
        :file-list="portfolio.fileList"
        :on-change="onFileChange"
        accept="image/*"
        :limit="1"
        :on-exceed="handleExceed"
      >
        <el-button type="primary" class="text-xl p-3">Rasm tanlang</el-button>
      </el-upload>
    </el-form-item>

    <el-button type="danger" @click="$emit('remove', index)">
      O'chirish
    </el-button>
  </div>
</template>

<script setup>
import { defineProps, ref } from "vue";

const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
});

// const emit = defineEmits(["update:modelValue"]);

const portfolio = ref([...props.modelValue]);

const onFileChange = (file) => {
  if (file) {
    const reader = new FileReader();
    reader.onloadend = () => {
        portfolio.value.image = reader.result;
    };
    reader.readAsDataURL(file.raw || file);
  }
};

const handleExceed = (files) => {
  const newFile = files[files.length - 1];
  portfolio.value.fileList = [newFile];
  onFileChange({ file: newFile });
};
</script>

<style scoped>
.portfolio-form {
  margin-bottom: 20px;
  border: 1px solid #ebeef5;
  padding: 20px;
  border-radius: 4px;
}
</style>
