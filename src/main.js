import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import mavonEditor from "mavon-editor";
import "element-ui/lib/theme-chalk/index.css";
import "mavon-editor/dist/css/index.css";

Vue.use(ElementUI);
Vue.use(mavonEditor);
Vue.config.productionTip = false;

console.log(store.state.auth.token);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
