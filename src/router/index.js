import { createRouter, createWebHistory} from 'vue-router';
import UserHome from '../components/user/userHome.vue'
import UserProduct from '../components/user/userProduct.vue'
import UserBlog from '../components/user/userBlog.vue'
import LogIn from '../components/user/LogIn.vue'
import Cart from '../components/user/userCart.vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import AdminFrame from '../components/admin/adminFrame.vue'

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
        path:'/admin',
        name:'Admin',
        component: AdminFrame,
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
        path: '/cart:id',
        name: 'Cart',
        component: Cart,
    }

];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router