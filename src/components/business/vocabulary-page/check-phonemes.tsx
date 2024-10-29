import { useEffect, useState } from 'react'
import { Mic, Pause, Play } from 'lucide-react'

import PhonemesResult from '@/components/common/phonemes-result'
import { Button } from '@/components/ui/button'

import { useAudio } from '@/components/hooks/use-audio'
import { useRecorder } from '@/components/hooks/use-recorder'
import PhonemesService from '@/services/csr/phonemes'
import { CheckPhonemesResult } from '@/types/phonemes'

interface CheckPhonemesProps {
  groundTruth: string
}

export default function CheckPhonemes({ groundTruth }: CheckPhonemesProps) {
  const { isRecording, audioUrl, audioBlob, toggleRecording } = useRecorder()
  const { setAudioUrl, toggleAudio, isPlaying } = useAudio(null)
  const [phonemesResult, setPhonemesResult] = useState<CheckPhonemesResult>()

  useEffect(() => {
    setAudioUrl(audioUrl)
  }, [audioUrl, setAudioUrl])

  const submit = async () => {
    if (!audioBlob) return
    const res = await PhonemesService.check(audioBlob, groundTruth)
    setPhonemesResult(res)
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

      {phonemesResult ? (
        <PhonemesResult
          characters={phonemesResult.characters}
          groundTruthBenchmark={phonemesResult.ground_truth_benchmark}
        />
      ) : (
        <div>{groundTruth}</div>
      )}

      {phonemesResult && <p>Point: {phonemesResult.confident * 100}%</p>}
    </div>
  )
}
