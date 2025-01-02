<template>
  <div id="dashboard">
    <div>
      <div class="row d-flex justify-content-around py-4">
        <card-template>
          <template v-slot:card-title>
            <h2>Coluna</h2>
          </template>

          <template v-slot:card-content>
            <p>Este é o conteúdo do chart de coluna</p>
          </template>
        </card-template>

        <card-template>
          <template v-slot:card-title>
            <h2>Pizza</h2>
          </template>

          <template v-slot:card-content>
            <p>Este é o conteúdo do chart de Pizza</p>
          </template>
        </card-template>
      </div>
    </div>
    <div class="row d-flex justify-content-around py-4">
      <card-template>
        <template v-slot:card-title>
          <h2>Coluna</h2>
        </template>

        <template v-slot:card-content>
          <p>Este é o conteúdo do chart de coluna</p>
        </template>
      </card-template>

      <card-template>
        <template v-slot:card-title>
          <h2>Pizza</h2>
        </template>

        <template v-slot:card-content>
          <p>Este é o conteúdo do chart de Pizza</p>
        </template>
      </card-template>
    </div>
  </div>
</template>
  
  <script>
import CardTemplate from "@/templates/CardTemplate.vue";
export default {
  name: "DashboardContent",
  components: {
    CardTemplate,
  },
};
</script>
  <style>
</style>
  