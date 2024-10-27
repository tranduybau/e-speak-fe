'use client'

import React, { useRef, useState } from 'react'
import { Mic, Square } from 'lucide-react'

import DownloadRecording from '@/components/features/dowload-record/index'
import { Button } from '@/components/ui/button'

import { cn } from '@/lib/utils'
import { LocaleKeys } from '@/types/locales'

interface Props {
  dictionary: LocaleKeys
}

function AudioRecorder(props: Props) {
  const { dictionary } = props

  const [isRecording, setIsRecording] = useState(false)
  const [audioURL, setAudioURL] = useState<string | null>(null)
  const mediaRecorder = useRef<MediaRecorder | null>(null)
  const audioChunks = useRef<Blob[]>([])

  const startRecording = async () => {
    audioChunks.current = []
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      mediaRecorder.current = new MediaRecorder(stream)

      mediaRecorder.current.ondataavailable = (event: any) => {
        audioChunks.current.push(event.data)
      }

      mediaRecorder.current.onstop = () => {
        const audioBlob = new Blob(audioChunks.current, { type: 'audio/wav' })
        const audioUrl = URL.createObjectURL(audioBlob)
        setAudioURL(audioUrl)
      }

      mediaRecorder.current.start()
      setIsRecording(true)
    } catch (error) {
      /* eslint-disable no-console */
      console.error('Error starting recording:', error)
    }
  }

  const stopRecording = () => {
    if (mediaRecorder.current && isRecording) {
      mediaRecorder.current.stop()
      setIsRecording(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <div className="rounded-lg bg-white p-6 shadow-md">
        <h1 className="mb-4 text-2xl font-bold">{dictionary['Audio Recorder']}</h1>
        <div className="mb-4 flex space-x-4">
          <Button
            onClick={isRecording ? stopRecording : startRecording}
            className={cn(
              'text-white',
              isRecording ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600',
            )}
          >
            <span>
              {isRecording ? <Square className="mr-2" /> : <Mic className="mr-2" />}
              {isRecording ? dictionary['Stop Recording'] : dictionary['Start Recording']}
            </span>
          </Button>
          <DownloadRecording audioURL={audioURL} dictionary={dictionary} />
        </div>
        {audioURL && (
          <audio controls src={audioURL} className="w-full">
            <track kind="captions" src="" label={dictionary.Captions} />
            {dictionary['Your browser does not support the audio element.']}
          </audio>
        )}
      </div>
    </div>
  )
}

export default AudioRecorder
