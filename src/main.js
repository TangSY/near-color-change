/**
 * @Description:
 * @Author:         TSY
 * @Email:          t@tsy6.com
 * @CreateDate:     2019/3/31 11:56
 */

import Vue from 'vue'
import App from './App.vue'
import router from './router/router'

//引入百度统计插件
import ba from 'vue-ba'
Vue.use(ba, 'b0668f30d62e1597bdb36d05edea8960')

//引入ElementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
