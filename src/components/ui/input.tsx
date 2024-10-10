'use client'

import React, { useMemo } from 'react'
import { FieldError } from 'react-hook-form'
import { cva, VariantProps } from 'class-variance-authority'
import clsx from 'clsx'
import { Eye, EyeOff, Search } from 'lucide-react'

import { cn, decimalScaleNumber, formatMoney, parseNumber } from '@/lib/utils'

import { AppInputLayout } from '../common/app-input'

import { useFormField } from './form'

const inputVariantDefault = clsx(
  'flex appearance-none',
  // spacing
  'gap-[0.625rem] rounded-lg px-[0.9375rem] py-[0.6875rem]',
  // border
  'border border-transparent',
  // hover
  'hover:ring-1 hover:ring-secondary-primary',
  // focus
  'focus-within:ring-2 focus-within:ring-secondary-primary',
  'focus:ring-2 focus:ring-secondary-primary focus-visible:ring-secondary-primary',
  // search
  '[&::--webkit-search-cancel-button]:hidden [&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden',
)

const inputVariantError = clsx(
  'border-error',
  // hover
  'hover:ring-1 hover:ring-error',
  // focus
  'focus-within:ring-1 focus-within:ring-error',
  'focus:ring-1 focus:ring-error focus-visible:ring-error',
)

const inputVariantDisabled = clsx('border-transparent bg-primary-3 opacity-50 ring-0 hover:ring-0')

const inputVariants = cva(
  clsx(
    'w-full bg-primary-3 outline-none transition-all duration-300 bg-[#2d364f]',
    // font
    'text-body-2-light text-base-white',
    // placeholder
    'placeholder:text-body-2-light placeholder:text-neutral-1-placeholder',
  ),
  {
    variants: {
      variant: {
        default: inputVariantDefault,
        none: '',
      },
      customError: {
        default: inputVariantError,
        none: '',
      },
      customDisabled: {
        default: inputVariantDisabled,
        none: '',
      },
      enableStepper: {
        false:
          '[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none',
      },
    },
    defaultVariants: {
      variant: 'default',
      customError: 'none',
      customDisabled: 'none',
      enableStepper: false,
    },
  },
)

interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  error?: FieldError | boolean | null
  classNameWrapper?: string
  inputPrefix?: React.ReactNode
  inputSuffix?: React.ReactNode
}
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      children,
      classNameWrapper,
      inputPrefix,
      inputSuffix,
      error,
      disabled,
      className,
      type,
      ...props
    }: InputProps,
    forwardedRef,
  ) => {
    const [typeState, setTypeState] = React.useState(type)

    const isPassword = type === 'password'
    const isSearch = type === 'search'

    const InputPrefix = useMemo(
      () => (isSearch ? <Search /> : inputPrefix),
      [inputPrefix, isSearch],
    )

    const InputSuffix = useMemo(() => {
      if (isPassword) {
        const onChangeType = () => {
          setTypeState(typeState === 'password' ? 'text' : 'password')
        }
        return (
          <button aria-label="Change password visibility" type="button" onClick={onChangeType}>
            <span className="sr-only">
              {typeState === 'password' ? 'Show password' : 'Hide password'}
            </span>

            {typeState === 'password' ? (
              <Eye aria-hidden="true" className="size-5 shrink-0" />
            ) : (
              <EyeOff aria-hidden="true" className="size-5 shrink-0" />
            )}
          </button>
        )
      }

      return inputSuffix
    }, [inputSuffix, isPassword, typeState])

    return (
      <AppInputLayout
        classNameWrapper={classNameWrapper}
        error={error}
        disabled={disabled}
        inputPrefix={InputPrefix}
        inputSuffix={InputSuffix}
      >
        <input
          {...props}
          type={typeState}
          ref={forwardedRef}
          disabled={disabled}
          className={cn(
            inputVariants({
              variant: 'none',
              customDisabled: 'none',
              className: cn('bg-transparent leading-[1.4375rem]', className),
            }),
          )}
        />
      </AppInputLayout>
    )
  },
)
Input.displayName = 'Input'

interface InputNumberProps extends Omit<InputProps, 'onChange' | 'onBlur'> {
  decimalScale?: number
  onChange?: (value: string) => void
  onBlur?: (value: string) => void
}
const InputNumber = React.forwardRef<HTMLInputElement, InputNumberProps>(
  (
    {
      children,
      classNameWrapper,
      inputPrefix,
      inputSuffix,
      error,
      disabled,
      className,
      type,
      value,
      decimalScale = 10,
      onChange,
      onBlur,
      ...props
    }: InputNumberProps,
    forwardedRef,
  ) => {
    const [displayValue, setDisplayValue] = React.useState('')

    const onChangeWithNumberSeparator = React.useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const rawValue = e.target.value
        const parsedValue = parseNumber(rawValue)

        if (Number.isNaN(+parsedValue)) return

        if (onChange) onChange(parsedValue)

        setDisplayValue(formatMoney(parsedValue))
      },
      [onChange],
    )

    const handleBlur = React.useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const rawValue = e.target.value

        if (!rawValue) {
          if (onChange) onChange(rawValue)
          if (onBlur) onBlur(rawValue)
        }

        const parsedValue = parseNumber(rawValue)
        const scaledNumber = decimalScaleNumber(parsedValue, decimalScale)

        if (onChange) onChange(scaledNumber)
        if (onBlur) onBlur(scaledNumber)

        setDisplayValue(formatMoney(scaledNumber))
      },
      [decimalScale, onBlur, onChange],
    )

    React.useEffect(() => {
      if (value !== undefined) {
        const v = typeof value === 'number' ? value : +value

        setDisplayValue(formatMoney(v))
      }
    }, [value])

    return (
      <AppInputLayout
        classNameWrapper={classNameWrapper}
        error={error}
        disabled={disabled}
        inputPrefix={inputPrefix}
        inputSuffix={inputSuffix}
      >
        <input
          {...props}
          type="text"
          value={displayValue}
          ref={forwardedRef}
          disabled={disabled}
          className={cn(
            inputVariants({
              variant: 'none',
              customDisabled: 'none',
              className: cn('bg-transparent leading-[1.4375rem]', className),
            }),
          )}
          onChange={onChangeWithNumberSeparator}
          onBlur={handleBlur}
        />
      </AppInputLayout>
    )
  },
)
InputNumber.displayName = 'InputNumber'

const FormInput = React.forwardRef<HTMLInputElement, InputProps>(function FormInput(
  { ...props },
  ref,
) {
  const { error } = useFormField()
  return <Input ref={ref} {...props} error={error} />
})
FormInput.displayName = 'FormInput'

const FormInputNumber = React.forwardRef<HTMLInputElement, InputNumberProps>(
  function FormInputNumber({ ...props }, ref) {
    const { error } = useFormField()
    return <InputNumber ref={ref} {...props} error={error} />
  },
)
FormInputNumber.displayName = 'FormInputNumber'

export {
  Input,
  InputNumber,
  FormInput,
  FormInputNumber,
  inputVariants,
  inputVariantDefault,
  inputVariantError,
  inputVariantDisabled,
  type InputProps,
}
