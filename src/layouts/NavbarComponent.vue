<template>
  <div id="navbar" class="w-100 p-5">
    <h1 class="text-center display-4 fw-light">
      {{ rote[0].toUpperCase() + rote.slice(1) }}
    </h1>
  </div>
</template>

<script>
export default {
  name: "NavbarComponent",
  computed: {
    rote() {
      return this.$route.name;
    },
  },
};
</script>

<style scoped>

</style>