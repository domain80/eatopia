<script setup lang="ts">
import { ref, watch } from 'vue';
import { Form, FormField, type FormSubmitEvent } from '@primevue/forms';
import Button from 'primevue/button';
import Textarea from 'primevue/textarea';
import FileUpload, { type FileUploadSelectEvent } from 'primevue/fileupload';
import Image from 'primevue/image';
import { Select, InputText } from 'primevue';
import { useTemplateRef } from 'vue';
import { defineEmits } from 'vue';
import type { ProfileSetupData } from '@/shared/models/ProfileSetup.model';
import Message from 'primevue/message';
import { z } from 'zod';
import { zodResolver } from '@primevue/forms/resolvers/zod';
import Chip from 'primevue/chip';

const emit = defineEmits<{
  'update:data': [data: ProfileSetupData]
}>();

const profileData = ref({
  title: '',
  jobTitle: '',
  interests: '',
  about: '',
  imageData: ''
});

// Form validation schema
const resolver = zodResolver(z.object({
  title: z.string({ message: 'Please enter a title' }).min(1, 'Please enter a title'),
  about: z.string({ message: 'Tell us a bit more about yourself' })
    .min(10, 'We need to know a bit more about you')
    .max(300, 'Bio is too long'),
  imageData: z.string().optional()
}));

watch(profileData, (newValue) => {
  emit('update:data', {
    ...newValue,
    userAccountId: '',
  });
}, { deep: true });

const handleFileSelect = (event: FileUploadSelectEvent) => {
  const file = event.files[0];
  const reader = new FileReader();
  reader.onload = (e) => {
    profileData.value.imageData = e.target?.result as string;
  };
  reader.readAsDataURL(file);
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
  'RD.',
  'Prof.'
];

const props = defineProps<{
  onNavigate: (direction: 'prev' | 'next' | "end") => void
}>();

const handleSubmit = (event: FormSubmitEvent) => {
  if (!event.valid) {
    return
  }
  emit('update:data', event.values as ProfileSetupData)
  props.onNavigate('next');
};
</script>

<template>
  <div class="flex flex-col space-y-6 ">
    <h1 class="text-2xl font-semibold text-gray-700">Setup your profile.</h1>

    <Form v-slot="$form" :resolver="resolver" @submit="handleSubmit" validate-on-blur :validate-on-value-update="false"
      :validate-on-submit="true" class="flex flex-col space-y-6">
      <!-- Profile Image Section -->
      <div class="flex items-end gap-4">
        <div class="relative w-24 h-24 overflow-hidden rounded-full">
          <Image v-if="profileData.imageData" :src="profileData.imageData" class="h-full object-cover"
            alt="Profile picture" preview />
          <div v-else class="w-full h-full bg-gray-200 rounded-full flex items-center justify-center">
            <i class="pi pi-user text-gray-400 text-2xl"></i>
          </div>
        </div>
        <div class="flex gap-2">
          <FileUpload name="imageData" mode="basic" :style="{ visibility: 'none' }" accept="image/*" :auto="true"
            @select="handleFileSelect" ref="fileUpload" />
          <Button icon="pi pi-trash" severity="secondary" @click="profileData.imageData = ''"
            :disabled="!profileData.imageData" />
        </div>
      </div>

      <!-- Title -->
      <FormField class="flex flex-col gap-2" name="title">
        <label class="font-medium">Title</label>
        <Select name="title" :options="titleOptions" placeholder="eg: Mr. Dr. Etc" class="w-full" />
        <Message v-if="$form.title?.invalid" severity="error" size="small" variant="simple">{{
          $form.title.error.message }}</Message>
      </FormField>

      <!-- Interests -->
      <FormField class="flex flex-col gap-2" name="interests">
        <div class="flex flex-col gap-2">
          <InputText name="interests" placeholder="eg: Running, Reading, etc (comma separated)" class="w-full" />
          <small class="text-gray-500">Enter your interests separated by commas</small>
        </div>
        <Message v-if="$form.interests?.invalid" severity="error" size="small" variant="simple">
          {{ $form.interests.error.message }}
        </Message>
      </FormField>

      <FormField class="flex flex-col gap-2 w-full" name="jobTitle">
        <label class="font-medium">Job Title</label>
        <InputText name="jobTitle" placeholder="eg: Cardiologist, Dentist, etc" class="w-full" />
        <Message v-if="$form.jobTitle?.invalid" severity="error" size="small" variant="simple">{{
          $form.jobTitle.error.message }}</Message>
      </FormField>

      <!-- About -->
      <FormField class="flex flex-col gap-2" name="about">
        <div class="flex justify-between">
          <label class="font-medium">About you</label>
          <span class="text-sm text-gray-500">50 words max</span>
        </div>
        <Textarea name="about" placeholder="Tell others what how you can help them" rows="4" class="w-full" />
        <Message v-if="$form.about?.invalid" severity="error" size="small" variant="simple">{{
          $form.about.error.message }}</Message>
      </FormField>

      <div class="flex justify-between pt-6">
        <Button type="button" label="Previous" severity="secondary" icon="pi pi-arrow-left"
          @click="onNavigate('prev')" />
        <Button type="submit" label="Next" icon="pi pi-arrow-right" iconPos="right" />
      </div>
    </Form>
  </div>
</template>

<style scoped>
.p-chip {
  background: #f3f4f6;
  padding: 0.5rem 1rem;
}

.p-chip .p-chip-remove-icon {
  margin-left: 0.5rem;
}
</style>
