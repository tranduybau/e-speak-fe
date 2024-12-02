'use client'

import * as React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { Icons } from '@/components/ui/icons'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { useToast } from '@/hooks/use-toast'
import { cn } from '@/lib/utils'
import { useRegisterMutation } from '@/queries/useAuth'
import { RegisterBody, RegisterBodyType } from '@/schemaValidations/auth.schema'

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthFormRegister({ className, ...props }: UserAuthFormProps) {
  const [isLoading] = React.useState<boolean>(false)
  const registerMutation = useRegisterMutation()
  const router = useRouter()
  const { toast } = useToast()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterBodyType>({
    resolver: zodResolver(RegisterBody),
    defaultValues: {
      email: '',
      password: '',
      username: '',
    },
  })
  async function onSubmit(data: RegisterBodyType) {
    try {
      await registerMutation.mutateAsync(data)
      router.push('/')
      router.refresh()
    } catch (error: any) {
      toast({
        description: error.payload.error,
        variant: 'destructive',
        className: 'bg-red-600 text-white',
      })
    }
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              {...register('email')}
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
            />
            {errors.email?.message && (
              <p className="text-destructive text-sm font-medium text-[red]">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              PassWord
            </Label>
            <Input
              {...register('password')}
              id="password"
              placeholder="password"
              type="password"
              autoCapitalize="none"
              autoComplete="password"
              autoCorrect="off"
              disabled={isLoading}
            />
            {errors.password?.message && (
              <p className="text-destructive text-sm font-medium text-[red]">
                {errors.password.message}
              </p>
            )}
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="NameUser">
              Name user
            </Label>
            <Input
              {...register('username')}
              id="NameUser"
              placeholder="minh hoang"
              type="text"
              autoCapitalize="none"
              autoComplete="NameUser"
              autoCorrect="off"
              disabled={isLoading}
            />
            {errors.username?.message && (
              <p className="text-destructive text-sm font-medium text-[red]">
                {errors.username.message}
              </p>
            )}
          </div>
          <Button type="submit" disabled={isLoading} className="text-white">
            {isLoading && <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />}
            Sign up with Email
          </Button>
        </div>
      </form>
    </div>
  )
}
