<template>
  <div id="dashboard" class="container-fluid p-4 bg-light">
    <!-- Header -->
    <div class="row mb-4">
      <div class="col">
        <h1 class="fw-bold">📊 Product Dashboard</h1>
        <el-select
          v-model="selected"
          class="w-100"
          placeholder="Select number of products"
          @change="handleSelection"
        >
          <el-option
            v-for="option in selectionProducts"
            :key="option"
            :label="option + ' products'"
            :value="option"
          />
        </el-select>
        <p class="text-muted mt-2">Overview of products and categories</p>
      </div>
    </div>

    <!-- KPIs -->
    <div class="row text-center mb-4">
      <div class="col-md-3 mb-3">
        <div class="card shadow-sm border-0 p-3 bg-primary text-white">
          <h5>Total Products</h5>
          <h2>{{ products.length }}</h2>
        </div>
      </div>
      <div class="col-md-3 mb-3">
        <div class="card shadow-sm border-0 p-3 bg-success text-white">
          <h5>Active</h5>
          <h2>{{ products.filter((p) => p.status === 'Available').length }}</h2>
        </div>
      </div>
      <div class="col-md-3 mb-3">
        <div class="card shadow-sm border-0 p-3 bg-danger text-white">
          <h5>Pending</h5>
          <h2>{{ products.filter((p) => p.status === 'Pending').length }}</h2>
        </div>
      </div>
      <div class="col-md-3 mb-3">
        <div class="card shadow-sm border-0 p-3 bg-warning text-dark">
          <h5>Total Stock</h5>
          <h2>{{ products.reduce((sum, p) => sum + p.stock, 0) }}</h2>
        </div>
      </div>
    </div>

    <!-- Charts -->
    <div class="row d-flex justify-content-around py-3">
      <div class="col-md-6 mb-4">
        <div class="card shadow-sm p-3">
          <h5 class="mb-3">Products by Category</h5>
          <apex-chart
            type="bar"
            height="300"
            :options="chartCategory.options"
            :series="chartCategory.series"
          />
        </div>
      </div>

      <div class="col-md-6 mb-4">
        <div class="card shadow-sm p-3">
          <h5 class="mb-3">Product Status</h5>
          <apex-chart
            type="pie"
            height="300"
            :options="chartStatus.options"
            :series="chartStatus.series"
          />
        </div>
      </div>
    </div>

    <div class="row d-flex justify-content-around py-3">
      <div class="col-md-6 mb-4">
        <div class="card shadow-sm p-3">
          <h5 class="mb-3">Average Price by Category</h5>
          <apex-chart
            type="line"
            height="300"
            :options="chartPrice.options"
            :series="chartPrice.series"
          />
        </div>
      </div>

      <div class="col-md-6 mb-4">
        <div class="card shadow-sm p-3">
          <h5 class="mb-3">Stock by Product</h5>
          <apex-chart
            type="bar"
            height="300"
            :options="chartStock.options"
            :series="chartStock.series"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getAllProducts } from "@/service/ProductService";

export default {
  name: "DashboardContent",
  async created() {
    this.defineProducts();
  },
  data() {
    return {
      products: [],
      selected: 10,
      selectionProducts: [10, 50, 100, 500],
      pagination: {
        page: 0,
        linesPerPage: 10,
        orderBy: "id",
        direction: "ASC",
      },
    };
  },
  methods: {
    async defineProducts() {
      const data = await getAllProducts(this.pagination);
      this.products = data.content;
    },
    async handleSelection(value) {
      this.pagination.linesPerPage = value;
      await this.defineProducts();
    },
  },
  computed: {
    chartCategory() {
      const categories = [...new Set(this.products.map((p) => p.category))];
      const counts = categories.map(
        (c) => this.products.filter((p) => p.category === c).length
      );
      return {
        options: { xaxis: { categories } },
        series: [{ name: "Count", data: counts }],
      };
    },
    chartStatus() {
      const statuses = [...new Set(this.products.map((p) => p.status))];
      const counts = statuses.map(
        (s) => this.products.filter((p) => p.status === s).length
      );
      return { options: { labels: statuses }, series: counts };
    },
    chartPrice() {
      const categories = [...new Set(this.products.map((p) => p.category))];
      const averages = categories.map((c) => {
        const items = this.products.filter((p) => p.category === c);
        return items.reduce((s, p) => s + p.price, 0) / items.length;
      });
      return {
        options: { xaxis: { categories } },
        series: [{ name: "Average Price", data: averages }],
      };
    },
    chartStock() {
      return {
        options: { xaxis: { categories: this.products.map((p) => p.name) } },
        series: [{ name: "Stock", data: this.products.map((p) => p.stock) }],
      };
    },
  },
};
</script>

<style>
#dashboard {
  overflow-x: hidden;
}
</style>
