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
          placeholder="请选择文章分类, 输入关键词搜索分类"
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
        <mavon-editor
          v-model="form.content"
          style="min-height: 500px;"
          @change="onMavonEditChange"
        />
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
import {
  searchCategories,
  searchTags,
  createArticle,
  showArticle,
  editArticle
} from "../../../../apis";
export default {
  name: "Index",
  data() {
    return {
      id: 0,
      categoryQueryLoading: false,
      tagQueryLoading: false,
      imageUploadAction: process.env.VUE_APP_API_HOST + "/files/image",
      uploadImages: [],
      categories: [],
      tags: [],
      form: {
        title: "",
        headImage: "",
        content: "",
        intro: "",
        categoryId: "",
        tags: [],
        isDraft: 0,
        publishedAt: ""
      }
    };
  },
  mounted() {
    let params = this.$route.params;
    let id = params.id;
    // 编辑
    if (id !== undefined && id !== null && id > 0) {
      this.id = id;
      this.searchArticle(id);
    }
    console.log(params);
  },
  methods: {
    onMavonEditChange(value, render) {
      console.log("value: ", value);
      console.log("render", render);
      //this.form.content = value;
    },
    submit() {
      // console.log(this.form);
      // return;
      let categoryId = parseInt(this.form.categoryId);
      if (isNaN(categoryId) || categoryId <= 0) {
        this.$message.error("文章分类为空或填写错误");
        return false;
      }
      if (this.form.title === "") {
        this.$message.error("文章标题不能为空");
        return false;
      }
      if (this.form.content === "") {
        this.$message.error("文章内容不能为空");
        return false;
      }

      if (this.form.isDraft) {
        if (
          this.form.publishedAt === "" ||
          this.form.publishedAt === null ||
          this.form.publishedAt === undefined
        ) {
          this.$message.error("文章发布时间必填");
          return false;
        }
      }

      let body = { ...this.form };
      if (body.publishedAt !== "" && this.form.isDraft) {
        body.publishedAt = body.publishedAt.Format("yyyy-MM-dd HH:mm:ss");
      }
      body.isDraft = body.isDraft ? 1 : 0;
      if (this.id > 0) {
        editArticle(this.id, body)
          .then(res => {
            if (res.code === 0) {
              this.$message.success("文章更新成功");
              this.$router.replace("/admin/articles");
            } else {
              this.$message.error("文章更新失败");
            }
          })
          .catch(error => {
            let errMsg = "请求失败";
            if (error.response.status === 400) {
              errMsg = "参数错误";
            }
            this.$message.error(errMsg);
          });
      } else {
        createArticle(body)
          .then(res => {
            if (res.code === 0) {
              this.$message.success("文章添加成功");
              this.$router.replace("/admin/articles");
            } else {
              this.$message.error("文章添加失败");
            }
          })
          .catch(error => {
            let errMsg = "请求失败";
            if (error.response.status === 400) {
              errMsg = "参数错误";
            }
            this.$message.error(errMsg);
          });
      }
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
      this.form.headImage = res.data.list[0].md5;
    },
    onImageRemove(file, fileList) {
      console.log("file", file);
      console.log("fileList", fileList);
      this.form.headImage = "";
    },
    searchArticle(id) {
      showArticle(id).then(res => {
        if (res.code !== 0) {
          this.$message.error(res.message);
          return;
        }
        let { data } = res;
        this.form.title = data.title;
        if (data.headImage !== "") {
          this.uploadImages = [
            {
              name: data.headImageFile.name,
              url: data.headImageFile.url
            }
          ];
        }
        this.categories = [
          { value: data.category.id, label: data.category.name }
        ];
        this.form.title = data.title;
        this.form.headImage = data.headImage;
        this.form.content = data.content;
        this.form.intro = data.intro;
        this.form.categoryId = data.category.id;
        this.form.isDraft = data.isDraft === 1;
        if (data.isDraft === 1) {
          this.form.publishedAt = new Date(
            Date.parse(data.publishedAt.replace(/-/g, "/"))
          );
        }
        if (data.tags.length > 0) {
          let tags = [];
          let tagValues = [];
          for (let i = 0; i < data.tags.length; i++) {
            tags[i] = {
              label: data.tags[i].name,
              value: data.tags[i].id
            };

            tagValues[i] = data.tags[i].id;
          }
          this.tags = tags;
          this.form.tags = tagValues;
        }
      });
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
