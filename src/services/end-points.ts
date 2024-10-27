const ENDPOINTS = {
  BASE_URL: 'http://localhost:9000/api',

  // Auth
  SIGN_IN: '/users/login',
  REFRESH_TOKEN: '/users/refresh',

  VOCABULARY: {
    GET_DETAIL: (id: string) => `vocabularies/detail/${id}`,
  },

  PHONEMES: {
    CHECK: '/check-phonemes',
  },
}

export default ENDPOINTS
