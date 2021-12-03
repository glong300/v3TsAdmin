import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

import localCache from '@/utils/cache'
import { firstMenu } from '@/hooks/index'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/main'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login/Login.vue')
  },
  {
    path: '/main',
    name: 'Main',
    component: () => import('@/views/Main/Main.vue')
  },
  {
    path: '/:patMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFound/NotFound.vue')
  }
]

const router = createRouter({
  routes,
  history: createWebHistory()
})

router.beforeEach(to => {
  if (to.path !== '/login') {
    const token = localCache.getCache('token')
    if (!token) {
      return '/login'
    }
  }

  if (to.path === '/main') {
    return firstMenu.url
  }
})

export default router
