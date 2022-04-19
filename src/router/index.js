import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'home-view',
        component: HomeView
    },
    {
        path: '/orders/:id(\\d+)',
        name: 'order-details',
        component: () => import('../views/Order.vue')
    }
]

const router = new VueRouter({
  routes
})

export default router
