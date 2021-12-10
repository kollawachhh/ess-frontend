import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/auth/Login.vue'
import Home from '../views/user/Home.vue'
import Stock from '../views/user/Stock.vue'
import StockIn from '../views/user/StockIn.vue'
import StockOut from '../views/user/StockOut.vue'
import StockForm from '../views/user/StockForm.vue'
import CreateGoods from '../views/admin/CreateGoods.vue'
import Cargo from '../views/user/Cargo.vue'
import User from '../views/admin/Users.vue'
import CreateUser from '../views/admin/CreateUser.vue'
import About from '../views/user/About.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/stock',
    name: 'Stock',
    component: Stock
  },
  {
    path: '/stock-in',
    name: 'StockIn',
    component: StockIn
  },
  {
    path: '/stock-out',
    name: 'StockOut',
    component: StockOut
  },
  {
    path: '/stock/form',
    name: 'StockForm',
    component: StockForm
  },
  {
    path: '/create-goods',
    name: 'Goods',
    component: CreateGoods
  },
  {
    path: '/cargo',
    name: 'Cargo',
    component: Cargo
  },
  {
    path: '/user',
    name: 'User',
    component: User
  },
  {
    path: '/create-user',
    name: 'Create',
    component: CreateUser
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
