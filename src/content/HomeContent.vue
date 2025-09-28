<template>
  <div id="dashboard" class="container">
    <header class="dashboard-header">
      <h1>Dashboard Overview</h1>
      <p class="subtitle">Quick insights into your data</p>
    </header>

    <div class="row d-flex justify-content-around">
      <card-template>
        <template v-slot:card-title>
          <h2>Total Sales</h2>
        </template>
        <template v-slot:card-content>
          <p>$12,430</p>
          <span class="trend positive">+8% vs last month</span>
        </template>
      </card-template>

      <card-template>
        <template v-slot:card-title>
          <h2>Active Users</h2>
        </template>
        <template v-slot:card-content>
          <p>1,245</p>
          <span class="trend negative">-3% this week</span>
        </template>
      </card-template>

      <card-template>
        <template v-slot:card-title>
          <h2>New Orders</h2>
        </template>
        <template v-slot:card-content>
          <p>320</p>
          <span class="trend positive">+15% today</span>
        </template>
      </card-template>
    </div>
  </div>
</template>

<script>
import CardTemplate from "@/templates/CardTemplate.vue";

export default {
  name: "HomeContent",
  components: {
    CardTemplate,
  },
};
</script>

<style scoped>
.container {
  padding: 2rem;
}

.dashboard-header {
  margin-bottom: 2rem;
  text-align: center;
}

.dashboard-header h1 {
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.subtitle {
  font-size: 1rem;
  color: #666;
}

.row {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
  justify-content: center;
}

.trend {
  font-size: 0.9rem;
  font-weight: 500;
  display: block;
  margin-top: 0.25rem;
}

.trend.positive {
  color: #28a745;
}

.trend.negative {
  color: #dc3545;
}
</style>
