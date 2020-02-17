<el-popover trigger="hover" placement="top">
    <p>姓名: {{ scope.row.name }}</p>
    <p>住址: {{ scope.row.address }}</p>
    <div slot="reference" class="name-wrapper">
      <el-tag size="medium">{{ scope.row.name }}</el-tag>
    </div>
  </el-popover>

<script>
export default {
  name: "Slot",
  props: ["scope"]
};
</script>

<style scoped></style>
