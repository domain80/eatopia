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
import { type ProfileSetupData } from '../../services/onboarding.service';
import Message from 'primevue/message';
import { z } from 'zod';
import { zodResolver } from '@primevue/forms/resolvers/zod';
import Chip from 'primevue/chip';

const emit = defineEmits<{
  'update:data': [data: ProfileSetupData['basicProfile']]
}>();

const profileData = ref({
  title: '',
  interests: [] as string[],
  aboutYou: '',
  imagePreview: ''
});

const newInterest = ref('');

const handleInterestKeyDown = (event: KeyboardEvent) => {
  if (event.key === 'Enter' && newInterest.value.trim()) {
    event.preventDefault();
    if (profileData.value.interests.length < 3) {
      profileData.value.interests.push(newInterest.value.trim() as never);
      newInterest.value = '';
    }
  }
};

const removeInterest = (index: number) => {
  profileData.value.interests.splice(index, 1);
};

// Form validation schema
const resolver = zodResolver(z.object({
  title: z.string({ message: 'Please enter a title' }).min(1, 'Please enter a title'),
  aboutYou: z.string({ message: 'Tell us a bit more about yourself' })
    .min(10, 'We need to know a bit more about you')
    .max(300, 'Bio is too long'),
  imagePreview: z.string().optional()
})
);


watch(profileData, (newValue) => {
  emit('update:data', newValue);
}, { deep: true });

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

const props = defineProps<{
  onNavigate: (direction: 'prev' | 'next' | "end") => void
}>();

const handleSubmit = (event: FormSubmitEvent) => {
  if (event.valid) {
    props.onNavigate('next');
  }
};
</script>

<template>
  <div class="flex flex-col space-y-6 p-4">
    <h1 class="text-2xl font-semibold text-gray-700">Setup your profile.</h1>

    <Form v-slot="$form" :resolver="resolver" @submit="handleSubmit" validate-on-blur :validate-on-value-update="false"
      :validate-on-submit="true" class="flex flex-col space-y-6">
      <!-- Profile Image Section -->
      <div class="flex items-end gap-4">
        <div class="relative w-24 h-24 overflow-hidden rounded-full">
          <Image v-if="profileData.imagePreview" :src="profileData.imagePreview" class="h-full object-cover"
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
      <FormField class="flex flex-col gap-2" name="title">
        <label class="font-medium">Title</label>
        <Select v-model="profileData.title" :options="titleOptions" placeholder="eg: Mr. Dr. Etc" class="w-full" />
        <Message v-if="$form.title?.invalid" severity="error" size="small" variant="simple">{{
          $form.title.error.message }}</Message>
      </FormField>

      <!-- Interests -->
      <FormField class="flex flex-col gap-2" name="interests">
        <div class="flex justify-between">
          <label class="font-medium">Interests (3 max)</label>
          <small class="text-sm text-gray-500">Press enter to add</small>
        </div>
        <div class="flex flex-col gap-2">
          <!-- Chips display -->
          <div class="flex flex-wrap gap-2" v-if="profileData.interests.length > 0">
            <Chip v-for="(interest, index) in profileData.interests" :key="index" :label="interest" removable
              @remove="removeInterest(index)" class="bg-gray-100" />
          </div>
          <!-- Input field -->
          <div class="relative">
            <InputText v-model="newInterest" placeholder="eg: Running, Reading, etc" class="w-full"
              :disabled="profileData.interests.length >= 3" @keydown="handleInterestKeyDown" />
            <small v-if="profileData.interests.length >= 3" class="absolute right-0 -bottom-5 text-orange-600 text-xs">
              Maximum interests reached
            </small>
          </div>
        </div>
        <Message v-if="$form.interests?.invalid" severity="error" size="small" variant="simple">
          {{ $form.interests.error.message }}
        </Message>
      </FormField>

      <!-- About You -->
      <FormField class="flex flex-col gap-2" name="aboutYou">
        <div class="flex justify-between">
          <label class="font-medium">About you</label>
          <span class="text-sm text-gray-500">50 words max</span>
        </div>
        <Textarea v-model="profileData.aboutYou" placeholder="Tell others what how you can help them" rows="4"
          class="w-full" />
        <Message v-if="$form.aboutYou?.invalid" severity="error" size="small" variant="simple">{{
          $form.aboutYou.error.message }}</Message>
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
