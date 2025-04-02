<script setup lang="ts">
import PageHeaderShared from '@/shared/components/PageHeader.shared.vue';
import ChatUserComponent from './components/chatUser.component.vue';
import ChatBubbleComponent from './components/ChatBubble.component.vue';
import { Button, InputGroup, InputGroupAddon, InputText, Textarea } from 'primevue';
import UserChatBubble from './components/UserChatBubble.component.vue'
import { ref } from 'vue';

const messages = ref([
  {
    id: 1,
    content: "Hi Dr. Doe, I've been experiencing severe headaches for the past week, especially in the morning. Should I be concerned?",
    username: 'Shayna Cruz',
    timestamp: '2023-01-01 12:00:00',
    isYou: false
  },
  {
    id: 2,
    content: 'Hello Shayna, I understand your concern. Could you tell me if you notice any specific triggers for these headaches? Also, are they accompanied by any other symptoms like nausea or sensitivity to light?',
    username: 'Dr. John Doe',
    timestamp: '2023-01-01 12:01:00',
    isYou: true
  },
  {
    id: 3,
    content: 'Yes, I do feel nauseous sometimes and bright lights make it worse. I also noticed they tend to happen more when I haven\'t had enough sleep.',
    username: 'Shayna Cruz',
    timestamp: '2023-01-01 12:02:00',
    isYou: false
  },
  {
    id: 4,
    content: 'Based on what you\'re describing, these could be migraine headaches. I\'d like you to come in for an examination this week. In the meantime, try to maintain a regular sleep schedule and keep track of when the headaches occur. Can you come in tomorrow at 2 PM?',
    username: 'Dr. John Doe',
    timestamp: '2023-01-01 12:03:00',
    isYou: true
  },
  {
    id: 5,
    content: 'Yes, I can make it tomorrow at 2 PM. Thank you, Doctor.',
    username: 'Shayna Cruz',
    timestamp: '2023-01-01 12:04:00',
    isYou: false
  }
]);



</script>

<template>

  <main class="bg-white/20 flex flex-col h-screen">

    <PageHeaderShared>
      <h1 class="text-lg font-medium">Messages</h1>
    </PageHeaderShared>

    <div class=" grid grid-cols-5 divide-x-1 divide-gray-200 -mt-8 h-full flex-1 ">

      <section class="col-span-1  h-full *:pl-20">
        <ChatUserComponent />
        <ChatUserComponent />
        <ChatUserComponent />
      </section>

      <section class="col-span-3 flex flex-col justify-between pb-12">

        <div class="w-full px-12 mt-12 ">
          <div class=" ">
            <UserChatBubble v-for="message in messages" :username="message.username" :isYou="message.isYou">
              <template #chats>
                <ChatBubbleComponent :content="message.content" :timestamp="message.timestamp" :isYou="message.isYou" />
              </template>
            </UserChatBubble>

            <!-- <UserChatBubble username="Shanay cruz" isYou>
              <template #chats>
                <ChatBubbleComponent content="Guts, I need a review of work. Are you ready?" isYou />
                <ChatBubbleComponent content="Guts, I need a review of work. Are you ready?" timestamp="05:14 PM"
                  isYou />
              </template>
            </UserChatBubble> -->
          </div>
        </div>

        <InputGroup class="w-10/12  mx-auto mt-auto">

          <Textarea placeholder="Start typing here" class="w-full h-max max-h-24" rows="1" autoResize />
          <InputGroupAddon class="h-full">
            <Button icon="pi pi-send" class="h-full" severity="primary" variant="filled" />
          </InputGroupAddon>
        </InputGroup>
      </section>

    </div>

  </main>
</template>


<style scoped>
.h-screen {
  height: 100vh;
}
</style>
