<template>
  <div id="app">
    <router-view />
    <el-backtop v-if="backtop" target="#app"></el-backtop>
  </div>
</template>
<script>
export default {
  data() {
    return {
      backtop: false
    };
  },
  updated() {
    this.showBacktop();
  },
  mounted() {
    this.showBacktop();
  },
  methods: {
    showBacktop() {
      const routeFullPath = this.$route.fullPath;
      const reg = /^\/admin/;
      this.backtop = !reg.test(routeFullPath);
      // console.log("reg res:", this.backtop, routeFullPath);
    }
  }
};
</script>
<style>
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
}
#app {
  height: 100%;
  /* 这里给app一个滚动效果 */
  overflow-y: scroll;
}
</style>
