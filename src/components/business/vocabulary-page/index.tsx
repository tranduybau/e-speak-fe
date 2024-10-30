import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

import { ModelsVocabulary } from '@/@types/api.type'
import ButtonPlayingWord from '@/components/feature/button-playing-word'
import { LocaleKeys } from '@/types/locales'

import CheckPhonemes from './check-phonemes'

interface VocabularyDetailPageProps {
  dictionary: LocaleKeys
  data: ModelsVocabulary
}

function VocabularyDetailPage(props: VocabularyDetailPageProps) {
  const { dictionary, data } = props

  return (
    <Card className="mx-auto w-auto max-w-2xl">
      <CardHeader>
        <CardTitle className="text-3xl font-bold">{data.text}</CardTitle>
        <CardDescription className="text-xl">{data.translation}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex items-center justify-start">
          <ButtonPlayingWord dictionary={dictionary} audioUrl={data.audio_url} />
          <span className="font-mono text-lg">{data.transcript_ipa}</span>
        </div>
        {!!data.transcript_ipa && (
          <div className="mb-2">
            <CheckPhonemes groundTruth={data.transcript_ipa} />
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default VocabularyDetailPage
