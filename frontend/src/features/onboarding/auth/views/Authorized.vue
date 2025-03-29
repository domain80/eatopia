<script setup lang="ts">
import AuthLayout from '../components/Auth.layout.vue';
import { useRoute } from 'vue-router';
import { OnboardingService } from '../../services/onboarding.service';
import { onMounted } from 'vue';

const route = useRoute();

onMounted(() => {
  const code = route.query.code;
  OnboardingService.getInstance().handleAuthorizationCode(code as string)
})
</script>

<template>
  <AuthLayout>
    <main>
      <h1 class="text-2xl font-bold">Authorized</h1>
      <p class=" text-gray-500">Just a moment...</p>
    </main>
  </AuthLayout>
</template>
