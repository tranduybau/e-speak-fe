import { AxiosError } from 'axios'

import { getCodePoints } from '@/lib/utils'

import ENDPOINTS from '../end-points'
import axiosClient from '..'

const PhonemesService = {
  async check(audioFile: Blob, groundTruth: string): Promise<any> {
    const formData = new FormData()
    formData.append('audio_file', audioFile)
    formData.append('ground_truth', getCodePoints(groundTruth))

    return axiosClient
      .post<any>(ENDPOINTS.PHONEMES.CHECK, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        return res.data
      })
      .catch((error: AxiosError<any>) => {
        return error.response?.data
      })
  },
}

export default PhonemesService
