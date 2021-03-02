<template>
  <div class="article-item">
    <el-card class="article no-border-radius" :body-style="{ padding: '0px' }">
      <!-- 文章头图 -->
      <div
        v-if="article.headImageUrl"
        ref="articleImage"
        class="article-image"
        :style="{ width: '100%', height: articleImageHeigth + 'px' }"
      >
        <el-image
          :src="article.headImageUrl"
          fit="cover"
          style="width: 100%; height: 100%;"
          :preview-src-list="[article.headImageUrl]"
        ></el-image>
      </div>

      <!-- 文章内容 -->
      <div class="article-content">
        <div class="article-title">
          <div class="article-title-context">
            {{ article.title }}
          </div>
          <div class="articl-publised-time">
            {{ changeTime(article.publishedAt) }}
          </div>
        </div>
        <div class="article-intro">
          {{ article.intro }}
        </div>
        <div class="article-bottom">
          <el-button
            @click="readArticle(article.id)"
            style="border: none;"
            type="danger"
            plain
            >阅读全文
          </el-button>
          <div>
            <div class="icon-container">
              <i class="el-icon-view"></i>
              <span class="articl-number">{{ article.views }}</span>
            </div>
            <div class="icon-container">
              <i class="el-icon-chat-square"></i>
              <span class="articl-number">{{ article.commentCount }}</span>
            </div>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "Article",
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      articleImageHeigth: 0
    };
  },
  mounted() {
    if (this.$refs.articleImage) {
      this.articleImageHeigth = this.$refs.articleImage.offsetWidth * 0.5;
      window.addEventListener("resize", () => {
        if (this.$refs.articleImage && this.$refs.articleImage.offsetWidth) {
          this.articleImageHeigth = this.$refs.articleImage.offsetWidth * 0.5;
        }
      });
    }
  },
  methods: {
    readArticle(articleId) {
      this.$router.push(`/post/${articleId}`);
    },
    changeTime(time) {
      return moment(time).format("YYYY/MM/DD");
    }
  }
};
</script>

<style scoped>
.article-item {
  margin-bottom: 20px;
}

/* .article-image {
  width: 100%;
  height: 100px;
} */
.article-content {
  margin: 20px;
}

.article-title-context {
  font-weight: 500;
  font-size: 24px;
  margin-bottom: 10px;
}

.articl-publised-time {
  color: #cccccc;
  margin-bottom: 10px;
}

.article-intro {
  margin-bottom: 10px;
  font-size: 14px;
  line-height: 26px;
}

.article-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
}

.articl-number {
  padding: 5px;
  font-size: small;
  color: #909399;
}

.el-icon-view,
.el-icon-chat-square {
  font-size: 20px;
  font-weight: 1000;
}

.icon-container {
  display: inline-flex;
  align-items: center;
}

.icon-container:first-child {
  padding-right: 5px;
}
</style>
