import { defineStore } from 'pinia'
import { useLocalStorage, type RemovableRef } from '@vueuse/core'

interface AuthState {
  accessToken: RemovableRef<string | null>
  refreshToken: RemovableRef<string | null>
  expiryTimestamp: RemovableRef<number | null>
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    accessToken: useLocalStorage('pinia/auth/accessToken', null),
    refreshToken: useLocalStorage('pinia/auth/refreshToken', null),
    expiryTimestamp: useLocalStorage('pinia/auth/expiryTimestamp', null),
  }),

  getters: {
    getAccessToken: (state) => state.accessToken,
    isAuthenticated: (state) =>
      !!state.accessToken && state.expiryTimestamp && state.expiryTimestamp > Date.now(),
  },

  actions: {
    setAccessToken({
      token,
      refreshToken,
      expiresIn,
    }: {
      token: string
      refreshToken: string
      expiresIn: number
    }) {
      this.accessToken = token
      this.refreshToken = refreshToken
      this.expiryTimestamp = Date.now() + expiresIn * 1000
    },

    clearTokens() {
      this.accessToken = null
      this.refreshToken = null
      this.expiryTimestamp = null
    },
  },
})
