import Vue from 'vue'
import './assets/css/reset.css'
import './assets/css/index.css'
import ElementUI from 'element-ui';
import xlsx from 'xlsx'
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import router from './router'
import store from './store'
// import echarts from 'echarts'
// Vue.prototype.$echarts = echarts 
import axios from 'axios'
import qs from 'qs'
import charts from 'echarts'
Vue.prototype.$echarts = charts
Vue.prototype.axios = axios;
Vue.prototype.qs = qs;
Vue.prototype.xlsx = xlsx;
import regExpUtil from './utils/regExp.js'
Vue.prototype.regExpUtil = regExpUtil;
Vue.config.productionTip = false
Vue.use(ElementUI);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
