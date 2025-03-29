import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: '/',
      name: 'register',
      component: () => import('@/features/onboarding/auth/views/Registration.vue'),
    },
    {
      path: '/authorized',
      name: 'authorized',
      component: () => import('@/features/onboarding/auth/views/Authorized.vue'),
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('@/features/onboarding/profile/components/Dashboard.layout.vue'),
      children: [
        {
          path: 'home',
          name: 'home',
          component: () => import('@/features/onboarding/profile/components/DefaultRoute.vue'),
        },
        {
          path: 'search',
          name: 'search',
          component: () => import('@/features/onboarding/profile/components/DefaultRoute.vue'),
        },
        {
          path: 'messages',
          name: 'messages',
          component: () => import('@/features/onboarding/profile/components/DefaultRoute.vue'),
        },
        {
          path: 'profile',
          name: 'profile',
          component: () => import('@/features/onboarding/profile/Profile.vue'),
        },
      ],
    },
  ],
})

export default router
