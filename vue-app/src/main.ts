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

// Tailwind
import './index.css'

import App from './App.vue'
import router from './router'
import { registerGlobalComponent } from './utils/import'

const app = createApp(App)

registerGlobalComponent(app);

app.use(createPinia())
app.use(router)
app.use(ElementPlus, {
  locale: vi
})

app.mount('#app')
