import { createApp } from 'vue'
import App from './App.vue'
import Router from './router'
import CoreuiVue from '@coreui/vue'
// eslint-disable-next-line no-unused-vars
import VueSession from 'vue-session';

createApp(App).use(Router).use(CoreuiVue).mount('#app');