<template>
  <el-container class="container" v-loading.fullscreen.lock="routeLoading">
    <!-- 页面头部内容 -->
    <el-header class="header">
      <div class="header-block">
        <el-row :gutter="5" class="nav">
          <el-col :xs="4" class="hidden-sm-and-up nav-item"
            ><div class="bg-purple nav-icon" @click="drawer = true">
              <img src="../assets/nav.png" alt="" /></div
          ></el-col>
          <el-col :xs="16" :sm="6" class="nav-item"
            ><div class="nav-logo" @click="toIndex">
              <div class="logo-container hidden-xs-only">
                <img src="../assets/logo.png" alt="" />
              </div>
              <div class="logo-title">
                <span>Jefrey 的个人博客</span>
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
                <el-menu-item
                  v-bind:key="menu.link"
                  v-for="menu in menus"
                  :index="menu.link"
                >
                  {{ menu.title }}
                </el-menu-item>
              </el-menu>
            </div></el-col
          >
          <el-col :sm="10" class="hidden-xs-only nav-item"
            ><div class="nav-search">
              <label>
                <input
                  v-model="keyword"
                  placeholder="输入关键词搜索"
                  class="search-input"
                />
              </label>
              <el-button @click="searchKeyword" type="primary">搜索</el-button>
            </div></el-col
          >
        </el-row>
      </div>
    </el-header>

    <!-- 侧边栏 -->
    <el-aside>
      <el-drawer
        title="menu"
        :visible.sync="drawer"
        :with-header="false"
        direction="ltr"
        size="60%"
      >
        <div class="drawer-nav">
          <div class="drawer-nav-logo" style="text-align: center">
            <el-avatar
              shape="circle"
              :size="100"
              fit="cover"
              :src="require('../assets/logo.png')"
            ></el-avatar>
            <span class="drawer-nav-title">Jefrey`s Blog</span>
          </div>
          <div class="drawer-nav-menu" style="text-align: center">
            <el-menu :default-active="activeIndex" @select="handleSelect">
              <el-menu-item
                v-for="menu in menus"
                v-bind:key="menu.link"
                :index="menu.link"
              >
                <i :class="menu.icon"></i>
                <span slot="title">{{ menu.title }}</span>
              </el-menu-item>
            </el-menu>
          </div>
        </div>
      </el-drawer>
    </el-aside>

    <!-- 页面主体内容 -->
    <el-main class="main">
      <router-view></router-view>
    </el-main>

    <!-- 页面底部内容 -->
    <el-footer class="footer">
      <div class="foot-info">
        <div>
          <a
            target="_blank"
            href="https://www.upyun.com/?utm_source=lianmeng&utm_medium=referral"
            >本网站由
            <img class="upyun-logo" src="upyun_logo.png" />
            提供CDN加速/云存储服务</a
          >
        </div>
        <div>
          ©2018 - 2022 caojf.com All Rights Reserved.
          <a href="https://beian.miit.gov.cn" target="_blank"
            >浙ICP备16047802号</a
          >
        </div>
        <div style="margin-top: 5px">无尽的折腾，才是人生的主旋律</div>
      </div>
    </el-footer>

    <back-top />
  </el-container>
</template>

<script>
import { mapState } from "vuex";
import BackTop from "@/components/BackTop.vue";

export default {
  name: "index",
  components: { BackTop },
  mounted() {
    // 默认菜单选中
    this.menus.forEach(menu => {
      if (this.$route.fullPath === menu.link) {
        this.activeIndex = menu.link;
      }
    });
  },
  computed: {
    ...mapState("page", {
      routeLoading: state => state.routeLoading
    })
  },
  data() {
    return {
      activeIndex: "/",
      drawer: false,
      keyword: "",
      menus: [
        {
          link: "/",
          title: "首页",
          icon: "el-icon-s-home"
        },
        {
          link: "/about",
          title: "关于",
          icon: "el-icon-user-solid"
        },
        {
          link: "/contact",
          title: "联系我",
          icon: "el-icon-phone"
        }
      ]
    };
  },
  methods: {
    handleSelect(key) {
      this.$router.push(key, () => {
        this.drawer = false;
      });
    },
    searchKeyword() {
      this.$router.push({
        path: "search",
        query: { type: "keyword", value: this.keyword }
      });
    },
    toIndex() {
      if (this.$route.fullPath !== "/") {
        this.$router.push("/");
      }
    }
  }
};
</script>

<style scoped>
.container {
  display: flex;
  min-height: 100vh;
}
.header {
  padding-left: 0 !important;
  padding-right: 0 !important;
}
.header-block {
  width: 100%;
  display: block;
  background: white;
  position: fixed;
  height: 60px;
  z-index: 1;
}
.main {
  flex: 1;
  padding: 0;
  margin: 0;
  background: #f7f7f7;
}
.footer {
  background: #f7f7f7;
  height: auto !important;
}

.foot-info {
  text-align: center;
  color: gray;
  font-size: small;
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
  cursor: pointer;
}
.nav-logo .logo-container {
  width: 30px;
  height: 30px;
  margin-right: 10px;
}
.nav-logo .logo-container img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
.logo-title span {
  font-family: Tahoma, Arial, Verdana -apple-system, BlinkMacSystemFont,
    "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji",
    "Segoe UI Emoji", "Segoe UI Symbol";
}
.drawer-nav-logo span {
  font-family: Tahoma, Arial, Verdana -apple-system, BlinkMacSystemFont,
    "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji",
    "Segoe UI Emoji", "Segoe UI Symbol";
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

.search-input {
  margin-right: 20px;
  height: 30px;
  border: none;
  border-bottom: 1px solid #f0f0f0;
  outline-style: none;
  width: 220px;
}

.drawer-nav-logo {
  text-align: center;
  padding: 50px;
}

.drawer-nav-title {
  display: block;
  margin-top: 5px;
}
.foot-info a {
  text-decoration: none;
  color: gray;
}
.upyun-logo {
  width: 57px;
  position: relative;
  bottom: -8px;
}
</style>
