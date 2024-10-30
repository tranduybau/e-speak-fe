'use client'

import { useEffect, useState } from 'react'
import { Volume2 } from 'lucide-react'
import { notFound, useSearchParams } from 'next/navigation'

import { AppLoading } from '@/components/common/app-loading'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

import { useAudio } from '@/components/hooks/use-audio'
import VocabulariesService from '@/services/csr/vocabularies'
import { VocabularyDetail } from '@/types/vocabulary'

import CheckPhonemes from './check-phonemes'

function VocabularyDetailPage() {
  const searchParams = useSearchParams()
  const [vocabulary, setVocabulary] = useState<VocabularyDetail>()
  const id = searchParams.get('id')
  const { setAudioUrl, toggleAudio, isPlaying } = useAudio(null)

  useEffect(() => {
    if (!id) notFound()
    ;(async () => {
      const data = await VocabulariesService.getDetail(id)
      setVocabulary(data)
      setAudioUrl(data.audio_url)
    })()
  }, [id, setAudioUrl])

  if (!vocabulary) {
    return <AppLoading />
  }

  return (
    <Card className="mx-auto w-auto max-w-2xl">
      <CardHeader>
        <CardTitle className="text-3xl font-bold">{vocabulary.text}</CardTitle>
        <CardDescription className="text-xl">{vocabulary.translation}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex items-center justify-start">
          <Button
            onClick={toggleAudio}
            size="icon"
            aria-label={isPlaying ? 'Pause pronunciation' : 'Play pronunciation'}
          >
            <Volume2 className={`h-6 w-6 ${isPlaying ? 'text-primary' : ''}`} />
          </Button>
          <span className="font-mono text-lg">{vocabulary.transcript_ipa}</span>
        </div>
        <div className="mb-2">
          <CheckPhonemes groundTruth={vocabulary.transcript_ipa} />
        </div>
      </CardContent>
    </Card>
  )
}

export default VocabularyDetailPage
