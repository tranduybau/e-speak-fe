'use client'

import { memo, useEffect } from 'react'
import isEqual from 'react-fast-compare'
import { Volume2 } from 'lucide-react'

import { Button } from '@/components/ui/button'

import { useAudio } from '@/components/hooks/use-audio'
import { LocaleKeys } from '@/types/locales'

interface Props {
  dictionary: LocaleKeys
  audioUrl?: string
}

function ButtonPlayingWord(props: Props) {
  const { dictionary, audioUrl } = props

  const { setAudioUrl, toggleAudio, isPlaying, url } = useAudio(null)

  useEffect(() => {
    if (audioUrl && audioUrl !== url) {
      setAudioUrl(audioUrl)
    }
  }, [audioUrl, setAudioUrl, url])

  return (
    <Button
      onClick={toggleAudio}
      size="icon"
      aria-label={isPlaying ? dictionary['Pause pronunciation'] : dictionary['Play pronunciation']}
    >
      <Volume2 className={`h-6 w-6 ${isPlaying ? 'text-primary' : ''}`} />
    </Button>
  )
}

export default memo(ButtonPlayingWord, isEqual)
