import { useEffect } from 'react'
import { Mic, Pause, Play } from 'lucide-react'

import { Button } from '@/components/ui/button'

import { useAudio } from '@/components/hooks/use-audio'
import { useRecorder } from '@/components/hooks/use-recorder'
import PhonemesService from '@/services/csr/phonemes'

interface CheckPhonemesProps {
  groundTruth: string
}

export default function CheckPhonemes({ groundTruth }: CheckPhonemesProps) {
  const { isRecording, audioUrl, audioBlob, toggleRecording } = useRecorder()
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
      <Button variant="outline" onClick={toggleRecording}>
        <Mic className={`h-8 w-8 ${isRecording ? 'text-violet-500' : 'text-gray-500'}`} />
      </Button>
      <div className="mb-4 flex items-center justify-start">
        <Button
          onClick={toggleAudio}
          size="icon"
          aria-label={isPlaying ? 'Pause pronunciation' : 'Play pronunciation'}
          disabled={!audioUrl}
        >
          {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8" />}
        </Button>
      </div>
      <Button variant="outline" onClick={submit}>
        Check
      </Button>
      {audioUrl && <a href={audioUrl}>{audioUrl}</a>}
    </div>
  )
}
