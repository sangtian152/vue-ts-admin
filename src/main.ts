import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import i18n from '@/lang'
import '@/config/permission'
import "./plugins";
//导入通用样式
import "@/styles/common.scss";
// import '@/styles/element-variables.scss'

Vue.config.productionTip = false

Vue.use(ElementUI, {
  size: 'mini',
  i18n: (key: string, value: string) => i18n.t(key, value)
})

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#vue-ts-admin')
