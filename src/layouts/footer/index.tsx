import React, { memo } from 'react'
import isEqual from 'react-fast-compare'
import Image from 'next/image'

import AppLink from '@/components/common/app-link'
import AppLogo from '@/components/common/app-logo'
import Socials from '@/components/common/socials'

import { DictionaryProps } from '@/types/common'

import { getInformation, getServices } from './constants'
import { NewsletterForm } from './form'

const ContactInfo = memo(function ContactInfo() {
  return (
    <address className="min-w-[16.8125rem] space-y-4 not-italic">
      <h3 className="text-body-2-semibold">Contacts</h3>
      <div className="space-y-8">
        <div className="space-y-2">
          <h4 className="text-body-1-light">Address:</h4>
          <p className="text-body-2-light text-neutral-1">
            Bach Dang Complex Building, 50 Bach Dang, Hai Chau 1, Hai Chau District, Da Nang City,
            Viet Nam
          </p>
        </div>

        <div className="space-y-2">
          <h4 className="text-body-1-light">Phone:</h4>
          <p className="text-body-2-light text-neutral-1">(+84)905983875</p>
        </div>

        <div className="space-y-2">
          <h4 className="text-body-1-light">Email:</h4>
          <p className="text-body-2-light text-neutral-1">
            <a href="mailto:tranthiminhanh137@gmail.com">tranthiminhanh137@gmail.com</a>
            <br />
            <a href="mailto:minhanhcorp136@gmail.com">minhanhcorp136@gmail.com</a>
          </p>
        </div>
      </div>
    </address>
  )
}, isEqual)

interface FooterLinksProps {
  title: string
  links: { href: string; label: string }[]
}

const FooterLinks = memo(function FooterLinks({ title, links }: FooterLinksProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-body-2-semibold">{title}</h3>
      <ul className="space-y-3 text-body-2-light text-neutral-1">
        {links.map((link) => (
          <li key={link.href}>
            <AppLink href={link.href}>{link.label}</AppLink>
          </li>
        ))}
      </ul>
    </div>
  )
}, isEqual)

function Footer({ dictionary }: DictionaryProps) {
  return (
    <footer className="relative overflow-hidden pt-[64px]">
      <Image
        alt="footer background"
        src="/images/home/footer.png"
        width={1843}
        height={620}
        className="absolute left-0 top-[-30px] z-[-1] h-full w-full object-cover"
      />
      <div className="container max-w-[88rem]">
        <div className="flex flex-col items-start md:flex-row">
          <div className="flex-[324]">
            <div className="space-y-4">
              <AppLogo className="max-w-[15.0625rem]" />
              <p className="text-body-2-light text-neutral-1">
                Lorem ipsum dolor sit amet, consec tetur adipisicing elit, sed do eiusmod tempor
                incididuntut consec tetur adipisicing elit,Lorem ipsum dolor sit amet.
              </p>
              <NewsletterForm />
            </div>
          </div>

          <div className="aspect-square min-w-8 flex-[143]" />

          <div className="flex-[813]">
            <div className="grid grid-cols-[repeat(auto-fit,minmax(12.5rem,1fr))] gap-8">
              <FooterLinks title="Service" links={getServices(dictionary)} />
              <FooterLinks title="Information" links={getInformation(dictionary)} />
              <ContactInfo />
            </div>
          </div>
        </div>

        <div className="mt-11 flex justify-between border-t border-neutral-2 pb-12 pt-11">
          <span className="text-body-small-light text-another-2">
            {dictionary['© 2077 Untitled UI. All rights reserved.']}
          </span>

          <Socials />
        </div>
      </div>
    </footer>
  )
}

export default memo(Footer, isEqual)
