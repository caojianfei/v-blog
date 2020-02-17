<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item
      v-bind:key="route.path"
      v-for="route in this.$route.matched"
      >{{ route.meta.name }}</el-breadcrumb-item
    >

    <!--    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>-->
    <!--    <el-breadcrumb-item>活动管理</el-breadcrumb-item>-->
    <!--    <el-breadcrumb-item>活动列表</el-breadcrumb-item>-->
    <!--    <el-breadcrumb-item>活动详情</el-breadcrumb-item>-->
  </el-breadcrumb>
</template>

<script>
export default {
  name: "Breadcrumb"
};
</script>

<style scoped></style>
