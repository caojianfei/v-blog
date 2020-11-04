<template>
  <el-container class="container">
    <el-header class="header">
      <el-row :gutter="5" class="nav">
        <el-col :xs="4" class="hidden-sm-and-up nav-item"
          ><div class="bg-purple nav-icon">
            <img src="../assets/nav.png" alt="" /></div
        ></el-col>
        <el-col :xs="16" :sm="6" class="nav-item"
          ><div class="nav-logo">
            <div class="logo-container">
              <img src="../assets/logo.png" alt="" />
            </div>
            <div class="logo-title">
              <span>vBlog</span>
            </div>
          </div></el-col
        >
        <el-col :sm="8" class="hidden-xs-only nav-item"
          ><div class="nav-menu nav-menu">
            <el-menu
              :default-active="activeIndex"
              class="el-menu"
              mode="horizontal"
              @select="handleSelect"
            >
              <el-menu-item index="1">首页</el-menu-item>
              <el-menu-item index="2">关于</el-menu-item>
              <el-menu-item index="3">联系我</el-menu-item>
            </el-menu>
          </div></el-col
        >
        <el-col :sm="6" class="hidden-xs-only nav-item"
          ><div class="nav-search">
            <el-input class="search-input" />
            <el-button type="primary" plain>搜索</el-button>
          </div></el-col
        >
      </el-row>
    </el-header>
    <el-main class="main">
      <router-view></router-view>
    </el-main>
    <el-footer class="footer">Footer</el-footer>
  </el-container>
</template>

<script>
export default {
  name: "index",
  components: {},
  data() {
    return {
      activeIndex: "1"
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>

<style scoped>
.container {
  display: flex;
  min-height: 100vh;
}
.main {
  flex: 1;
  padding: 0;
  margin: 0;
}

.nav .nav-item {
  height: 60px;
}

.nav-icon {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.nav-icon img {
  width: 25px;
  height: 25px;
}

.nav-logo {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.nav-logo .logo-container {
  width: 30px;
  height: 30px;
  margin-right: 10px;
}
.nav-logo .logo-container img {
  width: 100%;
  height: 100%;
}
.nav-menu {
  display: flex;
  justify-content: center;
  align-items: center;
}
.el-menu {
  border: none !important;
}

.nav-search {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.nav-search .search-input {
  margin-right: 20px;
}
</style>
