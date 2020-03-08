import { login } from "../../apis";

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
      console.log("setToken", token, storage);
      if (storage === true) {
        localStorage.setItem("token", token);
      }
      state.token = token;
    },
    clearToken(state) {
      state.token = "";
    }
  },
  actions: {
    login({ commit }, passport) {
      console.log("actions login", passport);
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
            console.error(err);
            reject(err);
          });
      });
    }
  }
};
