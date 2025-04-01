import { ref } from 'vue'
import { useAuthStore } from '@/shared/stores/auth.store'
import { jwtDecode } from 'jwt-decode'
import type { JwtCustomPayload } from '@/features/onboarding/auth/dto/jwt.dto'

export function useUserType() {
  const authStore = useAuthStore()
  const userType = ref('professional')

  const initializeUserType = () => {
    if (authStore.accessToken) {
      const decodedToken = jwtDecode<JwtCustomPayload>(authStore.accessToken)
      userType.value = decodedToken.roles?.includes('professional') ? 'professional' : 'patient'
    }
  }

  // Initialize on composable creation
  initializeUserType()

  return {
    userType,
  }
}
