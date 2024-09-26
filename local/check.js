const fs = require('fs')

const enJson = JSON.parse(fs.readFileSync('src/dictionaries/en.json', 'utf8'))
const viJson = JSON.parse(fs.readFileSync('src/dictionaries/vi.json', 'utf8'))

// VI
const viMissingKeys = Object.keys(enJson).filter(
  key => !viJson.hasOwnProperty(key)
)
console.log('🚀 ~ viMissingKeys:', viMissingKeys)
const viExtraKeys = Object.keys(viJson).filter(
  key => !enJson.hasOwnProperty(key)
)
console.log('🚀 ~ viExtraKeys:', viExtraKeys)
