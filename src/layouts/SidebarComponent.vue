<template>
  <div
    id="sidebar"
    @mouseenter="isCollapse = false"
    @mouseleave="isCollapse = true"
  >
    <el-menu
      class="el-menu-vertical-demo h-100"
      :collapse="isCollapse"
      background-color="#264653"
      text-color="#fff4"
      active-text-color="#fff"
      :default-active="active"
    >
      <el-menu-item index="0">
        <router-link to="/">
          <img
            src="@/assets/logo.svg"
            id="logo"
            alt="Logo Vue"
            width="30"
            height="30"
            class="d-inline-block align-text-center"
          />
          <span class="fs-5 fw-semibold ms-3">Vue Train</span>
        </router-link>
      </el-menu-item>
      <hr class="text-white my-0" />
      <link-template
        v-for="content of contents"
        :key="content.id"
        :content="content"
      ></link-template>
    </el-menu>
  </div>
</template>

<script>
import LinkTemplate from "@/templates/LinkTemplate.vue";

export default {
  name: "SidebarComponent",
  components: {
    LinkTemplate,
  },
  data() {
    return {
      contents: this.$store.state.contents,
      isCollapse: true,
    };
  },
  mounted() {
    this.handleSelect();
  },
  computed: {
    active() {
      return this.$store.state.active;
    },
  },
  watch: {
    $route: {
      immediate: true,
      handler() {
        this.handleSelect();
      },
    },
  },
  methods: {
    handleSelect() {
      const activeContent = this.contents.find(
        (content) => content.name === this.$route.params.name
      );
      if (activeContent) {
        this.$store.commit('updateActive', activeContent.id); 
      }
    },
  },
};
</script>

<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
#logo {
  margin-left: -2.8px;
}
</style>
