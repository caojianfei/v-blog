<template>
  <div class="main-content">
    <div class="article">
      <div class="article-image"></div>
      <div class="article-content">
        <h1>文章标题啊发发是</h1>
        <h4>2020-10-10 10:10</h4>
        <p v-html="articleHtml"></p>
      </div>
      <div class="comment">
        <h1>评论</h1>
        <div class="comment-edit">
          <mavon-editor class="mavon-edit" v-bind="commentEdit" />
          <div
            class="userinfo"
            style="width: 100%; text-align: center; margin-top: 20px"
          >
            <el-row :gutter="15">
              <el-col :xs="24" :sm="9">
                <div class="input-item">
                  <label class="input-label">
                    <input placeholder="邮箱" />
                  </label>
                </div>
              </el-col>
              <el-col :xs="24" :sm="9">
                <div class="input-item">
                  <label class="input-label">
                    <input placeholder="邮箱" />
                  </label>
                </div>
              </el-col>
              <el-col :xs="24" :sm="6">
                <div class="input-item">
                  <el-button class="submit-commit-button" size="small"
                    >提交</el-button
                  >
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
        <el-divider></el-divider>
        <div class="comment-list">
          <div class="comment-item">
            <p>一个路过的人</p>
            <p>2020-10-10 10:10</p>
            <p v-html="articleHtml"></p>
          </div>
          <el-divider></el-divider>
          <div class="comment-item">
            <p>一个路过的人</p>
            <p>2020-10-10 10:10</p>
            <p v-html="articleHtml"></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Post",
  data() {
    return {
      content: "# hahahah" + "```" + "" + "echo 'hello';" + "```",
      articleHtml: "",
      commentEdit: {
        boxShadow: false,
        subfield: false,
        toolbarsFlag: true,
        toolbars: {
          bold: false, // 粗体
          italic: false, // 斜体
          header: true, // 标题
          underline: false, // 下划线
          strikethrough: false, // 中划线
          mark: false, // 标记
          superscript: false, // 上角标
          subscript: false, // 下角标
          quote: true, // 引用
          ol: false, // 有序列表
          ul: false, // 无序列表
          link: true, // 链接
          imagelink: true, // 图片链接
          code: true, // code
          table: false, // 表格
          fullscreen: false, // 全屏编辑
          readmodel: false, // 沉浸式阅读
          htmlcode: false, // 展示html源码
          help: true, // 帮助
          /* 1.3.5 */
          undo: true, // 上一步
          redo: true, // 下一步
          trash: true, // 清空
          save: true, // 保存（触发events中的save事件）
          /* 1.4.2 */
          navigation: false, // 导航目录
          /* 2.1.8 */
          alignleft: false, // 左对齐
          aligncenter: false, // 居中
          alignright: false, // 右对齐
          /* 2.2.1 */
          subfield: false, // 单双栏模式
          preview: true // 预览
        }
      }
    };
  },
  mounted() {
    this.renderMd();
  },
  methods: {
    renderMd() {
      this.articleHtml = this.$markDown.render(this.content);
    }
  }
};
</script>

<style scoped>
.main-content {
}
.article {
  max-width: 700px;
  background: #ffffff;
  margin-left: auto;
  margin-right: auto;
  margin-top: 20px;
}
.article-image {
  width: 100%;
  height: 200px;
  background: red;
}
.article-content {
  padding: 20px;
}
.input-item {
  height: 32px;
  margin: 10px;
}

.input-item input {
  border: none;
  border-bottom: 1px solid #f0f2f5;
  width: 100%;
  height: 100%;
  outline: none;
}

.submit-commit-button {
  width: 100%;
  height: 100%;
}
</style>
