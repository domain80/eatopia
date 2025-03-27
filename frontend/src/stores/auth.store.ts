import { defineStore } from 'pinia'

interface AuthState {
  accessToken: string | null
  expiryTimestamp: number | null
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    accessToken: null,
    expiryTimestamp: null,
  }),

  getters: {
    getAccessToken: (state) => state.accessToken,
    isAuthenticated: (state) =>
      !!state.accessToken && state.expiryTimestamp && state.expiryTimestamp > Date.now(),
  },

  actions: {
    setAccessToken(token: string, expiresIn: number) {
      this.accessToken = token
      this.expiryTimestamp = Date.now() + expiresIn * 1000
    },

    clearAccessToken() {
      this.accessToken = null
      this.expiryTimestamp = null
    },
  },
})
