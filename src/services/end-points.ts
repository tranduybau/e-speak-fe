const ENDPOINTS = {
  BASE_URL: `${process.env.NEXT_PUBLIC_API_URL}/api`,

  // Auth
  SIGN_IN: '/users/login',
  REFRESH_TOKEN: '/users/refresh',

  // Vocabularies
  GET_VOCABULARIES: '/vocabularies',

  // Phonemes
  PHONEMES: {
    CHECK: '/check-phonemes',
  },
}

export default ENDPOINTS
