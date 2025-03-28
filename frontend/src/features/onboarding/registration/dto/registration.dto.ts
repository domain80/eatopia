export interface RegistrationDto {
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  password: string
  confirmPassword: string
  role: 'professional' | 'user'
}
