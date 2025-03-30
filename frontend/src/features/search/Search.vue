<script setup lang="ts">
import { ref } from 'vue';
import ProfileHeader from '../onboarding/profile/components/ProfileHeader.vue';
import PageHeaderShared from '@/shared/components/PageHeader.shared.vue'
import InputText from 'primevue/inputtext';

import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import FeaturedDietitiensComponent from './components/FeaturedDietitiens.component.vue';
import { Button } from 'primevue';

document.title = 'Wholistika | Search';

const profileData = ref({
  name: ' Ama Mansah',
  title: 'Dr.',
  job: 'Dietitian',
  verified: false,
  followers: 32,
  location: 'Accra, Ghana',
  socialLinks: {
    instagram: '@doc_mansah',
    facebook: '@doc_mansah'
  },
  tags: ['fitness', 'weight-loss', 'diet plans', 'healthy habits'],
  description: 'I help young adults achieve their fitness and weight loss goals using tried and proven 2-5 month plans tailored to the individual.'
});

</script>


<template>
  <main class=" bg-white/60 min-h-screen pb-8">
    <PageHeaderShared>
      <h1 class="text-xl font-bold">Search</h1>
    </PageHeaderShared>



    <div class="px-20 grid gap-12">
      <header class="flex flex-col  gap-6 items-start ">
        <h2 class="text-2xl font-light  ">Discover ways to get fit, <br> stay healthy and
          improve
          eating
          habits</h2>
        <IconField class="w-full max-w-lg">
          <InputText placeholder="Search" fluid class="" />
          <InputIcon class="pi pi-search " />
        </IconField>
        <section class="grid gap-2 items-center   text-sm">
          <div class="flex gap-4 *:h-max *:w-max *:rounded-sm *:py-1 *:px-4">
            <Button label="fitness" variant="outlined" severity="secondary" />
            <Button label="fitness" variant="outlined" severity="secondary" />
            <Button label="workout plan" variant="outlined" severity="secondary" />
            <Button label="dietitans" variant="outlined" severity="secondary" />
            <Button label="fitness" variant="outlined" severity="secondary" />
            <Button label="weight-loss" variant="outlined" severity="secondary" />
          </div>
        </section>
      </header>


      <FeaturedDietitiensComponent />

    </div>

  </main>
</template>
