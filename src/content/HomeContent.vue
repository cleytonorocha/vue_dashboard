<template>
  <div id="home">
    <div class="row d-flex justify-content-around">
      <card-template>
        <template v-slot:card-title>
          <h2>Coluna</h2>
        </template>

        <template v-slot:card-content>
          <p>Este é o conteúdo do card, passado dinamicamente!</p>
        </template>
      </card-template>
      <card-template>
        <template v-slot:card-title>
          <h2>Título do Card</h2>
        </template>

        <template v-slot:card-content>
          <p>Este é o conteúdo do card, passado dinamicamente!</p>
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
<style>
</style>
