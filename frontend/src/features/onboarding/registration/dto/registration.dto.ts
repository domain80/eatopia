export class RegistrationFormData {
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  password: string
  confirmPassword: string
  role: 'professional' | 'user'

  constructor(
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    password: string,
    confirmPassword: string,
    role: 'professional' | 'user',
  ) {
    this.firstName = firstName
    this.lastName = lastName
    this.email = email
    this.phoneNumber = phoneNumber
    this.password = password
    this.confirmPassword = confirmPassword
    this.role = role
  }
}
