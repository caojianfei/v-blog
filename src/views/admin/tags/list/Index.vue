<template>
  <h1>tag List</h1>
</template>

<script>
export default {
  name: "Index",
  mounted() {
    console.log(this.$route.matched);
  }
};
</script>

<style scoped></style>
