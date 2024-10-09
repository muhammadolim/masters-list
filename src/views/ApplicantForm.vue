<template>
  <div class="container mx-auto p-6">
    <el-row>
      <el-col :span="24">
        <h1 class="text-5xl font-bold text-center mb-10 text-gray-900">
          Ariza Formasi
        </h1>
      </el-col>
    </el-row>

    <el-form
      ref="formRef"
      :model="applicant"
      @submit.prevent="submitAll"
      :rules="rules"
      label-width="180px"
      class="text-xl"
    >
      <el-row :gutter="20">
        <el-col :md="12" :span="24">
          <el-form-item
            label="Ism"
            prop="name"
            label-position="top"
            class="form-label text-2xl"
          >
            <el-input
              v-model="applicant.name"
              placeholder="Ismingizni kiriting"
              class="text-xl p-2"
            ></el-input>
          </el-form-item>
        </el-col>

        <el-col :md="12" :span="24">
          <el-form-item
            label="Telefon Raqami"
            prop="phone_number"
            label-position="top"
            class="form-label text-2xl"
          >
            <el-input
              v-model="applicant.phone_number"
              placeholder="Telefon raqamingizni kiriting"
              type="tel"
              class="text-xl p-2"
            ></el-input>
          </el-form-item>
        </el-col>

        <el-col :md="12" :span="24">
          <el-form-item
            label="Narxi"
            prop="workers_price"
            label-position="top"
            class="form-label text-2xl"
          >
            <el-input
              v-model="applicant.workers_price"
              placeholder="Narxni kiriting"
              type="text"
              :formatter="priceFormatter"
              @input="validateNumberInput('workers_price')"
              class="text-xl p-2"
            ></el-input>
          </el-form-item>
        </el-col>

        <el-col :md="12" :span="24">
          <el-form-item
            label="Kasb Nomi"
            prop="workers_job"
            label-position="top"
            class="form-label text-2xl"
          >
            <el-input
              v-model="applicant.workers_job"
              placeholder="Kasb nomini kiriting"
              class="text-xl p-2"
            ></el-input>
          </el-form-item>
        </el-col>

        <el-col :md="12" :span="24">
          <el-form-item
            label="Viloyat"
            prop="viloyat"
            label-position="top"
            class="form-label text-2xl"
          >
            <el-select
              v-model="applicant.viloyat"
              placeholder="Viloyat tanlang"
              class="text-xl p-2"
            >
              <el-option
                v-for="viloyat in viloyatlar"
                :key="viloyat.value"
                :label="viloyat.label"
                :value="viloyat.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :md="12" :span="24">
          <el-form-item
            label="Tajribasi"
            prop="experience"
            label-position="top"
            class="form-label text-2xl"
          >
            <el-input
              v-model="applicant.experience"
              placeholder="Tajribangizni kiriting"
              class="text-xl p-2"
            ></el-input>
          </el-form-item>
        </el-col>

        <el-col :md="12" :span="24">
          <el-form-item
            label="Kategoriyalar"
            prop="master_category_ids"
            label-position="top"
            class="form-label text-2xl"
          >
            <el-select
              v-model="applicant.master_category_ids"
              multiple
              placeholder="Kategoriya tanlang"
              @change="onCategoryChange"
              class="text-xl p-2"
            >
              <el-option
                v-for="category in masterCategories"
                :key="category.id"
                :label="category.name"
                :value="category.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :md="12" :span="24">
          <el-form-item
            label="Subkategoriyalar"
            prop="master_sub_category_ids"
            label-position="top"
            class="form-label text-2xl"
          >
            <el-select
              v-model="applicant.master_sub_category_ids"
              multiple
              placeholder="Subkategoriya tanlang"
              class="text-xl p-2"
            >
              <el-option
                v-for="subCategory in filteredSubCategories"
                :key="subCategory.id"
                :label="subCategory.name"
                :value="subCategory.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :md="12" :span="24">
          <el-form-item
            label="Pasport Rasm"
            prop="passport_photo"
            label-position="top"
            class="form-label text-2xl"
          >
            <el-upload
              :file-list="passportPhotoFileList"
              :http-request="uploadFile('passport_photo')"
              :on-change="(file) => onFileChange('passport_photo', file)"
              accept="image/*"
              :limit="1"
              :on-exceed="
                (files, fileList) => handleExceed('passport_photo', files)
              "
            >
              <el-button type="primary" class="text-xl p-3">
                Faylni tanlang
              </el-button>
            </el-upload>
          </el-form-item>
        </el-col>

        <el-col :md="12" :span="24">
          <el-form-item
            label="Pasport va Shaxsiy Rasm"
            prop="passport_with_person_photo"
            label-position="top"
            class="form-label text-2xl"
          >
            <el-upload
              :file-list="passportWithPersonPhotoFileList"
              :http-request="uploadFile('passport_with_person_photo')"
              :on-change="
                (file) => onFileChange('passport_with_person_photo', file)
              "
              accept="image/*"
              :limit="1"
              :on-exceed="
                (files, fileList) =>
                  handleExceed('passport_with_person_photo', files)
              "
            >
              <el-button type="primary" class="text-xl p-3">
                Faylni tanlang
              </el-button>
            </el-upload>
          </el-form-item>
        </el-col>

        <!-- Portfolio section -->
        <el-col :md="12" :span="24">
          <el-form-item
            label="Portfolio Nomi"
            prop="portfolio_title"
            label-position="top"
            class="form-label text-2xl"
          >
            <el-input
              v-model="portfolio.title"
              placeholder="Portfolio nomini kiriting"
              class="text-xl p-2"
            ></el-input>
          </el-form-item>
        </el-col>

        <el-col :md="12" :span="24">
          <el-form-item
            label="Izoh"
            prop="portfolio_description"
            label-position="top"
            class="form-label text-2xl"
          >
            <el-input
              v-model="portfolio.description"
              placeholder="Izoh kiriting"
              class="text-xl p-2"
            ></el-input>
          </el-form-item>
        </el-col>

        <el-col :md="12" :span="24">
          <el-form-item
            label="Sana"
            prop="portfolio_date"
            label-position="top"
            class="form-label text-2xl"
          >
            <el-date-picker
              v-model="portfolio.date"
              type="date"
              placeholder="Sana tanlang"
              format="YYYY/MM/DD"
              value-format="YYYY-MM-DD"
              class="text-xl p-2"
            ></el-date-picker>
          </el-form-item>
        </el-col>

        <el-col :md="12" :span="24">
          <el-form-item
            label="Rasm"
            prop="portfolio_image"
            label-position="top"
            class="form-label text-2xl"
          >
            <el-upload
              :file-list="portfolioPhotoFileList"
              :http-request="uploadFile('portfolio_image')"
              :on-change="(file) => onFileChange('portfolio_image', file)"
              accept="image/*"
              :limit="1"
              :on-exceed="
                (files, fileList) => handleExceed('portfolio_image', files)
              "
            >
              <el-button type="primary" class="text-xl p-3">
                Rasm tanlang
              </el-button>
            </el-upload>
          </el-form-item>
        </el-col>

        <!-- Submit button for both applicant and portfolio -->
        <el-col :span="24">
          <div class="text-center mt-8">
            <el-button
              type="success"
              @click="submitAll"
              class="text-3xl px-7 py-5"
            >
              Arizani Jo'natish
            </el-button>
          </div>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import axios from "axios";
