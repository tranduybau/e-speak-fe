import type { Metadata } from 'next'
import { Be_Vietnam_Pro } from 'next/font/google'

import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'

import { AppSidebar } from '@/components/app-sidebar'
import { getDictionary } from '@/dictionaries/get-dictionary'
import Footer from '@/layouts/footer'
import Header from '@/layouts/header'
import { cn } from '@/lib/utils'
import DictionaryProvider from '@/providers/dictionary-provider'
import { LocaleEnum } from '@/types/locales'

import '../globals.scss'

const beVietNamPro = Be_Vietnam_Pro({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--be-vietnam-pro',
})

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: { lang: LocaleEnum }
}>) {
  const dictionary = await getDictionary(params.lang)

  return (
    <html lang={params.lang}>
      <body className={cn(beVietNamPro.className, beVietNamPro.variable)}>
        <DictionaryProvider dictionary={dictionary}>
          <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
              <Header dictionary={dictionary} />

              <div className="flex flex-1 flex-col">{children}</div>

              <Footer dictionary={dictionary} />
            </SidebarInset>
          </SidebarProvider>
        </DictionaryProvider>
      </body>
    </html>
  )
}
