import { useEffect, useState } from 'react'
import { Mic, Volume2 } from 'lucide-react'

import PhonemesResult from '@/components/common/phonemes-result'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

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

  useEffect(() => {
    const submit = async () => {
      if (!audioBlob) return
      const res = await PhonemesService.check(audioBlob, groundTruth)
      setPhonemesResult(res)
    }

    submit()
  }, [audioBlob, groundTruth])

  return (
    <div>
      <Button
        className={`flex-column flex w-full ${isRecording ? 'text-violet-500' : 'text-gray-500'}`}
        variant="outline"
        size="lg"
        onClick={toggleRecording}
      >
        <Mic className="h-8 w-8" />
        <span className="ml-2 text-lg">Record</span>
      </Button>

      {phonemesResult && (
        <div className="mt-4">
          <Separator />
          <p className="mb-4 text-center text-xl font-bold">
            Point: {phonemesResult.confident * 100}%
          </p>
          <PhonemesResult
            characters={phonemesResult.characters}
            groundTruthBenchmark={phonemesResult.ground_truth_benchmark}
          />

          <p className="">Predict:</p>
          <div className="flex items-center justify-start">
            <Button
              onClick={toggleAudio}
              size="icon"
              aria-label={isPlaying ? 'Pause pronunciation' : 'Play pronunciation'}
            >
              <Volume2 className={`h-6 w-6 ${isPlaying ? 'text-primary' : ''}`} />
            </Button>
            <PhonemesResult
              characters={phonemesResult.characters}
              groundTruthBenchmark={phonemesResult.predict}
            />
          </div>
        </div>
      )}
    </div>
  )
}
