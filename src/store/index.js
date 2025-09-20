import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    contents: [
      {
        id: 1,
        name: "dashboard",
        icon: "el-icon-data-analysis",
        prettyName: "DashBoard",
      },
      {
        id: 2,
        name: "register",
        icon: "el-icon-circle-plus-outline",
        prettyName: "Register",
      },
      {
        id: 3,
        name: "data",
        icon: "el-icon-coin",
        prettyName: "Data"
      },
      {
        id: 4,
        name: "reports",
        icon: "el-icon-document",
        prettyName: "Reports"
      },
      {
        id: 5,
        name: "charts",
        icon: "el-icon-pie-chart",
        prettyName: "Charts",
      },
    ],
  },
  getters: {
    getContents: (state) => state.contents,
  },
  mutations: {},
  actions: {},
  modules: {},
});
