import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './style/index.less'
import Vant from 'vant'
import 'vant/lib/index.css'
import 'amfe-flexible'
// 加载dayjs初始化
import './utils/dayjs.js'

Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
