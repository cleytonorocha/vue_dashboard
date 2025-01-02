import Vue from "vue";
import VueRouter from "vue-router";
import HomeContent from "@/content/HomeContent.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/home",
    children: [
      {
        name: "home",
        path: "/home",
        component: HomeContent,
      },
    ],
  },
];

const router = new VueRouter({
  routes,
  mode: "history",
});

export default router;
