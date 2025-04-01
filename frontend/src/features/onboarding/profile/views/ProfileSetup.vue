<script setup lang="ts">
document.title = 'Wholistika | Profile Setup'

import AuthLayout from '@/features/onboarding/auth/components/Auth.layout.vue';
import ProfileBasicForm from '../components/ProfileBasicForm.vue';
import ProfessionalForm from '../components/ProfessionalForm.vue';
import PatientForm from '../components/PatientForm.vue';

import Stepper from 'primevue/stepper';
import StepList from 'primevue/steplist';
import StepPanels from 'primevue/steppanels';
import Step from 'primevue/step';
import StepPanel from 'primevue/steppanel';

import { useUserType } from '../composables/useUserType.composable';
import { useProfileSetup } from '../composables/useProfileSetup.composable';

const { userType } = useUserType();
const {
  profileSetupData,
  updateBasicProfile,
  updateProfessionalInfo,
  updateMedicalInfo,
  handleNavigation
} = useProfileSetup();
</script>

<template>
  <AuthLayout>
    <main class=" col-span-2 w-full">
      <div class="card flex justify-center">
        <Stepper value="1" class="basis-[50rem]">
          <StepList class="w-2/4 p-0 py-4">
            <Step value="1" class="p-0" />
            <Step value="2" class="p-0" />
          </StepList>
          <StepPanels class="w-full p-0">
            <StepPanel v-slot="{ activateCallback }" value="1" class="bg-transparent w-full">
              <ProfileBasicForm :onNavigate="(direction) => handleNavigation(activateCallback, direction)"
                @update:data="updateBasicProfile" />
            </StepPanel>

            <StepPanel v-slot="{ activateCallback }" value="2" class="bg-transparent">
              <ProfessionalForm v-if="userType === 'professional'"
                :onNavigate="(direction) => handleNavigation(activateCallback, direction)"
                @update:data="updateProfessionalInfo" />
              <PatientForm v-else :onNavigate="(direction) => handleNavigation(activateCallback, direction)"
                @update:data="updateMedicalInfo" />
            </StepPanel>
          </StepPanels>
        </Stepper>
      </div>
    </main>
  </AuthLayout>
</template>
