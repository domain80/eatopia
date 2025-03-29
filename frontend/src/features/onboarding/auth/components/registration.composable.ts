import { z } from 'zod'
import { zodResolver } from '@primevue/forms/resolvers/zod'
import type { FormSubmitEvent } from '@primevue/forms'
import { OnboardingService } from '../../../../services/onboarding.service'
import type { RegistrationDto } from '../dto/registration.dto'
import { ref } from 'vue'
import { useToast } from 'primevue/usetoast'
import { AxiosError } from 'axios'

const isLoading = ref(false)

const registrationSchema = z
  .object({
    firstName: z
      .string({ message: 'First name required' })
      .min(2, 'First name too short')
      .max(50, 'First name too long')
      .regex(/^[a-zA-Z\s-']+$/, 'Invalid first name'),
    lastName: z
      .string({ message: 'Last name required' })
      .min(2, 'Last name too short')
      .max(50, 'Last name too long')
      .regex(/^[a-zA-Z\s-']+$/, 'Invalid last name'),
    email: z
      .string({ message: 'Email required' })
      .min(1, 'Email required')
      .email('Invalid email')
      .max(100, 'Email is too long'),
    phoneNumber: z
      .string({ message: 'Phone number required' })
      .min(10, 'Invalid phone number')
      .regex(/^\(\d{3}\)\s\d{2}-\d{3}-\d{4}$/, 'Invalid phone number format'),
    password: z
      .string({ message: 'Password is required' })
      .min(8, 'At least 8 characters')
      .regex(/[A-Z]/, 'Needs an uppercase letter')
      .regex(/[a-z]/, 'Needs a lowercase letter')
      .regex(/[0-9]/, 'Needs a number')
      .regex(/[^A-Za-z0-9]/, 'Needs a special character (!@#$%^&*)')
      .max(100, 'Password is too long'),
    confirmPassword: z
      .string({ message: 'Confirm password is required' })
      .min(1, 'Please confirm password'),
    role: z.enum(['professional', 'patient'], {
      required_error: 'Select a role',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })

export const useRegistration = () => {
  const toast = useToast()

  const handleSubmit = async (e: FormSubmitEvent): Promise<void> => {
    const onboardingService = OnboardingService.getInstance()
    if (!e.valid) {
      return
    }

    try {
      isLoading.value = true
      const formData = e.values as RegistrationDto
      await onboardingService.register(formData)
      await onboardingService.login()
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.add({
          severity: 'error',
          summary: 'User registration failed',
          detail: error.response?.data?.error?.message ?? error.message,
          life: 6000,
        })
      } else {
        toast.add({
          severity: 'error',
          summary: 'User registration failed',
          detail: 'Please try again later',
          life: 6000,
        })
      }
    } finally {
      isLoading.value = false
    }
  }

  return {
    resolver: zodResolver(registrationSchema),
    handleSubmit,
    isLoading,
  }
}
