import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/grundriss",
    name: "Grundriss",
    component: () =>
      import(/* webpackChunkName: "grundriss" */ "@/views/Grundriss.vue"),
  },
  {
    path: "/profil",
    name: "Profil",
    component: () =>
      import(/* webpackChunkName: "profil" */ "@/views/Profil.vue"),
  },
  {
    path: "/boulder",
    name: "Boulder",
    component: () =>
      import(/* webpackChunkName: "boulder" */ "@/views/Boulder.vue"),
    children: [
      {
        path: "",
        name: "Boulder List",
        component: () =>
          import(/* webpackChunkName: "boulder-list" */ "@/components/BoulderList.vue"),
      },
      {
        path: "view/:id",
        name: "Boulder View",
        component: () =>
          import(
            /* webpackChunkName: "boulder-view" */ "@/components/BoulderView.vue"
          ),
      },
      {
        path: "add",
        name: "Add Boulder",
        component: () =>
          import(
            /* webpackChunkName: "add-boulder" */ "@/components/AddBoulder.vue"
          ),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
