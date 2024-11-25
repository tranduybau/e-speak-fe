import { Search } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'

import { ModelsVocabulary } from '@/@types/api.type'
import devLog from '@/lib/dev-log'
import { useDictionary } from '@/providers/dictionary-provider'

interface SearchResultProps {
  data: ModelsVocabulary[]
  searchTerm: string
  onClose: Function
  isDisplay: boolean
  loading: boolean
}

export default function SearchResult(props: SearchResultProps) {
  const { data, searchTerm, onClose, isDisplay, loading } = props
  const params = useParams()
  const router = useRouter()
  const { dictionary } = useDictionary()

  const handleClickItem = (word: string) => {
    devLog(`/${params.lang}/vocabulary/${word}`)
    router.push(`/${params.lang}/vocabulary/${word}`)
    onClose()
  }

  return (
    <>
      {data.length > 0 && searchTerm !== '' && (
        <div
          className={`${!isDisplay ? 'hidden' : ''} absolute top-[30px] z-10 w-full cursor-pointer space-y-2 rounded-md border border-border bg-black py-[10px]`}
        >
          {data.map((vocab, index) => (
            <button
              type="button"
              // TODO: need change key to vocab.id after swagger update
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              className="bg-muted rounded-m block w-full p-3 hover:bg-sub"
              onClick={() => handleClickItem(vocab.text!)}
            >
              <h3 className="flex items-center font-semibold">
                <Search className="mr-2" /> {vocab.text}
              </h3>
            </button>
          ))}
          <div className="px-4 hover:underline">{dictionary['View all result']}</div>
        </div>
      )}
      {!loading && searchTerm && data.length === 0 && (
        <div className="absolute top-[30px] w-full space-y-2 rounded-md bg-black p-[10px]">
          <p className="text-muted-foreground text-sm ">{dictionary['No results found']}</p>
        </div>
      )}
      {!loading && !searchTerm && isDisplay && (
        <div className="absolute top-[30px] w-full space-y-2 rounded-md bg-black p-[10px]">
          <p className="text-muted-foreground cursor-pointer text-sm font-semibold hover:underline">
            {dictionary['History search']}
          </p>
        </div>
      )}
    </>
  )
}
