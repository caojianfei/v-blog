<template>
  <div class="a-container">
    <div class="main-content">
      <!-- 顶部轮播图 -->
      <!--      <div class="carousel-container" ref="carousel">-->
      <!--        <el-carousel indicator-position="none" :height="carouselH + 'px'">-->
      <!--          <el-carousel-item-->
      <!--            v-for="carousel in carousels"-->
      <!--            class="carousel-item"-->
      <!--            v-bind:key="carousel"-->
      <!--          >-->
      <!--            <el-image-->
      <!--              class="carousel-image"-->
      <!--              :src="carousel"-->
      <!--              alt=""-->
      <!--              :fit="fit"-->
      <!--              style="height: 100%;"-->
      <!--              @click="$message.warning('别点了，暂时没用！')"-->
      <!--            />-->
      <!--          </el-carousel-item>-->
      <!--        </el-carousel>-->
      <!--      </div>-->

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
        <!--right-->
        <el-col :xs="24" :sm="10"
          ><div class="grid-content">
            <el-card class="article-tag-container no-border-radius">
              <el-button
                style="margin: 5px;"
                v-for="tag in tags"
                v-bind:key="tag.id"
                :type="tag.type"
                size="mini"
                plain
                @click="searchTag(tag)"
                >{{ tag.name }} [{{ tag["articleCount"] }}]</el-button
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
import code1 from "@/assets/code1.jpg";
import code2 from "@/assets/code2.jpeg";
import code3 from "@/assets/code3.jpg";
export default {
  name: "home",
  components: {
    Article
  },
  mounted() {
    // window.addEventListener("scroll", this.onScroll, true);
    // let coefficient = 0.618;
    // this.carouselH = this.$refs.carousel.offsetWidth * coefficient;
    // window.addEventListener("resize", () => {
    //   // 不知为何，此处有时会报undefined错误
    //   if (
    //     this.$refs.carousel === undefined ||
    //     this.$refs.carousel.offsetWidth === undefined
    //   ) {
    //     return;
    //   }
    //   this.carouselH = this.$refs.carousel.offsetWidth * coefficient;
    // });
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
      tags: [],
      carousels: [
        "https://gitee.com/cjf123/file-repository/raw/master/17742555.jpeg",
        code1,
        code2,
        code3
      ]
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
