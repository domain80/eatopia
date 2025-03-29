<script setup lang="ts">
import { ref } from 'vue';
import Button from 'primevue/button';
import Chips from 'primevue/chips';
import Textarea from 'primevue/textarea';
import FileUpload, { type FileUploadSelectEvent } from 'primevue/fileupload';
import Image from 'primevue/image';
import { InputChips, Select } from 'primevue';
import { useTemplateRef } from 'vue';

const profileData = ref({
  title: '',
  interests: [],
  aboutYou: '',
  imagePreview: ''
});

const handleFileSelect = (event: FileUploadSelectEvent) => {
  profileData.value.imagePreview = URL.createObjectURL(event.files[0]);
};

const fileUploadRef = useTemplateRef('fileUpload');

const onUploadImage = () => {
  fileUploadRef.value?.upload()
};

const titleOptions = [
  'Mr.',
  'Mrs.',
  'Ms.',
  'Dr.',
  'Prof.'
];

defineProps<{
  onNavigate: (direction: 'prev' | 'next') => void
}>();
</script>

<template>
  <div class="flex flex-col space-y-6 p-4">
    <h1 class="text-2xl font-semibold text-gray-700">Setup your profile.</h1>

    <!-- Profile Image Section -->
    <div class="flex items-end gap-4">
      <div class="relative w-24 h-24 overflow-hidden rounded-full">
        <Image v-if="profileData.imagePreview" :src="profileData.imagePreview" class=" h-full object-cover"
          alt="Profile picture" preview />
        <div v-else class="w-full h-full bg-gray-200 rounded-full flex items-center justify-center">
          <i class="pi pi-user text-gray-400 text-2xl"></i>
        </div>
      </div>
      <div class="flex gap-2">
        <FileUpload mode="basic" :style="{ visibility: 'none' }" accept="image/*" :auto="true"
          @select="handleFileSelect" ref="fileUpload" />
        <Button icon="pi pi-trash" severity="secondary" @click="profileData.imagePreview = ''"
          :disabled="!profileData.imagePreview" />
      </div>
    </div>

    <!-- Title -->
    <div class="flex flex-col gap-2">
      <label class="font-medium">Title</label>
      <Select v-model="profileData.title" :options="titleOptions" placeholder="eg: Mr. Dr. Etc" class="w-full" />
    </div>

    <!-- Interests -->
    <div class="flex flex-col gap-2">
      <div class="flex justify-between">
        <label class="font-medium">Interests (3 max)</label>
        <small class="text-sm text-gray-500">Press enter to add</small>
      </div>
      <InputChips v-model="profileData.interests" placeholder="eg: Running, Reading, etc" :max="3"
        :allowDuplicate="false" class="" />
    </div>

    <!-- About You -->
    <div class="flex flex-col gap-2">
      <div class="flex justify-between">
        <label class="font-medium">About you</label>
        <span class="text-sm text-gray-500">50 words max</span>
      </div>
      <Textarea v-model="profileData.aboutYou" placeholder="Tell others what how you can help them" rows="4"
        class="w-full" />
    </div>

    <div class="flex justify-between pt-6">
      <Button label="Previous" severity="secondary" icon="pi pi-arrow-left" @click="onNavigate('prev')" />
      <Button label="Next" icon="pi pi-arrow-right" iconPos="right" @click="onNavigate('next')" />
    </div>
  </div>
</template>

<style scoped></style>

<Chips v-model="profileData.interests" placeholder="" :max="3" class="w-full" />