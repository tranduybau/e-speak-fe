import React, { memo } from 'react'
import isEqual from 'react-fast-compare'

import { DictionaryProps } from '@/types/common'

function Footer({ dictionary }: DictionaryProps) {
  return (
    <footer className="relative overflow-hidden pt-[64px]">
      <div className="container">
        <div>Logo</div>
        <div>{dictionary['About Us']}</div>
      </div>
    </footer>
  )
}

export default memo(Footer, isEqual)
