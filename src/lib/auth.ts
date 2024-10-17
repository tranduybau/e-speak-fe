import LocalStorageKeys from '@/constants/local-storage-keys'
import { authStoreActions } from '@/store/use-auth-store'

export function clearToken() {
  localStorage.removeItem(LocalStorageKeys.Token)
  localStorage.removeItem(LocalStorageKeys.RefreshToken)
  sessionStorage.removeItem(LocalStorageKeys.Token)
}

export function logout() {
  clearToken()

  authStoreActions.setUser(null)
}

export function setTokenToLS(token: string, refresh_token: string) {
  localStorage.setItem(LocalStorageKeys.Token, token)
  localStorage.setItem(LocalStorageKeys.RefreshToken, refresh_token)
}

export function setTokenToSS(token: string) {
  sessionStorage.setItem(LocalStorageKeys.Token, token)
}

export function getToken() {
  const tokenFromLS = localStorage.getItem(LocalStorageKeys.Token)
  const tokenFromSS = sessionStorage.getItem(LocalStorageKeys.Token)

  const token = tokenFromLS || tokenFromSS || ''
  return token
}
