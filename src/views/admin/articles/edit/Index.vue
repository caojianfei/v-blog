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
          codeStyle="monokai-sublime"
          v-model="form.content"
          style="min-height: 500px"
          ref="md"
          @imgAdd="onEditImageAdd"
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
          <label>关键词（SEO）</label>
          <el-input v-model="form.keywords"></el-input>
        </div>

        <div class="setting-item">
          <label>简介（SEO）</label>
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
            :http-request="uploadCoverImage"
            list-type="picture"
            :multiple="false"
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

        <div class="setting-item">
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
import moment from "moment";
import {
  searchCategories,
  searchTags,
  createArticle,
  showArticle,
  editArticle,
  getFormApiAuth,
  uploadImage
} from "../../../../apis";
export default {
  name: "Index",
  data() {
    return {
      id: 0,
      categoryQueryLoading: false,
      tagQueryLoading: false,
      imageUploadAction: "https://v0.api.upyun.com/static-storage-caojf",
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
        publishedAt: "",
        keywords: ""
      },
      upyun: {
        authorization: "",
        policy: ""
      },
      uploadOptions: {
        bucket: "static-storage-caojf",
        saveKey: "/v-blog/{filemd5}",
        expiration: moment()
          .add(30, "minutes")
          .unix()
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
    // 获取又拍云 from api 授权信息
    this.requestUpyunAuth();
  },
  methods: {
    submit() {
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

      let body = { ...this.form };
      if (
        body.publishedAt !== "" &&
        body.publishedAt !== null &&
        body.publishedAt !== undefined
      ) {
        body.publishedAt = body.publishedAt.Format("yyyy-MM-dd HH:mm:ss");
      }
      body.isDraft = body.isDraft ? 1 : 0;
      if (this.id > 0) {
        editArticle(this.id, body)
          .then(res => {
            const { code } = res;
            if (code === 0) {
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
            const { code } = res;
            if (code === 0) {
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
        this.tagQueryLoading = false;
        return;
      }

      searchTags(query)
        .then(res => (this.tags = res.data.list))
        .catch(() => this.$message.error("分类查询失败"))
        .finally(() => (this.tagQueryLoading = false));
    },
    onImageUploaded(res) {
      const {
        code,
        data: { list }
      } = res;
      if (code !== 0) {
        this.$message.error("上传失败");
        return;
      }
      this.uploadImages = list;
      this.form.headImage = list[0]["md5"];
    },
    onImageRemove() {
      this.form.headImage = "";
    },
    searchArticle(id) {
      showArticle(id).then(res => {
        const { code, data, message } = res;
        const { headImageFile } = data;
        if (code !== 0) {
          this.$message.error(message);
          return;
        }
        this.form.title = data.title;
        if (data.headImage !== "") {
          this.uploadImages = [
            {
              name: headImageFile.name,
              url: headImageFile.url
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
        this.form.publishedAt = new Date(
          Date.parse(data.publishedAt.replace(/-/g, "/"))
        );
        this.form.keywords = data.keywords;

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
    },
    onEditImageAdd(pos, file) {
      let formData = new FormData();
      formData.append("file", file);
      formData.append("bucket", this.uploadOptions.bucket);
      formData.append("save-key", this.uploadOptions.saveKey);
      formData.append("expiration", this.uploadOptions.expiration);
      formData.append("authorization", this.upyun.authorization);
      formData.append("policy", this.upyun.policy);

      uploadImage(formData, this.uploadOptions.bucket).then(res => {
        const { status, data } = res;
        if (status === 200) {
          let { url } = data;
          url = `https://static.caojf.com${url}`;
          this.$refs.md.$img2Url(pos, url);
        } else {
          this.$message.error("图片上传失败");
        }
      });
    },
    requestUpyunAuth() {
      getFormApiAuth(this.uploadOptions).then(res => {
        const { code, data, message } = res;
        if (code !== 0) {
          this.$message.error(message);
        } else {
          this.upyun.authorization = data.authorization;
          this.upyun.policy = data.policy;
        }
      });
    },
    uploadCoverImage(data) {
      let formData = new FormData();
      formData.append("file", data.file);
      formData.append("bucket", this.uploadOptions.bucket);
      formData.append("save-key", this.uploadOptions.saveKey);
      formData.append("expiration", this.uploadOptions.expiration);
      formData.append("authorization", this.upyun.authorization);
      formData.append("policy", this.upyun.policy);
      uploadImage(formData, this.uploadOptions.bucket).then(res => {
        const { status, data } = res;
        if (status === 200) {
          let { url } = data;
          let fullUrl = `https://static.caojf.com${url}`;
          this.form.headImage = fullUrl;
          this.uploadImages = [
            {
              name: url,
              url: fullUrl
            }
          ];
        } else {
          this.$message.error("图片上传失败");
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
