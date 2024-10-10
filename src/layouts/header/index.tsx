import React from 'react'
import { BookMarked, User } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import VocabularySearch from '@/components/ui/vocabularyInput'

import { DictionaryProps } from '@/types/common'

function Header({ dictionary }: DictionaryProps) {
  return (
    <header className="w-full border-b bg-[#0a092d] ">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-4 md:flex-row">
        <Link href="/" className="flex items-center space-x-2">
          <BookMarked />
          <span className="text-xl font-bold">{dictionary['Learn English']}</span>
        </Link>

        <div className="mx-4 w-full bg-transparent md:w-auto md:max-w-md md:flex-1">
          <form className="relative">
            <VocabularySearch dictionary={dictionary} />
          </form>
        </div>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" className="hidden md:flex">
            {dictionary['Sign Up']}
          </Button>
          <Button>
            <User className="mr-2 h-4 w-4" />
            {dictionary['Log In']}
          </Button>
        </div>
      </div>
    </header>
  )
}

export default Header
