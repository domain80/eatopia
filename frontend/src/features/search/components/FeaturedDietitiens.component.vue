<script setup lang="ts">
// import TrendingKeywords from './components/TrendingKeywords.vue';
import { ref } from 'vue';
import FeaturedDietitianCard from './FeaturedDietitianCard.component.vue';
import RegularDietitianCard from './RegularUserCard.component.vue';
import ProfileHeader from '@/features/onboarding/profile/components/ProfileHeader.vue';
import { Card } from 'primevue';

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
  regularDietitians: [
    {
      id: 4,
      name: 'Mr. Bob Barley',
      title: 'Nutrition Coach',
      job: 'Independent Consultant',
      summarized: false,
      verified: true,
      followers: 32,
      location: 'New York, NY',
      socialLinks: {
        instagram: '@bobbarley_nutrition',
        facebook: 'facebook.com/bobbarleynutrition'
      },
      tags: ['Weight Loss', 'Meal Planning', 'Fitness'],
      description: 'I want to lose weight, eat better, and stay fit'
    },
    {
      id: 5,
      name: 'Mr. Bob Barley',
      title: 'Wellness Expert',
      job: 'Holistic Health Center',
      summarized: true,
      verified: true,
      followers: 32,
      location: 'Los Angeles, CA',
      socialLinks: {
        instagram: '@bobbarley_wellness',
        facebook: 'facebook.com/bobbarleywellness'
      },
      tags: ['Holistic', 'Plant-based', 'Mindfulness'],
      description: 'I want to lose weight, eat better, and stay fit'
    },
    {
      id: 6,
      name: 'Mr. Bob Barley',
      title: 'Fitness Instructor',
      job: 'Urban Gym',
      summarized: false,
      verified: false,
      followers: 32,
      location: 'Chicago, IL',
      socialLinks: {
        instagram: '@bobbarley_fitness',
        facebook: 'facebook.com/bobbarleyfitness'
      },
      tags: ['HIIT', 'Strength Training', 'Nutrition'],
      description: 'I want to lose weight, eat better, and stay fit'
    },
    {
      id: 7,
      name: 'Mr. Bob Barley',
      title: 'Diet Specialist',
      job: 'Health & Wellness Clinic',
      summarized: true,
      verified: true,
      followers: 32,
      location: 'Miami, FL',
      socialLinks: {
        instagram: '@bobbarley_diet',
        facebook: 'facebook.com/bobbarleydiet'
      },
      tags: ['Keto', 'Low-carb', 'Intermittent Fasting'],
      description: 'I want to lose weight, eat better, and stay fit'
    },
    {
      id: 8,
      name: 'Mr. Bob Barley',
      title: 'Sports Nutritionist',
      job: 'Elite Performance Center',
      summarized: false,
      verified: true,
      followers: 32,
      location: 'Seattle, WA',
      socialLinks: {
        instagram: '@bobbarley_sports',
        facebook: 'facebook.com/bobbarleysports'
      },
      tags: ['Athletes', 'Recovery', 'Performance'],
      description: 'I want to lose weight, eat better, and stay fit'
    },
    {
      id: 9,
      name: 'Mr. Bob Barley',
      title: 'Weight Management Coach',
      job: 'Self-employed',
      summarized: false,
      verified: false,
      followers: 32,
      location: 'Austin, TX',
      socialLinks: {
        instagram: '@bobbarley_weight',
        facebook: 'facebook.com/bobbarleyweight'
      },
      tags: ['Sustainable Weight Loss', 'Habit Building', 'Lifestyle Change'],
      description: 'I want to lose weight, eat better, and stay fit'
    }
  ]
})


</script>

<template>
  <div class=" max-w-4xl ">
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
            <ProfileHeader v-bind="dietitian" summarized />

          </template>
        </Card>

      </div>
    </section>
  </div>
</template>
