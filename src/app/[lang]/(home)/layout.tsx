import React from 'react'

import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'

import { AppSidebar } from '@/components/app-sidebar'
import { getDictionary } from '@/dictionaries/get-dictionary'
import Footer from '@/layouts/footer'
import Header from '@/layouts/header'
import DictionaryProvider from '@/providers/dictionary-provider'
import { LocaleEnum } from '@/types/locales'

export default async function LayoutPrivatePage({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: { lang: LocaleEnum }
}>) {
  const dictionary = await getDictionary(params.lang)

  return (
    <div>
      <DictionaryProvider dictionary={dictionary}>
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <Header dictionary={dictionary} />
            {children}
            <Footer dictionary={dictionary} />
          </SidebarInset>
        </SidebarProvider>
      </DictionaryProvider>
    </div>
  )
}
