import { createApp } from 'vue'
import App from './App.vue'
import Router from './router'
import CoreuiVue from '@coreui/vue'

createApp(App).use(Router).use(CoreuiVue).mount('#app');