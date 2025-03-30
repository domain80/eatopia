<script setup lang="ts">
import { Button } from 'primevue';


defineProps({
  dietitian: {
    type: Object,
    required: true
  }
});
</script>

<template>
  <div
    class="bg-white border border-gray-200 rounded-lg p-6 flex flex-col gap-4 transition-shadow duration-300 hover:shadow-md">
    <div class="flex flex-col items-start gap-3">
      <div class="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
        <img v-if="dietitian.profilePic" :src="dietitian.profilePic" alt="Profile picture"
          class="w-full h-full object-cover">
        <div v-else class="w-full h-full bg-gray-300"></div>
      </div>

      <div class="flex gap-4">
        <h3 class="text-lg font-semibold  m-0">{{ dietitian.name }}</h3>
        <div class="flex items-center gap-2">
          <span class="w-1.5 h-1.5 rounded-full bg-teal-600"></span>
          <span class="text-teal-600 text-sm">{{ dietitian.title }}</span>
        </div>
      </div>
    </div>

    <p class=" text-base leading-relaxed m-0">{{ dietitian.bio }}</p>

    <Button label="Follow" severity="secondary" class="" />
  </div>
</template>