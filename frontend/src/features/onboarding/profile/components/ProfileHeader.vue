<script setup lang="ts">
import Card from 'primevue/card';
import Avatar from 'primevue/avatar';
import Chip from 'primevue/chip';
import Button from 'primevue/button';

interface ProfileHeaderProps {
  name: string;
  title: string;
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
  <div class="mb-4 flex flex-col gap-4 px-20">
    <div class="flex items-end">
      <Avatar size="xlarge" class="mr-4" shape="circle" />
      <div>
        <h1 class="text-xl font-bold mb-2">{{ name }}</h1>
        <div class="flex align-items-center mb-2">
          <i class="pi pi-verified text-primary mr-2"></i>
          <span>{{ title }}</span>
          <span class="mx-2">•</span>
          <span>{{ followers }} Followers</span>
        </div>
      </div>
    </div>

    <div class="flex-1   grid gap-2">
      <div class="mb-3">
        <Chip v-for="tag in tags" :key="tag" :label="tag" class="mr-2 text-sm" />
      </div>

      <div class="mb-2">
        <p class="max-w-xl">
          {{ description }}
        </p>
      </div>

      <div class="flex align-items-center">
        <i class="pi pi-map-marker mr-2"></i>
        <span class="mr-4">{{ location }}</span>
        <a :href="socialLinks.instagram" class="mr-2">
          <i class="pi pi-instagram"></i>
        </a>
        <a :href="socialLinks.facebook">
          <i class="pi pi-facebook"></i>
        </a>
      </div>
    </div>


    <div class="flex align-items-center justify-content-between gap-4">
      <Button variant="filled" label="Message" severity="contrast" size="small" icon="pi pi-home" class="px-4 py-1" />
      <Button variant="text" label="Follow" class="mr-2 px-4" />
    </div>
  </div>
</template>