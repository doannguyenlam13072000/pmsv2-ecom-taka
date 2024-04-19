import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

// Element plus
import ElementPlus from 'element-plus'
import vi from 'element-plus/es/locale/lang/vi'
import 'element-plus/dist/index.css'

// Dark mode
import 'element-plus/theme-chalk/dark/css-vars.css'
import '@/styles/index.scss'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ElementPlus, {
  locale: vi
})

app.mount('#app')
