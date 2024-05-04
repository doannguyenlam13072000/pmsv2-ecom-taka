import { createApp } from 'vue'
import { createPinia } from 'pinia'

// Element plus
import ElementPlus from 'element-plus'
import vi from 'element-plus/es/locale/lang/vi'
import 'element-plus/dist/index.css'

// Tailwind
import './index.css'

// Directive
import { registerGolbalDirective } from '@/directives'

import App from './App.vue'
import router from './router'
import { registerGlobalComponent } from './utils/import'

const app = createApp(App)

registerGlobalComponent(app)
registerGolbalDirective(app)

app.use(createPinia())
app.use(router)
app.use(ElementPlus, {
  locale: vi
})
app.mount('#app')
