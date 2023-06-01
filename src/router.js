import VueRouter from "vue-router"
import MyComponentMain from "./components/MyComponentMain";

const routes = [
    {
        path: '/',
        component: MyComponentMain,
        children:[
            {path: '/home',component: () => import('./views/HomePage.vue')},
            {path: '/demo2',component: () => import('./views/Demo2Page.vue')},
            {path: '/demo3',component: () => import('./views/Demo3Page.vue')}
        ]
    }
]

const router = new VueRouter({
    mode:'history',
    routes
})

export  default router;
