<template>
<div id="dashboard">
  <!-- First Row -->
  <div class="row d-flex justify-content-around py-4">
    <!-- Column Chart: Products by Category -->
    <card-template>
      <template v-slot:card-title>
        <h2>Products by Category</h2>
      </template>
      <template v-slot:card-content>
        <apex-chart type="bar" height="300" :options="chartCategory.options" :series="chartCategory.series" />
      </template>
    </card-template>

    <!-- Pie Chart: Product Status -->
    <card-template>
      <template v-slot:card-title>
        <h2>Product Status</h2>
      </template>
      <template v-slot:card-content>
        <apex-chart type="pie" height="300" :options="chartStatus.options" :series="chartStatus.series" />
      </template>
    </card-template>
  </div>

  <!-- Second Row -->
  <div class="row d-flex justify-content-around py-4">
    <!-- Line Chart: Average Price by Category -->
    <card-template>
      <template v-slot:card-title>
        <h2>Average Price by Category</h2>
      </template>
      <template v-slot:card-content>
        <apex-chart type="line" height="300" :options="chartPrice.options" :series="chartPrice.series" />
      </template>
    </card-template>

    <!-- Column Chart: Stock by Product -->
    <card-template>
      <template v-slot:card-title>
        <h2>Stock by Product</h2>
      </template>
      <template v-slot:card-content>
        <apex-chart type="bar" height="300" :options="chartStock.options" :series="chartStock.series" />
      </template>
    </card-template>
  </div>

  <!-- Third Row -->
  <div class="row d-flex justify-content-around py-4">

    <!-- Bubble Chart: Stock vs Price -->
    <card-template>
      <template v-slot:card-title>
        <h2>Stock vs Price (Bubble)</h2>
      </template>
      <template v-slot:card-content>
        <apex-chart type="bubble" height="300" :options="chartStockPriceBubble.options"
          :series="chartStockPriceBubble.series" />
      </template>
    </card-template>

    <!-- Treemap Chart: Products by Category -->
    <card-template>
      <template v-slot:card-title>
        <h2>Products by Category (Treemap)</h2>
      </template>
      <template v-slot:card-content>
        <apex-chart type="treemap" height="300" :options="chartCategoryTreemap.options"
          :series="chartCategoryTreemap.series" />
      </template>
    </card-template>
  </div>
</div>
</template>

<script>
import CardTemplate from "@/templates/CardTemplate.vue";
import { getAllProducts } from "@/service/ProductService";

export default {
  name: "DashboardContent",
  components: { CardTemplate },
  data() {
    return {
      products: [],
      chartsColors: "#2a9df4",
      chartsColorsPalette: ["#2a9df4", "#f4a261", "#e76f51", "#e9c46a", "#2a9d8f"]
    };
  },
  computed: {
    chartCategory() {
      const categories = [...new Set(this.products.map(p => p.category))];
      const counts = categories.map(cat =>
        this.products.filter(p => p.category === cat).length
      );
      return {
        options: {
          chart: { id: "category-bar" },
          xaxis: { categories },
          colors: this.chartsColorsPalette,
        },
        series: [{ name: "Quantidade", data: counts }],
      };
    },
    chartStatus() {
      const statuses = [...new Set(this.products.map(p => p.status))];
      const counts = statuses.map(st =>
        this.products.filter(p => p.status === st).length
      );
      return {
        options: { labels: statuses, colors: this.chartsColorsPalette.slice(0, statuses.length) },
        series: counts,
      };
    },

    chartPrice() {
      const categories = [...new Set(this.products.map(p => p.category))];
      const averages = categories.map(cat => {
        const items = this.products.filter(p => p.category === cat);
        return (
          items.reduce((sum, p) => sum + parseFloat(p.price), 0) / items.length
        );
      });
      return {
        options: {
          chart: { id: "price-line" },
          xaxis: { categories },
          colors: this.chartsColorsPalette,
        },
        series: [{ name: "Preço Médio", data: averages }],
      };
    },


    chartStock() {
      return {
        options: {
          chart: { id: "stock-bar" },
          xaxis: { categories: this.products.map(p => p.name) },
          colors: [this.chartsColors],
        },
        series: [{ name: "Estoque", data: this.products.map(p => p.stock) }],
      };
    },

    chartStockPriceBubble() {
      const series = [{
        name: 'Produtos',
        data: this.products.map(p => ({
          x: p.stock,
          y: parseFloat(p.price),
          z: p.rating
        }))
      }];
      return {
        options: {
          chart: { id: 'stock-price-bubble', toolbar: { show: true } },
          xaxis: { title: { text: 'Estoque' } },
          yaxis: { title: { text: 'Preço' } },
          title: { text: 'Estoque x Preço', align: 'center' },
          colors: this.chartsColorsPalette
        },
        series
      };
    },

    chartCategoryTreemap() {
      const categories = [...new Set(this.products.map(p => p.category))];
      const series = categories.map(cat => ({
        x: cat,
        y: this.products.filter(p => p.category === cat).length
      }));
      return {
        options: {
          chart: { id: 'category-treemap' },
          title: { text: 'Produtos por Categoria', align: 'center' },
          colors: this.chartsColorsPalette
        },
        series: [{ data: series }]
      };
    },

  },
  created() {
    getAllProducts({ page: 0, size: 100 })
      .then(data => {
        this.products = data.content || data;
      })
      .catch(err => console.error("Erro ao carregar produtos", err));
  },
};
</script>
<style>
#dashboard{
  overflow-x: hidden;
}
</style>