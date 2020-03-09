<template>
  <el-card>
    <el-row>
      <el-col :span="8" style="padding-right: 20px">
        <el-select
          style="min-width: 100%"
          v-model="value"
          filterable
          placeholder="分类"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="16">
        <el-input placeholder="标题"> </el-input>
      </el-col>
    </el-row>
    <el-row style="margin-top: 20px">
      <el-col :span="24">
        <el-select
          style="width: 100%"
          v-model="value1"
          multiple
          placeholder="标签"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-row style="margin-top: 20px">
      <el-col :span="24">
        <mavon-editor style="min-height: 500px;" />
      </el-col>
    </el-row>
    <el-row type="flex" justify="end" style="margin-top: 20px">
      <el-button type="primary">发布</el-button>
      <el-button type="info">保存草稿</el-button>
    </el-row>
  </el-card>
</template>

<script>
export default {
  name: "Index",
  data() {
    return {
      value: "",
      value1: "",
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ]
    };
  }
};
</script>

<style scoped></style>
