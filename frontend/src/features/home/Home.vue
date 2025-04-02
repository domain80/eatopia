<template>

  <main class="bg-white/60 min-h-screen pb-8">
    <PageHeaderShared>
      <h1 class="text-lg font-medium">Dashboard</h1>
    </PageHeaderShared>

    <div class="px-20 grid gap-12 max-w-7xl ">
      <!-- Welcome Section -->
      <div class="flex items-center gap-4 mb-8">
        <Avatar :image="userProfile.avatar" size="xlarge" shape="circle" class="shadow-sm" />
        <div>
          <div class="text-gray-600 text-sm">Welcome back</div>
          <h1 class="text-2xl font-semibold flex items-center gap-2">
            {{ userProfile.name }} <span class="animate-wave">👋</span>
          </h1>
        </div>
      </div>

      <!-- Post Creation Section -->
      <Card class="mb-8 bg-white/50 ring-1 ring-gray-200">
        <template #content>
          <p class="text-gray-600 mb-8 text-xl ">
            Make a post, an appointment,<br />
            or find fellow dietitians to work with
          </p>
          <div class="flex gap-4">
            <Button label="Create new post" icon="pi pi-plus" severity="primary"
              class="bg-teal-700 hover:bg-teal-800 border-none" />
            <Button label="Discover others" icon="pi pi-search" severity="secondary"
              class="bg-white hover:bg-gray-50 text-gray-700 border-gray-200" />
          </div>
        </template>
      </Card>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- Left Column -->
        <div>
          <h2 class="text-xl font-semibold mb-6">Popular posts</h2>
          <div class="space-y-6">
            <Card v-for="(post, index) in popularPosts" :key="index" class="shadow-sm bg-transparent">
              <template #content>
                <div class="flex items-center gap-3 mb-3">
                  <Avatar :image="post.avatar" size="large" shape="circle" />
                  <div>
                    <h3 class="font-semibold">{{ post.name }}</h3>
                    <p class="text-sm text-gray-500">{{ post.followers }}</p>
                  </div>
                </div>
                <p class="text-gray-600 mb-4">{{ post.description }}</p>
                <div class="flex gap-4">
                  <Button icon="pi pi-heart" text severity="secondary" class="hover:text-red-500 p-2" />
                  <Button icon="pi pi-share-alt" text severity="secondary" class="hover:text-blue-500 p-2" />
                </div>
              </template>
            </Card>
          </div>
        </div>

        <!-- Right Column -->
        <div>
          <!-- Revenue Chart -->
          <h2 class="text-xl font-semibold mb-4">Generated Revenue</h2>
          <Card class="mb-8 bg-white/50 ring-1 ring-gray-200">
            <template #content>
              <div class="h-64">
                <RevenueChart />
              </div>
            </template>
          </Card>

          <!-- Goals Section -->
          <Card>
            <template #title>
              <h2 class="text-xl font-semibold">Goals...</h2>
            </template>
            <template #content>
              <div>
                <h3 class="font-medium mb-4">Today</h3>
                <div class="space-y-4">
                  <div class="flex items-center gap-3">
                    <Checkbox v-model="goals.steps" :binary="true" />
                    <span>Walk 2,000 steps</span>
                  </div>
                  <div class="flex items-center gap-3">
                    <Checkbox v-model="goals.water" :binary="true" />
                    <span>Drink 4 sachets of water</span>
                  </div>
                  <div class="flex items-center gap-3">
                    <Checkbox v-model="goals.protein" :binary="true" />
                    <span>Eat 20 grams of proteins</span>
                  </div>
                </div>

                <h3 class="font-medium mt-6 mb-4">Done</h3>
                <div class="space-y-4">
                  <div class="flex items-center gap-3 text-gray-400">
                    <i class="pi pi-check text-teal-500"></i>
                    <span>20 minute workout</span>
                  </div>
                  <div class="flex items-center gap-3 text-gray-400">
                    <i class="pi pi-check text-teal-500"></i>
                    <span>take vitamins</span>
                  </div>
                </div>
              </div>
            </template>
          </Card>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import RevenueChart from './components/RevenueChart.vue'
import Avatar from 'primevue/avatar'
import Button from 'primevue/button'
import Card from 'primevue/card'
import Checkbox from 'primevue/checkbox'
import PageHeaderShared from '@/shared/components/PageHeader.shared.vue'

const userProfile = ref({
  name: 'Dr. Benjamin',
  avatar: '/images/avatar.png'
})

const popularPosts = ref([
  {
    name: 'Dr. Ama',
    avatar: 'https://i.pravatar.cc/150?img=2',
    followers: '32 Followers',
    description: 'I help young adults achieve their fitness and weight loss goals using tried and proven 2-5 month plans tailored to the individual.'
  },
  {
    name: 'Dr. Ama',
    avatar: 'https://i.pravatar.cc/150?img=2',
    followers: '32 Followers',
    description: 'I help young adults achieve their fitness and weight loss goals using tried and proven 2-5 month plans tailored to the individual.'
  },
  {
    name: 'Dr. Ama',
    avatar: 'https://i.pravatar.cc/150?img=2',
    followers: '32 Followers',
    description: 'I help young adults achieve their fitness and weight loss goals using tried and proven 2-5 month plans tailored to the individual.'
  }
])

const goals = ref({
  steps: false,
  water: false,
  protein: false
})
</script>

<style scoped>
.animate-wave {
  animation: wave 1.5s infinite;
}

@keyframes wave {
  0% {
    transform: rotate(0deg);
  }

  20% {
    transform: rotate(14deg);
  }

  40% {
    transform: rotate(-4deg);
  }

  60% {
    transform: rotate(10deg);
  }

  80% {
    transform: rotate(-4deg);
  }

  100% {
    transform: rotate(0deg);
  }
}
</style>
