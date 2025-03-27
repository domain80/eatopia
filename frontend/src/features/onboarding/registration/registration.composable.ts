import { z } from 'zod'
import { zodResolver } from '@primevue/forms/resolvers/zod'
import type { FormSubmitEvent } from '@primevue/forms'
import { OnboardingService } from '../onboarding.service'
import type { RegistrationFormData } from './dto/registration.dto'

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
    role: z.enum(['professional', 'user'], {
      required_error: 'Select a role',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })

const handleSubmit = async (e: FormSubmitEvent): Promise<void> => {
  const onboardingService = OnboardingService.getInstance()
  if (!e.valid) {
    return
  }

  const formData = e.values as RegistrationFormData
  const response = await onboardingService.register(formData)
  console.log({ response })

  // if (response != null) {
  //   router.push('/login')
  // }
}

export const useRegistration = () => {
  return {
    resolver: zodResolver(registrationSchema),
    handleSubmit,
  }
}
