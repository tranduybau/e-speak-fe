import { ModelPhonemeCharacter } from '@/types/phonemes'

import { getCharacterCategories } from './utils'

interface PhonemesResultProps {
  characters: ModelPhonemeCharacter[]
  groundBenchmark: string
}

export default function PhonemesResult({ characters, groundBenchmark }: PhonemesResultProps) {
  const characterCategories = getCharacterCategories(characters, groundBenchmark)

  return (
    <div className="font-mono">
      {characterCategories.map(({ char, textColorClassName, id }) => (
        <span key={id} className={textColorClassName}>
          {char}
        </span>
      ))}
    </div>
  )
}
