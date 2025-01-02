<template>
  <div id="app">
    <SidebarComponent />
    <ContentComponent />
  </div>
</template>

<script>
import SidebarComponent from "@/layouts/SidebarComponent.vue";
import ContentComponent from "@/layouts/ContentComponent.vue";

export default {
  name: "App",
  components: {
    SidebarComponent,
    ContentComponent,
  },
};
</script>

<style lang="scss">
html,
body,
#app {
  display: flex;
  width: 100%;
  height: 100%;
  overflow: hidden;
  a {
    all: unset;
  }
}
</style>
