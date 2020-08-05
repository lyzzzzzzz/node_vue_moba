import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import CategoryCreate from '../views/CategoryCreate'
import CategoryList from '../views/CategoryList'
import ItemCreate from '../views/ItemCreate'
import ItemList from '../views/ItemList'
import HeroCreate from '../views/HeroCreate'
import HeroList from '../views/HeroList'
import ArticleCreate from '../views/ArticleCreate'
import ArticleList from '../views/ArticleList'
import AdCreate from '../views/AdCreate'
import AdList from '../views/AdList'

import AdminUserCreate from '../views/AdminUserCreate'
import AdminUserList from '../views/AdminUserList'
import Login from '../views/Login'
Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    name: 'main',
    component: Main,
    redirect: "/categories/list",
    children: [
      { path: '/categories/create', component: CategoryCreate },
      { path: '/categories/list', component: CategoryList },
      { path: '/categories/edit/:id', component: CategoryCreate, props: true },
      { path: '/items/create', component: ItemCreate },
      { path: '/items/list', component: ItemList },
      { path: '/items/edit/:id', component: ItemCreate, props: true },
      { path: '/heroes/create', component: HeroCreate },
      { path: '/heroes/list', component: HeroList },
      { path: '/heroes/edit/:id', component: HeroCreate, props: true },
      { path: '/articles/create', component: ArticleCreate },
      { path: '/articles/list', component: ArticleList },
      { path: '/articles/edit/:id', component: ArticleCreate, props: true },
      { path: '/ads/create', component: AdCreate },
      { path: '/ads/list', component: AdList },
      { path: '/ads/edit/:id', component: AdCreate, props: true },
      { path: '/admin_user/create', component: AdminUserCreate },
      { path: '/admin_user/list', component: AdminUserList },
      { path: '/admin_user/edit/:id', component: AdminUserCreate, props: true }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
