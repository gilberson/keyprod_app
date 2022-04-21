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
    },
    {
        path: '/packages',
        name: 'packages',
        component: () => import('../views/Packages.vue')
    },
    {
        path: '/packages/create',
        name: 'create-package',
        component: () => import('../views/CreatePackage.vue')
    },
    {
        path: '/packages/:package_id(\\d+)',
        name: 'package-details',
        component: () => import('../views/PackageDetails.vue')
    },
    {
        path: '/packages/:package_id(\\d+)/items',
        name: 'package-items',
        component: () => import('../views/PackageItems.vue')
    },
    {
        path: '/packages/:package_id(\\d+)/tracking',
        name: 'tracking',
        component: () => import('../views/Tracking.vue')
    },
    {
        path: '/packages/:package_id(\\d+)/tracking/create',
        name: 'create-tracking',
        component: () => import('../views/CreateTracking.vue')
    },
    {
        path: '/tracking',
        name: 'trackings',
        component: () => import('../views/Trackings.vue')
    },
    {
        path: '*',
        name: 'Not Found',
        component: () => import('../views/NotFound.vue')
    }
]

const router = new VueRouter({
    base: process.env.VUE_APP_BASE_URL,
    routes
})

export default router
