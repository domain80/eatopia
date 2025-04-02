<script setup lang="ts">
import { ref, watch } from 'vue';
import { Form, FormField, type FormSubmitEvent } from '@primevue/forms';
import InputText from 'primevue/inputtext';
import Calendar from 'primevue/calendar';
import Checkbox from 'primevue/checkbox';
import Textarea from 'primevue/textarea';
import Button from 'primevue/button';
import Message from 'primevue/message';
import { z } from 'zod';
import type { ProfileSetupData } from '@/shared/models/ProfileSetup.model';
import { zodResolver } from '@primevue/forms/resolvers/zod';
import DatePicker from 'primevue/datepicker';
import type { WorkExperience } from '@/shared/models/ProfileSetup.model';
import { FileUpload } from 'primevue';

const emit = defineEmits<{
  'update:data': [data: ProfileSetupData['workExperiences']]
}>();

const workExperiences = ref<ProfileSetupData['workExperiences']>([{
  title: '',
  where: '',
  startDate: null,
  endDate: null,
  currentlyWork: false,
  jobSummary: ''
}]);

// Form validation schema
const resolver = zodResolver(z.object({
  license: z.string({ message: "You cant be a professional without a license" }),
  title: z.string().min(1, 'Job title is required'),
  where: z.string().min(1, 'Workplace is required'),
  startDate: z.date({
    required_error: 'Start date is required',
    invalid_type_error: 'Start date must be a valid date',
  }),
  endDate: z.date().nullable().optional(),
  currentlyWork: z.boolean(),
  jobSummary: z.string()
    .min(20, 'Job summary must be at least 20 characters')
    .max(500, 'Job summary cannot exceed 500 characters')
}).refine(
  (data) => {
    if (!data.currentlyWork && !data.endDate) {
      return false;
    }
    return true;
  },
  {
    message: 'End date is required when not currently working',
    path: ['endDate']
  }
));

watch(workExperiences, (newValue) => {
  emit('update:data', newValue);
}, { deep: true });

const props = defineProps<{
  onNavigate: (direction: 'prev' | 'next' | 'end') => void
}>();

const handleSubmit = (event: FormSubmitEvent) => {
  if (!event.valid) {
    return
  }
  emit('update:data', [event.values] as ProfileSetupData['workExperiences'])
  props.onNavigate('end');
};
</script>

<template>
  <div class="flex flex-col space-y-6 ">

    <Form v-slot="$form" :resolver="resolver" @submit="handleSubmit" validate-on-blur :validate-on-value-update="false"
      :validate-on-submit="true" class="flex flex-col gap-6">

      <h1 class="text-2xl font-semibold text-gray-700">Upload a pdf of your certificte</h1>

      <!-- Title -->
      <FormField class="flex flex-col gap-2 items-start" name="title">
        <label class="font-medium">Certificate</label>
        <FileUpload name="license" mode="basic" accept="image/*" :auto="true" @select="" ref="fileUpload" />
        <Message v-if="$form.title?.invalid" severity="error" size="small" variant="simple">{{ $form.title.error.message
          }}</Message>
      </FormField>


      <h1 class="text-2xl font-semibold text-gray-700">Add one work experience</h1>
      <!-- Title -->
      <FormField class="flex flex-col gap-2" name="title">
        <label class="font-medium">Title</label>
        <InputText name="title" class="w-full" />
        <Message v-if="$form.title?.invalid" severity="error" size="small" variant="simple">{{ $form.title.error.message
          }}</Message>
      </FormField>

      <!-- Where -->
      <FormField class="flex flex-col gap-2" name="where">
        <label class="font-medium">Where (Company)</label>
        <InputText name="where" class="w-full" />
        <Message v-if="$form.where?.invalid" severity="error" size="small">{{ $form.where.error.message }}</Message>
      </FormField>

      <!-- Working Period -->
      <div class="flex flex-col gap-2">
        <label class="font-medium">Working Period</label>
        <div class="flex gap-4 items-start">
          <FormField class="flex-1 space-y-2" name="startDate">
            <DatePicker name="startDate" view="month" dateFormat="MM yy" placeholder="Start Period" fluid
              class="w-full" />
            <Message v-if="$form.startDate?.invalid" severity="error" size="small">{{ $form.startDate.error.message }}
            </Message>
          </FormField>
          <FormField class="flex-1 space-y-2" name="endDate">
            <Calendar name="endDate" view="month" dateFormat="MM yy" placeholder="End Period"
              :disabled="$form.currentlyWork?.value" class="w-full" />
            <Message v-if="$form.endDate?.invalid" severity="error" size="small">{{ $form.endDate.error.message }}
            </Message>
          </FormField>
        </div>
        <div class="flex items-center gap-2">
          <Checkbox name="currentlyWork" :binary="true" input-id="currentlyWork" />
          <label for="currentlyWork">I currently work here</label>
        </div>
      </div>

      <!-- Job Summary -->
      <FormField class="flex flex-col gap-2" name="jobSummary">
        <div class="flex justify-between">
          <label class="font-medium">Job Summary</label>
          <span class="text-sm text-gray-500">80 words max</span>
        </div>
        <Textarea name="jobSummary" placeholder="Tell others what how you can help them" rows="4" class="w-full" />
        <Message v-if="$form.jobSummary?.invalid" severity="error" size="small">{{ $form.jobSummary.error.message }}
        </Message>
      </FormField>

      <div class="flex justify-between pt-6">
        <Button type="button" label="Previous" severity="secondary" icon="pi pi-arrow-left"
          @click="onNavigate('prev')" />
        <Button type="submit" label="Next" icon="pi pi-arrow-right" iconPos="right" />
      </div>
    </Form>
  </div>
</template>