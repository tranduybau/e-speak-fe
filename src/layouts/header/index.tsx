import { DictionaryProps } from '@/types/common'

function Header({ dictionary }: DictionaryProps) {
  return (
    <header className="bg-neutral-3 container sticky top-0 z-10 flex items-center justify-between py-4">
      <span>LOGO</span>

      {dictionary.hello}
    </header>
  )
}

export default Header
