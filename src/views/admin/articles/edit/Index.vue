<template>
  <el-card>
    <el-row>
      <el-col :span="8" style="padding-right: 20px">
        <el-select
          style="min-width: 100%"
          v-model="form.categoryId"
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
        <el-input placeholder="标题" v-model="form.title"> </el-input>
      </el-col>
    </el-row>

    <el-row style="margin-top: 20px">
      <el-col :span="24">
        <mavon-editor style="min-height: 500px;" @change="onMavonEditChange" />
      </el-col>
    </el-row>
    <el-collapse>
      <el-collapse-item title="高级设置">
        <div>
          <label>选择文章标签</label>
          <el-select
            style="width: 100%"
            v-model="form.tags"
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
        </div>
        <div>
          <label>文章简介</label>
          <el-input type="textarea" :rows="2"></el-input>
        </div>
        <div>
          <label>发布时间</label>
          <el-date-picker
            v-model="value1"
            type="datetime"
            placeholder="选择日期时间"
          >
          </el-date-picker>
        </div>
        <div>
          <el-upload
            class="upload-demo"
            drag
            action="https://jsonplaceholder.typicode.com/posts/"
            multiple
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将文件拖到此处，或<em>点击上传</em>
            </div>
            <div class="el-upload__tip" slot="tip">
              只能上传jpg/png文件，且不超过500kb
            </div>
          </el-upload>
        </div>
        <div>
          <label>是否草稿</label>
          <el-switch
            v-model="value"
            active-color="#13ce66"
            inactive-color="#ff4949"
          >
          </el-switch>
        </div>
      </el-collapse-item>
    </el-collapse>
    <el-row type="flex" justify="end" style="margin-top: 20px">
      <el-button type="primary" @click="submit">发布</el-button>
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
      ],
      form: {
        title: "",
        headImage: "",
        content: "",
        mdContent: "",
        intro: "",
        categoryId: "",
        tags: [],
        isDraft: 0,
        publishedAt: ""
      }
    };
  },
  methods: {
    onMavonEditChange(value, render) {
      console.log("value: ", value);
      console.log("render", render);
    },
    submit() {
      console.log(this.form);
    }
  }
};
</script>

<style scoped></style>
