import axios, { AxiosError } from 'axios'
import { ApiResponse } from '@/shared/models/apiResponse.model'
import { useAuthStore } from '@/shared/stores/auth.store'
import type { UserAccount } from '@/shared/models/userAccount.model'
import type { ToastServiceMethods } from 'primevue'

interface RegistrationData {
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  password: string
  confirmPassword: string
  role: 'professional' | 'user'
}

interface TokenResponse {
  access_token: string
  token_type: string
  expires_in: number
}

export class OnboardingService {
  private static instance: OnboardingService
  private readonly baseUrl: string
  private toast: ToastServiceMethods

  private constructor(toast: ToastServiceMethods) {
    this.baseUrl = import.meta.env.VITE_WHOLISTIKA_BACKEND || ''
    this.toast = toast
  }

  public static instantiate(toast: ToastServiceMethods): OnboardingService {
    if (!OnboardingService.instance) {
      OnboardingService.instance = new OnboardingService(toast)
    }
    return OnboardingService.instance
  }

  public static getInstance(): OnboardingService {
    if (!OnboardingService.instance) {
      throw new Error('OnboardingService must be instantiated with toast first')
    }
    return OnboardingService.instance
  }

  public async getAccessToken(): Promise<TokenResponse | null> {
    if (useAuthStore().isAuthenticated) {
      return {
        access_token: useAuthStore().getAccessToken!,
        token_type: 'Bearer',
        expires_in: useAuthStore().expiryTimestamp!,
      }
    }
    try {
      const response = await axios.postForm(
        `${this.baseUrl}/oauth2/token`,
        {
          grant_type: 'client_credentials',
          scope: import.meta.env.VITE_SCOPE,
        },
        {
          headers: {
            Authorization: `Basic ${btoa(`${import.meta.env.VITE_CLIENT_ID}:${import.meta.env.VITE_CLIENT_SECRET}`)}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      )

      const apiResponse = ApiResponse.fromResponse<TokenResponse>({
        statusCode: 200,
        message: 'Token retrieved successfully',
        body: {
          access_token: response.data.access_token,
          token_type: response.data.token_type,
          expires_in: response.data.expires_in,
        },
      })

      if (apiResponse.isSuccess() && apiResponse.body) {
        const authStore = useAuthStore()
        authStore.setAccessToken(apiResponse.body.access_token, apiResponse.body.expires_in)
      }

      return apiResponse.body!
    } catch (error) {
      this.toast.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Failed to get access token',
        life: 6000,
      })
      return null
    }
  }

  public async register(data: RegistrationData): Promise<UserAccount | null> {
    try {
      // Ensure we have an access token
      const tokenResponse = await this.getAccessToken()
      if (!tokenResponse) {
        throw new Error('Failed to get access token')
      }

      const response = await axios.post(`${this.baseUrl}/api/auth/register`, data, {
        headers: {
          Authorization: `Bearer ${tokenResponse.access_token}`,
          'Content-Type': 'application/json',
        },
      })

      if (response.data.error != null) {
        this.toast.add({
          severity: 'error',
          summary: 'User registration failed',
          detail: response.data.error.message,
          life: 6000,
        })

        return null
      }

      this.toast.add({
        severity: 'success',
        summary: 'User registration successful',
        life: 6000,
      })

      console.log({ response })
      return response.data as UserAccount
    } catch (error) {
      if (error instanceof AxiosError) {
        this.toast.add({
          severity: 'error',
          summary: 'User registration failed',
          detail: error.response?.data.error.message,
          life: 6000,
        })
      } else {
        this.toast.add({
          severity: 'error',
          summary: 'User registration failed',
          detail: '',
          life: 6000,
        })
      }

      return null
    }
  }
}
