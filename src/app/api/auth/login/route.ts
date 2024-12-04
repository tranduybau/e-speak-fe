import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'

import authApiRequest from '@/apiRequests/auth'
import { HttpError } from '@/lib/http'
import { LoginBodyType } from '@/schemaValidations/auth.schema'

export async function POST(request: Request) {
  const body = (await request.json()) as LoginBodyType
  const cookieStore = cookies()
  try {
    const response = await authApiRequest.login(body)
    const setCookieHeader = response.header.get('set-cookie')

    if (setCookieHeader) {
      const cookieList = setCookieHeader.split(',')

      let accessToken = ''
      let refreshToken = ''

      cookieList.forEach((cookie) => {
        const [key, value] = cookie.split('=')
        const token = value.split(';')[0].trim()

        if (key.trim() === 'access_token') {
          accessToken = token
        } else if (key.trim() === 'refresh_token') {
          refreshToken = token
        }
      })

      const decodeAsToken = jwt.decode(accessToken) as { exp: number }
      const decodeRfToken = jwt.decode(refreshToken) as { exp: number }

      cookieStore.set('access_token', accessToken, {
        path: '/',
        httpOnly: true,
        sameSite: 'lax',
        secure: true,
        expires: decodeAsToken.exp * 1000,
      })

      cookieStore.set('refresh_token', refreshToken, {
        path: '/',
        httpOnly: true,
        sameSite: 'lax',
        secure: true,
        expires: decodeRfToken.exp * 1000,
      })
    }

    return Response.json(response.payload)
  } catch (error) {
    if (error instanceof HttpError) {
      return Response.json(error.payload, {
        status: error.status,
      })
    }
    return Response.json(
      {
        message: 'Lỗi không xác định',
      },
      {
        status: 500,
      },
    )
  }
}
