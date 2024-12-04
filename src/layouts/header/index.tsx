import React from 'react'
import { BookMarked, User } from 'lucide-react'
import Link from 'next/link'

import VocabularySearch from '@/components/features/vocabulary-input'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar'

import { LocaleKeys } from '@/types/locales'

interface Props {
  dictionary: LocaleKeys
}

function Header(props: Props) {
  const { dictionary } = props

  return (
    <header className="w-full border-b border-border bg-primary">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-4 text-white  md:flex-row">
        <Link href="/" className="flex items-center space-x-2">
          <BookMarked />
          <span className="text-xl font-bold">{dictionary['Learn English']}</span>
        </Link>

        <div className="mx-4 w-full md:w-auto md:max-w-md md:flex-1">
          <VocabularySearch dictionary={dictionary} />
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
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
        </div>
      </div>
    </header>
  )
}

export default Header