import { ElMessage } from "element-plus";
import { viloyatlar } from "../utils/index.js";

const formRef = ref();

const filteredSubCategories = computed(() => {
  return masterSubCategories.value.filter((subCategory) =>
    applicant.value.master_category_ids.includes(subCategory.category_id)
  );
});

const applicant = ref({
  name: "",
  phone_number: "",
  workers_price: "",
  workers_job: "",
  viloyat: "",
  experience: "",
  master_category_ids: [],
  master_sub_category_ids: [],
  passport_photo: null,
  passport_with_person_photo: null,
});

const portfolio = ref({
  title: "",
  description: "",
  image: null,
  date: null,
});

const masterCategories = ref([]);
const masterSubCategories = ref([]);

const rules = {
  // Existing rules for the applicant form
  name: [{ required: true, message: "Ismingizni kiriting", trigger: "blur" }],
  phone_number: [
    {
      required: true,
      message: "Telefon raqamingizni kiriting",
      trigger: "blur",
    },
  ],
  workers_price: [
    { required: true, message: "Narxni kiriting", trigger: "blur" },
  ],
  workers_job: [
    { required: true, message: "Kasb nomini kiriting", trigger: "blur" },
  ],
  viloyat: [{ required: true, message: "Viloyatni tanlang", trigger: "blur" }],
  experience: [
    { required: true, message: "Tajribangizni kiriting", trigger: "blur" },
  ],
  master_category_ids: [
    { required: true, message: "Kategoriya tanlang", trigger: "blur" },
  ],
  master_sub_category_ids: [
    { required: true, message: "Subkategoriya tanlang", trigger: "blur" },
  ],
};

const fetchCategories = async () => {
  try {
    const [categoriesResponse, subcategoriesResponse] = await Promise.all([
      axios.get("https://crm.greatsoft.uz/api/master/categories"),
      axios.get("https://crm.greatsoft.uz/api/master/subcategories"),
    ]);
    masterCategories.value = categoriesResponse.data.categories;
    masterSubCategories.value = subcategoriesResponse.data.subcategories;
  } catch (error) {
    ElMessage.error("Kategoriyalarni olishda xato: " + error.message);
  }
};

