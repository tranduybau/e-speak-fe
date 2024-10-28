import AudioRecorder from '@/components/feature/audio-recorder'
import { LocaleKeys } from '@/types/locales'

interface Props {
  dictionary: LocaleKeys
}

async function RecordWrapper(props: Props) {
  const { dictionary } = props

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <AudioRecorder dictionary={dictionary} />
    </div>
  )
}

export default RecordWrapper
