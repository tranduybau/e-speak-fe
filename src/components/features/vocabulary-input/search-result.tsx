import { Search } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'

import { ModelsVocabulary } from '@/@types/api.type'
import devLog from '@/lib/dev-log'
import { useDictionary } from '@/providers/dictionary-provider'

interface SearchResultProps {
  data: ModelsVocabulary[]
  onClose: Function
  isDisplay: boolean
}

export default function SearchResult(props: SearchResultProps) {
  const { data, onClose, isDisplay } = props

  const params = useParams()
  const router = useRouter()
  const { dictionary } = useDictionary()

  const handleClickItem = (word: string) => {
    devLog(`/${params.lang}/vocabulary/${word}`)
    router.push(`/${params.lang}/vocabulary/${word}`)
    onClose()
  }

  return (
    <div
      className={`${!isDisplay ? 'hidden' : ''} absolute top-[30px] z-10 w-full cursor-pointer space-y-2 rounded-md border border-border bg-black py-[10px]`}
    >
      {data.map((vocab, index) => (
        <button
          type="button"
          // TODO: need change key to vocab.id after swagger update
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          className="bg-muted rounded-m block p-3 hover:bg-sub"
          onClick={() => handleClickItem(vocab.text!)}
        >
          <h3 className="flex items-center font-semibold">
            <Search className="mr-2" /> {vocab.text}
          </h3>
        </button>
      ))}
      <li className="px-4 hover:underline">{dictionary['View all result']}</li>
    </div>
  )
}
