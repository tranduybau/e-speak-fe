import { AxiosError } from 'axios'

import mergeData from '@/lib/merge-data-with-default'

import ENDPOINTS from '../end-points'
import axiosClient from '..'

const DEFAULT_API_RESPONSE = {}

const AuthServices = {
  handleSignIn(user: any): Promise<any> {
    return axiosClient
      .post<any>(ENDPOINTS.SIGN_IN, { user })
      .then((res) => res.data)
      .catch((error: AxiosError<any>) => {
        return mergeData(DEFAULT_API_RESPONSE, error.response?.data) as any
      })
  },
}

export default AuthServices
