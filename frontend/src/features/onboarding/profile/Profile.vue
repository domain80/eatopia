<script setup lang="ts">
import { computed, ref } from 'vue';
import ProfileHeader from './components/ProfileHeader.vue';

document.title = 'Wholistika | Profile';

const profileData = ref({
  name: 'Dr. Ama Mansah',
  title: 'Verified Dietitian',
  followers: 32,
  location: 'Accra, Ghana',
  socialLinks: {
    instagram: '@doc_mansah',
    facebook: '@doc_mansah'
  },
  tags: ['fitness', 'weight-loss', 'diet plans', 'healthy habits'],
  description: 'I help young adults achieve their fitness and weight loss goals using tried and proven 2-5 month plans tailored to the individual.'
});

const experiences = ref([
  {
    company: 'Dietrix - Online Nutrition Platform',
    title: 'Nutritionist',
    dateRange: {
      from: 'March 2024',
      to: 'Present'
    },
    responsibilities: [
      'Provides personalized weight loss and fitness nutrition plans for clients.',
      'Conducts one-on-one consultations to assess dietary habits and fitness goals.',
      'Develops custom meal plans aligned with clients\' exercise routines.',
      'Tracks client progress using diet logs and fitness assessments.'
    ]
  },
  {
    company: 'FitLife Wellness Center',
    title: 'Fitness & Nutrition Intern',
    dateRange: {
      from: 'April 2023',
      to: 'Feb 2024'
    },
    responsibilities: [
      'Assisted senior dietitians in developing meal plans for weight loss clients.',
      'Conducted body composition assessments and tracked client progress.',
      'Led nutrition workshops on meal prepping and healthy eating habits.',
      'Worked with personal trainers to align fitness and dietary plans.'
    ]
  },
  {
    company: 'Local Community Health Program',
    title: 'Volunteer Nutrition Consultant',
    dateRange: {
      from: 'Jan 2022',
      to: 'March 2023'
    },
    responsibilities: [
      'Educated groups on healthy eating habits for weight management.',
      'Provided basic diet consultations for individuals looking to improve their nutrition.',
      'Helped organize fitness and wellness events for the community.'
    ]
  }
]);

const activeTab = ref(0);

// Transform experiences data for timeline format
const timelineEvents = computed(() => {
  return experiences.value.map(exp => ({
    status: exp.company,
    title: exp.title,
    date: `${exp.dateRange.from} - ${exp.dateRange.to}`,
    icon: 'pi pi-dot',
    responsibilities: exp.responsibilities
  }));
});

const events = ref([
  { status: 'Ordered', date: '15/10/2020 10:30', icon: 'pi pi-shopping-cart', color: '#9C27B0' },
  { status: 'Processing', date: '15/10/2020 14:00', icon: 'pi pi-cog', color: '#673AB7' },
  { status: 'Shipped', date: '15/10/2020 16:15', icon: 'pi pi-shopping-cart', color: '#FF9800' },
  { status: 'Delivered', date: '16/10/2020 10:00', icon: 'pi pi-check', color: '#607D8B' }
]);
</script>

<template>
  <main class=" bg-[#ffffff89] min-h-screen">
    <div class="w-full py-4 px-20 border-b border-b-gray-200 mb-8">

      <header class="">
        <h1 class="text-xl font-bold">Profile</h1>
      </header>
    </div>
    <ProfileHeader v-bind="profileData" />

  </main>
</template>
