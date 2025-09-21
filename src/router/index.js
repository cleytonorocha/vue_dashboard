import Vue from "vue";
import VueRouter from "vue-router";
import HomeContent from "@/content/HomeContent.vue";
import DashboardContent from "@/content/DashboardContent.vue";
import DataContent from "@/content/DataContent.vue";
import RegisterContent from "@/content/RegisterContent.vue";
import ReportContent from "@/content/ReportContent.vue"

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    name: "home",
    path: "/home",
    component: HomeContent
  },
  {
    name: "dashboard",
    path: "/dashboard",
    component: DashboardContent
  },
  {
    name: "register",
    path: "/register",
    component: RegisterContent
  },
  {
    name: "data",
    path: "/data",
    component: DataContent
  },
  {
    name: "report",
    path: "/reports",
    component: ReportContent
  }
];

const router = new VueRouter({
  routes,
  mode: "history",
});

export default router;
