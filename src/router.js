import VueRouter from "vue-router"
// import MyHomePage from "./components/MyHomePage";
import TibiMainBian from "./components/TibiMainBian";
import TibiMainOkx from "./components/TibiMainOkx";
import MyComponentMain from "./components/MyComponentMain";


const routes = [
    //一级路由
    // {
    //     path: '/index',
    //     name: 'index',
    //     component: MyHomePage,
    //     redirect: 'index/MyComponentMain',
    //     //路由嵌套
    //     children:[
    //         {path: '/index/MyComponentMain',component: MyComponentMain},
    //         {path: '/index/TibiMainBian',component: TibiMainBian },
    //         {path: '/index/TibiMainOkx',component: TibiMainOkx },
    //     ]
    // }
    {
        path: '/index',
        component: MyComponentMain,
        children:[
            {
                path: "TibiMainBian",
                component: TibiMainBian
            },
            {
                path: "TibiMainOkx",
                component: TibiMainOkx
            }
        ]
    },


    // {
    //     path: "/",
    //     component: MyComponentMain,
    //     name:'MyComponentMain'
    // },
    // {
    //     path: "/index/TibiMainBian",
    //     component: TibiMainBian,
    //     name:'TibiMainBian'
    // },
    // {
    //     path: "/index/TibiMainOkx",
    //     component: TibiMainOkx,
    //     name:'TibiMainOkx'
    // }
]

const router = new VueRouter({
    // mode:'history',
    routes
})

export  default router;
