<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Find the help or company you need</h1>
    <div class="mb-6">
      <input type="text" placeholder="search by name eg. Seth" class="w-full p-3 border rounded-lg"
        v-model="searchTerm" />
    </div>
    <div class="space-y-4">
      <div v-for="user in filteredUsers" :key="user.id" class="p-4 border rounded-lg flex items-center justify-between">
        <div class="flex items-center">
          <div class="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
          <div>
            <h2 class="font-bold">{{ user.name }}</h2>
            <p class="text-sm text-gray-500">{{ user.followers }} Followers</p>
            <p class="text-sm text-gray-700">{{ user.description }}</p>
          </div>
        </div>
        <div class="flex space-x-2">
          <button class="px-4 py-2 bg-gray-200 rounded-lg">Message</button>
          <button class="px-4 py-2 bg-blue-500 text-white rounded-lg">
            Follow
          </button>
        </div>
      </div>
    </div>
    <div class="mt-6 flex justify-center space-x-2">
      <button class="px-4 py-2 bg-gray-200 rounded-lg">« Previous</button>
      <button class="px-4 py-2 bg-blue-500 text-white rounded-lg">1</button>
      <button class="px-4 py-2 bg-gray-200 rounded-lg">2</button>
      <button class="px-4 py-2 bg-gray-200 rounded-lg">3</button>
      <button class="px-4 py-2 bg-gray-200 rounded-lg">Next »</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchTerm: "",
      users: [
        {
          id: 1,
          name: "Mr. Bob Barley",
          followers: 32,
          description:
            "I want to lose weight, eat better, and stay active, but I’ve struggled to find the...",
        },
        {
          id: 2,
          name: "Mr. Bob Barley",
          followers: 32,
          description:
            "I want to lose weight, eat better, and stay active, but I’ve struggled to find the...",
        },
        // Add more users as needed
      ],
    };
  },
  computed: {
    filteredUsers() {
      return this.users.filter((user) =>
        user.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    },
  },
};
</script>

<style scoped>
/* Add any additional styles here */
</style>