'use client'

import React from 'react'
import isEqual from 'react-fast-compare'
import Link, { LinkProps } from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/lib/utils'
import { LocaleEnum } from '@/types/locales'

interface Props extends LinkProps {
  href: string
  className?: string
  forceLanguage?: LocaleEnum
}

function AppLink(props: React.PropsWithChildren<Props>) {
  const {
    href,
    children,
    className = '',
    forceLanguage,

    ...others
  } = props

  const uuid = React.useId()
  const pathname = usePathname()

  const locale = pathname.split('/')[1]

  const finalLink = `/${forceLanguage || locale}${href}`

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Link {...others} href={finalLink} key={uuid} className={cn('duration-300', className)}>
      {children}
    </Link>
  )
}

export default React.memo(AppLink, isEqual)
