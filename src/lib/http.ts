import { normalizePath } from '@/lib/utils'

type CustomOption = Omit<RequestInit, 'method'> & {
  baseUrl?: string | undefined
}

export class HttpError extends Error {
  status: number

  payload?: any

  header?: any

  constructor({ status, payload, header }: { status: number; payload: any; header: any }) {
    super('http Error')
    this.status = status
    this.payload = payload
    this.header = header
  }
}

const isClient = () => typeof window !== 'undefined'
const request = async <Response>(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  url: string,
  options?: CustomOption | undefined,
) => {
  const body = options?.body ? JSON.stringify(options.body) : undefined
  const baseHeader = {
    'Content-Type': 'application/json',
  }
  const baseUrl =
    options?.baseUrl === undefined ? 'http://103.163.214.192:9000/api/' : options.baseUrl

  const fullUrl = `${baseUrl}${normalizePath(url)}`
  const res = await fetch(fullUrl, {
    ...options,
    headers: {
      ...baseHeader,
      ...options?.headers,
    },
    body,
    method,
  })

  const payload: Response = await res.json()
  const data = {
    status: res.status,
    payload,
    header: res.headers,
  }
  if (!res.ok) {
    throw new HttpError({
      status: res.status,
      payload: data.payload,
      header: res.headers,
    })
  }

  if (isClient()) {
    const normalizeUrl = normalizePath(url)
    if (normalizeUrl === 'api/auth/login') {
      localStorage.setItem('isLogin', 'true')
    } else if (normalizeUrl === 'api/auth/logout') {
      localStorage.removeItem('isLogin')
    }
  }
  return data
}

const http = {
  get<Response>(url: string, options?: Omit<CustomOption, 'body'> | undefined) {
    return request<Response>('GET', url, options)
  },
  post<Response>(url: string, body: any, options?: Omit<CustomOption, 'body'> | undefined) {
    return request<Response>('POST', url, { ...options, body })
  },
  put<Response>(url: string, body: any, options?: Omit<CustomOption, 'body'> | undefined) {
    return request<Response>('PUT', url, { ...options, body })
  },
  delete<Response>(url: string, body: any, options?: Omit<CustomOption, 'body'> | undefined) {
    return request<Response>('DELETE', url, { ...options, body })
  },
}

export default http
