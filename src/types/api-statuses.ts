export enum ApiStatuses {
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
  BAD_REQUEST = 400,
}

export interface ApiDataResponse {
  statusCode: number
  message: string
}

export const DEFAULT_API_RESPONSE: ApiDataResponse = {
  statusCode: ApiStatuses.BAD_REQUEST,
  message: '',
}
