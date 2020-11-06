<template>
  <div class="main-content">
    <div class="article">
      <el-image
        class="article-image"
        fit="cover"
        :src="require('../assets/a.jpg')"
      ></el-image>

      <div class="article-content">
        <div class="article-title">文章标题啊发发是</div>
        <div class="article-published-time">
          四月 16，2020
        </div>
        <p class="markdown-body" v-html="articleHtml"></p>
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
                  <el-button class="submit-commit-button" size="small" plain
                    >提交评论</el-button
                  >
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
        <!--        <el-divider></el-divider>-->
        <div class="comment-list">
          <div class="comment-item">
            <div class="comment-title">
              <span class="comment-nickname">一个路过的人</span> 在 <span class="comment-published-time">2020年四月</span> 说：
            </div>
            <p class="markdown-body comment-content" v-html="commentHtml"></p>
          </div>
          <el-divider></el-divider>
          <div class="comment-item">
            <div class="comment-title">
              <span class="comment-nickname">一个路过的人</span> 在 <span class="comment-published-time">2020年四月</span> 说：
            </div>
            <p class="markdown-body comment-content" v-html="commentHtml"></p>
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
      content:
        "[github地址](https://github.com/caojianfei/laravel-qcloud-cos) 随手star :kissing_heart:\n" +
        "# 扩展说明\n" +
        "\n" +
        "该扩展是对`laravel`框架中的文件存储自定义驱动的扩展，实现`腾讯云cos 对象存储`驱动。目前是在laravel 5.6 版本测试与开发的，其他版本暂时没有亲测。\n" +
        "\n" +
        "\n" +
        "# 使用\n" +
        "\n" +
        "安装扩展包\n" +
        "\n" +
        "```\n" +
        "composer install caojianfei/laravel-qcloud-cos\n" +
        "```\n" +
        "\n" +
        "配置 filesystems.php\n" +
        "\n" +
        "```\n" +
        "'disks' => [\n" +
        "       .\n" +
        "       .\n" +
        "       .\n" +
        "       \n" +
        "    'qcloud-cos' => [\n" +
        "        /* 驱动名称 */\n" +
        "        'driver' => 'qcloud-cos',\n" +
        "        /* 地域 */\n" +
        "        'region' =>  env('QCLOUD_COS_REGION', 'ap-shanghai'),\n" +
        "        /* 认证信息 */\n" +
        "        'credentials' => [\n" +
        "            'app_id' =>  env('QCLOUD_COS_APP_ID'),\n" +
        "            'secret_id' =>  env('QCLOUD_COS_SECRET_ID'),\n" +
        "            'secret_key' => env('QCLOUD_COS_SECRET_KEY'),\n" +
        "            'token' => env('QCLOUD_COS_TOKEN', null)\n" +
        "        ],\n" +
        "        /* 默认存储桶 */\n" +
        "        'default_bucket' =>  env('QCLOUD_COS_DEFAULT_BUCKET'),\n" +
        "        'timeout' => env('QCLOUD_COS_TIMEOUT', 3600),\n" +
        "        'connect_timeout' =>  env('QCLOUD_COS_CONNECT_TIMEOUT', 3600)\n" +
        "    ],\n" +
        "\n" +
        "],\n" +
        "```\n" +
        "\n" +
        "配置好自己的配置之后就可以开始使用了，具体使用方法可以参考[laravel官方文档](https://learnku.com/docs/laravel/5.6/filesystem/1390)\n" +
        "\n" +
        "# 官方文档\n" +
        "\n" +
        "[laravel 文件存储](https://learnku.com/docs/laravel/5.6/filesystem/1390)\n" +
        "\n" +
        "[腾讯云对象存储](https://cloud.tencent.com/document/product/436)\n" +
        "\n" +
        "# 结尾\n" +
        "\n" +
        "如果喜欢，欢迎 star，如果发现了任何问题或有更好的意见和建议，欢迎联系或者`pull request`\n" +
        "\n" +
        "# License\n" +
        "\n" +
        "MIT\n" +
        "\n",
      articleHtml: "",
      comment:
        "# 我发的考虑时间\n" +
        "flksjdkflja 付款啦九点零分静安寺\n" +
        "\n" +
        "```php\n" +
        'echo "hello world"\n' +
        "```",
      commentHtml: "",
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
      this.commentHtml = this.$markDown.render(this.comment);
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
.article-published-time {
  color: #cccccc;
  font-size: small;
}
.article {
  max-width: 700px;
  background: #ffffff;
  margin-left: auto;
  margin-right: auto;
  margin-top: 20px;
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
  margin-left: 10px;
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
