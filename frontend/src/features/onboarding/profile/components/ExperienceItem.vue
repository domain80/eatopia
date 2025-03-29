<script setup lang="ts">
import Card from 'primevue/card';

interface ExperienceItemProps {
  title: string;
  company: string;
  dateRange: {
    from: string;
    to: string;
  };
  responsibilities: string[];
}

defineProps<ExperienceItemProps>();
</script>

<template>
  <div class="mb-3">
    <div class="flex">
      <div class="flex-none w-8rem text-500">
        {{ dateRange.from }}
        <br />to<br />
        {{ dateRange.to }}
      </div>
      <div class="flex-1">
        <h3 class="font-bold mb-2">{{ company }}</h3>
        <h4 class="text-primary mb-3">{{ title }}</h4>
        <ul class="list-none p-0 m-0">
          <li v-for="(item, index) in responsibilities" :key="index" class="mb-2 flex align-items-center">
            <i class="pi pi-circle-fill mr-2" style="font-size: 0.5rem"></i>
            {{ item }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>