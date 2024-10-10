'use client'

import { useCallback, useEffect, useState } from 'react'
import { Loader2 } from 'lucide-react'

import { Input } from '@/components/ui/input'

import { DictionaryProps } from '@/types/common'

interface Vocabulary {
  text: string
  translation: string
  id: number
  word: string
  meaning: string
}

export default function VocabularySearch({ dictionary }: DictionaryProps) {
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
    <div className="mx-auto w-full max-w-md space-y-4 bg-transparent">
      <div className="relative">
        <Input
          type="search"
          placeholder="Search vocabularies..."
          className="relative pl-8 pr-4"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {isLoading && <Loader2 className="absolute right-2.5 top-2.5 h-4 w-4 animate-spin" />}
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      {results.length > 0 && (
        <ul className="absolute top-[32px] w-full space-y-2 rounded bg-[#a5a9b1] p-[10px]">
          {results.map((vocab) => (
            <li key={vocab.id} className="bg-muted rounded-md p-3">
              <h3 className="font-semibold">{vocab.text}</h3>
              <p className="text-muted-foreground text-sm">{vocab.translation}</p>
            </li>
          ))}
        </ul>
      )}

      {!isLoading && searchTerm && results.length === 0 && (
        <div className="absolute top-[32px] w-full space-y-2 rounded bg-[#a5a9b1] p-[10px]">
          <p className="text-muted-foreground text-sm text-black">
            {dictionary['No results found']}
          </p>
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
