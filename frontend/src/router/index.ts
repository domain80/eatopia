import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'register',
      component: () => import('@/features/onboarding/registration/Registration.vue'),
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('@/features/onboarding/profile/Profile.vue'),
    },
    {
      path: '/authorized',
      name: 'authorized',
      component: () => import('@/features/onboarding/registration/Authorized.vue'),
    },
  ],
})

export default router
