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
            />
          </el-carousel-item>
          <el-carousel-item class="carousel-item">
            <el-image
              class="carousel-image"
              :src="require('../assets/b.jpg')"
              alt=""
            />
          </el-carousel-item>
          <el-carousel-item class="carousel-item">
            <el-image
              class="carousel-image"
              :src="require('../assets/c.jpg')"
              alt=""
            />
          </el-carousel-item>
        </el-carousel>
      </div>

      <el-row style="margin-top: 20px;">
        <!--left-->
        <el-col :xs="24" :sm="14" style="padding: 0">
          <div class="article-list">
            <Article :article="article"></Article>
            <Article :article="article"></Article>
            <Article :article="article"></Article>
            <Article :article="article"></Article>
            <Article :article="article"></Article>
            <Article :article="article"></Article>
          </div>
        </el-col>
        <!--right-->
        <el-col :xs="24" :sm="9" :push="1"
          ><div class="grid-content">
            <el-card class="articl-tag-container">
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
export default {
  name: "home",
  components: {
    Article
  },
  mounted() {
    let windowW = document.body.offsetWidth;
    let coefficient = 3;
    if (windowW < 768) {
      coefficient = 2;
    }

    this.carouselH = this.$refs.carousel.offsetWidth / coefficient;
    window.onresize = () => {
      windowW = document.body.offsetWidth;
      if (windowW < 768) {
        coefficient = 2;
      }
      this.carouselH = this.$refs.carousel.offsetWidth / coefficient;
    };
  },
  data() {
    return {
      carouselH: 0,
      banners: [],
      article: {
        headImageUrl:
          "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
        title: "灰度发拉架飞机圣诞快乐",
        publishedAt: "2020-10-11 10:10",
        intro: "福利卡江东父老卡建设路口打飞机爱丽丝发就拉世纪东方发圣诞节饭兰",
        views: 100,
        commentCount: 200
      }
    };
  },
  methods: {}
};
</script>

<style scoped>
.a-container {
  width: 100%;
  display: flex;
  justify-content: center;
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
