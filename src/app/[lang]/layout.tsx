import React from 'react'

import { getDictionary } from '@/dictionaries/get-dictionary'
import Footer from '@/layouts/footer'
import Header from '@/layouts/header'
import { LocaleEnum } from '@/types/locales'

interface Props {
  children: React.ReactNode
  params: { lang: LocaleEnum }
}
async function Layout({ children, params }: Props) {
  const dictionary = await getDictionary(params.lang)
  return (
    <>
      <Header dictionary={dictionary} />

      <div className="flex flex-col flex-1">{children}</div>

      <Footer dictionary={dictionary} />
    </>
  )
}

export default Layout
