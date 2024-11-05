import { getCodePoints } from '@/lib/utils'
import { ModelCheckPhonemes } from '@/types/phonemes'

import ENDPOINTS from './end-points'

interface ICheckPhonemesResponse {
  data: ModelCheckPhonemes | null
  isError: boolean
  message: string
}

const PhonemesService = {
  async checkPhonemes(audioFile: Blob, groundTruth: string): Promise<ICheckPhonemesResponse> {
    const formData = new FormData()
    formData.append('audio_file', audioFile)
    formData.append('ground_truth', getCodePoints(groundTruth))

    return fetch(`${ENDPOINTS.BASE_URL}${ENDPOINTS.PHONEMES.CHECK}`, {
      method: 'POST',
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => ({
        data,
        isError: false,
        message: '',
      }))
      .catch((err) => ({
        data: null,
        isError: true,
        message: err.message,
      }))
  },
}

export default PhonemesService
