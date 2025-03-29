<script setup lang="ts">
import { RouterLink } from 'vue-router';

defineProps<{
  routeName: string;
  label: string;
}>();
</script>


<template>
  <RouterLink :to="{ name: routeName }"
    class="py-2.5 px-4 rounded-md flex items-center gap-4 hover:border-teal-800 border-1 border-transparent hover:text-teal-800 transition-all duration-200"
    active-class="bg-teal-800 text-gray-50 hover:text-gray-50">
    <slot name="icon" />
    <span class=" text-sm font-medium">{{ label }}</span>
  </RouterLink>
</template>
