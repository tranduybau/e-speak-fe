'use client'

import React, { createContext } from 'react'

import { LocaleKeys } from '@/types/locales'

interface DictionaryContextType {
  dictionary: LocaleKeys
}

export const DictionaryContext = createContext<DictionaryContextType | null>(null)

export const useDictionary = () => {
  const dictionary = React.useContext(DictionaryContext)
  if (!dictionary) {
    throw new Error('useDictionary must be used within a DictionaryProvider')
  }
  return dictionary
}

function DictionaryProvider({
  dictionary,
  children,
}: {
  dictionary: LocaleKeys
  children: React.ReactNode
}) {
  const memoizedValue = React.useMemo(() => ({ dictionary }), [dictionary])
  return <DictionaryContext.Provider value={memoizedValue}>{children}</DictionaryContext.Provider>
}

export default DictionaryProvider
