<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
import { mapMutations } from "vuex";
export default {
  data() {
    return {};
  },
  created() {
    this.$router.beforeEach((to, from, next) => {
      const { title, keywords, description } = to.meta;
      if (title !== undefined) {
        document.title = title;
      }
      if (keywords !== undefined) {
        document
          .querySelector('meta[name="keywords"]')
          .setAttribute("content", keywords);
      }
      if (description !== undefined) {
        document
          .querySelector('meta[name="description"]')
          .setAttribute("content", description);
      }
      //  console.log("to", to);
      this.beforeRouteEnter();
      next();
    });
    this.$router.afterEach(() => {
      this.afterRouteEnter();
    });
  },
  updated() {},
  mounted() {},
  methods: {
    ...mapMutations("page", ["beforeRouteEnter", "afterRouteEnter"])
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
</style>
