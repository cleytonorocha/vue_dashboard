import Vue from "vue";
import VueRouter from "vue-router";
import HomeContent from "@/content/HomeContent.vue";
import DashboardContent from "@/content/DashboardContent.vue";
import DataComponent from "@/content/DataContent.vue";
import RegisterComponent from "@/content/RegisterContent.vue";

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
    component: RegisterComponent
  },
  {
    name: "data",
    path: "/data",
    component: DataComponent
  },

];

const router = new VueRouter({
  routes,
  mode: "history",
});

export default router;
