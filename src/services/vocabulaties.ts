import { ModelsVocabulary } from '@/@types/api.type'

import ENDPOINTS from './end-points'

interface IVocabularyResponse {
  data: ModelsVocabulary | null
  isError: boolean
  message: string
}

const VocabulariesService = {
  getWordDetails(word: string): Promise<IVocabularyResponse> {
    return fetch(`${ENDPOINTS.BASE_URL}${ENDPOINTS.DETAIL_WORD(word)}`)
      .then((res) => res.json())
      .then((data) => ({
        data,
        isError: false,
        message: '',
      }))
      .catch((error) => ({
        data: null,
        isError: true,
        message: error.message,
      }))
  },
}

export default VocabulariesService
