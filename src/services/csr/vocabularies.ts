import { AxiosError } from 'axios'

import { VocabularyDetail } from '@/types/vocabulary'

import ENDPOINTS from '../end-points'
import axiosClient from '..'

const VocabulariesService = {
  async getDetail(id: string): Promise<VocabularyDetail> {
    return axiosClient
      .get<VocabularyDetail>(ENDPOINTS.VOCABULARY.GET_DETAIL(id))
      .then((res) => {
        return res.data
      })
      .catch((error: AxiosError<any>) => {
        return error.response?.data
      })
  },
}

export default VocabulariesService
