import { mountStoreDevtool } from 'simple-zustand-devtools'
import { create } from 'zustand'

import { clearToken, getToken } from '@/lib/auth'

import { StoreNames } from './store-names'

interface AuthState {
  user: any | null
  token: string | null

  actions: {
    setUser: (user: any | null) => void
  }
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,

  actions: {
    setUser: (user) => {
      if (!user) {
        clearToken()
      }

      set({ user, token: getToken() })
    },
  },
}))

export const authStoreActions = useAuthStore.getState().actions

export const useAuthStoreGetter = (key: keyof AuthState) => useAuthStore((state) => state[key])

if (process.env.NODE_ENV === 'development') {
  mountStoreDevtool(StoreNames.AuthStore, useAuthStore)
}
