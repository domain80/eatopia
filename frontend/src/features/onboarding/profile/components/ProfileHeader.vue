<script setup lang="ts">
import Avatar from 'primevue/avatar';
import Chip from 'primevue/chip';
import Button from 'primevue/button';
import type { IUserAccountDto } from '../../auth/dto/userAccount.dto';

interface ProfileHeaderProps extends IUserAccountDto {
  summarized?: boolean;
  isYou?: boolean;
}

defineProps<ProfileHeaderProps>();
</script>

<template>
  <div class=" flex flex-col gap-4 " v-if="summarized">
    <div class="flex " :class="summarized ? 'items-start' : 'items-end'">
      <Avatar size="large" class="mr-4" shape="circle" image="/images/avatar.png" />
      <div class="grid">
        <div class="flex flex-wrap gap-2 divide-x-2 divide-solid  divide-teal-600"
          :class="summarized ? 'items-center' : 'items-end'">
          <h1 class="text-lg font-bold " :class="summarized ? 'pr-4' : ' mb-2'">{{ firstName + ' ' + lastName }}</h1>
          <div class=" flex items-center font-medium ">
            <!-- <i class=" pi pi-verified text-primary mr-2" v-if="verified"></i> -->
            <!-- <span v-if="verified">Verified</span> -->
            <span>{{ jobTitle }}</span>
            <!-- <span class="mx-2">•</span> -->
            <!-- <span>{{ followers }} Followers</span> -->
          </div>
        </div>
        <div class="mb-2" v-if="summarized">
          <p class="max-w-xl text-gray-500">
            {{ about }}
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
        <Chip v-for="tag in interests" :key="tag" :label="tag"
          class="mr-2 text-sm bg-transparent ring ring-gray-200 " />
      </div>

      <div class="mb-2">
        <p class="max-w-xl">
          {{ about }}
        </p>
      </div>

    </div>


    <div class="flex align-items-center justify-content-between gap-4" v-if="!summarized && !isYou">
      <Button variant="filled" label="Message" severity="" size="small" icon="pi pi-send" class="px-4 py-1" />
      <Button variant="text" label="Follow" class="mr-2 px-4" />
    </div>
  </div>

  <div class="mb-4 flex flex-col gap-4 " v-if="!summarized">
    <div class="flex items-end">
      <Avatar size="xlarge" class="mr-4" shape="circle" image="/images/avatar.png" />
      <div class="flex flex-col">
        <h1 class="text-xl font-bold ">{{ firstName + ' ' + lastName }}</h1>
        <div class="flex items-center ">
          <!-- <i class="pi pi-verified text-primary mr-2" v-if="verified"></i> -->
          <!-- <span v-if="verified">Verified</span> -->
          <span>{{ jobTitle }}</span>
          <span class="mx-2">•</span>
          <!-- <span>{{ followers }} Followers</span> -->
        </div>
      </div>
    </div>

    <div class="flex-1   grid gap-2">
      <div class="mb-3">
        <Chip v-for="tag in interests?.split(',').map(tag => tag.trim())" :key="tag" :label="tag"
          class="mr-2 text-sm bg-transparent ring ring-gray-200 " />
      </div>

      <div class="mb-2">
        <p class="max-w-xl">
          {{ about }}
        </p>
      </div>

    </div>


    <div class="flex align-items-center justify-content-between gap-4" v-if="!isYou">
      <Button variant="filled" label="Message" severity="" size="small" icon="pi pi-send" class="px-4 py-1" />
      <Button variant="text" label="Follow" class="mr-2 px-4" />
    </div>
  </div>
</template>