<script setup lang="ts">
import { ref, watch } from 'vue';
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import Button from 'primevue/button';
import Accordion from 'primevue/accordion';
import AccordionPanel from 'primevue/accordionpanel';
import AccordionHeader from 'primevue/accordionheader';
import AccordionContent from 'primevue/accordioncontent';
import type { MedicalCondition, ProfileSetupData } from '@/shared/models/ProfileSetup.model';
import { Form, FormField } from '@primevue/forms';
import type { FormSubmitEvent } from '@primevue/forms';
import { z } from 'zod';
import { zodResolver } from '@primevue/forms/resolvers/zod';

const emit = defineEmits<{
  'update:data': [data: ProfileSetupData['medicalInfo']]
}>();

const medicalInfo = ref<ProfileSetupData['medicalInfo']>([]);
const newCondition = ref({
  name: '',
  summary: ''
});

watch(medicalInfo, (newValue) => {
  emit('update:data', newValue);
}, { deep: true });

const activeIndex = ref('0');

const addMedicalCondition = (values: MedicalCondition) => {
  if (values.name) {
    medicalInfo.value?.push({
      name: values.name,
      summary: values.summary
    });
  }
};

const removeCondition = (index: number, event: Event) => {
  event.stopPropagation();
  medicalInfo.value?.splice(index, 1);
};

const props = defineProps<{
  onNavigate: (direction: 'prev' | 'next' | 'end') => void
}>();

// const resolver = zodResolver(z.object({
//   conditionName: z.string().min(1, 'Condition name is required'),
//   conditionSummary: z.string().min(1, 'Condition summary is required'),
// }));


const handleNavigate = (direction: 'prev' | 'next' | 'end') => {
  emit('update:data', medicalInfo.value as ProfileSetupData['medicalInfo'])
  props.onNavigate(direction);
}

const handleSubmit = (event: FormSubmitEvent) => {
  if (!event.valid) {
    return
  }
  addMedicalCondition(event.values as MedicalCondition)
}
</script>

<template>
  <div class="flex flex-col space-y-6 p-4">
    <h1 class="text-2xl font-semibold text-gray-700">Add your medical info</h1>

    <div class="flex flex-col gap-6">
      <!-- Existing Conditions -->
      <div class="card" v-if="medicalInfo && medicalInfo.length > 0">
        <Accordion v-model="activeIndex">
          <div class="flex gap-1 items-start" v-for="(condition, index) in medicalInfo" :key="index">
            <Button icon="pi pi-times" severity="secondary" text @click="(e) => removeCondition(index, e)"
              class="mt-2 p-2" />
            <AccordionPanel class="w-full" :value="index.toString()">
              <AccordionHeader>
                <div class="flex items-center justify-between w-full">
                  <span>{{ condition.name }}</span>
                </div>
              </AccordionHeader>
              <AccordionContent>
                <p class="m-0 text-gray-600 bg-transparent">
                  {{ condition.summary }}
                </p>
              </AccordionContent>
            </AccordionPanel>
          </div>
        </Accordion>
      </div>

      <!-- Add New Condition -->
      <Form v-slot="$form" class="flex flex-col gap-4" @submit="handleSubmit" validate-on-blur
        :validate-on-value-update="false" :validate-on-submit="true">
        <FormField class="flex flex-col gap-2" name="name">
          <label class="font-medium">Name / Summary</label>
          <InputText name="name" placeholder="eg: Chronic somethingitis" class="w-full" />
        </FormField>

        <FormField class="flex flex-col gap-2" name="summary">
          <div class="flex justify-between">
            <label class="font-medium">Description</label>
            <span class="text-sm text-gray-500">80 words max</span>
          </div>
          <Textarea name="summary" placeholder="eg: ive had this since..." rows="4" class="w-full" />
        </FormField>

        <div class="flex justify-end gap-2">
          <Button label="Cancel" severity="secondary" text @click="newCondition = { name: '', summary: '' }" />
          <Button class="bg-gray-800" label="Add Info" type="submit" />
        </div>
      </Form>
    </div>

    <!-- Navigation Buttons -->
    <div class="flex justify-between pt-6">
      <Button label="Previous" severity="secondary" icon="pi pi-arrow-left" @click="onNavigate('prev')" />
      <Button label="Next" icon="pi pi-arrow-right" iconPos="right" @click="handleNavigate('end')" />
    </div>
  </div>
</template>