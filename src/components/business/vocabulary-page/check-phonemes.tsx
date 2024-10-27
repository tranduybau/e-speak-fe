import { useEffect } from 'react'
import { Volume2 } from 'lucide-react'

import { Button } from '@/components/ui/button'

import { useAudio } from '@/components/hooks/use-audio'
import { useRecorder } from '@/components/hooks/use-recorder'
import PhonemesService from '@/services/csr/phonemes'

interface CheckPhonemesProps {
  groundTruth: string
}

export default function CheckPhonemes({ groundTruth }: CheckPhonemesProps) {
  const { audioUrl, audioBlob, startRecording, stopRecording } = useRecorder()
  const { setAudioUrl, toggleAudio, isPlaying } = useAudio(null)

  useEffect(() => {
    setAudioUrl(audioUrl)
  }, [audioUrl, setAudioUrl])

  const submit = async () => {
    if (!audioBlob) return
    const res = await PhonemesService.check(audioBlob, groundTruth)

    console.log(res)
  }

  return (
    <div>
      <Button onClick={startRecording}>Start</Button>
      <Button onClick={stopRecording}>Stop</Button>
      <div className="mb-4 flex items-center justify-start">
        <Button
          onClick={toggleAudio}
          size="icon"
          aria-label={isPlaying ? 'Pause pronunciation' : 'Play pronunciation'}
        >
          <Volume2 className={`h-4 w-4 ${isPlaying ? 'text-primary' : ''}`} />
        </Button>
      </div>
      <Button variant="outline" onClick={submit}>
        Check
      </Button>
    </div>
  )
}
