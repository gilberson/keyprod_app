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
    },
    {
        path: '/orders/:id(\\d+)/products/:product_id(\\d+)',
        name: 'product',
        component: () => import('../views/Product.vue')
    }
]

const router = new VueRouter({
    base: process.env.VUE_APP_BASE_URL,
    routes
})

export default router
