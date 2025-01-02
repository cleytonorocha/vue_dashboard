<template>
    <div class="col-xl-5 shadow shadow-lg rounded-4 bg-light p-5 my-3">
      <div class="card-title">
        <slot name="card-title"></slot>
      </div>
      <div class="card-content">
        <slot name="card-content"> </slot>
      </div>
    </div>
</template>

<script>
export default {
  name: "CardTemplate",
  data() {
    return {
      card: {
        content: "Conteúdo padrão do card",
      },
    };
  },
};
</script>

<style scoped>
</style>
