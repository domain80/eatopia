<script setup lang="ts">
document.title = 'Wholistika';

import { OnboardingService } from '@/features/onboarding/onboarding.service'
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'

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
