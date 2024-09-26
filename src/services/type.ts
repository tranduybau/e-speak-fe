export interface APIResponsive<T> {
  data: T
  message: string
  status: number
  isError: boolean
}
