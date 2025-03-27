export class UserAccount {
  private id: string
  private firstName: string
  private lastName: string
  private email: string
  private password: string
  private phoneNumber: string
  private role: string

  constructor(
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    phoneNumber: string,
    role: string,
  ) {
    this.id = id
    this.firstName = firstName
    this.lastName = lastName
    this.email = email
    this.password = password
    this.phoneNumber = phoneNumber
    this.role = role
  }
}
