// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store'
import VueRouter from 'vue-router'
import routes from './router'

Vue.use(VueRouter)
//FastClick.attch(document.body)

Vue.config.productionTip = false

import {
  AjaxPlugin
} from 'vux'
Vue.use(AjaxPlugin)
const Ajax = Vue.http;
Ajax.defaults.baseURL = "http://ued.t.huijiaoyun.com/api";
Ajax.defaults.timeout = 5000;


/**
 * 响应拦截器
 */
Ajax.interceptors.response.use(
  response => {
    // 自定义返回码 作不同处理
    return response;
  },
  err => {
    if (err && err.response) {
      switch (err.response.status) {
        case 400:
          err.message = "请求错误";
          break;

        case 401:
          err.message = "登录超时，请重新登录";
          break;

        case 403:
          err.message = "拒绝访问";
          break;

        case 404:
          err.message = `请求地址出错: ${err.response.config.url}`;
          break;

        case 408:
          err.message = "请求超时";
          break;

        case 500:
          err.message = "服务器内部错误";
          break;

        case 501:
          err.message = "服务未实现";
          break;

        case 502:
          err.message = "网关错误";
          break;

        case 503:
          err.message = "服务不可用";
          break;

        case 504:
          err.message = "网关超时";
          break;

        case 505:
          err.message = "HTTP版本不受支持";
          break;

        default:
      }
    }
    // 对响应错误做点什么
    return Promise.reject(err);
  }
);





const router = new VueRouter({
  routes
})


const history = window.sessionStorage
let historyCount = history.getItem('count') * 1 || 0
history.setItem('/', 0)

router.beforeEach(function (to, from, next) {
  store.commit('updateLoadingStatus', {
    isLoading: true
  })
  const toIndex = history.getItem(to.path)
  const fromIndex = history.getItem(from.path)

  if (toIndex) {
    if (!fromIndex || parseInt(toIndex, 10) > parseInt(fromIndex, 10) || (toIndex === '0' && fromIndex === '0')) {
      store.commit('updateDirection', {
        direction: 'forward'
      })
    } else {
      store.commit('updateDirection', {
        direction: 'reverse'
      })
    }
  } else {
    ++historyCount
    history.setItem('count', historyCount)
    to.path !== '/' && history.setItem(to.path, historyCount)
    store.commit('updateDirection', {
      direction: 'forward'
    })
  }

  if (/\/http/.test(to.path)) {
    let url = to.path.split('http')[1]
    window.location.href = `http${url}`
  } else {
    next()
  }
})

router.afterEach(function (to) {
  store.commit('updateLoadingStatus', {
    isLoading: false
  })
  if (process.env.NODE_ENV === 'production') {
    ga && ga('set', 'page', to.fullPath)
    ga && ga('send', 'pageview')
  }
})

/* eslint-disable no-new */
new Vue({
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
}).$mount('#app')
