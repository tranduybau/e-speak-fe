import { PhonemeCharacter } from '@/types/phonemes'

export type Category = 'green' | 'yellow' | 'red'
export type CharacterCategory = { char: string; category: Category }

export const getCharacterCategories = (
  characters: PhonemeCharacter[],
  groundTruthBenchmark: string,
): CharacterCategory[] => {
  const characterCategories: CharacterCategory[] = []

  let isCurrentRed = false
  let currentCharIndex = 0
  groundTruthBenchmark.split('').forEach((char) => {
    const { char: truthChar, confidence } = characters[currentCharIndex]
    if (truthChar === char) currentCharIndex += 1

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
          })
        } else if (confidence >= 0.8) {
          characterCategories.push({
            char,
            category: 'green',
          })
        } else {
          characterCategories.push({
            char,
            category: 'yellow',
          })
        }
    }
  })

  return characterCategories
}
