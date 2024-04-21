import { LAYOUT } from '@/constants/layout'
import { defineAsyncComponent, type App } from 'vue'

export const registerGlobalComponent = (app: App<Element>) => {
  app.component(
    `${LAYOUT.AUTH}-layout`,
    defineAsyncComponent(() => import('@/layouts/AuthLayout.vue'))
  )
  app.component(
    `${LAYOUT.PUBLIC}-layout`,
    defineAsyncComponent(() => import('@/layouts/CommonLayout.vue'))
  )
}
