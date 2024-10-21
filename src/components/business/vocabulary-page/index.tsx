'use client'

import { useEffect, useRef, useState } from 'react'
import { Volume2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

function VocabularyDetailPage() {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const vocabulary = {
    word: 'programmatic',
    translation: 'lập trình',
    transcriptIpa: 'ˌprɑ.grəˈmæ.tɪk',
    audioUrl:
      'https://tts.elsanow.co/dict/c0a29a7e29954720137ed08eff546d98e8340a5b56445a4c4aa6db04220e4eab.mp3',
  }

  useEffect(() => {
    audioRef.current = new Audio(vocabulary.audioUrl)
    audioRef.current.addEventListener('ended', () => setIsPlaying(false))
    return () => {
      audioRef.current?.removeEventListener('ended', () => setIsPlaying(false))
    }
  }, [vocabulary.audioUrl])

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
        <CardTitle className="text-3xl font-bold">{vocabulary.word}</CardTitle>
        <CardDescription className="text-xl">{vocabulary.translation}</CardDescription>
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
          <span className="font-mono text-lg">{vocabulary.transcriptIpa}</span>
        </div>
        <div className="mb-2">
          <Button variant="outline">Practice this word</Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default VocabularyDetailPage
