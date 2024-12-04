import { Metadata } from 'next'

import { UserAuthFormRegister } from '@/app/[lang]/(auth)/components/user-auth-form-register'

export const metadata: Metadata = {
  title: 'Authentication',
  description: 'Authentication forms built using the components.',
}
export default function RegisterPage() {
  return <UserAuthFormRegister />
}
