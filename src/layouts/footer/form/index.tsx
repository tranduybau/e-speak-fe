'use client'

import { memo } from 'react'
import isEqual from 'react-fast-compare'
import { SendHorizonal } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { useDictionary } from '@/providers/dictionary-provider'

const NewsletterForm = memo(function NewsletterForm() {
  const { dictionary } = useDictionary()
  return (
    <div className="space-y-3 pt-5">
      <Label>{dictionary.Newsletter}</Label>
      <Input
        classNameWrapper="rounded-full p-2 pl-4"
        className="h-full text-body-2-light"
        placeholder={dictionary['Email Address']}
        inputSuffix={
          <Button className="p-[0.625rem]">
            <SendHorizonal size={20} strokeWidth={1.25} />
          </Button>
        }
      />
    </div>
  )
}, isEqual)

export { NewsletterForm }
