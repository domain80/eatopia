<script setup lang="ts">
import { ref } from 'vue';
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import Button from 'primevue/button';
import Accordion from 'primevue/accordion';
import AccordionPanel from 'primevue/accordionpanel';
import AccordionHeader from 'primevue/accordionheader';
import AccordionContent from 'primevue/accordioncontent';

const medicalInfo = ref({
  conditions: [] as Array<{
    name: string;
    summary: string;
  }>,
  newCondition: {
    name: '',
    summary: ''
  }
});

const activeIndex = ref('0');

const addMedicalCondition = () => {
  if (medicalInfo.value.newCondition.name) {
    medicalInfo.value.conditions.push({
      name: medicalInfo.value.newCondition.name,
      summary: medicalInfo.value.newCondition.summary
    });
    medicalInfo.value.newCondition.name = '';
    medicalInfo.value.newCondition.summary = '';
  }
};

const removeCondition = (index: number, event: Event) => {
  event.stopPropagation();
  medicalInfo.value.conditions.splice(index, 1);
};

defineProps<{
  onNavigate: (direction: 'prev' | 'next') => void
}>();
</script>

<template>
  <div class="flex flex-col space-y-6 p-4">
    <h1 class="text-2xl font-semibold text-gray-700">Add your medical info</h1>

    <div class="flex flex-col gap-6">
      <!-- Existing Conditions -->
      <div class="card" v-if="medicalInfo.conditions.length > 0">
        <Accordion v-model="activeIndex">
          <div class="flex gap-1 items-start" v-for="(condition, index) in medicalInfo.conditions" :key="index">
            <Button icon="pi pi-times" severity="secondary" text @click="(e) => removeCondition(index, e)"
              class="mt-2 p-2" />
            <AccordionPanel class="w-full" :value="index.toString()">
              <AccordionHeader>
                <div class="flex items-center justify-between w-full">
                  <span>{{ condition.name }}</span>
                </div>
              </AccordionHeader>
              <AccordionContent>
                <p class="m-0 text-gray-600">
                  {{ condition.summary }}
                </p>
              </AccordionContent>
            </AccordionPanel>
          </div>
        </Accordion>
      </div>

      <!-- Add New Condition -->
      <div class="flex flex-col gap-4">
        <div class="flex flex-col gap-2">
          <label class="font-medium">Name / Summary</label>
          <InputText v-model="medicalInfo.newCondition.name" placeholder="eg: Chronic somethingitis" class="w-full" />
        </div>

        <div class="flex flex-col gap-2">
          <div class="flex justify-between">
            <label class="font-medium">Description</label>
            <span class="text-sm text-gray-500">80 words max</span>
          </div>
          <Textarea v-model="medicalInfo.newCondition.summary" placeholder="eg: ive had this since..." rows="4"
            class="w-full" />
        </div>

        <div class="flex justify-end gap-2">
          <Button label="Cancel" severity="secondary" text
            @click="medicalInfo.newCondition = { name: '', summary: '' }" />
          <Button label="Add Info" @click="addMedicalCondition" />
        </div>
      </div>
    </div>

    <!-- Navigation Buttons -->
    <div class="flex justify-between pt-6">
      <Button label="Previous" severity="secondary" icon="pi pi-arrow-left" @click="onNavigate('prev')" />
      <Button label="Next" icon="pi pi-arrow-right" iconPos="right" @click="onNavigate('next')" />
    </div>
  </div>
</template>