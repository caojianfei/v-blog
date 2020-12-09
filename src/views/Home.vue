<template>
  <div class="a-container">
    <div class="main-content">
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
        <el-col :xs="24" :sm="14" style="padding: 0">
          <div class="article-list">
            <Article
              v-for="article in articles"
              v-bind:key="article.id"
              :article="article"
            ></Article>
          </div>
        </el-col>
        <!--right-->
        <el-col :xs="24" :sm="{ span: 9, push: 1 }"
          ><div class="grid-content">
            <el-card class="articl-tag-container no-border-radius">
              <el-tag class="article-tag">标签一</el-tag>
              <el-tag class="article-tag" type="success">标签二</el-tag>
              <el-tag class="article-tag" type="info">标签三</el-tag>
              <el-tag class="article-tag" type="warning">标签四</el-tag>
              <el-tag class="article-tag" type="danger">标签五</el-tag>
              <el-tag class="article-tag">标签一</el-tag>
              <el-tag class="article-tag" type="success">标签二</el-tag>
              <el-tag class="article-tag" type="info">标签三</el-tag>
              <el-tag class="article-tag" type="warning">标签四</el-tag>
              <el-tag class="article-tag" type="danger">标签五</el-tag>
            </el-card>
          </div></el-col
        >
      </el-row>
    </div>
  </div>
</template>

<script>
import Article from "@/components/Article";
import { getArticleList } from "../apis/front/front";
import moment from "moment";
export default {
  name: "home",
  components: {
    Article
  },
  mounted() {
    let coefficient = 0.618;
    this.carouselH = this.$refs.carousel.offsetWidth * coefficient;
    window.addEventListener("resize", () => {
      this.carouselH = this.$refs.carousel.offsetWidth * coefficient;
    });

    const { currentPage, pageSize } = this;
    this.getArticles(currentPage, pageSize);
  },
  data() {
    return {
      fit: "cover",
      carouselH: 0,
      banners: [],
      articles: [],
      currentPage: 1,
      pageSize: 10,
      total: 0
    };
  },
  methods: {
    async getArticles(page, pageSize) {
      const result = await getArticleList({
        page,
        pageSize
      });
      const {
        code,
        data: { currentPage, list, total }
      } = result;
      if (code === 0) {
        this.articles = list;
        this.currentPage = currentPage;
        this.total = total;
      }
    },
    changeTime(time) {
      return moment(time).fromNow();
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
</style>
