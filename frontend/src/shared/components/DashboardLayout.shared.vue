<script setup lang="ts">
import SideNav from './SideNav.shared.vue';
import { RouterView } from 'vue-router';
</script>

<template>
  <div class="w-full min-h-screen flex">
    <SideNav />

    <main class="main-content w-11/12 ">
      <RouterView />
    </main>
  </div>
</template>