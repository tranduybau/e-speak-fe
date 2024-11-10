import React from 'react'

import SearchResult from '@/components/business/search-result'
import { getDictionary } from '@/dictionaries/get-dictionary'
import { DefaultPageProps } from '@/types/common'

export default async function SearchResultPage({ params }: DefaultPageProps) {
  const dictionary = await getDictionary(params.lang)

  console.log(`🆘 src/app/[lang]/(home)/page.tsx`); // eslint-disable-line
  console.log(dictionary); // eslint-disable-line
  console.log('%c => dictionary ', 'background: #0095FF; color: #fff'); // eslint-disable-line
  console.log(new Date()); // eslint-disable-line

  return <SearchResult />
}
