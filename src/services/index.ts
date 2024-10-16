// USED: khi 1 api call bị lỗi, dừng call và nạp các api lỗi vào Queue, sau đó gọi refresh-token để get new token, re-run apis trong queue bằng new token
// Another solution: mỗi khi call api, nếu expired_date (check trong jwt) gần đến quá hạn hoặc đã quá hạn (ví dụ: 1h), làm tương tự như trên

import axios from 'axios'

import LocalStorageKeys from '@/constants/local-storage-keys'
import { clearToken, getToken } from '@/lib/auth'
import { ApiStatuses } from '@/types/api-statuses'

import ENDPOINTS from './end-points'

const config = {
  baseURL: ENDPOINTS.BASE_URL,
  validateStatus: (status: number) => status >= 200 && status < 400,
  timeout: 60000,
}

let isRefreshing = false
let failedQueue: ((token: string) => Promise<any> | void)[] = []

// EX: Push callback to failedQueue for retry request
function addFailedQueue(cb: (token: string) => Promise<any> | void) {
  failedQueue.push(cb)
}

function processFailedQueue(token: string) {
  failedQueue.map((cb) => cb(token))
  failedQueue = []
}

function reloadApp() {
  clearToken()

  isRefreshing = false
  failedQueue = []
  // force reload app, reset all state
  // window.location.reload();
  // window.location.replace(${LOCATION.SIGN_IN}?redirect=${window.history.state.as});
}

const axiosClient = axios.create(config)

const createAuthToken = (token: string) => `Bearer ${token}`

export function setAppAccessToken(token: string) {
  axiosClient.defaults.headers.Authorization = createAuthToken(token)
}

axiosClient.interceptors.request.use((requestConfig) => {
  const token = getToken()

  if (token) {
    setAppAccessToken(token)
  }

  const modifiedConfig = { ...requestConfig }

  if (modifiedConfig.data instanceof FormData) {
    delete modifiedConfig.headers['Content-Type']
  }

  return modifiedConfig
})

axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { config: originalRequest, response } = error

    // EX: Handle 401 error
    if (response?.status === ApiStatuses.UNAUTHORIZED) {
      const refreshToken = localStorage.getItem(LocalStorageKeys.RefreshToken)

      // EX: Check if token is expired
      if (!refreshToken) {
        reloadApp()
        return Promise.reject(error)
      }

      // EX: Check if token is refreshing
      if (!isRefreshing) {
        isRefreshing = true

        try {
          const refreshResponse = await axios({
            ...config,
            method: 'post',
            url: ENDPOINTS.REFRESH_TOKEN,
            data: { token: refreshToken },
          })

          const newAccessToken = refreshResponse.data.payload

          if (newAccessToken) {
            localStorage.setItem(LocalStorageKeys.Token, newAccessToken)
          }

          isRefreshing = false

          setAppAccessToken(newAccessToken)

          // EX: Add callback to failedQueue for retry request and process it
          return await new Promise((resolve) => {
            addFailedQueue((newToken: string) => {
              originalRequest.headers.Authorization = createAuthToken(newToken)

              resolve(axiosClient(originalRequest))
            })

            processFailedQueue(newAccessToken)
          })
        } catch (_e) {
          reloadApp()
          return Promise.reject(error)
        }
      }

      // EX: ONLY add callback to failedQueue for retry request
      return new Promise((resolve) => {
        addFailedQueue((newToken: string) => {
          originalRequest.headers.Authorization = createAuthToken(newToken)

          resolve(axiosClient(originalRequest))
        })
      })
    }

    // EX: Handle other error
    return Promise.reject(error)
  },
)

export default axiosClient
