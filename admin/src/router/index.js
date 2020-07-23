import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import CategoryCreate from '../views/CategoryCreate'
import CategoryList from '../views/CategoryList'
Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'main',
    component: Main,
    redirect:"/categories/list",
    children:[
      { path: '/categories/create',  component: CategoryCreate},
      { path: '/categories/list',  component: CategoryList},
      { path: '/categories/edit/:id',  component: CategoryCreate,props:true}
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
