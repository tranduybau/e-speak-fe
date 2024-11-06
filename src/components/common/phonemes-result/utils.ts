import { randomId } from '@/lib/random-id'
import { ModelPhonemeCharacter } from '@/types/phonemes'

export type CharacterCategory = {
  char: string
  textColorClassName: string
  id: string
}

const generateCharacterCategory = (
  char: string,
  isCurrentRed: boolean,
  confidence: number,
): CharacterCategory => {
  if (isCurrentRed) {
    return {
      char,
      textColorClassName: 'text-red-500',
      id: randomId(),
    }
  }
  if (confidence >= 0.8) {
    return {
      char,
      textColorClassName: 'text-green-500',
      id: randomId(),
    }
  }
  return {
    char,
    textColorClassName: 'text-yellow-500',
    id: randomId(),
  }
}

export const getCharacterCategories = (
  characters: ModelPhonemeCharacter[],
  groundBenchmark: string,
): CharacterCategory[] => {
  const characterCategories: CharacterCategory[] = []

  let isCurrentRed = false
  let currentCharIndex = 0
  groundBenchmark.split('').forEach((char) => {
    let truthChar: string = ''
    let confidence: number = 0

    if (currentCharIndex < characters.length) {
      truthChar = characters[currentCharIndex].char
      confidence = characters[currentCharIndex].confidence
      if (truthChar === char) currentCharIndex += 1
    }

    switch (char) {
      case ',':
        break
      case '[':
        isCurrentRed = true
        break
      case ']':
        isCurrentRed = false
        break
      default:
        characterCategories.push(generateCharacterCategory(char, isCurrentRed, confidence))
    }
  })

  return characterCategories
}
