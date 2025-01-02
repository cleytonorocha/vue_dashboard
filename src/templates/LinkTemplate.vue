<template>
  <el-menu-item class="px-0" :index="String(content.id)">
    <router-link :to="'/' + content.name" class="d-block w-100 h-100">
      <i :class="content.icon"></i>
      <span>{{ content.prettyName }}</span>
    </router-link>
  </el-menu-item>
</template>
<script>
export default {
  name: "LinkTemplate",
  props: {
    content: Object
  },
};
</script>

<style scoped>
a > i {
  padding-left: 1.3em;
  padding-right: 1em;
}
</style>