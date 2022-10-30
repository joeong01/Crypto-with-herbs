import { createRouter, createWebHistory} from 'vue-router';
import UserHome from '../components/user/userHome.vue'
import UserProduct from '../components/user/userProduct.vue'
import UserBlog from '../components/user/userBlog.vue'
import LogIn from '../components/user/LogIn.vue'
import Cart from '../components/user/userCart.vue'
import CheckOut from '../components/user/checkOut.vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import AdminHome from '../components/admin/adminHome.vue'
import BlogControl from '../components/admin/blogControl.vue'
import MerchantControl from '../components/admin/merchantControl.vue'
import StockLevel from '../components/admin/stockLevel.vue'

import AboutUS from '../components/user/aboutUs.vue'

const routes = [
    { 
        path: '/', 
        name: 'Home',
        component: UserHome,
    },
    {
        path:'/userProduct',
        name:'UserProduct',
        component: UserProduct,
    },
    {
        path:'/aboutus',
        name:'AboutUS',
        component: AboutUS,
    },
    {
        path:'/blog',
        name:'Blog',
        component: UserBlog,
    },
    {
        path: '/LogIn',
        name: 'LogIn',
        component: LogIn,
    },
    {
        path: '/cart',
        name: 'Cart',
        component: Cart,
    },
    {
        path: '/checkOut',
        name: 'CheckOut',
        component: CheckOut
    },
    { 
        path:'/admin',
        name:'Admin',
        component: AdminHome,
    },
    {
        path: '/blogControl',
        name:'BlogControl',
        component: BlogControl,
    },
    {
        path:'/merchant',
        name:'MerchantControl',
        component: MerchantControl,
    },
    {
        path:'/stock',
        name:'StockLevel',
        component: StockLevel,
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router