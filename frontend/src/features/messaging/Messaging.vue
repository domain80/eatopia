<script setup lang="ts">
import PageHeaderShared from '@/shared/components/PageHeader.shared.vue';
import ChatUserComponent from './components/chatUser.component.vue';
import ChatBubbleComponent from './components/ChatBubble.component.vue';
import { Button, InputGroup, InputGroupAddon, InputText, Textarea } from 'primevue';
import UserChatBubble from './components/UserChatBubble.component.vue'
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
            <UserChatBubble username="Shanay cruz">
              <template #chats>
                <ChatBubbleComponent content="Guts, I need a review of work. Are you ready?" />
                <ChatBubbleComponent content="Guts, I need a review of work. Are you ready?" timestamp="05:14 PM" />
              </template>
            </UserChatBubble>

            <UserChatBubble username="Shanay cruz" isYou>
              <template #chats>
                <ChatBubbleComponent content="Guts, I need a review of work. Are you ready?" isYou />
                <ChatBubbleComponent content="Guts, I need a review of work. Are you ready?" timestamp="05:14 PM"
                  isYou />
              </template>
            </UserChatBubble>
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
