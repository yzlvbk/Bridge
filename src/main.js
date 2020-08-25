import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import echarts from 'echarts'
import axios from 'axios'
import 'element-ui/lib/theme-chalk/index.css'
import './plugins/elementUi'
import 'echarts-gl'
import './assets/css/reset.css'
import './assets/css/element-ui.css'
import './plugins/datavUi'
// 整屏滚动插件
import VueFullpage from 'vue-fullpage.js'
import './assets/css/fullpage.min.css'
import 'fullpage.js/vendors/scrolloverflow'
import './assets/icons/iconfont.css'
Vue.use(VueFullpage)

Vue.prototype.$http = axios
Vue.prototype.$echarts = echarts
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
