/**
 * @Description:    路由拦截器（导航守卫）
 * @Author:         TSY
 * @Email:          t@tsy6.com
 * @CreateDate:     2019/3/31 11:56
 */

import Vue from 'vue'
import VueRouter from 'vue-router'
import {routes} from "./routes"

Vue.use(VueRouter)

const router = new VueRouter({
    routes
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(r => r.meta.requireAuth)) { //判断该页面是否需要登录后才能进入
        /**TO DO**/
    } else {
        next();
    }
})

export default router;