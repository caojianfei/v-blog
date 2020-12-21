<template>
  <el-row class="header-row" type="flex" align="middle">
    <el-col><i :class="toggleClass" @click="toggleNav"></i></el-col>
    <el-col>
      <el-row type="flex" justify="end">
        <el-col :span="3" :md="2" :xs="6">
          <el-dropdown>
            <span class="el-dropdown-link">
              <el-avatar :src="require('@/assets/logo.png')"></el-avatar>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <div @click="logout">退出</div>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
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
    ...mapMutations("page", ["toggleNav"]),
    ...mapMutations("auth", ["clearToken"]),
    logout() {
      this.clearToken();
      this.$message.success("您已退出");
      this.$router.push("/login");
    }
  }
};
</script>

<style scoped>
.header-row {
  height: 100%;
}
</style>
