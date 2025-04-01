<script setup lang="ts">
import { useAuthStore } from '@/shared/stores/auth.store'
import { Button } from 'primevue'
import { OnboardingService } from '@/services/onboarding.service'

const authStore = useAuthStore()

const handleLogout = () => {
  OnboardingService.getInstance().logout()
}
</script>

<template>
  <header
    class="w-full px-20 border-b border-b-gray-200 mb-8 sticky top-0 bg-white/30 backdrop-blur-lg z-10 min-h-12 flex items-center">
    <div class="flex w-full justify-between items-center">
      <slot />
      <Button label="Logout" @click="handleLogout" variant="text" />
    </div>
  </header>
</template>
