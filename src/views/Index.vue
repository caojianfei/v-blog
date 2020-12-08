<template>
  <el-container class="container">
    <el-header class="header">
      <el-row :gutter="5" class="nav">
        <el-col :xs="4" class="hidden-sm-and-up nav-item"
          ><div class="bg-purple nav-icon" @click="drawer = true">
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
              <input placeholder="输入关键词搜索" class="search-input" />
            </label>
            <el-button type="primary">搜索</el-button>
          </div></el-col
        >
      </el-row>
      <el-drawer
        title="我是标题"
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
              fit="fill"
              src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1607364116291&di=224d186e25090f6c1e50c67d317061e9&imgtype=0&src=http%3A%2F%2Fa0.att.hudong.com%2F30%2F29%2F01300000201438121627296084016.jpg"
              @error="handleAvatarError"
            ></el-avatar>
            <span class="drawer-nav-title">vBlog</span>
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
    </el-header>
    <el-main class="main">
      <router-view></router-view>
    </el-main>
    <el-footer class="footer">
      <div class="foot-info">
        <div>© 2020 caojf.com All Rights Reserved.</div>
        <div>wait complete ...</div>
      </div>
    </el-footer>
  </el-container>
</template>

<script>
export default {
  name: "index",
  components: {},
  mounted() {
    // 默认菜单选中
    this.menus.forEach(menu => {
      if (this.$route.fullPath === menu.link) {
        this.activeIndex = menu.link;
      }
    });
  },
  data() {
    return {
      activeIndex: "/",
      drawer: false,
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
    handleAvatarError(e) {
      console.log("error: ", e);
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
  background: #f7f7f7;
}
.footer {
  background: #f7f7f7;
}

.foot-info {
  text-align: center;
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
</style>
