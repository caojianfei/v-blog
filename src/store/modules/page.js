export default {
  namespaced: true,
  state: {
    navCollapse: false,
    screenWidth: document.body.clientWidth,
    screenHeight: document.body.clientHeight,
    showBreadCrumb: true
  },
  mutations: {
    openNav(state) {
      state.navCollapse = false;
    },
    closeNav(state) {
      state.navCollapse = true;
    },
    toggleNav(state) {
      state.navCollapse = !state.navCollapse;
    }
  },
  actions: {}
};
