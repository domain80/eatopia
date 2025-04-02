import router from '@/router'
import { ApiResponse } from '@/shared/models/apiResponse.model'
import type { ProfileSetupData } from '@/shared/models/ProfileSetup.model'
import type { UserAccount } from '@/shared/models/userAccount.model'
import { useAuthStore } from '@/shared/stores/auth.store'
import axios, { AxiosError } from 'axios'
import { jwtDecode } from 'jwt-decode'
import type { ToastServiceMethods } from 'primevue'
import type { JwtCustomPayload } from '../features/onboarding/auth/dto/jwt.dto'
import type { RegistrationDto } from '../features/onboarding/auth/dto/registration.dto'
import type { TokenResponseDto } from '../features/onboarding/auth/dto/tokenResponse.dto'
import { ApiError } from '@/shared/models/apiError.model'
import { UserAccountDto } from '@/features/onboarding/auth/dto/userAccount.dto'
import { Mapper } from '@/shared/utils/mapper'

interface SearchParams {
  query?: string
  role?: string
  createdAfter?: Date
  createdBefore?: Date
  page?: number
  size?: number
  sortBy?: string
  direction?: 'asc' | 'desc'
}

interface PageResponse<T> {
  content: T[]
  pageable: {
    pageNumber: number
    pageSize: number
    sort: {
      empty: boolean
      sorted: boolean
      unsorted: boolean
    }
    offset: number
    paged: boolean
    unpaged: boolean
  }
  last: boolean
  totalElements: number
  totalPages: number
  first: boolean
  size: number
  number: number
  sort: {
    empty: boolean
    sorted: boolean
    unsorted: boolean
  }
  numberOfElements: number
  empty: boolean
}

interface SearchApiResponse<T> {
  statusCode: number
  message: string | null
  body: T
  error: any | null
}

export class OnboardingService {
  private static instance: OnboardingService
  private readonly baseUrl: string
  private toast: ToastServiceMethods
  // todo: use an auth interceptor to handle the token refresh and token injection
  // todo: include refresh token in the token response

