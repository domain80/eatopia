import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  // todo: move imports to a single file
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
      path: '/profile-setup',
      name: 'profile-setup',
      component: () => import('../features/onboarding/profile/views/ProfileSetup.vue'),
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
