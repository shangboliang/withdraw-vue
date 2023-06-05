import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  { path: '/', component: () => import('../views/HomePage.vue') },
  { path: '/demo2', component: () => import('../views/Demo2Page.vue') },
  { path: '/demo3', component: () => import('../views/Demo3Page.vue') }
]

const router = new VueRouter({
  routes
})

export default router
