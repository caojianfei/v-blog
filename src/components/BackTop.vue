<template>
  <div>
    <transition name="el-zoom-in-bottom">
      <el-button
        v-if="display"
        class="to-top-button hidden-xs-only"
        size="medium"
        icon="el-icon-caret-top"
        plain
        circle
        @click="back"
      ></el-button>
    </transition>
  </div>
</template>
<script>
export default {
  name: "BackTop",
  data() {
    return {
      display: false
    };
  },
  mounted() {
    window.addEventListener("scroll", this.onScroll, true);
  },
  methods: {
    back() {
      let currentPosition, timer;
      timer = setInterval(function() {
        currentPosition =
          document.documentElement.scrollTop || document.body.scrollTop;
        currentPosition -= 70;
        if (currentPosition > 0) {
          window.scrollTo(0, currentPosition);
        } else {
          window.scrollTo(0, 0);
          clearInterval(timer);
        }
      }, 1);
    },
    onScroll() {
      let currentPosition =
        document.documentElement.scrollTop || document.body.scrollTop;
      this.display = currentPosition > 200;
    }
  }
};
</script>
<style scoped>
.to-top-button {
  position: fixed;
  bottom: 40px;
  right: 55px;
  box-shadow: 0 0 30px #ccc;
}
</style>
