<script setup lang="ts">
import { ref } from 'vue';
import InputText from 'primevue/inputtext';
import Calendar from 'primevue/calendar';
import Checkbox from 'primevue/checkbox';
import Textarea from 'primevue/textarea';
import Button from 'primevue/button';

const workExperience = ref({
  title: '',
  where: '',
  startDate: null,
  endDate: null,
  currentlyWork: false,
  jobSummary: ''
});

defineProps<{
  onNavigate: (direction: 'prev' | 'next') => void
}>();
</script>

<template>
  <div class="flex flex-col space-y-6 p-4">
    <h1 class="text-2xl font-semibold text-gray-700">Add one work experience</h1>

    <div class="flex flex-col gap-6">
      <!-- Title -->
      <div class="flex flex-col gap-2">
        <label class="font-medium">Title</label>
        <InputText v-model="workExperience.title" class="w-full" />
      </div>

      <!-- Where -->
      <div class="flex flex-col gap-2">
        <label class="font-medium">Where</label>
        <InputText v-model="workExperience.where" class="w-full" />
      </div>

      <!-- Working Period -->
      <div class="flex flex-col gap-2">
        <label class="font-medium">Working Period</label>
        <div class="flex gap-4 items-center">
          <Calendar v-model="workExperience.startDate" view="month" dateFormat="MM yy" placeholder="Start Period"
            class="flex-1" />
          <Calendar v-model="workExperience.endDate" view="month" dateFormat="MM yy" placeholder="End Period"
            :disabled="workExperience.currentlyWork" class="flex-1" />
        </div>
        <div class="flex items-center gap-2">
          <Checkbox v-model="workExperience.currentlyWork" :binary="true" />
          <label>I currently work here</label>
        </div>
      </div>

      <!-- Job Summary -->
      <div class="flex flex-col gap-2">
        <div class="flex justify-between">
          <label class="font-medium">Job Summary</label>
          <span class="text-sm text-gray-500">80 words max</span>
        </div>
        <Textarea v-model="workExperience.jobSummary" placeholder="Tell others what how you can help them" rows="4"
          class="w-full" />
      </div>
    </div>

    <!-- Navigation Buttons -->
    <div class="flex justify-between pt-6">
      <Button label="Previous" severity="secondary" icon="pi pi-arrow-left" @click="onNavigate('prev')" />
      <Button label="Next" icon="pi pi-arrow-right" iconPos="right" @click="onNavigate('next')" />
    </div>
  </div>
</template>