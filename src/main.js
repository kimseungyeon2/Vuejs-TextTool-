import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

Vue.config.productionTip = false

//axios base url
const base = axios.create({
  baseURL: 'http://localhost:3000//'
})
Vue.prototype.$http = base;


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
