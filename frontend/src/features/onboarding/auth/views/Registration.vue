<script setup lang="ts">

document.title = 'Eatopia | Register'

import { Form, FormField } from '@primevue/forms';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import RadioButton from 'primevue/radiobutton';
import InputMask from 'primevue/inputmask';
import Message from 'primevue/message';

import { useRegistration } from '../components/registration.composable';
import AuthLayout from '../components/Auth.layout.vue';
import { OnboardingService } from '@/services/onboarding.service';
import router from '@/router';
import { RouterLink } from 'vue-router';

const { resolver, handleSubmit, isLoading } = useRegistration();
const onboardingService = OnboardingService.getInstance()

const handleLogin = async () => {
  await onboardingService.login()
  router.push('/login')
}

</script>

<template>
  <AuthLayout>
    <main class="grid gap-6 w-full items-center sm:col-span-5 max-w-xl">
      <header class="grid gap-1">
        <h1 class="text-3xl font-bold">Register</h1>
        <p>
          Already have an account?
          <RouterLink :to="{ name: 'login' }" class="font-bold text-teal-800 cursor-pointer">sign in</RouterLink>
        </p>
      </header>

      <Form v-slot="$form" :resolver @submit="handleSubmit" validate-on-blur :validate-on-value-update="false"
        :validate-on-submit="true" class="w-full grid sm:grid-cols-2 gap-6">
        <FormField class="flex flex-col gap-1">
          <label for="firstName">First Name</label>
          <InputText id="firstName" name="firstName" type="text" placeholder="Joe" class="max-w-full"
            data-testid="firstName-input" aria-label="First Name" />
          <Message v-if="$form.firstName?.invalid" severity="error" size="small" variant="simple"
            data-testid="firstName-error">{{
              $form.firstName.error.message }}</Message>
        </FormField>
        <FormField class="flex flex-col gap-1">
          <label for="lastName">Last Name</label>
          <InputText id="lastName" name="lastName" type="text" placeholder="Doe" class="max-w-full"
            data-testid="lastName-input" aria-label="Last Name" />
          <Message v-if="$form.lastName?.invalid" severity="error" size="small" variant="simple"
            data-testid="lastName-error">{{
              $form.lastName.error.message }}</Message>
        </FormField>

        <FormField class="flex flex-col gap-1">
          <label for="email">Email</label>
          <InputText id="email" name="email" type="email" placeholder="joe@example.com" class="max-w-full"
            data-testid="email-input" aria-label="Email" />
          <Message v-if="$form.email?.invalid" severity="error" size="small" variant="simple" data-testid="email-error">
            {{
              $form.email.error.message }}</Message>
        </FormField>
        <FormField class="flex flex-col gap-1">
          <label for="phoneNumber">Phone</label>
          <InputMask id="phoneNumber" name="phoneNumber" type="text" placeholder="(233) 999-999-999"
            mask="(233) 99-999-9999" fluid data-testid="phoneNumber-input" aria-label="Phone" />
          <Message v-if="$form.phoneNumber?.invalid" severity="error" size="small" variant="simple"
            data-testid="phoneNumber-error">
            {{
              $form.phoneNumber.error.message }}</Message>
        </FormField>

        <FormField class="flex flex-col gap-1">
          <label for="password">Password</label>
          <Password id="password" name="password" placeholder="1234@Pass_word_be_secure" fluid toggleMask
            :feedback="false" data-testid="password-input" aria-label="Password" />
          <Message v-if="$form.password?.invalid" severity="error" size="small" variant="simple"
            data-testid="password-error">{{
              $form.password.error.message }}</Message>
        </FormField>
        <FormField class="flex flex-col gap-1">
          <label for="confirmPassword">Confirm Password</label>
          <Password id="confirmPassword" name="confirmPassword" placeholder="1234@Pass_word_be_secure" fluid toggleMask
            :feedback="false" data-testid="confirmPassword-input" aria-label="Confirm Password" />
          <Message v-if="$form.confirmPassword?.invalid" severity="error" size="small" variant="simple"
            data-testid="confirmPassword-error">{{
              $form.confirmPassword.error.message }}</Message>
        </FormField>

        <div class="flex flex-col gap-1 grid-cols-2 w-full sm:col-span-2">
          <p class="col-span-2 font-medium">Role: I am a...</p>
          <div class="flex gap-6 w-full col-span-2 ">
            <FormField class="flex items-center gap-2 col-span-2 sm:w-full">
              <RadioButton inputId="professional" name="role" value="professional" data-testid="role-professional"
                aria-label="Health Professional" />
              <label for="professional">Health Professional</label>
            </FormField>
            <FormField class="flex items-center gap-2 col-span-1 sm:w-full">
              <RadioButton inputId="patient" name="role" value="patient" data-testid="role-patient"
                aria-label="Patient" />
              <label for="patient">Patient</label>
            </FormField>
          </div>
          <Message v-if="$form.role?.invalid" severity="error" size="small" variant="simple" data-testid="role-error">{{
            $form.role.error.message }}</Message>
        </div>
        <Button type="submit" class="sm:col-span-2 py-3 mt-8 w-full" data-testid="submit-button" :loading="isLoading"
          icon="pi pi-search">
          Register
        </Button>
      </Form>
    </main>
  </AuthLayout>


</template>