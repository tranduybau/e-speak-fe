import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import clsx from 'clsx'

import { cn } from '@/lib/utils'

import { LoadingIcon } from '../common/app-loading'

const buttonVariants = cva(
  clsx(
    // Layout
    'inline-flex items-center justify-center',
    // Spacing,
    'px-[1.4375rem] py-[0.6875rem] gap-[0.625rem]',
    // Typography
    'text-body-3-semibold whitespace-nowrap',
    // Appearance
    'ring-offset-secondary-2 transition-colors',
    // Focus states
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-primary focus-visible:ring-offset-2',
    // Disabled state
    'disabled:pointer-events-none disabled:opacity-50',
  ),
  {
    variants: {
      variant: {
        primary: [
          // border
          'border-none px-6 py-3',
          // text color
          'text-base-white dark:text-gray-900',
          // background color
          'bg-gradient',
          // hover color
          'hover:bg-gradientHover dark:hover:bg-gray-200',
          // disabled
          'disabled:bg-gradientDisabled disabled:text-neutral-1',
          'disabled:dark:bg-gray-800 disabled:dark:text-gray-600',
        ],
        outline: [
          // border
          'border-secondary-primary dark:border-gray-800',
          // text color
          'text-secondary-primary dark:text-gray-50',
          // background color
          'bg-transparent dark:bg-gray-950',
          // hover color
          'hover:bg-base-white dark:hover:bg-gray-900/60',
          // disabled
          'disabled:text-neutral-1 disabled:bg-primary-3 disabled:border-primary-3',
          'disabled:dark:text-gray-600',
        ],
        ghost: [
          // border
          'border-none px-6 py-3',
          // text color
          'text-base-white dark:text-gray-50',
          // background color
          'transparent dark:bg-gray-950',
          // hover color
          'hover:bg-primary-1 dark:hover:bg-gray-900/60',
          // disabled
          'disabled:text-neutral-1 disabled:bg-primary-3',
          'disabled:dark:text-gray-600',
        ],
      },
      size: {
        default: '',
      },
      rounded: {
        full: 'rounded-full',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
      rounded: 'full',
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  isLoading?: boolean
  loadingText?: string
  raw?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      raw,
      className,
      variant,
      size,
      asChild,
      isLoading,
      loadingText,
      children,
      ...props
    }: ButtonProps,
    ref,
  ) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={
          raw ? '' : clsx('text-body-3-semibold', cn(buttonVariants({ variant, size, className })))
        }
        ref={ref}
        disabled={isLoading}
        {...props}
      >
        {isLoading ? (
          <span className="pointer-events-none flex shrink-0 items-center justify-center gap-1.5">
            <LoadingIcon />
            <span className="sr-only">{loadingText || 'Loading'}</span>
            {loadingText || children}
          </span>
        ) : (
          children
        )}
      </Comp>
    )
  },
)
Button.displayName = 'Button'

export { Button, buttonVariants }
