export interface MedicalCondition {
  name: string
  summary: string
}

export interface WorkExperience {
  title: string
  where: string
  startDate: Date | null
  endDate: Date | null
  currentlyWork: boolean
  jobSummary: string
}

export interface ProfileSetupData {
  userAccountId: string
  title: string
  jobTitle: string
  interests: string // Changed to string as backend expects a single string
  about: string
  imageData: string
  medicalInfo?: MedicalCondition[]
  workExperiences?: WorkExperience[]
}

// Type guard to check if user is a professional (has work experiences)
export function isProfessional(profile: ProfileSetupData): boolean {
  return !!profile.workExperiences && profile.workExperiences.length > 0
}

// Type guard to check if user is a patient (has medical info)
export function isPatient(profile: ProfileSetupData): boolean {
  return !!profile.medicalInfo && profile.medicalInfo.length > 0
}
