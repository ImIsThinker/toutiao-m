import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 加载全局样式
import './styles/index.less'
// 加载/导入 Vant 组件库
import Vant from 'vant'
import 'vant/lib/index.css'
// 动态设置 rem 基准值 不需要接收返回值
import 'amfe-flexible'
Vue.config.productionTip = false
// 全局注册 使用 Vant组件库
Vue.use(Vant)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
