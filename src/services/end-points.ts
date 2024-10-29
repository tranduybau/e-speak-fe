const ENDPOINTS = {
  BASE_URL: `${process.env.NEXT_PUBLIC_API_URL}/api`,

  // Auth
  SIGN_IN: '/users/login',
  REFRESH_TOKEN: '/users/refresh',

  // Vocabularies
  SEARCH_WORD: '/vocabularies/search',
  DETAIL_WORD: (id: string) => `/vocabularies/detail/${id}`,
}

export default ENDPOINTS
