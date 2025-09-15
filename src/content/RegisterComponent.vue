<template>
    <div class="container mt-4">
      <el-form
        ref="formRef"
        :model="form"
        :rules="rules"
        label-position="top"
        size="medium"
        class="row g-3"
      >
        <!-- Name -->
        <el-form-item label="Name" prop="name" class="col-12">
          <el-input v-model="form.name" placeholder="Enter product name" />
        </el-form-item>
  
        <!-- Category -->
        <el-form-item label="Category" prop="category" class="col-12 col-lg-6">
          <el-select
            v-model="form.category"
            placeholder="Select category"
            clearable
            filterable
            class="w-100"
          >
            <el-option
              v-for="category in categories"
              :key="category.key"
              :label="category.description"
              :value="category.key"
            />
          </el-select>
        </el-form-item>
  
        <!-- Stock -->
        <el-form-item label="Stock" prop="stock" class="col-12 col-lg-6">
          <el-input
            v-model.number="form.stock"
            type="number"
            min="0"
            placeholder="Enter stock"
          />
        </el-form-item>
  
        <!-- Rating -->
        <el-form-item label="Rating" prop="rating" class="col-12 col-lg-6">
          <el-input
            v-model.number="form.rating"
            type="number"
            min="0"
            max="5"
            step="0.1"
            placeholder="Enter rating (0 - 5)"
          />
        </el-form-item>
  
        <!-- Price -->
        <el-form-item label="Price" prop="price" class="col-12 col-lg-6">
          <el-input
            v-model.number="form.price"
            type="number"
            min="0.01"
            step="0.01"
            placeholder="Enter price"
          />
        </el-form-item>
      </el-form>
  
      <!-- Actions -->
      <div class="col-12 d-flex justify-content-between mt-3">
        <el-button @click="resetForm">Reset</el-button>
        <el-button type="primary" @click="submitForm">Save Product</el-button>
      </div>
    </div>
  </template>
  
  <script>
import { listCategory } from '@/service/ProductService';

  export default {
    name: "RegisterComponent",
    data() {
      return {
        form: {
          name: "",
          category: null,
          stock: null,
          rating: null,
          price: null,
        },
        categories: [],
        rules: {
          name: [
            { required: true, message: "Name is required", trigger: "blur" },
            { min: 3, message: "Name must be at least 3 characters", trigger: "blur" },
          ],
          category: [
            { required: true, message: "Category is required", trigger: "change" },
          ],
          stock: [
            { required: true, message: "Stock is required", trigger: "blur" },
            { type: "number", min: 1, message: "Stock must be greater than 0", trigger: "blur" },
          ],
          rating: [
            { required: true, message: "Rating is required", trigger: "blur" },
            { type: "number", min: 0, max: 5, message: "Rating must be between 0 and 5", trigger: "blur" },
          ],
          price: [
            { required: true, message: "Price is required", trigger: "blur" },
            { type: "number", min: 0.01, message: "Price must be greater than 0", trigger: "blur" },
          ],
        },
      };
    },
    created() {
      this.loadCategories();
    },
    methods: {
      async loadCategories() {
          const { data } = await listCategory();
          this.categories = data;
      },
      submitForm() {
        this.$refs.formRef.validate((valid) => {
          if (valid) {
            console.log("Produto cadastrado:", this.form);
            this.resetForm();
          } else {
            console.log("Erro na validação");
            return false;
          }
        });
      },
      resetForm() {
        this.$refs.formRef.resetFields();
      },
    },
  };
  </script>
  