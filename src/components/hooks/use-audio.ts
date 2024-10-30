import { useEffect, useRef, useState } from 'react'

export const useAudio = (initUrl: string | null) => {
  const [url, setUrl] = useState(initUrl)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (!url) return () => {}
    audioRef.current = new Audio(url)
    audioRef.current.addEventListener('ended', () => setIsPlaying(false))
    return () => {
      audioRef.current?.removeEventListener('ended', () => setIsPlaying(false))
    }
  }, [url])

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

  return {
    url,
    setAudioUrl: setUrl,
    isPlaying,
    toggleAudio,
  }
}
