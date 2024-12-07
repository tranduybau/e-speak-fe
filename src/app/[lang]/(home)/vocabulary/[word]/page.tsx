import { notFound } from 'next/navigation'

import VocabularyPage from '@/components/business/vocabulary-page'
import { getDictionary } from '@/dictionaries/get-dictionary'
import devLog from '@/lib/dev-log'
import VocabulariesService from '@/services/vocabulaties'
import { DefaultPageProps } from '@/types/common'

interface VocabularyPageProps extends DefaultPageProps {
  params: DefaultPageProps['params'] & {
    word: string
  }
}

export default async function Vocabulary(props: VocabularyPageProps) {
  const { params } = props

  const dictionary = await getDictionary(params.lang)

  const data = await VocabulariesService.getWordDetails(params.word)

  if (data.isError) {
    devLog(data)
    notFound()
  }

  return <VocabularyPage dictionary={dictionary} data={data.data!} />
}
