'use client'

import { useCallback, useEffect, useState } from 'react'
import { Loader2, Search } from 'lucide-react'

import { Input } from '@/components/ui/input'

import '@/app/globals.scss'

interface Vocabulary {
  text: string
  translation: string
  id: number
  word: string
  meaning: string
}

export default function VocabularySearch() {
  const [searchTerm, setSearchTerm] = useState('')
  const [results, setResults] = useState<Vocabulary[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearch = useCallback(
    debounce(async (searchValue: string) => {
      if (searchValue.trim() === '') {
        setResults([])
        return
      }

      setIsLoading(true)
      setError(null)

      try {
        const response = await fetch(
          `http://103.163.214.192:9000/api/vocabularies/search?word=${searchValue}`,
        )
        if (!response.ok) {
          throw new Error('Failed to fetch data')
        }
        const data = await response.json()
        setResults(data)
      } catch (err) {
        setError('An error occurred while fetching data')
        // eslint-disable-next-line no-console
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }, 300),
    [],
  )

  useEffect(() => {
    debouncedSearch(searchTerm)
  }, [searchTerm, debouncedSearch])

  return (
    <div className="mx-auto w-full max-w-md space-y-4 text-gray-400">
      <div className="relative">
        <Search className="absolute left-1 top-1/2 z-10 -translate-y-1/2 " />
        <Input
          type="search"
          placeholder="Search vocabularies..."
          className="relative border-border bg-sub pl-8 pr-4"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {isLoading && <Loader2 className="absolute right-2.5 top-2.5 h-4 w-4 animate-spin" />}
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      {results.length > 0 && (
        <ul className="absolute top-[30px] w-full cursor-pointer space-y-2 rounded-md border border-border bg-black py-[10px]">
          {results.map((vocab) => (
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

      {!isLoading && searchTerm && results.length === 0 && (
        <div className="absolute top-[30px] w-full space-y-2 rounded-md bg-black p-[10px]">
          <p className="text-muted-foreground text-sm ">No results found</p>
        </div>
      )}
    </div>
  )
}

function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null

  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}
