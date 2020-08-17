import Vue from 'vue'
import App from './App.vue'
import 'normalize.css/normalize.css'
import './style.scss'
import router from './router'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import "./assets/iconfont/iconfont.css"
import 'swiper/css/swiper.css'
import axios from 'axios'
Vue.config.productionTip = false

Vue.use(VueAwesomeSwiper)
Vue.prototype.$http=axios.create({
  baseURL: "http://localhost:3000/web/api"
})


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
