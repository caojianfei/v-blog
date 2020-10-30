import axios from "axios";
import { default as store } from "../store";
import { Message } from "element-ui";
import { default as router } from "../router";

// console.log("process.env.VUE_APP_API_HOST", process.env.VUE_APP_API_HOST);

const httpClient = axios.create({
  baseURL: process.env.VUE_APP_API_HOST
});

httpClient.interceptors.request.use(
  function(config) {
    const token = store.state.auth.token;
    if (token !== "" && token !== null && token !== undefined) {
      config.headers.Authorization = "Bearer " + token;
    }
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

httpClient.interceptors.response.use(
  function(response) {
    // 对响应数据做点什么
    if (response.status >= 200 < 300) {
      return response.data;
    }
    return response;
  },
  function(error) {
    let errMsg = "网络请求失败";
    // 未登录处理
    if (error.response.status === 401) {
      // 清空 token
      store.commit("auth/clearToken");
      // 导航到登录页面
      router.push("/login").then();
      errMsg = "未登录或登录失效，请重新登录";
    }
    Message.error(errMsg);
    return Promise.reject(error);
  }
);

export default httpClient;
