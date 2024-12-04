import http from '@/lib/http'
import { LoginBodyType, LoginResType, RegisterBodyType } from '@/schemaValidations/auth.schema'

const authApiRequest = {
  login: (body: LoginBodyType) => http.post<LoginResType>('auth/login', body),
  register: (body: RegisterBodyType) => http.post<LoginBodyType>('auth/register', body),
  cLogin: (body: LoginBodyType) =>
    http.post<LoginResType>('http://localhost:3000/api/auth/login', body, {
      baseUrl: '',
    }),
  cRegister: (body: LoginBodyType) =>
    http.post<LoginResType>('http://localhost:3000/api/auth/register', body, {
      baseUrl: '',
    }),
}

export default authApiRequest
