import React from 'react'

import { DictionaryProps } from '@/types/common'

function Header({ dictionary }: DictionaryProps) {
  return (
    <header className="container sticky top-0 z-10 flex items-center justify-between bg-neutral-3 py-4">
      <span>LOGO</span>

      {dictionary['Contact Us']}
    </header>
  )
}

export default Header
