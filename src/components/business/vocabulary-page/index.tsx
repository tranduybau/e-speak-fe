'use client'

import { useEffect, useRef, useState } from 'react'
import { Volume2 } from 'lucide-react'
import { notFound, useSearchParams } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

import VocabulariesService from '@/services/csr/vocabularies'
import { VocabularyDetail } from '@/types/vocabulary'

function VocabularyDetailPage() {
  const searchParams = useSearchParams()
  const [vocabulary, setVocabulary] = useState<VocabularyDetail>()
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const id = searchParams.get('id')

  useEffect(() => {
    if (!id) notFound()
    ;(async () => {
      const data = await VocabulariesService.getDetail(id)
      setVocabulary(data)
    })()
  }, [id])

  useEffect(() => {
    if (!vocabulary) return () => {}
    audioRef.current = new Audio(vocabulary.audio_url)
    audioRef.current.addEventListener('ended', () => setIsPlaying(false))
    return () => {
      audioRef.current?.removeEventListener('ended', () => setIsPlaying(false))
    }
  }, [vocabulary])

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  return (
    <Card className="mx-auto w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="text-3xl font-bold">{vocabulary?.text}</CardTitle>
        <CardDescription className="text-xl">{vocabulary?.translation}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex items-center justify-start">
          <Button
            onClick={toggleAudio}
            size="icon"
            aria-label={isPlaying ? 'Pause pronunciation' : 'Play pronunciation'}
          >
            <Volume2 className={`h-4 w-4 ${isPlaying ? 'text-primary' : ''}`} />
          </Button>
          <span className="font-mono text-lg">{vocabulary?.transcript_ipa}</span>
        </div>
        <div className="mb-2">
          <Button variant="outline">Practice this word</Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default VocabularyDetailPage
