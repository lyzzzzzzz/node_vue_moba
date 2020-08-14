import Vue from 'vue'
import App from './App.vue'
import 'normalize.css/normalize.css'
import './style.scss'
import router from './router'
import VueAwesomeSwiper from 'vue-awesome-swiper'

// import style
import 'swiper/css/swiper.css'
Vue.config.productionTip = false

Vue.use(VueAwesomeSwiper)



new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
