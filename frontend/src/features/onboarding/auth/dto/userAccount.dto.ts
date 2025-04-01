export interface IUserAccountDto {
  id: string
  email: string
  firstName: string
  lastName: string
  title?: string
  jobTitle?: string
  interests?: string
  about?: string
  imageData?: string
  createdAt?: Date
  updatedAt?: Date

  medicalInfo?: Array<{
    name: string
    summary: string
  }>
  workExperiences?: Array<{
    title: string
    where: string
    startDate: Date
    endDate?: Date
    currentlyWork: boolean
    jobSummary: string
  }>
}

export class UserAccountDto implements IUserAccountDto {
  id!: string
  email!: string
  firstName!: string
  lastName!: string
  title?: string
  jobTitle?: string
  interests?: string
  about?: string
  imageData?: string
  createdAt?: Date
  updatedAt?: Date

  medicalInfo?: Array<{
    name: string
    summary: string
  }>
  workExperiences?: Array<{
    title: string
    where: string
    startDate: Date
    endDate?: Date
    currentlyWork: boolean
    jobSummary: string
  }>
}
