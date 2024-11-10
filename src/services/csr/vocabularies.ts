import { AxiosError } from 'axios'

import { ModelsVocabulary } from '@/@types/api.type'
import devLog from '@/lib/dev-log'
import { randomId } from '@/lib/random-id'

import ENDPOINTS from '../end-points'
import axiosClient from '..'

interface IVocabulary extends ModelsVocabulary {
  id: string
}

interface IVocabularyResponse {
  isError: boolean
  data: IVocabulary[]
}

const VocabulariesServices = {
  searchWord(word: string): Promise<IVocabularyResponse> {
    return axiosClient
      .get(ENDPOINTS.SEARCH_WORD, {
        params: {
          word,
        },
      })
      .then((res) => ({
        data: res.data.map((item: ModelsVocabulary) => ({
          ...item,
          id: randomId(),
        })),
        isError: false,
      }))
      .catch((error: AxiosError<any>) => {
        devLog(error)

        return {
          isError: true,
          data: [],
        }
      })
  },
}

export default VocabulariesServices
