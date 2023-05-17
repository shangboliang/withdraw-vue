import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import VueRouter from 'vue-router';
import router from './router';

import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/css/global.css';


Vue.use(ElementUI);
Vue.use(VueRouter);


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

