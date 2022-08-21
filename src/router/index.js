import { createRouter, createWebHistory} from 'vue-router';
import UserHome from '../components/userHome.vue'
import UserProduct from '../components/userProduct.vue'
import UserBlog from '../components/userBlog.vue'
import LogIn from '../components/LogIn.vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import AdminFrame from '../components/adminFrame.vue'

import AboutUS from '../components/aboutUs.vue'


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
    }

];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router