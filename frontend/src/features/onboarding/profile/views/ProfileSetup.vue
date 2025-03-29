<script setup lang="ts">
document.title = 'Wholistika | Profile Setup'

import AuthLayout from '@/features/onboarding/auth/components/Auth.layout.vue';
import ProfileBasicForm from '../components/ProfileBasicForm.vue';
import ProfessionalForm from '../components/ProfessionalForm.vue';
import PatientForm from '../components/PatientForm.vue';
import { ref, reactive } from 'vue';

import Stepper from 'primevue/stepper';
import StepList from 'primevue/steplist';
import StepPanels from 'primevue/steppanels';
import Step from 'primevue/step';
import StepPanel from 'primevue/steppanel';

import { useAuthStore } from '@/shared/stores/auth.store';
import { jwtDecode } from 'jwt-decode';
import type { JwtCustomPayload } from '@/features/onboarding/auth/dto/jwt.dto';
import { OnboardingService, type ProfileSetupData } from '@/services/onboarding.service';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const userType = ref('');
const router = useRouter();

if (authStore.accessToken) {
  const decodedToken = jwtDecode<JwtCustomPayload>(authStore.accessToken);
  userType.value = decodedToken.roles?.includes('professional') ? 'professional' : 'patient';
}

const profileSetupData = reactive<ProfileSetupData>({
  basicProfile: {
    title: '',
    interests: [],
    aboutYou: '',
    imagePreview: ''
  },
  professionalInfo: undefined,
  medicalInfo: undefined
});

const updateBasicProfile = (data: ProfileSetupData['basicProfile']) => {
  profileSetupData.basicProfile = data;
};

const updateProfessionalInfo = (data: ProfileSetupData['professionalInfo']) => {
  profileSetupData.professionalInfo = data;
};

const updateMedicalInfo = (data: ProfileSetupData['medicalInfo']) => {
  profileSetupData.medicalInfo = data;
};

const handleSubmit = async () => {
  await OnboardingService.getInstance().submitProfileSetup(profileSetupData);

  // Navigate to dashboard
  await router.push('/dashboard/profile')
};

const handleNavigation = (callback: Function, direction: 'prev' | 'next' | 'end') => {
  if (direction === 'next') {
    if (callback) {
      const nextStep = direction === 'next' ? '2' : '1';
      if (nextStep === '2') {
        callback('2');
        console.log(profileSetupData);
      } else {
        handleSubmit();
        console.log(profileSetupData);
      }
    }
  }
  else if (direction === 'end') {
    console.log(profileSetupData);
    handleSubmit();
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
