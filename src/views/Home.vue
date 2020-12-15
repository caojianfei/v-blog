<template>
  <div class="a-container">
    <div class="main-content">
      <!-- 顶部轮播图 -->
      <div class="carousel-container" ref="carousel">
        <el-carousel indicator-position="none" :height="carouselH + 'px'">
          <el-carousel-item class="carousel-item">
            <el-image
              class="carousel-image"
              :src="require('../assets/a.jpg')"
              alt=""
              :fit="fit"
              style="height: 100%;"
            />
          </el-carousel-item>
          <el-carousel-item class="carousel-item">
            <el-image
              class="carousel-image"
              :src="require('../assets/b.jpg')"
              alt=""
              :fit="fit"
              style="height: 100%;"
            />
          </el-carousel-item>
          <el-carousel-item class="carousel-item">
            <el-image
              class="carousel-image"
              :src="require('../assets/c.jpg')"
              alt=""
              :fit="fit"
              style="height: 100%;"
            />
          </el-carousel-item>
        </el-carousel>
      </div>

      <el-row style="margin-top: 20px;">
        <!--left-->
        <el-col :xs="24" :sm="14" style="padding: 0;">
          <div class="article-list">
            <Article
              v-for="article in articles"
              v-bind:key="article.id"
              :article="article"
            ></Article>
          </div>
        </el-col>
        <div class="article-loading" v-if="loading">正在努力加载...</div>
        <!--right-->
        <el-col :xs="24" :sm="{ span: 9, push: 1 }"
          ><div class="grid-content">
            <el-card class="articl-tag-container no-border-radius">
              <el-button
                v-for="tag in tags"
                v-bind:key="tag.id"
                :type="tag.type"
                size="mini"
                @click="searchTag(tag)"
                >{{ tag.name }} [{{ tag.articleCount }}]</el-button
              >
            </el-card>
          </div></el-col
        >
      </el-row>
    </div>
  </div>
</template>

<script>
import Article from "@/components/Article";
import { getTagList, getArticleList } from "../apis/front/front";
export default {
  name: "home",
  components: {
    Article
  },
  mounted() {
    window.addEventListener("scroll", this.onScroll, true);
    let coefficient = 0.618;
    this.carouselH = this.$refs.carousel.offsetWidth * coefficient;
    window.addEventListener("resize", () => {
      // 不知为何，此处有时会报undefined错误
      if (
        this.$refs.carousel === undefined ||
        this.$refs.carousel.offsetWidth === undefined
      ) {
        return;
      }
      this.carouselH = this.$refs.carousel.offsetWidth * coefficient;
    });

    this.getArticles();
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
      tags: []
    };
  },
  methods: {
    async getArticles() {
      this.loading = true;
      const { currentPage, pageSize } = this;
      const result = await getArticleList({
        page: currentPage + 1,
        pageSize
      });
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
          if (tag.articleCount >= 20) {
            tag.type = "danger";
          } else if (tag.articleCount >= 10 && tag.articleCount < 20) {
            tag.type = "warning";
          } else {
            tag.type = "info";
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
      if (contentHeight - clientHeight - scrollTop == 0) {
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
  /* margin-top: 20px; */
  margin-bottom: 20px;
}

.carousel-container {
  margin-top: 20px;
}

.main-content {
  max-width: 1000px;
  width: 100%;
  height: auto;
}
.article-tag {
  margin: 5px;
}
.article-loading {
  text-align: center;
  padding: 20px;
  color: #606266;
  font-size: smaller;
}
</style>
