import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import type { ProfileSetupData } from '@/shared/models/ProfileSetup.model'
import { OnboardingService } from '@/services/onboarding.service'
import { useAuthStore } from '@/shared/stores/auth.store'
import { jwtDecode } from 'jwt-decode'
import type { JwtCustomPayload } from '@/features/onboarding/auth/dto/jwt.dto'
import { ApiError } from '@/shared/models/apiError.model'
import { useToast } from 'primevue/usetoast'

export function useProfileSetup() {
  const router = useRouter()
  const authStore = useAuthStore()

  // Get user ID from JWT token
  let userId = ''
  if (authStore.accessToken) {
    const decodedToken = jwtDecode<JwtCustomPayload>(authStore.accessToken)
    userId = decodedToken.sub || ''
  }

  const profileSetupData = reactive<ProfileSetupData>({
    userAccountId: userId,
    title: '',
    jobTitle: '',
    interests: '',
    about: '',
    imageData: '',
    medicalInfo: [],
    workExperiences: [],
  })

  const updateBasicProfile = (
    data: Pick<ProfileSetupData, 'title' | 'jobTitle' | 'interests' | 'about' | 'imageData'>,
  ) => {
    Object.assign(profileSetupData, data)
  }

  const updateProfessionalInfo = (workExperience: ProfileSetupData['workExperiences']) => {
    if (workExperience) {
      profileSetupData.workExperiences = workExperience
      profileSetupData.medicalInfo = []
    }
  }

  const updateMedicalInfo = (medicalInfo: ProfileSetupData['medicalInfo']) => {
    if (medicalInfo) {
      profileSetupData.medicalInfo = medicalInfo
      profileSetupData.workExperiences = []
    }
  }

  const handleSubmit = async () => {
    // await OnboardingService.getInstance().submitProfileSetup(profileSetupData)
    await router.push('/dashboard/profile')
  }

  const handleNavigation = (callback: Function, direction: 'prev' | 'next' | 'end') => {
    if (direction === 'next') {
      if (callback) {
        const nextStep = direction === 'next' ? '2' : '1'
        if (nextStep === '2') {
          callback('2')
        } else {
          handleSubmit()
        }
      }
    } else if (direction === 'end') {
      handleSubmit()
    } else {
      if (callback) {
        callback('1')
      }
    }
  }

  return {
    profileSetupData,
    updateBasicProfile,
    updateProfessionalInfo,
    updateMedicalInfo,
    handleSubmit,
    handleNavigation,
  }
}
