import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);
import Layout from "../views/admin/Layout";
import Dashboard from "../views/admin/dashboard/Dashboard";
import Tags from "../views/admin/tags/Index";
import Articles from "../views/admin/articles/Index";

const routes = [
  {
    path: "/admin",
    component: Layout,
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
            path: "update",
            name: "articles.update",
            component: () => import("../views/admin/articles/edit/Index.vue"),
            meta: { name: "编辑列表" }
          }
        ]
      },
      {
        path: "categories",
        component: Articles,
        meta: { name: "分类管理" },
        children: [
          {
            path: "",
            name: "categories.list",
            component: () => import("../views/admin/categories/list/Index.vue"),
            meta: { name: "分类列表" }
          },
          {
            path: "create",
            name: "articcategoriesles.create",
            component: () => import("../views/admin/categories/edit/Index.vue"),
            meta: { name: "创建分类" }
          },
          {
            path: "update",
            name: "arcategoriesticles.update",
            component: () => import("../views/admin/categories/edit/Index.vue"),
            meta: { name: "编辑分类" }
          }
        ]
      },
      {
        path: "tags",
        component: Tags,
        meta: { name: "标签管理" },
        children: [
          {
            path: "",
            name: "tags.list",
            component: () => import("../views/admin/tags/list/Index.vue"),
            meta: { name: "标签列表" }
          },
          {
            path: "create",
            name: "tags.create",
            component: () => import("../views/admin/tags/edit/Index.vue"),
            meta: { name: "创建标签" }
          },
          {
            path: "update",
            name: "tags.update",
            component: () => import("../views/admin/tags/edit/Index.vue"),
            meta: { name: "编辑标签" }
          }
        ]
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
