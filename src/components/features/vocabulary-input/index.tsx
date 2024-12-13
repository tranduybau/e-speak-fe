'use client'

import { useEffect, useState } from 'react'
import { useDebounce, useRequest } from 'ahooks'
import { Loader2, Search } from 'lucide-react'

import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/ui/spinner'

import VocabulariesService from '@/services/vocabularies'

import SearchResult from './search-result'

import './vocabulary-input.scss'

export default function VocabularySearch() {
  // FIXME: Search term should from url params
  const [searchTerm, setSearchTerm] = useState('')
  const [isFocus, setIsFocus] = useState(false)
  const [isDebouncing, setIsDebouncing] = useState(false)

  const {
    data: records,
    error,
    loading,
    run,
  } = useRequest(
    () =>
      VocabulariesService.getVocabularies({
        text: searchTerm,
      }),
    {
      manual: true,
    },
  )

  const debouncedSearchTerm = useDebounce(searchTerm, {
    wait: 300,
  })

  const handleSetSearchTerm = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
    setIsDebouncing(true)
  }

  // EXPLAIN: Run the request when the component is mounted
  useEffect(() => {
    if (debouncedSearchTerm) {
      setIsDebouncing(false)
      run()
    }
  }, [debouncedSearchTerm]) // eslint-disable-line react-hooks/exhaustive-deps

  // if (records?.isError) {
  //   notFound()
  // }

  return (
    <div className="relative mx-auto w-full max-w-md space-y-4 text-gray-400">
      <div className="flex items-center rounded-md border border-border bg-sub">
        <Search className="ml-2" onClick={() => run()} />
        <Input
          type="search"
          placeholder="Search vocabularies..."
          className="border-none bg-transparent p-4 focus:outline-none"
          value={searchTerm}
          onChange={handleSetSearchTerm}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
        />
        {loading && <Loader2 className="absolute right-2.5 top-2.5 h-4 w-4 animate-spin" />}
      </div>

      {error && typeof error === 'string' && (
        <p className="text-sm text-red-500">{error || 'Something went wrong'}</p>
      )}

      {isFocus &&
        (isDebouncing && searchTerm ? (
          <div className="absolute top-[30px] w-full space-y-2 rounded-md bg-black p-[10px]">
            <p className="text-muted-foreground h-[40px] text-sm">
              <Spinner className="text-gray-500">
                <span className="text-gray-500" />
              </Spinner>
            </p>
          </div>
        ) : (
          <SearchResult
            data={records?.data || []}
            searchTerm={searchTerm}
            isDisplay={isFocus}
            loading={loading || isDebouncing}
            onClose={() => {
              setIsFocus(false)
            }}
          />
        ))}

      {/* {!records?.isError && !!records?.data?.length && searchTerm && ( */}
      {/*   <ul className="absolute top-[30px] z-10 w-full cursor-pointer space-y-2 rounded-md border border-border bg-black py-[10px]"> */}
      {/*     {records?.data.map((vocab) => ( */}
      {/*       <li key={vocab.id} className="bg-muted rounded-m"> */}
      {/*         <Link */}
      {/*           href={`/${params.lang}/vocabulary/${vocab.text}`} */}
      {/*           className="block p-3 hover:bg-sub" */}
      {/*         > */}
      {/*           <h3 className="flex items-center font-semibold"> */}
      {/*             <Search className="mr-2" /> {vocab.text} */}
      {/*           </h3> */}
      {/*         </Link> */}
      {/*       </li> */}
      {/*     ))} */}
      {/*     <li className="px-4 hover:underline">{dictionary['View all result']}</li> */}
      {/*   </ul> */}
      {/* )} */}
    </div>
  )
}
