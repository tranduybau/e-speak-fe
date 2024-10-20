import React from 'react'
import { Download } from 'lucide-react'

import { Button } from '@/components/ui/button'

interface DownloadRecordingProps {
  audioURL: string | null
  dictionary: Record<string, string>
}

function DownloadRecording({ audioURL, dictionary }: DownloadRecordingProps) {
  const handleDownload = () => {
    if (audioURL) {
      const a = document.createElement('a')
      a.style.display = 'none'
      a.href = audioURL
      a.download = 'recording.wav'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(audioURL)
    }
  }

  return (
    <Button
      onClick={handleDownload}
      disabled={!audioURL}
      className="bg-green-500 text-white hover:bg-green-600"
    >
      <Download className="mr-2" />
      <span>{dictionary['Download Recording']}</span>
    </Button>
  )
}

export default DownloadRecording
