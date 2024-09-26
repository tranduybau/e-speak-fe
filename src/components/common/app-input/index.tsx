'use client'

import { memo } from 'react'
import isEqual from 'react-fast-compare'
import { FieldError } from 'react-hook-form'

import { inputVariants } from '@/components/ui/input'

import { cn } from '@/lib/utils'

interface IAppInputLayoutProps {
  children: React.ReactNode
  classNameWrapper?: string
  inputPrefix?: React.ReactNode
  inputSuffix?: React.ReactNode
  error?: FieldError | boolean | null
  disabled?: boolean
}
const AppInputLayout = memo(function AppInputLayout({
  children,
  classNameWrapper,
  inputPrefix,
  inputSuffix,
  error,
  disabled,
}: IAppInputLayoutProps) {
  return (
    <div
      className={cn(
        inputVariants({
          className: cn('[&:has(input:focus)]:ring-2', classNameWrapper),
          customError: error ? 'default' : 'none',
          customDisabled: disabled ? 'default' : 'none',
        }),
      )}
    >
      {inputPrefix && (
        <span className="inputPrefix flex items-center justify-center">{inputPrefix}</span>
      )}

      <div className="w-full leading-[1.4375rem]">{children}</div>

      {inputSuffix && (
        <span className="inputSuffix flex items-center justify-center">{inputSuffix}</span>
      )}
    </div>
  )
}, isEqual)
AppInputLayout.displayName = 'AppInputLayout'

export { AppInputLayout }
