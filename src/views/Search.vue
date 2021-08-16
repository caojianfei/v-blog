<template>
  <div class="a-container">
    <div class="main-content">
      <el-row style="margin-top: 10px;">
        <!--left-->
        <el-col :xs="24" :sm="14" style="padding: 0;">
          <div class="article-list">
            <Article
              v-for="article in articles"
              v-bind:key="article.id"
              :article="article"
            ></Article>
          </div>
          <div class="article-loading" v-if="loading">正在努力加载...</div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import Article from "@/components/Article";
import { getTagList, getArticleList } from "../apis/front/front";
export default {
  name: "search",
  components: {
    Article
  },
  mounted() {
    const { type, value } = this.$route.query;
    window.addEventListener("scroll", this.onScroll, true);
    this.getArticles(type, value);
    this.getTags();
  },
  data() {
    return {
      fit: "cover",
      carouselH: 0,
      banners: [],
      articles: [],
      currentPage: 0,
      pageSize: 10,
      total: 0,
      loading: false,
      tags: [],
      carousels: []
    };
  },
  methods: {
    async getArticles(type, value) {
      this.loading = true;
      const { currentPage, pageSize } = this;
      let params = {};
      params.page = currentPage + 1;
      params.pageSize = pageSize;
      if (type == "tag") {
        params.tag = value;
      }
      if (type == "keyword") {
        params.title = value;
      }
      const result = await getArticleList(params);
      const {
        code,
        data: { list, total }
      } = result;
      if (code === 0) {
        this.articles.push(...list);
        this.currentPage = currentPage + 1;
        this.total = total;
      }
      this.loading = false;
    },
    async getTags() {
      const result = await getTagList();
      const {
        code,
        data: { list }
      } = result;
      if (code === 0) {
        list.forEach(tag => {
          if (tag["articleCount"] >= 20) {
            tag.type = "danger";
          } else if (tag["articleCount"] >= 10 && tag["articleCount"] < 20) {
            tag.type = "warning";
          } else {
            tag.type = "success";
          }
        });
        this.tags = list;
      }
    },
    searchTag(tag) {
      this.$router.push({
        path: "search",
        query: { type: "tag", value: tag.id }
      });
    },
    onScroll() {
      const el = document.documentElement;
      const contentHeight = el.scrollHeight;
      const clientHeight = el.clientHeight;
      const scrollTop = el.scrollTop;

      // 屏幕滚动到底部
      if (contentHeight - clientHeight - scrollTop === 0) {
        const isEnd = this.articles.length >= this.total;
        if (this.loading === false && isEnd === false) {
          this.getArticles();
        }
      }
    }
  }
};
</script>

<style scoped>
.a-container {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.main-content {
  max-width: 1000px;
  width: 100%;
  height: auto;
}

.article-loading {
  text-align: center;
  padding: 20px;
  color: #606266;
  font-size: smaller;
}

.article-tag-container {
  margin-left: 10px;
  margin-right: 10px;
}

@media screen and (max-width: 767px) {
  .article-tag-container {
    margin: 0;
  }
}
</style>
