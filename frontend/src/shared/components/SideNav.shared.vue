<script setup lang="ts">
import NavItem from './NavItem.shared.vue';

const navItems = [
  { routeName: 'home', icon: 'pi pi-home', label: 'Home' },
  { routeName: 'search', icon: 'pi pi-search', label: 'Search' },
  { routeName: 'messages', icon: 'pi pi-comments', label: 'Messages' },
  { routeName: 'profile', image: '/images/avatar.png', label: 'Profile' },
]
</script>

<template>
  <aside
    class="flex flex-col sticky top-0 h-screen w-[15%] border-r bg-[#ffffff4d] border-r-gray-200 drop-shadow-lg justify-between">
    <div class=" w-full mx-auto flex flex-col gap-8">
      <header class=" min-h-12 flex items-center gap-4 py-2 px-9 border-b border-b-gray-200">
        <img src="/images/Logo.svg" alt="Eatopia" class="w-6 aspect-square" />
        <h4 class="text-lg font-medium">Eatopia</h4>
      </header>

      <nav class="flex flex-col gap-2 px-4">
        <NavItem v-for="item in navItems" :key="item.routeName" :route-name="item.routeName" :label="item.label">
          <template #icon v-if="item.icon">
            <i :class="item.icon" class="text-lg ml-1"></i>
          </template>
          <template #image v-if="item.image">
            <img :src="item.image" alt="Profile" class="w-6 aspect-square rounded-full" />
          </template>
        </NavItem>
      </nav>
    </div>

    <footer class="flex flex-col gap-4 py-8 px-4 w-11/12 mx-auto">
      <div class="flex items-center gap-4 text-gray-400">
        <p class="text-sm font-medium">Help</p>
        <p class="text-sm font-medium">Legal</p>
        <p class="text-sm font-medium">FAQs</p>
      </div>

      <p class="text-sm text-gray-600">© domain80 2025</p>
    </footer>
  </aside>
</template>
