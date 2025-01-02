<template>
  <div
    id="sidebar"
    @mouseenter="isCollapse = false"
    @mouseleave="isCollapse = true"
  >
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo h-100"
      :collapse="isCollapse"
      background-color="#264653"
      text-color="#fff"
      active-text-color="#fff"
    >
      <el-menu-item index="1">
        <router-link to="/" >
          <img
            src="@/assets/logo.png"
            alt="Logo Vue"
            width="30"
            height="30"
            class="d-inline-block align-text-center"
          />
          <span class="fs-5 fw-semibold ms-3">Vue Train</span>
        </router-link>
      </el-menu-item>
      <hr class="text-white my-0" />
      <el-menu-item index="2">
        <i class="el-icon-data-analysis"></i>
        <span>DashBoard</span>
      </el-menu-item>
      <el-menu-item index="3">
        <i class="el-icon-circle-plus-outline"></i>
        <span>Register</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-coin"></i>
        <span>Data</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "SidebarComponent",
  data() {
    return {
      isCollapse: true,
    };
  },
};
</script>

<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>