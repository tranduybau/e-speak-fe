const ENDPOINTS = {
  BASE_URL: `${process.env.NEXT_PUBLIC_API_URL}/api`,

  // Auth
  SIGN_IN: '/users/login',
  REFRESH_TOKEN: '/users/refresh',

  // Vocabularies
  SEARCH_WORD: '/vocabularies/search',
  DETAIL_WORD: (word: string) => `/vocabularies/detail/${word}`,

  PHONEMES: {
    CHECK: '/check-phonemes',
  },
}

export default ENDPOINTS
