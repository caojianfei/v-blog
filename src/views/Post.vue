<template>
  <div class="main-content">
    <div v-if="!empty" class="article">
      <el-image
        v-if="article.headImageUrl"
        class="article-image"
        fit="cover"
        :src="article.headImageUrl"
      ></el-image>

      <div class="article-content">
        <div class="article-title">{{ article.title }}</div>
        <div class="article-published-time">
          {{ article.publishedAt }}
        </div>
        <p class="markdown-body" v-html="articleHtml"></p>
      </div>

      <div class="comment">
        <h1>评论</h1>
        <div class="comment-edit">
          <mavon-editor
            v-model="comment.content"
            class="mavon-edit"
            v-bind="commentEdit"
          />
          <div
            class="userinfo"
            style="width: 100%; text-align: center; margin-top: 20px"
          >
            <el-row :gutter="15">
              <el-col :xs="24" :sm="9">
                <div class="input-item">
                  <label class="input-label">
                    <input v-model="comment.nickname" placeholder="昵称" />
                  </label>
                </div>
              </el-col>
              <el-col :xs="24" :sm="9">
                <div class="input-item">
                  <label class="input-label">
                    <input v-model="comment.email" placeholder="邮箱" />
                  </label>
                </div>
              </el-col>
              <el-col :xs="24" :sm="6">
                <div class="input-item">
                  <el-button
                    @click="addCommit"
                    class="submit-commit-button"
                    size="small"
                    plain
                    >提交评论
                  </el-button>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>

        <div class="comment-list">
          <div class="comment-item" v-for="cmt in comments" v-bind:key="cmt.id">
            <div class="comment-title">
              <span class="comment-nickname">{{ cmt.nickname }}</span> 在
              <span class="comment-published-time">{{ cmt.createdAt }}</span>
              说：
            </div>
            <p
              class="markdown-body comment-content"
              v-html="renderComment(cmt.content)"
            ></p>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="empty"
      style="display: flex;flex-direction: column;align-items: center;margin-top: 180px;"
    >
      <img
        alt=""
        style="width: 100%;max-width: 280px;"
        :src="require('../assets/cry.png')"
      />
      <div style="color: #606266; margin-top: 20px; text-align:center;">
        文章竟然不翼而飞了 ...
      </div>
    </div>
  </div>
</template>

<script>
import {
  getArticleInfo,
  addArticleComment,
  getArticleCommentList
} from "../apis/front/front";
import moment from "moment";

export default {
  name: "Post",
  data() {
    return {
      article: {
        headImageUrl: ""
      },
      loading: false,
      empty: false,
      articleHtml: "",
      comment: {
        nickname: "",
        email: "",
        content: ""
      },
      comments: [],
      commentHtml: "",
      commentEdit: {
        boxShadow: false,
        subfield: false,
        toolbarsFlag: true,
        autofocus: false,
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
  beforeRouteEnter(to, from, next) {
    getArticleInfo(to.params.id, { preview: to.query.preview }).then(res => {
      const { code, data } = res;
      next(vm => {
        if (code === 0) {
          // seo 信息设置
          document.title = data.title;
          document
            .querySelector('meta[name="keywords"]')
            .setAttribute("content", data.intro);
          document
            .querySelector('meta[name="description"]')
            .setAttribute("content", data.intro);
          vm.article = data;
          vm.articleHtml = vm.$markDown.render(data.content);
          return;
        }
        vm.empty = true;
      });
    });
  },
  async mounted() {
    await this.getComments(this.$route.params.id);
  },
  methods: {
    renderComment(content) {
      return this.$markDown.render(content);
    },
    async addCommit() {
      const { nickname, email, content } = this.comment;
      if (content === "") {
        this.$message.warning("评论内容不能为空");
        return;
      }
      if (nickname === "") {
        this.$message.warning("昵称不能为空");
        return;
      }
      if (email === "") {
        this.$message.warning("email 不能为空");
        return;
      }

      const articleId = this.article.id;
      if (
        articleId === undefined ||
        articleId === "" ||
        articleId === null ||
        articleId === 0
      ) {
        this.$message.warning("文章id异常");
        return;
      }

      const result = await addArticleComment({
        nickname,
        email,
        content,
        articleId
      });
      const { code } = result;
      if (code === 0) {
        this.$message.success("评论成功，等待管理员审核！");
        this.resetCommentData();
      }
    },

    resetCommentData() {
      const { nickname, email, content } = "";
      this.comment = Object.assign({}, { nickname, email, content });
    },

    async getComments(articleId) {
      if (!(articleId > 0)) {
        return;
      }
      const result = await getArticleCommentList(articleId);
      let {
        code,
        data: { list }
      } = result;
      if (code === 0) {
        list.forEach(comment => {
          comment.createdAt = moment(comment.createdAt).fromNow();
        });
        this.comments = list;
      }
    }
  }
};
</script>

<style scoped>
.main-content {
}

.article-title {
  font-weight: bold;
  font-size: x-large;
  margin-bottom: 10px;
}

.article-content {
  padding-top: 20px;
  margin-left: 20px;
  margin-right: 20px;
  margin-bottom: 10px;
}

.article-published-time {
  color: #cccccc;
  font-size: small;
}

.article {
  max-width: 700px;
  background: #ffffff;
  margin-left: auto;
  margin-right: auto;
  margin-top: 10px;
}

.article-image {
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
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

.comment {
  margin: 20px;
}

.comment-list {
  margin-top: 20px;
  padding-bottom: 20px;
}

.comment-title {
  margin-bottom: 10px;
}

.comment-content {
  /* margin-left: 10px; */
  background: #f8f8f8;
  padding: 15px 10px 15px 10px;
  border-radius: 5px;
}

.comment-nickname {
  font-size: large;
  font-weight: 600;
  color: darksalmon;
}

.comment-published-time {
  color: dimgrey;
}
</style>
