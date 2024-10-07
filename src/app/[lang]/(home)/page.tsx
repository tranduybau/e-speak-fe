import React from 'react'

import AudioPage from '@/components/business/record-page'
import { getDictionary } from '@/dictionaries/get-dictionary'
import { DefaultPageProps } from '@/types/common'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

export default async function Home({ params }: DefaultPageProps) {
  const dictionary = await getDictionary(params.lang)

  console.log(`🆘 src/app/[lang]/(home)/page.tsx`); // eslint-disable-line
  console.log(dictionary); // eslint-disable-line
  console.log('%c => dictionary ', 'background: #0095FF; color: #fff'); // eslint-disable-line
  console.log(new Date()); // eslint-disable-line

  return <AudioPage />
}
