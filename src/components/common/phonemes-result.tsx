import { PropsWithChildren } from 'react'

import { PhonemeCharacter } from '@/types/phonemes'

type Category = 'green' | 'yellow' | 'red'

function Green({ children }: PropsWithChildren) {
  return <span className="text-green-500">{children}</span>
}

function Yellow({ children }: PropsWithChildren) {
  return <span className="text-yellow-500">{children}</span>
}

function Red({ children }: PropsWithChildren) {
  return <span className="text-red-500">{children}</span>
}

interface PhonemesResultProps {
  characters: PhonemeCharacter[]
  groundTruthBenchmark: string
}

export default function PhonemesResult({ characters, groundTruthBenchmark }: PhonemesResultProps) {
  const characterCategories: { char: string; category: Category }[] = []

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

  return (
    <div>
      {characterCategories.map(({ char, category }) => {
        switch (category) {
          case 'green':
            return <Green>{char}</Green>
          case 'yellow':
            return <Yellow>{char}</Yellow>
          case 'red':
            return <Red>{char}</Red>
          default:
            return <Green>{char}</Green>
        }
      })}
    </div>
  )
}
