<script setup lang="ts">
import Avatar from 'primevue/avatar';
import Chip from 'primevue/chip';
import Button from 'primevue/button';

interface ProfileHeaderProps {
  name: string;
  title: string;
  job: string;
  summarized?: boolean;
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
  <div class=" flex flex-col gap-4 " v-if="summarized">
    <div class="flex " :class="summarized ? 'items-start' : 'items-end'">
      <Avatar size="large" class="mr-4" shape="circle" />
      <div class="grid">
        <div class="flex flex-wrap gap-2 divide-x-2 divide-solid  divide-teal-600"
          :class="summarized ? 'items-center' : 'items-end'">
          <h1 class="text-lg font-bold " :class="summarized ? 'pr-4' : ' mb-2'">{{ name }}</h1>
          <div class=" flex items-center font-medium ">
            <i class=" pi pi-verified text-primary mr-2" v-if="verified"></i>
            <!-- <span v-if="verified">Verified</span> -->
            <span>{{ job }}</span>
            <!-- <span class="mx-2">•</span> -->
            <!-- <span>{{ followers }} Followers</span> -->
          </div>
        </div>
        <div class="mb-2" v-if="summarized">
          <p class="max-w-xl text-gray-500">
            {{ description }}
          </p>
        </div>
        <div class="flex align-items-center justify-content-between gap-4 -mx-4" v-if="summarized">
          <Button variant="text" label="Message" severity="" size="small" icon="pi pi-send" class="px-4 py-1" />
          <Button variant="text" label="Follow" class="mr-2 px-4" />
        </div>
      </div>
    </div>

    <div class="flex-1   grid gap-2" v-if="!summarized">
      <div class="mb-3">
        <Chip v-for="tag in tags" :key="tag" :label="tag" class="mr-2 text-sm bg-transparent ring ring-gray-200 " />
      </div>

      <div class="mb-2">
        <p class="max-w-xl">
          {{ description }}
        </p>
      </div>

    </div>


    <div class="flex align-items-center justify-content-between gap-4" v-if="!summarized">
      <Button variant="filled" label="Message" severity="" size="small" icon="pi pi-send" class="px-4 py-1" />
      <Button variant="text" label="Follow" class="mr-2 px-4" />
    </div>
  </div>

  <div class="mb-4 flex flex-col gap-4 " v-if="!summarized">
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