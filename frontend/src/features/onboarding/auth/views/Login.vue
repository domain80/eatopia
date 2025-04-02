<script setup lang="ts">
import { Form, FormField } from '@primevue/forms';
import AuthLayout from '../components/Auth.layout.vue';
import { useRegistration } from '../components/registration.composable';
import router from '@/router';
import { Button, InputText, Password } from 'primevue';

const { resolver, handleSubmit, isLoading } = useRegistration();

const handleRegister = () => {
  router.push({ name: 'register' })
}

const handleLogin = async () => {
  router.push('/dashboard/home')
}

</script>

<template>
  <AuthLayout>
    <main class="grid gap-6 w-full items-center sm:col-span-5 max-w-lg">
      <header class="grid gap-1">
        <h1 class="text-3xl font-bold">Login</h1>
        <p>Don't have an account? <RouterLink :to="{ name: 'register' }" class="kont-bold text-teal-800 cursor-pointer">
            register
          </RouterLink>
        </p>
      </header>

      <Form v-slot="$form" :resolver @submit="handleLogin" validate-on-blur :validate-on-value-update="false"
        :validate-on-submit="true" class="w-full grid sm:grid-cols-2 gap-6">
        <FormField class="flex flex-col gap-1 col-span-2">
          <label for="email">Email</label>
          <InputText id="email" name="email" type="email" placeholder="joe@example.com" class="max-w-full"
            data-testid="email-input" aria-label="Email" />
          <Message v-if="$form.email?.invalid" severity="error" size="small" variant="simple" data-testid="email-error">
            {{
              $form.email.error.message }}</Message>
        </FormField>
        <FormField class="flex flex-col gap-1 col-span-2">
          <label for="password">Password</label>
          <Password id="password" name="password" placeholder="1234@Pass_word_be_secure" fluid toggleMask
            :feedback="false" data-testid="password-input" aria-label="Password" />
          <Message v-if="$form.password?.invalid" severity="error" size="small" variant="simple"
            data-testid="password-error">{{
              $form.password.error.message }}</Message>
        </FormField>

        <Button type="submit" class="sm:col-span-2 py-3 mt-8 w-full" data-testid="submit-button" :loading="isLoading"
          icon="pi pi-search">
          Login
        </Button>
      </Form>
    </main>
  </AuthLayout>
</template>