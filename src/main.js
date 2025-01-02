import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'element-ui/lib/theme-chalk/index.css';
import '@popperjs/core';


import locale from 'element-ui/lib/locale/lang/en'
import ElementUI from 'element-ui';

Vue.use(ElementUI, { locale });

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
