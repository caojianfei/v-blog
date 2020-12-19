import { login } from "@/apis";

export default {
  namespaced: true,
  state: {
    token: ""
  },
  getters: {
    isLogin: state => state.token !== ""
  },
  mutations: {
    setToken(state, { token, storage }) {
      if (storage === true) {
        localStorage.setItem("token", token);
      }
      state.token = token;
    },
    clearToken(state) {
      state.token = "";
      localStorage.removeItem("token");
    }
  },
  actions: {
    login({ commit }, passport) {
      return new Promise((resolve, reject) => {
        login(passport)
          .then(res => {
            const {
              code,
              message,
              data: { token }
            } = res;
            if (code !== 0) {
              resolve({ code, message });
              return;
            }
            commit("setToken", { token: token, storage: true });
            resolve({ code, message });
          })
          .catch(err => {
            reject(err);
          });
      });
    }
  }
};
