import {
  ModelsPaginationMeta,
  ModelsPaginationWrapper,
  ModelsVocabulary as SwaggerModelsVocabulary,
} from '@/@types/api.type'

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

interface ModelsVocabulary extends SwaggerModelsVocabulary {
  id: number
}

type IVocabulariesResponse =
  | {
      isError: false
      data: ModelsVocabulary[]
      metadata: ModelsPaginationMeta
    }
  | {
      isError: true
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
      }))
  },
}

export default VocabulariesService
