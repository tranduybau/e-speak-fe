import React from 'react'

import { getDictionary } from '@/dictionaries/get-dictionary'
import { LocaleEnum } from '@/types/locales'

import AudioRecorder from './audioRecord'

async function RecordPage() {
  const dictionary = await getDictionary(LocaleEnum.EN)

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <AudioRecorder dictionary={dictionary} />
    </div>
  )
}

export default RecordPage
