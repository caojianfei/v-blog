<template>
  <el-menu
    class="v-menu"
    :router="true"
    background-color="#001529"
    text-color="#fff"
    active-text-color="#ffd04b"
    @open="handleOpen"
    @close="handleClose"
    :collapse="navCollapse"
    :default-active="this.$route.path"
  >
    <el-menu-item index="/admin">
      <i class="el-icon-s-platform"> </i>
      <span slot="title">Dashboard </span>
    </el-menu-item>
    <el-menu-item index="/admin/articles">
      <i class="el-icon-notebook-1"> </i>
      <span slot="title">文章管理</span>
    </el-menu-item>
    <el-menu-item index="/admin/categories">
      <i class="el-icon-folder-opened"> </i>
      <span slot="title">分类管理</span>
    </el-menu-item>
    <el-menu-item index="/admin/tags">
      <i class="el-icon-collection-tag"> </i>
      <span slot="title">标签管理</span>
    </el-menu-item>
    <el-menu-item index="/admin/comments">
      <i class="el-icon-chat-dot-round"> </i>
      <span slot="title">评论管理</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  name: "Menu",
  beforeMount() {
    const screenWidth = document.documentElement.clientWidth;
    screenWidth < 992 ? this.closeNav() : this.openNav();
  },
  mounted() {
    window.onresize = () => {
      const screenWidth = document.documentElement.clientWidth;
      if (screenWidth < 992) {
        if (this.navCollapse === false) {
          this.closeNav();
        }
      } else {
        if (this.navCollapse === true) {
          this.openNav();
        }
      }
    };
  },
  computed: {
    navCollapse() {
      return this.$store.state.page.navCollapse;
    }
  },
  methods: {
    ...mapMutations("page", ["closeNav", "openNav"]),
    handleOpen() {
      // console.log(key, keyPath);
    },
    handleClose() {
      // console.log(key, keyPath);
    }
  }
};
</script>

<style scoped>
.v-menu {
  border: none;
}
</style>
