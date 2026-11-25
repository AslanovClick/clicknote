import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store'
import './assets/scss/main.scss';

import vue3GoogleLogin from 'vue3-google-login'
import {CLIENT_ID} from './client_id.js'

createApp(App)
    .use(router)
    .use(store)
    .use(vue3GoogleLogin, { clientId: CLIENT_ID })
    .mount('#app')