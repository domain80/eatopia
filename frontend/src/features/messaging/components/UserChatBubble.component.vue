<script setup lang="ts">
import { Avatar } from 'primevue';

defineProps<{
  username: string;
  isYou?: boolean;
}>();
</script>

<template>
  <div class="flex gap-2.5 w-full " v-if="!isYou">
    <Avatar icon="pi pi-user" size="medium" shape="circle" class="bg-gray-200 p-4" />
    <div class="grid h-max">
      <h5 class="text-gray-900 text-sm font-semibold leading-snug pb-1">{{ username }}</h5>
      <slot name="chats"></slot>
    </div>
  </div>

  <div class="flex gap-2.5 justify-end" v-if="isYou">
    <div class="grid  mb-2 [&_.timeStamp]:not(:last-child):hidden [&_.timeStamp]:last-child:block">
      <h5 class="text-right text-gray-900 text-sm font-semibold leading-snug pb-1">You</h5>
      <slot name="chats"></slot>
    </div>
    <Avatar icon="pi pi-user" size="normal" shape="circle" class="bg-gray-200 p-4" />
  </div>
</template>
