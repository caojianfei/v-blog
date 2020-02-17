<template>
  <el-row class="header-row" type="flex" align="middle">
    <el-col> <i :class="toggleClass" @click="toggleNav"></i></el-col>
    <el-col>
      <el-row type="flex" justify="end">
        <el-col :span="3" :md="2" :xs="6"
          ><el-avatar
            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
          ></el-avatar
        ></el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: "Header",
  computed: {
    ...mapState("page", {
      navCollapse: state => state.navCollapse
    }),
    toggleClass() {
      return this.navCollapse ? "el-icon-s-fold" : "el-icon-s-unfold";
    }
  },
  methods: {
    ...mapMutations("page", ["toggleNav"])
  }
};
</script>

<style scoped>
.header-row {
  height: 100%;
}
</style>
