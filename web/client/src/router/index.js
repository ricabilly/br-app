import { createRouter, createWebHistory } from "vue-router";
import BoulderList from "@/views/BoulderList.vue";

const routes = [
  {
    path: "/",
    name: "BoulderList",
    component: BoulderList,
  },
  {
    path: "/grundriss",
    name: "Grundriss",
    component: () =>
      import(/* webpackChunkName: "grundriss" */ "@/views/Grundriss.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "login" */ "@/views/Login.vue"),
  },
  {
    path: "/boulder/view/:id",
    name: "Boulder View",
    component: () =>
      import(/* webpackChunkName: "boulder-view" */ "@/views/BoulderView.vue"),
  },
  {
    path: "/boulder/add",
    name: "Add Boulder",
    component: () =>
      import(/* webpackChunkName: "add-boulder" */ "@/views/AddBoulder.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
