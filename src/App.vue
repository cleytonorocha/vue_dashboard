<template>
  <div id="app">
    <SidebarComponent />
    <ContentComponent />
  </div>
</template>

<script>
import SidebarComponent from "@/components/SidebarComponent.vue";
import ContentComponent from "@/components/ContentComponent.vue";

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
  a {
    all: unset;
  }
}
</style>
