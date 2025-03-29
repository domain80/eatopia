<script setup lang="ts">
document.title = 'Wholistika | Profile Setup'

import AuthLayout from '@/features/onboarding/auth/components/Auth.layout.vue';
import ProfileBasicForm from '../components/ProfileBasicForm.vue';
import ProfessionalForm from '../components/ProfessionalForm.vue';
import PatientForm from '../components/PatientForm.vue';
import { ref } from 'vue';

import Stepper from 'primevue/stepper';
import StepList from 'primevue/steplist';
import StepPanels from 'primevue/steppanels';
import Step from 'primevue/step';
import StepPanel from 'primevue/steppanel';

import { useAuthStore } from '@/shared/stores/auth.store';
import { jwtDecode } from 'jwt-decode';
import type { JwtCustomPayload } from '@/features/onboarding/auth/dto/jwt.dto';

const authStore = useAuthStore();
const userType = ref('');

if (authStore.accessToken) {
  const decodedToken = jwtDecode<JwtCustomPayload>(authStore.accessToken);
  // userType.value = decodedToken.roles?.includes('professional') ? 'professional' : 'patient';
  userType.value = 'patient';
}

const handleNavigation = (callback: Function, direction: 'prev' | 'next') => {
  if (direction === 'next') {
    if (callback) {
      callback(direction === 'next' ? '2' : '1');
    }
  } else {
    if (callback) {
      callback('1');
    }
  }
};
</script>

<template>
  <AuthLayout>
    <main class=" col-span-2 w-2xl">
      <div class="card flex justify-center">
        <Stepper value="1" class="basis-[50rem]">
          <StepList>
            <Step value="1" />
            <Step value="2" />
          </StepList>
          <StepPanels class="w-full">
            <StepPanel v-slot="{ activateCallback }" value="1" class="bg-transparent w-full">
              <ProfileBasicForm :onNavigate="(direction) => handleNavigation(activateCallback, direction)" />
            </StepPanel>

            <StepPanel v-slot="{ activateCallback }" value="2" class="bg-transparent">
              <ProfessionalForm v-if="userType === 'professional'"
                :onNavigate="(direction) => handleNavigation(activateCallback, direction)" />
              <PatientForm v-else :onNavigate="(direction) => handleNavigation(activateCallback, direction)" />
            </StepPanel>
          </StepPanels>
        </Stepper>
      </div>
    </main>
  </AuthLayout>
</template>

<style scoped></style>
