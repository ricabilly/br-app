import { createRouter, createWebHistory } from "vue-router";
import Overview from "@/views/Overview.vue";

const routes = [
  {
    path: "/",
    name: "Overview",
    component: Overview,
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
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
