// 写法2：在configureWebpack配置externals
module.exports = {
  // configureWebpack 值为函数，参数 config (被解析的配置)，可直接赋值修改
  configureWebpack: config => {
    config.externals = {
      vue: "Vue",
      "element-ui": "ELEMENT",
      "mavon-editor": "MavonEditor"
    };
  }
};
