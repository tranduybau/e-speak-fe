import LoginForm from '@/components/form/login-form'
import RegisterForm from '@/components/form/register-form'

export default function AuthPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="space-y-8">
        <LoginForm />
        <RegisterForm />
      </div>
    </div>
  )
}
