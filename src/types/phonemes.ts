export interface PhonemeCharacter {
  char: string
  confidence: number
  end_offset: number
  start_offset: number
}

export interface CheckPhonemesResult {
  confident: number
  ground_truth_benchmark: string
  predict: string
  characters: PhonemeCharacter[]
}
