<template>
  <div class="a-container">
    <div class="main-content">
      <div class="">
        <el-carousel indicator-position="outside">
          <el-carousel-item>
            <img src="../assets/a.jpg" alt="" />
          </el-carousel-item>
          <el-carousel-item>
            <img src="../assets/a.jpg" alt="" />
          </el-carousel-item>
          <el-carousel-item>
            <img src="../assets/a.jpg" alt="" />
          </el-carousel-item>
        </el-carousel>
      </div>

      <el-row :gutter="10">
        <!--left-->
        <el-col :xs="24" :sm="14">
          <div class="article-list">
            <div class="article-item">
              <el-card class="article" :body-style="{ padding: '0px' }">
                <div class="article-image" style="width: 100%; height: 200px">
                  <el-image
                    style="width: 100%; height: 100%"
                    src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                    :fit="fit"
                  ></el-image>
                </div>
                <div class="article-title">
                  <span>缭乱的漫望</span>
                  <br />
                  <span>四月 15, 2020</span>
                </div>
                <div class="article-content">
                  时间或许过于稚嫩，脚步充斥着散漫与不经心，夏夜里适逢的一道凉风掠过发梢，就不见了匆匆一面的夏天，依稀只留了影踪在岁月的墙壁上雕刻了明与昨的年...
                </div>
                <div class="article-bottom">
                  <button>开始阅读</button>
                  <div>
                    <i class="el-icon-view"></i>
                    <i class="el-icon-chat-square"></i>
                  </div>
                </div>
              </el-card>
            </div>
            <div class="article-item">
              <el-card class="article" :body-style="{ padding: '0px' }">
                <div class="article-image" style="width: 100%; height: 200px">
                  <el-image
                    style="width: 100%; height: 100%"
                    src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                    :fit="fit"
                  ></el-image>
                </div>
                <div class="article-title">
                  <span>缭乱的漫望</span>
                  <br />
                  <span>四月 15, 2020</span>
                </div>
                <div class="article-content">
                  时间或许过于稚嫩，脚步充斥着散漫与不经心，夏夜里适逢的一道凉风掠过发梢，就不见了匆匆一面的夏天，依稀只留了影踪在岁月的墙壁上雕刻了明与昨的年...
                </div>
                <div class="article-bottom">
                  <button>开始阅读</button>
                  <div>
                    <i class="el-icon-view"></i>
                    <i class="el-icon-chat-square"></i>
                  </div>
                </div>
              </el-card>
            </div>
          </div>
        </el-col>
        <!--right-->
        <el-col :xs="24" :sm="10"
          ><div class="grid-content bg-purple">2</div></el-col
        >
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "home",
  components: {},
  data() {
    return {
      banners: [
        {
          img: "../assets/a.jpg"
        },
        {
          img: "../assets/a.jpg"
        }
      ]
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
  margin-top: 40px;
}

.main-content {
  max-width: 1140px;
  width: 100%;
  /*background: aqua;*/
  height: auto;
}

.bg-purple {
  background: purple;
}
</style>
