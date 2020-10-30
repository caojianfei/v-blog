<template>
  <el-card>
    <el-row>
      <el-col :span="8" style="padding-right: 20px">
        <el-select
          style="min-width: 100%"
          v-model="form.categoryId"
          filterable
          remote
          reserve-keyword
          placeholder="请输入关键词"
          :remote-method="searchCategory"
          :loading="categoryQueryLoading"
        >
          <el-option
            v-for="item in categories"
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
      <el-collapse-item class="high-level-setting" title="高级设置">
        <div class="setting-item">
          <label>选择文章标签</label>
          <el-select
            style="width: 100%"
            v-model="form.tags"
            multiple
            filterable
            remote
            placeholder="请输入关键词"
            :remote-method="searchTag"
            :loading="tagQueryLoading"
          >
            <el-option
              v-for="item in tags"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>

        <div class="setting-item">
          <label>文章简介</label>
          <el-input v-model="form.intro" type="textarea" :rows="2"></el-input>
        </div>

        <div class="setting-item">
          <label>封面图</label>
          <el-upload
            class="upload-demo"
            name="images"
            drag
            :action="imageUploadAction"
            :on-success="onImageUploaded"
            :on-remove="onImageRemove"
            :file-list="uploadImages"
            list-type="picture"
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

        <div class="setting-item">
          <label>是否草稿</label>
          <el-switch
            v-model="form.isDraft"
            active-color="#13ce66"
            inactive-color="#ff4949"
          >
          </el-switch>
        </div>

        <div v-if="form.isDraft" class="setting-item">
          <label>发布时间</label>
          <el-date-picker
            v-model="form.publishedAt"
            type="datetime"
            placeholder="选择日期时间"
          >
          </el-date-picker>
        </div>
      </el-collapse-item>
    </el-collapse>
    <el-row type="flex" justify="end" style="margin-top: 20px">
      <el-button type="primary" @click="submit">发布</el-button>
    </el-row>
  </el-card>
</template>

<script>
import { searchCategories, searchTags } from "../../../../apis";
export default {
  name: "Index",
  data() {
    return {
      categoryQueryLoading: false,
      tagQueryLoading: false,
      imageUploadAction: process.env.VUE_APP_API_HOST + "/files/image",
      uploadImages: [],
      value: "",
      value1: "",
      categories: [],
      tags: [],
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
    },
    searchCategory(query) {
      this.categoryQueryLoading = true;
      if (query === "" || name === undefined || name === null) {
        console.log("query", query);
        this.categoryQueryLoading = false;
        return;
      }

      searchCategories(query)
        .then(res => (this.categories = res.data.list))
        .catch(() => this.$message.error("分类查询失败"))
        .finally(() => (this.categoryQueryLoading = false));
    },
    searchTag(query) {
      this.tagQueryLoading = true;
      if (query === "" || name === undefined || name === null) {
        console.log("query", query);
        this.tagQueryLoading = false;
        return;
      }

      searchTags(query)
        .then(res => (this.tags = res.data.list))
        .catch(() => this.$message.error("分类查询失败"))
        .finally(() => (this.tagQueryLoading = false));
    },
    onImageUploaded(res, file, fileList) {
      console.log("res", res);
      console.log("file", file);
      console.log("fileList", fileList);
      this.uploadImages = res.data.list;
      console.log(this.uploadImages);
      this.form.headImage = res.data.list[0].url;
    },
    onImageRemove(file, fileList) {
      console.log("file", file);
      console.log("fileList", fileList);
      this.form.headImage = "";
    }
  }
};
</script>

<style scoped>
.high-level-setting .setting-item {
  margin-top: 20px;
}
.high-level-setting .setting-item label {
  margin-bottom: 5px;
  margin-right: 5px;
}
</style>
