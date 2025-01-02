<template>
  <div id="content" class="w-100 overflow-y-scroll">
    <navbar-component/>
    <router-view ></router-view>
  </div>
</template>

<script>
import NavbarComponent from "@/layouts/NavbarComponent.vue";

export default {
  name: "ContentComponent",
  components: {
    NavbarComponent,
  },
};
</script>

<style scoped>
</style>