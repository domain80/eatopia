<script setup lang="ts">
import { ref, onMounted } from 'vue';
import ProfileHeader from '../onboarding/profile/components/ProfileHeader.vue';
import PageHeaderShared from '@/shared/components/PageHeader.shared.vue'
import InputText from 'primevue/inputtext';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import FeaturedDietitiensComponent from './components/FeaturedDietitiens.component.vue';
import { Button } from 'primevue';
import { OnboardingService } from '@/services/onboarding.service';
import { useToast } from 'primevue/usetoast';
import { useDebounce } from '@/shared/composables/useDebounce';
import type { UserAccountDto } from '../onboarding/auth/dto/userAccount.dto';

document.title = 'Eatopia | Search';

const toast = useToast();
const onboardingService = OnboardingService.getInstance();

const searchQuery = ref('');
const searchResults = ref<UserAccountDto[]>([]);
const isLoading = ref(false);
const selectedRole = ref<string | null>(null);
const currentPage = ref(0);
const totalPages = ref(0);
const totalElements = ref(0);

const roles = [
  { label: 'Dietitian', value: 'DIETITIAN' },
  { label: 'Patient', value: 'PATIENT' },
  { label: 'Professional', value: 'PROFESSIONAL' }
];

const debouncedSearch = useDebounce(async () => {
  if (!searchQuery.value && !selectedRole.value) {
    searchResults.value = [];
    return;
  }

  try {
    isLoading.value = true;
    const response = await onboardingService.searchUsers({
      query: searchQuery.value,
      role: selectedRole.value || undefined,
      page: currentPage.value,
      size: 20
    });
    searchResults.value = response.content;
    totalPages.value = response.totalPages;
    totalElements.value = response.totalElements;
  } catch (error) {
    console.error('Search failed:', error);
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Failed to search users',
      life: 3000,
    });
  } finally {
    isLoading.value = false;
  }
}, 300);

const handleSearch = () => {
  currentPage.value = 0;
  debouncedSearch();
};

const handleRoleSelect = (role: string) => {
  selectedRole.value = role;
  currentPage.value = 0;
  handleSearch();
};

const handlePageChange = (page: number) => {
  currentPage.value = page;
  debouncedSearch();
};
</script>

<template>
  <main class="bg-white/60 min-h-screen pb-8">
    <PageHeaderShared>
      <h1 class="text-lg font-medium">Search</h1>
    </PageHeaderShared>

    <div class="px-20 grid gap-12">
      <header class="flex flex-col gap-6 items-start">
        <h2 class="text-2xl font-light">
          Discover ways to get fit, <br> stay healthy and improve eating habits
        </h2>
        <IconField class="w-full max-w-lg">
          <InputText v-model="searchQuery" placeholder="Search" fluid @input="handleSearch" />
          <InputIcon class="pi pi-search" />
        </IconField>
        <section class="grid gap-2 items-center text-sm">
          <div class="flex gap-4 *:h-max *:w-max *:rounded-sm *:py-1 *:px-4">
            <Button v-for="role in roles" :key="role.value" :label="role.label" variant="outlined" severity="secondary"
              :class="{ 'bg-primary-50': selectedRole === role.value }" @click="handleRoleSelect(role.value)" />
          </div>
        </section>
      </header>

      <div v-if="isLoading" class="flex justify-center">
        <i class="pi pi-spin pi-spinner text-4xl"></i>
      </div>

      <div v-else-if="searchResults.length > 0" class="grid gap-6">
        <div class="text-sm text-gray-500">
          Found {{ totalElements }} results
        </div>
        <div v-for="user in searchResults" :key="user.id"
          class="bg-white p-4 rounded-lg shadow-sm flex flex-wrap gap-4">
          <ProfileHeader v-bind="user" :summarized="true" />
        </div>

        <div v-if="totalPages > 1" class="flex justify-center gap-2 mt-4">
          <Button v-for="page in totalPages" :key="page - 1" :label="page.toString()"
            :class="{ 'bg-primary-50': currentPage === page - 1 }" @click="handlePageChange(page - 1)" />
        </div>
      </div>

      <FeaturedDietitiensComponent v-if="!searchQuery && !selectedRole" />
    </div>
  </main>
</template>
