import React from 'react'
import Link from 'next/link'

import AppIcon from '@/components/common/app-icon'
import AppLogo from '@/components/common/app-logo'
import { Button } from '@/components/ui/button'
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

import RouteNames from '@/constants/routes'
import { DictionaryProps } from '@/types/common'

import { getNavItems } from './constant'

interface ItemMockupProps {
  label: string
  href: string
}
function ItemMockup({ label, href }: ItemMockupProps) {
  return (
    <li className="px-6">
      <Link href={href}>
        <span className="text-body-3-semibold">{label}</span>
      </Link>
    </li>
  )
}

interface ItemHasChildProps {
  label: string
  childs?: {
    label: string
    href: string
  }[]
}
function ItemHasChild({ label, childs = [] }: ItemHasChildProps) {
  return (
    <li className="px-6">
      <Popover>
        <PopoverTrigger asChild>
          <span className="flex cursor-pointer items-center gap-2 transition-all data-[state=open]:text-secondary-primary [&[data-state=open]>svg]:rotate-180">
            <span className="text-body-3-semibold">{label}</span>

            <AppIcon
              src="/images/common/chevron-down.svg"
              width="20"
              height="20"
              className="duration-150"
            />
          </span>
        </PopoverTrigger>

        <PopoverContent align="start" className="px-0 py-[0.5625rem]" sideOffset={22}>
          <nav>
            <ul>
              {childs.map((child) => (
                <li key={child.label}>
                  <PopoverClose asChild>
                    <Link
                      href={child.href}
                      className="block min-h-[2.6875rem] px-4 pb-3 pt-2 hover:bg-primary-3"
                    >
                      {child.label}
                    </Link>
                  </PopoverClose>
                </li>
              ))}
            </ul>
          </nav>
        </PopoverContent>
      </Popover>
    </li>
  )
}

function Header({ dictionary }: DictionaryProps) {
  return (
    <header className="container sticky top-0 z-10 flex items-center justify-between bg-neutral-3 py-4">
      <Link href={RouteNames.Home} locale="en">
        <AppLogo />
      </Link>

      <div className="flex items-center gap-8">
        <nav className="hidden items-center whitespace-nowrap text-neutral-1 md:flex">
          <ul className="flex items-center">
            {getNavItems(dictionary).map((item) => {
              if (item.childs) {
                return <ItemHasChild key={item.label} label={item.label} childs={item.childs} />
              }

              return <ItemMockup key={item.label} label={item.label} href={item.href} />
            })}
          </ul>
        </nav>

        <Link href={RouteNames.ContactUs}>
          <Button>{dictionary['Contact Us']}</Button>
        </Link>
      </div>
    </header>
  )
}

export default Header
