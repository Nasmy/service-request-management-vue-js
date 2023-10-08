import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import i18n from './locales/i18n'

import './assets/base.css'
// load bootstrap for the whole project
import 'bootstrap/dist/css/bootstrap.css'
import { createPinia } from "pinia";
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
// UI kit : Element plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'


const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

createApp(App)
  .use(i18n)
  .use(router)
  .use(pinia)
  .use(ElementPlus)
  .mount('#app')

