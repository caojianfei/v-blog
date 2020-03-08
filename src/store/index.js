import Vue from "vue";
import Vuex from "vuex";
import { page, auth } from "./modules";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    page,
    auth
  }
});

const token = localStorage.getItem("token");
if (token !== "" && token !== null && token !== undefined) {
  store.commit("auth/setToken", {token: token, storage: false});
}

export default store;
