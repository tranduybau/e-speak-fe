import { PhonemeCharacter } from '@/types/phonemes'

import { CharacterWithCategory } from './character-with-category'
import { getCharacterCategories } from './utils'

interface PhonemesResultProps {
  characters: PhonemeCharacter[]
  groundTruthBenchmark: string
}

export default function PhonemesResult({ characters, groundTruthBenchmark }: PhonemesResultProps) {
  const characterCategories = getCharacterCategories(characters, groundTruthBenchmark)

  return (
    <div className="font-mono">
      {characterCategories.map(({ char, category, id }) => (
        <CharacterWithCategory key={id} category={category}>
          {char}
        </CharacterWithCategory>
      ))}
    </div>
  )
}
