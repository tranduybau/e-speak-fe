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
    <div>
      {characterCategories.map(({ char, category }, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <CharacterWithCategory key={index} category={category}>
          {char}
        </CharacterWithCategory>
      ))}
    </div>
  )
}
