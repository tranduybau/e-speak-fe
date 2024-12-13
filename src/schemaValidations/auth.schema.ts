import z from 'zod'

export const RegisterBody = z.object({
  email: z.string().min(1, 'Email is required'),
  username: z.string().min(1, 'User name is required'),
  password: z.string().min(1, 'Password name is required'),
})

export type RegisterBodyType = z.TypeOf<typeof RegisterBody>

export const LoginBody = z.object({
  email: z.string().min(1, 'Email is required'),
  password: z.string().min(1, 'Password name is required'),
})

export type LoginBodyType = z.TypeOf<typeof LoginBody>

export const LoginRes = z.object({
  id: z.string(),
  username: z.string(),
  google_id: z.string(),
  email: z.string(),
  avatar: z.string(),
  is_pay: z.boolean(),
  created_at: z.string(),
  modified_at: z.string(),
})

export type LoginResType = z.TypeOf<typeof LoginRes>
