import axios from 'axios'
import Vue from 'vue'
import router from './router'
let http = axios.create({
  baseURL: "http://localhost:3000/admin/api"
})


//请求添加token
http.interceptors.request.use(config => {
  let token = localStorage.getItem('token')
  console.log('ssssss');
  if (token) {
    config.headers.Authorization='Bearer '+token// 让每个请求携带自定义 token 请根据实际情况自行修改
  }
  return config
}, err => {
  let message = err.response.data.message
  if (message) {
    Vue.prototype.$message({
      message,
      type: 'error'
    })
  }
  return Promise.reject(err);
})


http.interceptors.response.use(response => {
  return response
}, err => {
  let message = err.response.data.message
  if (message) {
    Vue.prototype.$message({
      message,
      type: 'error'
    })
  }
  if(err.response.status===401){
    router.push('/login')
  }
  return Promise.reject(err);
})


export default http