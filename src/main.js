// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview';
import Api from './vuex/api.js';
import util from './util';
import store from './vuex';
import ConstantUtils from './vuex/constant.js'
import  './assets/css/iconfont.css'
 import 'iview/dist/styles/iview.css';
import 'babel-polyfill'



import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'

Vue.config.productionTip = false

// 使用swiper
Vue.use(VueAwesomeSwiper)

Vue.use(iView);
Vue.prototype.$api = Api;
Vue.prototype.$util=util;
Vue.prototype.$constantUtils=ConstantUtils;
// 路由处理
router.beforeEach((to, from, next) => {
  iView.LoadingBar.start();
  // 拦截器 待优化
	if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
    if (localStorage.token) { // 获取当前的token是否存在
      next();
    } else {
      next({
        path: '/',      // 将跳转的路由path作为参数，登录成功后跳转到该路由
        // query: {redirect: to.fullPath}
      });
    }
	} else {
    next();
  }
});

router.afterEach(route => {
  iView.LoadingBar.finish();
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store: store,
  components: { App },
  template: '<App/>'
})
