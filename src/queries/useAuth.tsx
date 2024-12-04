import { useMutation } from '@tanstack/react-query'

import authApiRequest from '@/apiRequests/auth'

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: authApiRequest.cLogin,
  })
}

export const useRegisterMutation = () => {
  return useMutation({
    mutationFn: authApiRequest.cRegister,
  })
}
