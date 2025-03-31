<script setup lang="ts">
import Avatar from 'primevue/avatar';
interface UserProfile {
  name: string;
  title: string;
  avatar?: string;
  status: string;
  followers: number;
  tags: string[];
  location: string;
  description: string;
}

// This would typically come from props or a store
const user: UserProfile = {
  name: 'Dr. Ama Mansah',
  title: 'Verified Dietitian',
  avatar: '/path/to/avatar.jpg',
  status: 'Online',
  followers: 32,
  tags: ['fitness', 'weight-loss', 'diet plans', 'healthy habits'],
  location: 'Accra, Ghana',
  description: 'I help young adults achieve their fitness and weight loss goals using tried and proven 2-5 month plans tailored to the individual.'
};
</script>


<template>
  <div class="cursor-pointer flex items-center gap-2 transition-shadow duration-200 hover:shadow-sm py-4  mx-auto">
    <Avatar icon="pi pi-user" size="medium" shape="circle" class="mb-2 bg-gray-200 p-4" />
    <h4 class=" font-medium mb-1">{{ user.name }}</h4>
    <!-- <Tag :value="user.status" severity="success"  /> -->
  </div>
</template>