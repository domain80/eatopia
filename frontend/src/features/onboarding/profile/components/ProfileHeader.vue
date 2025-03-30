<script setup lang="ts">
import Avatar from 'primevue/avatar';
import Chip from 'primevue/chip';
import Button from 'primevue/button';

interface ProfileHeaderProps {
  name: string;
  title: string;
  job: string;
  summarized: boolean;
  verified: boolean;
  followers: number;
  location: string;
  socialLinks: {
    instagram: string;
    facebook: string;
  };
  tags: string[];
  description: string;
}

defineProps<ProfileHeaderProps>();
</script>

<template>
  <div class="mb-4 flex flex-col gap-4 ">
    <div class="flex items-end">
      <Avatar size="xlarge" class="mr-4" shape="circle" />
      <div>
        <h1 class="text-xl font-bold mb-2">{{ name }}</h1>
        <div class="flex items-center ">
          <i class="pi pi-verified text-primary mr-2" v-if="verified"></i>
          <span v-if="verified">Verified</span>
          <span>{{ job }}</span>
          <span class="mx-2">•</span>
          <span>{{ followers }} Followers</span>
        </div>
      </div>
    </div>

    <div class="flex-1   grid gap-2">
      <div class="mb-3">
        <Chip v-for="tag in tags" :key="tag" :label="tag" class="mr-2 text-sm bg-transparent ring ring-gray-200 " />
      </div>

      <div class="mb-2">
        <p class="max-w-xl">
          {{ description }}
        </p>
      </div>

    </div>


    <div class="flex align-items-center justify-content-between gap-4">
      <Button variant="filled" label="Message" severity="" size="small" icon="pi pi-send" class="px-4 py-1" />
      <Button variant="text" label="Follow" class="mr-2 px-4" />
    </div>
  </div>
</template>