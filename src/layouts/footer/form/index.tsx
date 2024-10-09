'use client'

import { memo } from 'react'
import isEqual from 'react-fast-compare'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { useDictionary } from '@/providers/dictionary-provider'

const NewsletterForm = memo(function NewsletterForm() {
  const { dictionary } = useDictionary()
  return (
    <div className="space-y-3 pt-5">
      <Label>{dictionary.Newsletter}</Label>
      <Input className="h-full text-body-2-light" placeholder={dictionary['Email Address']} />
    </div>
  )
}, isEqual)

export { NewsletterForm }
