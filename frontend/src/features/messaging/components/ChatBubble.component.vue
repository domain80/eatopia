<script setup lang="ts">
interface Props {
  content: string
  timestamp?: string
  status?: 'sent' | 'delivered' | 'read' | 'failed'
  isYou?: boolean
}

defineProps<Props>()
</script>

<template>
  <div v-if="isYou" class="w-max grid max-w-sm">
    <div class="px-3 py-2 bg-teal-800 rounded-xl rounded-tr-none shadow-md">
      <h2 class="text-white text-sm font-normal leading-snug">{{ content }}</h2>
    </div>
    <div class="justify-end items-center inline-flex timeStamp">
      <h3 class="text-gray-500 text-xs font-normal leading-4 py-1">{{ timestamp }}</h3>
    </div>
  </div>
  <div class="w-max grid max-w-sm" v-if="!isYou">
    <div
      class="px-3.5 py-2 bg-gray-50 ring-1 ring-gray-200 rounded-xl rounded-tl-none justify-start  items-center gap-3 inline-flex shadow-sm">
      <h5 class="text-gray-900 text-sm font-normal leading-snug">{{ content }}</h5>
    </div>
    <div class="justify-start items-center inline-flex timeStamp">
      <h6 class="text-gray-500 text-xs font-normal leading-4 py-1">{{ timestamp }}</h6>
    </div>
  </div>
</template>
