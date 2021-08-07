import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import mavonEditor from "mavon-editor";
//import "element-ui/lib/theme-chalk/index.css";
//import "mavon-editor/dist/css/index.css";
//import "element-ui/lib/theme-chalk/display.css";
import "./assets/common/common.css";
import moment from "moment";

moment.locale("zh-cn");

Vue.use(ElementUI);
Vue.use(mavonEditor);
Vue.config.productionTip = false;
Vue.prototype.$markDown = mavonEditor.markdownIt;

Date.prototype.Format = function(fmt) {
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "H+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    S: this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(
      RegExp.$1,
      (this.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
  return fmt;
};

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
