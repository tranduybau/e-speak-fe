import { ModelsPaginationMeta, ModelsPaginationWrapper, ModelsVocabulary } from '@/@types/api.type'

import ENDPOINTS from './end-points'

interface IVocabulariesRequest {
  /** limit */
  limit?: string
  /** page_number */
  page_number?: string
  /** Ex: Personal Traits */
  topic?: string
  /** Ex: A1 */
  level?: string
  /** Ex: persistent */
  text?: string
  /** is_strict = true return only one match */
  is_strict?: boolean
}

interface IVocabulariesResponse {
  isError: boolean
  data: ModelsVocabulary[] | null
  metadata: ModelsPaginationMeta | null
  message: string
}

const VocabulariesService = {
  async getVocabs(req: IVocabulariesRequest): Promise<IVocabulariesResponse> {
    const url = new URL(`${ENDPOINTS.BASE_URL}${ENDPOINTS.GET_VOCABS}`)
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
