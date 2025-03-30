<script setup lang="ts">
import { Button, Card } from 'primevue';


defineProps({
  dietitian: {
    type: Object,
    required: true
  }
});

</script>

<template>
  <Card class="transition-shadow duration-300 hover:shadow-md">
    <template #content>
      <div class="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
        <img v-if="dietitian.profilePic" :src="dietitian.profilePic" alt="Profile picture"
          class="w-full h-full object-cover">
        <div v-else class="w-full h-full bg-gray-300 rounded-full"></div>
      </div>

      <div class="flex flex-col">
        <h3 class="text-base font-semibold text-gray-800 m-0 mb-1">{{ dietitian.name }}</h3>
        <div class="flex items-center gap-2 mb-2">
          <span class="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
          <span class="text-gray-500 text-sm">{{ dietitian.followers }} Followers</span>
        </div>
        <p class="text-gray-600 text-sm leading-snug m-0">{{ dietitian.bio }}</p>

        <div class="flex gap-2 flex-shrink-0 -ml-4">
          <Button class="" variant="text" severity="secondary" label="Message" />
          <Button class="" variant="text" label="Follow" />
        </div>
      </div>



    </template>
  </Card>
</template>