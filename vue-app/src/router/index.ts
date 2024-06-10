import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView/HomeView.vue'
import { LAYOUT } from '@/constants/layout'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        requireAuth: 'true',
        layout: LAYOUT.AUTH
      }
    },
    {
      path: '/create-players',
      name: 'create-players',
      component: () => import('@/views/ReadyPlayerView/ReadyPlayerView.vue'),
      meta: {
        requireAuth: 'true',
        layout: LAYOUT.AUTH
      }
    },
    {
      path: '/preview',
      name: 'preview',
      component: () => import('@/views/GLBPreviewView/GLBPreviewView.vue'),
      meta: {
        requireAuth: 'true',
        layout: LAYOUT.AUTH
      }
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView/AboutView.vue'),
      meta: {
        requireAuth: 'true',
        layout: LAYOUT.AUTH
      }
    },
    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: () => import('../views/NotFound/NotFound.vue')
    }
  ]
})

export default router
