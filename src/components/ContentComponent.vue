<template>
  <div id="content">
    <NavbarComponent />
    <router-view></router-view>
  </div>
</template>

<script>
import NavbarComponent from "@/components/NavbarComponent.vue";

export default {
  name: "ContentComponent",
  components: {
    NavbarComponent,
  },
};
</script>

<style>
</style>