const passportPhotoFileList = ref([]);
const passportWithPersonPhotoFileList = ref([]);
const portfolioPhotoFileList = ref([]);

const handleExceed = (key, files) => {
  const newFile = files[files.length - 1];

  if (key === "passport_photo") {
    passportPhotoFileList.value = [newFile];
  } else if (key === "passport_with_person_photo") {
    passportWithPersonPhotoFileList.value = [newFile];
  } else if (key === "portfolio_image") {
    portfolioPhotoFileList.value = [newFile];
  }

  onFileChange(key, { file: newFile });
};

const onFileChange = (key, event) => {
  const file = event.file;
  if (file) {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (key === "portfolio_image") {
        portfolio.value.image = reader.result;
      } else {
        applicant.value[key] = reader.result;
      }
    };
    reader.readAsDataURL(file.raw || file);
  }
};

const uploadFile = (key) => (options) => {
  const { file } = options;
  const reader = new FileReader();
  reader.onloadend = () => {
    if (key === "portfolio_image") {
      portfolio.value.image = reader.result;
    } else {
      applicant.value[key] = reader.result;
    }
  };
  reader.readAsDataURL(file);
};
const onCategoryChange = () => {
  applicant.value.master_sub_category_ids =
    applicant.value.master_sub_category_ids.filter((subCategoryId) => {
      const subCategory = masterSubCategories.value.find(
        (sub) => sub.id === subCategoryId
      );
      return (
        subCategory &&
        applicant.value.master_category_ids.includes(subCategory.category_id)
      );
    });
};

const priceFormatter = (value) => {
  if (!value) return "";
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};

const validateNumberInput = (key) => {
  const value = applicant.value[key];
  if (value && !/^[\d ]*$/.test(value)) {
    applicant.value[key] = value.replace(/[^\d ]/g, "");
  } else {
    applicant.value[key] = value.replace(/ /g, "");
  }
};

const submitAll = async () => {
  if (!formRef.value) return;
  await formRef.value.validate(async (valid) => {
    if (valid) {
      try {
        // Submit Applicant first
        if (applicant.value.passport_photo) {
          applicant.value.passport_photo =
            applicant.value.passport_photo?.replace(
              /^data:image\/\w+;base64,/,
              ""
            );
        }
        if (applicant.value.passport_with_person_photo) {
          applicant.value.passport_with_person_photo =
            applicant.value.passport_with_person_photo?.replace(
              /^data:image\/\w+;base64,/,
              ""
            );
        }

        const applicantResponse = await axios.post(
          "https://crm.greatsoft.uz/api/applicant/submit",
          applicant.value,
          { headers: { "Content-Type": "application/json" } }
        );

        // Submit Portfolio
        const portfolioData = {
          title: portfolio.value.title,
          description: portfolio.value.description,
          image: portfolio.value.image?.replace(/^data:image\/\w+;base64,/, ""),
          date: portfolio.value.date,
          workers_hr_applicant_id: applicantResponse.data.result.applicant_id, // Using the created applicant's id
        };

        await axios.post(
          "https://crm.greatsoft.uz/api/master-portfolio/form",
          portfolioData,
          { headers: { "Content-Type": "application/json" } }
        );

        // Show success message
        ElMessage.success("Portfolio va ariza muvaffaqiyatli jo'natildi!");

        // Reset form after submission
        resetForm();
      } catch (error) {
        ElMessage.error("Jo'natishda xato: " + error.message);
      }
    }
  });
};

const resetForm = () => {
  applicant.value = {
    name: "",
    phone_number: "",
    workers_price: "",
    workers_job: "",
    viloyat: "",
    experience: "",
    master_category_ids: [],
    master_sub_category_ids: [],
    passport_photo: null,
    passport_with_person_photo: null,
  };
  portfolio.value = {
    title: "",
    description: "",
    image: null,
    date: null,
  };
  passportPhotoFileList.value = [];
  passportWithPersonPhotoFileList.value = [];
  portfolioPhotoFileList.value = [];
};

onMounted(fetchCategories);
</script>

<style scoped>
::v-deep .el-form-item__label {
  font-size: 20px;
}

::v-deep .el-input__inner,
::v-deep .el-select__inner,
::v-deep .el-upload .el-button {
  padding: 20px 5px;
}

::v-deep .el-select__wrapper {
  padding: 15px 14px !important;

  .el-tag__content {
    font-size: 18px;
  }
}

::v-deep div:has(> .el-upload) {
  display: flex;

  .el-icon {
    font-size: 20px;
  }

  span {
    font-size: 18px;
  }
}

::v-deep .el-input__inner::placeholder {
  font-size: 20px;
}

::v-deep .el-select__placeholder {
  font-size: 20px;
}

::v-deep .el-date-editor .el-input__wrapper {
  padding: 20px;
}
</style>
