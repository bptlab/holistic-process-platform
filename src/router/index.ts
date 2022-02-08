import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Modeler from "../views/Modeler.vue";
import NotFound from "../views/404.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/modeler",
    name: "Modeler",
    component: Modeler,
    meta: {
      title: "Modeler",
    },
  },
  { path: "/:pathMatch(.*)", component: NotFound },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
