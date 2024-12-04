import {
  IVocabulariesRequest,
  ModelsPaginationMeta,
  ModelsPaginationWrapper,
  ModelsVocabulary,
} from '@/@types/api.type'

import ENDPOINTS from './end-points'

interface IVocabulariesResponse {
  isError: boolean
  data: ModelsVocabulary[] | null
  metadata: ModelsPaginationMeta | null
  message: string
}

const VocabulariesService = {
  async getVocabs(req: IVocabulariesRequest): Promise<IVocabulariesResponse> {
    const url = new URL(`${ENDPOINTS.BASE_URL}${ENDPOINTS.GET_VOCABULARIES}`)
    Object.entries(req).forEach(([key, value]) => {
      url.searchParams.append(key, value)
    })

    return fetch(url)
      .then((res) => res.json())
      .then((data: ModelsPaginationWrapper) => ({
        isError: false,
        data: data.data as ModelsVocabulary[],
        metadata: data.metadata!,
        message: '',
      }))
      .catch((error) => ({
        isError: true,
        message: error.message,
        data: null,
        metadata: null,
      }))
  },
}

export default VocabulariesService
