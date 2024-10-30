import { randomId } from '@/lib/random-id'
import { PhonemeCharacter } from '@/types/phonemes'

export type Category = 'green' | 'yellow' | 'red'
export type CharacterCategory = { char: string; category: Category; id: string }

export const getCharacterCategories = (
  characters: PhonemeCharacter[],
  groundTruthBenchmark: string,
): CharacterCategory[] => {
  const characterCategories: CharacterCategory[] = []

  let isCurrentRed = false
  let currentCharIndex = 0
  groundTruthBenchmark.split('').forEach((char) => {
    let truthChar: string = ''
    let confidence: number = 0

    if (currentCharIndex < characters.length) {
      truthChar = characters[currentCharIndex].char
      confidence = characters[currentCharIndex].confidence
      if (truthChar === char) currentCharIndex += 1
    }

    switch (char) {
      case ',':
        return
      case '[':
        isCurrentRed = true
        return
      case ']':
        isCurrentRed = false
        return
      default:
        if (isCurrentRed) {
          characterCategories.push({
            char,
            category: 'red',
            id: randomId(),
          })
        } else if (confidence >= 0.8) {
          characterCategories.push({
            char,
            category: 'green',
            id: randomId(),
          })
        } else {
          characterCategories.push({
            char,
            category: 'yellow',
            id: randomId(),
          })
        }
    }
  })

  return characterCategories
}
