<template>
  <el-container class="container">
    <el-aside class="left-nav" :width="asideWidth">
      <Menu></Menu>
    </el-aside>
    <el-container>
      <el-header class="top-header">
        <Header></Header>
      </el-header>
      <el-container>
        <el-header v-if="showBreadCrumb" class="main-header" height="40px">
          <Breadcrumb></Breadcrumb>
        </el-header>
        <el-main class="main">
          <router-view></router-view>
        </el-main>
        <el-footer style="background: #f0f2f5">
          <div class="footer">
            Copyright©杭州****有限公司 浙ICP备*****号
          </div>
        </el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import Menu from "../../components/Menu";
import Breadcrumb from "../../components/Breadcrumb";
import Header from "../../components/Header";

export default {
  name: "Layout",
  components: {
    Header,
    Menu,
    Breadcrumb
  },
  computed: {
    asideWidth() {
      return this.$store.state.page.navCollapse ? "auto" : "250px";
    },
    showBreadCrumb() {
      return this.$store.state.page.showBreadCrumb;
    }
  }
};
</script>

<style scoped>
.container {
  min-height: 100vh;
}
.left-nav {
  background: #001529;
}
.top-header {
  background: #fff;
  border-bottom: 1px solid #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.main-header {
  display: flex;
  align-items: center;
}
.main {
  background: #f0f2f5;
}
.footer {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(0, 0, 0, 0.45);
  font-size: 14px;
}
</style>
