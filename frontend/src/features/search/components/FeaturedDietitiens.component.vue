<script setup lang="ts">
// import TrendingKeywords from './components/TrendingKeywords.vue';
import { ref } from 'vue';
import FeaturedDietitianCard from './FeaturedDietitianCard.component.vue';
import RegularDietitianCard from './RegularUserCard.component.vue';
import ProfileHeader from '@/features/onboarding/profile/components/ProfileHeader.vue';
import { Card } from 'primevue';
import type { IUserAccountDto } from '@/features/onboarding/auth/dto/userAccount.dto';
import { sampleDietitians } from '@/features/search/data/sample-dietitians.data'

const data = ref({
  trendingKeywords: [
    { id: 1, text: 'workout plan', active: true },
    { id: 2, text: 'dietitians', active: false },
    { id: 3, text: 'fitness', active: false },
    { id: 4, text: 'meal plan', active: false },
    { id: 5, text: 'malnutrition', active: false },
    { id: 6, text: 'weight loss', active: false }
  ],
  featuredDietitians: [
    {
      id: 1,
      name: 'Dr. Ama',
      title: 'Dietitian',
      profilePic: null,
      bio: 'I help young adults achieve their fitness and weight loss goals using tried and proven 2-5 month plans',
    },
    {
      id: 2,
      name: 'Dr. Ama',
      title: 'Dietitian',
      profilePic: null,
      bio: 'I help young adults achieve their fitness and weight loss goals using tried and proven 2-5 month plans',
    },
    {
      id: 3,
      name: 'Dr. Ama',
      title: 'Dietitian',
      profilePic: null,
      bio: 'I help young adults achieve their fitness and weight loss goals using tried and proven 2-5 month plans',
    }
  ],
  regularDietitians: sampleDietitians
})


</script>

<template>
  <div class=" max-w-5xl ">
    <section class="mb-10 ">
      <h2 class="text-xl md:text-2xl mb-5">Featured Dietitians</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <FeaturedDietitianCard v-for="dietitian in data.featuredDietitians" :key="dietitian.id"
          :dietitian="dietitian" />
      </div>
    </section>

    <section>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- <RegularDietitianCard v-for="dietitian in data.regularDietitians" :key="dietitian.id" :dietitian="dietitian" /> -->

        <Card v-for="dietitian in data.regularDietitians" :key="dietitian.id"
          class="col-span-1 rounded-sm transition-shadow duration-300 hover:shadow-md">
          <template #content>
            <ProfileHeader v-bind="dietitian" summarized :isYou="false" />

          </template>
        </Card>

      </div>
    </section>
  </div>
</template>
