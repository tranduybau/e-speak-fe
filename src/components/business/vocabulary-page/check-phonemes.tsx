'use client'

import { useEffect, useState } from 'react'
import { useBoolean } from 'ahooks'
import { Mic } from 'lucide-react'

import PhonemesResult from '@/components/common/phonemes-result'
import { Button } from '@/components/ui/button'

import ButtonPlayingWord from '@/components/feature/button-playing-word'
import { useRecorder } from '@/components/hooks/use-recorder'
import devLog from '@/lib/dev-log'
import PhonemesService from '@/services/phonemes'
import { LocaleKeys } from '@/types/locales'
import { ModelCheckPhonemes } from '@/types/phonemes'

interface CheckPhonemesProps {
  dictionary: LocaleKeys
  groundTruth: string
}

export default function CheckPhonemes({ groundTruth, dictionary }: CheckPhonemesProps) {
  const { isRecording, audioUrl, audioBlob, toggleRecording } = useRecorder()
  const [phonemesResult, setPhonemesResult] = useState<ModelCheckPhonemes>()
  const [
    isCheckingPhonemes,
    { setTrue: setTrueCheckingPhonemes, setFalse: setFalseCheckingPhonemes },
  ] = useBoolean()

  useEffect(() => {
    ;(async () => {
      if (!audioBlob) {
        return
      }

      setTrueCheckingPhonemes()
      const res = await PhonemesService.checkPhonemes(audioBlob, groundTruth)
      if (res.isError) {
        devLog(res.message)
      }

      setPhonemesResult(res.data!)
      setFalseCheckingPhonemes()
    })()
  }, [audioBlob, groundTruth, setFalseCheckingPhonemes, setTrueCheckingPhonemes])

  return (
    <div>
      <Button
        className={`flex-column flex w-full ${isRecording ? 'text-violet-500' : 'text-gray-500'}`}
        variant="outline"
        size="lg"
        disabled={isCheckingPhonemes}
        onClick={toggleRecording}
      >
        <Mic className="h-8 w-8" />
        <span className="ml-2 text-lg">Record</span>
      </Button>

      {phonemesResult && (
        <div className="border-t border-t-black pt-4">
          <p className="mb-4 text-center text-xl font-bold">
            Point: {phonemesResult.confident * 100}%
          </p>
          <PhonemesResult
            characters={phonemesResult.characters}
            groundBenchmark={phonemesResult.ground_truth_benchmark}
          />

          <p className="">Predict:</p>
          <div className="flex items-center justify-start">
            <ButtonPlayingWord dictionary={dictionary} audioUrl={audioUrl} />
            <PhonemesResult
              characters={phonemesResult.characters}
              groundBenchmark={phonemesResult.predict}
            />
          </div>
        </div>
      )}
    </div>
  )
}
