'use client'

import { useEffect, useState } from 'react'
import { useDebounce, useRequest } from 'ahooks'
import { Loader2, Search } from 'lucide-react'

import { Input } from '@/components/ui/input'

import VocabulariesServices from '@/services/csr/vocabularies'

export default function VocabularySearch() {
  // FIXME: Search term should from url params
  const [searchTerm, setSearchTerm] = useState('')

  const {
    data: records,
    error,
    loading,
    run,
  } = useRequest(() => VocabulariesServices.searchWord(searchTerm), {
    manual: true,
  })

  const debouncedSearchTerm = useDebounce(searchTerm, {
    wait: 1000,
  })

  const handleSetSearchTerm = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  // EXPLAIN: Run the request when the component is mounted
  useEffect(() => {
    if (debouncedSearchTerm) {
      run()
    }
  }, [debouncedSearchTerm]) // eslint-disable-line react-hooks/exhaustive-deps

  // if (records?.isError) {
  //   notFound()
  // }

  return (
    <div className="mx-auto w-full max-w-md space-y-4 text-gray-400">
      <div className="relative">
        <Search className="absolute left-1 top-1/2 z-10 -translate-y-1/2 " />
        <Input
          type="search"
          placeholder="Search vocabularies..."
          className="relative border-border bg-sub pl-8 pr-4"
          value={searchTerm}
          onChange={handleSetSearchTerm}
        />
        {loading && <Loader2 className="absolute right-2.5 top-2.5 h-4 w-4 animate-spin" />}
      </div>

      {error && typeof error === 'string' && (
        <p className="text-sm text-red-500">{error || 'Something went wrong'}</p>
      )}

      {!!records?.data.length && (
        <ul className="absolute top-[30px] z-10 w-full cursor-pointer space-y-2 rounded-md border border-border bg-black py-[10px]">
          {records?.data.map((vocab) => (
            <li key={vocab.id} className="bg-muted rounded-m p-3 hover:bg-sub">
              <h3 className="flex items-center font-semibold">
                <Search className="mr-2" /> {vocab.text}
              </h3>
              {/* <p className="text-muted-foreground text-sm">{vocab.translation}</p> */}
            </li>
          ))}
          <li className="px-4 hover:underline"> View all result</li>
        </ul>
      )}

      {!loading && searchTerm && records?.data.length === 0 && (
        <div className="absolute top-[30px] w-full space-y-2 rounded-md bg-black p-[10px]">
          <p className="text-muted-foreground text-sm ">No results found</p>
        </div>
      )}
    </div>
  )
}
