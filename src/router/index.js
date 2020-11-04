import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";

Vue.use(VueRouter);
import Layout from "../views/admin/Layout";
import Dashboard from "../views/admin/dashboard/Dashboard";
import Tags from "../views/admin/tags/Index";
import Articles from "../views/admin/articles/Index";
import Categories from "../views/admin/categories/Index";
import Home from "../views/Home";
import Index from "../views/Index";
const routes = [
  {
    path: "/login",
    name: "login",
    component: () => import("../views/Login")
  },
  {
    path: "/admin",
    component: Layout,
    beforeEnter: (to, from, next) => {
      const isLogin = store.getters["auth/isLogin"];
      if (isLogin === false) {
        next("/login");
      }
      next();
    },
    meta: { name: "Dashboard" },
    children: [
      {
        path: "",
        name: "dashboard",
        component: Dashboard
      },
      {
        path: "articles",
        component: Articles,
        meta: { name: "文章管理" },
        children: [
          {
            path: "",
            name: "articles.list",
            component: () => import("../views/admin/articles/list/Index.vue"),
            meta: { name: "文章列表" }
          },
          {
            path: "create",
            name: "articles.create",
            component: () => import("../views/admin/articles/edit/Index.vue"),
            meta: { name: "创建文章" }
          },
          {
            path: "update/:id",
            name: "articles.update",
            component: () => import("../views/admin/articles/edit/Index.vue"),
            meta: { name: "编辑列表" }
          }
        ]
      },
      {
        path: "categories",
        component: Categories,
        meta: { name: "分类管理" }
      },
      {
        path: "tags",
        component: Tags,
        meta: { name: "标签管理" }
      }
    ]
  },
  {
    path: "/",
    component: Index,
    children: [
      {
        path: "",
        component: Home
      }
    ]
  }
  // {
  //   path: "/about",
  //   name: "about",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue")
  // }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
