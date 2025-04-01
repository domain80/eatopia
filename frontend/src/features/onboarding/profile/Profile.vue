<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import ProfileHeader from './components/ProfileHeader.vue';
import Tabs from 'primevue/tabs';
import TabList from 'primevue/tablist';
import Tab from 'primevue/tab';
import TabPanels from 'primevue/tabpanels';
import TabPanel from 'primevue/tabpanel';
import { Timeline } from 'primevue';
import PageHeaderShared from '../../../shared/components/PageHeader.shared.vue'
import { OnboardingService } from '@/services/onboarding.service'
import { useToast } from 'primevue/usetoast'
import type { UserAccountDto } from '../auth/dto/userAccount.dto';

document.title = 'Eatopia | Profile';

const toast = useToast()
const onboardingService = OnboardingService.getInstance()

onMounted(async () => {
  try {
    const userData = await onboardingService.getWhoami()
    console.log('Profile Data:', userData)

    if (userData) {
      profileData.value = {
        id: userData.id,
        email: userData.email,
        firstName: userData.firstName || '',
        lastName: userData.lastName || '',
        title: userData.title || '',
        jobTitle: userData.jobTitle || '',
        interests: userData.interests || '',
        about: userData.about || '',
        imageData: userData.imageData || '',
        medicalInfo: userData.medicalInfo || [],
        workExperiences: userData.workExperiences || [],
      }
    }
  } catch (error) {
    console.error('Failed to fetch profile data:', error)
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Failed to load profile data',
      life: 3000,
    })
  }
})

const profileData = ref<UserAccountDto>({} as UserAccountDto);

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
  },
  {
    company: '',
    title: '',
    dateRange: {
      from: '',
      to: ''
    },
    responsibilities: []
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
  <main class=" bg-white/60 min-h-screen pb-8">

    <PageHeaderShared>
      <h1 class="text-lg font-medium">Profile</h1>
    </PageHeaderShared>

    <div class="px-20 grid gap-12">
      <ProfileHeader v-bind="profileData" :summarized="false" :isYou="true" />
      <div class="">
        <Tabs value="1" class="">
          <TabList class="bg-transparent" :pt="{
            tabList: {
              class: 'bg-transparent',
            }
          }">
            <Tab value="1" class="">Profile</Tab>
            <Tab value="2" class="">Posts</Tab>
          </TabList>
          <TabPanels class="bg-transparent p-0 pt-4 ">
            <TabPanel value="1" class="grid content-start">
              <Timeline :value="experiences" class="mr-auto mt-4 " :pt="{
                eventOpposite: {
                  class: 'flex-1',
                },
                eventContent: {
                  class: 'flex-5',
                }
              }">
                <template #opposite="slotProps">
                  <div class="text-sm">
                    <p class="text-surface-500 dark:text-surface-400">{{ slotProps.item.dateRange.from }}</p>
                    <p class="text-surface-500 dark:text-surface-400" v-if="slotProps.item.dateRange.to != ''">to
                    </p>
                    <p class="text-surface-500 dark:text-surface-400">{{ slotProps.item.dateRange.to }}</p>
                  </div>
                </template>
                <template #content="slotProps">
                  <div class="pb-8">
                    <header>
                      <h3> {{ slotProps.item.title }} </h3>
                    </header>

                    <ul class="grid gap-2 list-disc">
                      <li v-for="(responsibility, index) in slotProps.item.responsibilities" :key="index"
                        class="text-surface-600 dark:text-surface-400 ml-4">
                        {{ responsibility }}
                      </li>
                    </ul>
                  </div>
                </template>
              </Timeline>
            </TabPanel>

            <TabPanel value="2">
              <div class="grid items-center justify-center py-20">
                <p class=""> Comming soon</p>
              </div>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>

    </div>

  </main>
</template>
