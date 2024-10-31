export interface ModelPhonemeCharacter {
  char: string
  confidence: number
  end_offset: number
  start_offset: number
}

export interface ModelCheckPhonemes {
  confident: number
  ground_truth_benchmark: string
  predict: string
  characters: ModelPhonemeCharacter[]
}
