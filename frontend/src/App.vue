<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'
import { OnboardingService } from '@/features/onboarding/onboarding.service'
import { onMounted } from 'vue'

const toast = useToast()

// Instantiate the OnboardingService with toast
const onboardingService = OnboardingService.instantiate(toast)

onMounted(async () => {
  // Get the access token when the app starts
  await onboardingService.getAccessToken()
})
</script>

<template>
  <Toast />
  <RouterView />
</template>

<style scoped></style>
