import axios from "axios";

const token = localStorage.getItem("token");
//store.state.auth.token;

const httpClient = axios.create({
  baseURL: "http://localhost:8888"
});

if (token !== "" && token !== null && token !== undefined) {
  httpClient.defaults.headers["Authorization"] = "Bearer " + token;
}

httpClient.interceptors.response.use(
  function(response) {
    // 对响应数据做点什么
    if (response.status >= 200 < 300) {
      return response.data;
    }
    return response;
  },
  function(error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

export default httpClient;