  private constructor(toast: ToastServiceMethods) {
    this.baseUrl = import.meta.env.VITE_EATOPIA_BACKEND || ''
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

  public async getAccessToken(): Promise<TokenResponseDto | null> {
    return null
    if (useAuthStore().isAuthenticated) {
      return {
        access_token: useAuthStore().getAccessToken!,
        token_type: 'Bearer',
        expires_in: useAuthStore().expiryTimestamp!,
        refresh_token: null,
      }
    }
    try {
      const response = await axios.postForm(
        `${this.baseUrl}/oauth2/token`,
        {
          grant_type: 'client_credentials',
          scope: import.meta.env.VITE_CLIENT_SCOPE,
        },
        {
          headers: {
            Authorization: `Basic ${btoa(`${import.meta.env.VITE_CLIENT_ID}:${import.meta.env.VITE_CLIENT_SECRET}`)}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      )

      const apiResponse = ApiResponse.fromResponse<TokenResponseDto>({
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
        // authStore.setAccessToken({
        //   // token: apiResponse.body.access_token,
        //   // refreshToken: apiResponse.body.refresh_token || '',
        //   // expiresIn: apiResponse.body.expires_in,
        // })
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

  public async register(data: RegistrationDto): Promise<UserAccount | null> {
    return null
    try {
      // Ensure we have an access token
      const tokenResponse = await this.getAccessToken()
      if (!tokenResponse) {
        throw new Error('Failed to get access token')
      }

      const response = await axios.post(`${this.baseUrl}/api/auth/register`, data, {
        headers: {
          // Authorization: `Bearer ${tokenResponse.access_token}`,
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
      }

      throw error
    }
  }

  private generateCodeVerifier(): string {
    // Generate random bytes
    const array = new Uint8Array(32)
    crypto.getRandomValues(array)

    // Convert to base64url without padding
    return btoa(String.fromCharCode.apply(null, [...array]))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '')
  }

  private async generateCodeChallenge(codeVerifier: string): Promise<string> {
    // Convert string to bytes
    const encoder = new TextEncoder()
    const data = encoder.encode(codeVerifier)

    // Hash using SHA-256
    const hash = await crypto.subtle.digest('SHA-256', data)

    // Convert to base64url without padding
    return btoa(String.fromCharCode.apply(null, [...new Uint8Array(hash)]))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '')
  }

  public async login(): Promise<UserAccount | null> {
    return null
    const codeVerifier = this.generateCodeVerifier()
    const codeChallenge = await this.generateCodeChallenge(codeVerifier)

    // Encrypt values before storing
    // Import key from environment variable
    const keyData = Uint8Array.from(atob(import.meta.env.VITE_ENCRYPTION_KEY), (c) =>
      c.charCodeAt(0),
    )
    const key = await crypto.subtle.importKey('raw', keyData, 'AES-GCM', false, ['encrypt'])

    // Generate Initialization Vectors (IVs) - random values used to ensure
    // that encrypted data remains unique even when encrypting the same input multiple times
    const verifierIv = crypto.getRandomValues(new Uint8Array(12))
    const challengeIv = crypto.getRandomValues(new Uint8Array(12))

    // Store IVs in localStorage
    localStorage.setItem('code_verifier_iv', btoa(String.fromCharCode(...verifierIv)))
    localStorage.setItem('code_challenge_iv', btoa(String.fromCharCode(...challengeIv)))

    const encryptedVerifier = await crypto.subtle.encrypt(
      { name: 'AES-GCM', iv: verifierIv },
      key,
      new TextEncoder().encode(codeVerifier),
    )

    const encryptedChallenge = await crypto.subtle.encrypt(
      { name: 'AES-GCM', iv: challengeIv },
      key,
      new TextEncoder().encode(codeChallenge),
    )

    // Store encrypted values
    localStorage.setItem(
      'code_verifier',
      btoa(String.fromCharCode(...new Uint8Array(encryptedVerifier))),
    )
    localStorage.setItem(
      'code_challenge',
      btoa(String.fromCharCode(...new Uint8Array(encryptedChallenge))),
    )

    const params = new URLSearchParams({
      response_type: 'code',
      client_id: import.meta.env.VITE_CLIENT_ID,
      scope: import.meta.env.VITE_CLIENT_SCOPE,
      redirect_uri: import.meta.env.VITE_REDIRECT_URI,
      code_challenge: codeChallenge,
      code_challenge_method: 'S256',
    })
    window.location.href = `${this.baseUrl}/oauth2/authorize?${params.toString()}`
    return null
  }

  public async logout() {
    return null
    const authStore = useAuthStore()
    authStore.clearTokens()

    const codeVerifier = this.generateCodeVerifier()
    const codeChallenge = await this.generateCodeChallenge(codeVerifier)

    // Encrypt values before storing
    // Import key from environment variable
    const keyData = Uint8Array.from(atob(import.meta.env.VITE_ENCRYPTION_KEY), (c) =>
      c.charCodeAt(0),
    )
    const key = await crypto.subtle.importKey('raw', keyData, 'AES-GCM', false, ['encrypt'])

    // Generate Initialization Vectors (IVs) - random values used to ensure
    // that encrypted data remains unique even when encrypting the same input multiple times
    const verifierIv = crypto.getRandomValues(new Uint8Array(12))
    const challengeIv = crypto.getRandomValues(new Uint8Array(12))

    // Store IVs in localStorage
    localStorage.setItem('code_verifier_iv', btoa(String.fromCharCode(...verifierIv)))
    localStorage.setItem('code_challenge_iv', btoa(String.fromCharCode(...challengeIv)))

    const encryptedVerifier = await crypto.subtle.encrypt(
      { name: 'AES-GCM', iv: verifierIv },
      key,
      new TextEncoder().encode(codeVerifier),
    )

    const encryptedChallenge = await crypto.subtle.encrypt(
      { name: 'AES-GCM', iv: challengeIv },
      key,
      new TextEncoder().encode(codeChallenge),
    )

    // Store encrypted values
    localStorage.setItem(
      'code_verifier',
      btoa(String.fromCharCode(...new Uint8Array(encryptedVerifier))),
    )
    localStorage.setItem(
      'code_challenge',
      btoa(String.fromCharCode(...new Uint8Array(encryptedChallenge))),
    )

    const params = new URLSearchParams({
      response_type: 'code',
      client_id: import.meta.env.VITE_CLIENT_ID,
      scope: import.meta.env.VITE_CLIENT_SCOPE,
      redirect_uri: 'http://localhost:5173',
      code_challenge: codeChallenge,
      code_challenge_method: 'S256',
    })

    window.location.href = `${this.baseUrl}/logout?${params.toString()}`
  }

  public async handleAuthorizationCode(code: string): Promise<UserAccount | null> {
    try {
      // Import key from environment variable for decryption
      const keyData = Uint8Array.from(atob(import.meta.env.VITE_ENCRYPTION_KEY), (c) =>
        c.charCodeAt(0),
      )
      const key = await crypto.subtle.importKey('raw', keyData, 'AES-GCM', false, ['decrypt'])

      // Get encrypted code verifier from localStorage
      const encryptedVerifier = localStorage.getItem('code_verifier') || ''
      const verifierIv = localStorage.getItem('code_verifier_iv') || ''

      // Decrypt the code verifier
      const decryptedVerifier = await crypto.subtle.decrypt(
        { name: 'AES-GCM', iv: Uint8Array.from(atob(verifierIv), (c) => c.charCodeAt(0)) },
        key,
        Uint8Array.from(atob(encryptedVerifier), (c) => c.charCodeAt(0)),
      )

      const codeVerifier = new TextDecoder().decode(decryptedVerifier)

      const data = {
        client_id: import.meta.env.VITE_CLIENT_ID,
        redirect_uri: import.meta.env.VITE_REDIRECT_URI,
        grant_type: 'authorization_code',
        code: code,
        code_verifier: codeVerifier,
      }

      const response = await axios.postForm(`${this.baseUrl}/oauth2/token`, data, {
        headers: {
          Authorization: `Basic ${btoa(`${import.meta.env.VITE_CLIENT_ID}:${import.meta.env.VITE_CLIENT_SECRET}`)}`,
        },
      })

      const apiResponse = ApiResponse.fromResponse<TokenResponseDto>({
        statusCode: 200,
        message: 'Authorization successful',
        body: {
          access_token: response.data.access_token,
          token_type: response.data.token_type,
          expires_in: response.data.expires_in,
          refresh_token: response.data.refresh_token,
        },
      })

      if (apiResponse.isSuccess() && apiResponse.body) {
        const authStore = useAuthStore()
        authStore.setAccessToken({
          token: apiResponse.body.access_token,
          refreshToken: apiResponse.body.refresh_token || '',
          expiresIn: apiResponse.body.expires_in,
        })
        this.toast.add({
          severity: 'success',
          summary: 'Authorization successful',
          detail: "Let's set up your profile",
          life: 6000,
        })

        // only go to profile if isNewUser in jwtClaim of access token is true
        const jwtClaim = jwtDecode<JwtCustomPayload>(apiResponse.body.access_token)
        if (jwtClaim && jwtClaim.isNewUser) {
          router.replace({ name: 'profile-setup' })
          return null
        }
        router.replace({ name: 'profile' })

        //todo: get user profile and save in auth store

        return null
      }

      return null
    } catch (error) {
      if (error instanceof AxiosError) {
        this.toast.add({
          severity: 'error',
          summary: 'Authorization failed',
          detail: error.response?.data.error?.message || 'Failed to exchange authorization code',
          life: 6000,
        })
      } else {
        this.toast.add({
          severity: 'error',
          summary: 'Authorization failed',
          detail: 'An unexpected error occurred',
          life: 6000,
        })
      }
      return null
    }
  }

  public async submitProfileSetup(profileData: ProfileSetupData) {
    console.log({ profileData })
    try {
      const response = await axios.put(`${this.baseUrl}/api/auth/setup-profile`, profileData, {
        headers: {
          Authorization: `Bearer ${useAuthStore().getAccessToken}`,
        },
      })
      this.toast.add({
        severity: 'success',
        summary: 'Profile setup successful',
        detail: 'Profile setup successful',
        life: 6000,
      })
      return Mapper.map(response.data.body, UserAccountDto)
    } catch (error) {
      this.toast.add({
        severity: 'error',
        summary: 'Profile setup failed',
        detail: 'Failed to setup profile',
        life: 6000,
      })
      console.error(error)

      if (error instanceof AxiosError) {
        throw new ApiError(
          error.response?.data?.message || 'Failed to setup profile',
          error.response?.status || 500,
          error.response?.data?.errors || [],
        )
      }
      throw error
    }
  }

  public async getWhoami(): Promise<UserAccountDto | null> {
    try {
      const response = await axios.get(`${this.baseUrl}/api/auth/whoami`, {
        headers: {
          Authorization: `Bearer ${useAuthStore().getAccessToken}`,
        },
      })
      console.log({ response })
      return Mapper.map(response.data.body, UserAccountDto)
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new ApiError(
          error.response?.data?.message || 'Failed to get user profile',
          error.response?.status || 500,
          error.response?.data?.errors || [],
        )
      }
      throw error
    }
  }

  public async searchUsers(params: SearchParams): Promise<PageResponse<UserAccountDto>> {
    try {
      const response = await axios.get<SearchApiResponse<PageResponse<any>>>(
        `${this.baseUrl}/api/auth/search`,
        {
          params: {
            query: params.query,
            role: params.role,
            createdAfter: params.createdAfter?.toISOString(),
            createdBefore: params.createdBefore?.toISOString(),
            page: params.page || 0,
            size: params.size || 10,
            sortBy: params.sortBy || 'firstName',
            direction: params.direction || 'asc',
          },
          headers: {
            Authorization: `Bearer ${useAuthStore().getAccessToken}`,
          },
        },
      )

      if (!response.data.body) {
        throw new Error('No response body received')
      }

      return {
        ...response.data.body,
        content: response.data.body.content.map((item: any) => Mapper.map(item, UserAccountDto)),
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new ApiError(
          error.response?.data?.message || 'Failed to search users',
          error.response?.status || 500,
          error.response?.data?.errors || [],
        )
      }
      throw error
    }
  }
}
