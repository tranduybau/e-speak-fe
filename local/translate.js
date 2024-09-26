const fs = require('fs')
const path = require('path')
const translate = require('node-google-translate-skidz')

// Đọc file JSON chứa các khóa tiếng Anh
const englishFile = path.join('src/dictionaries', 'en.json')
const englishTranslations = JSON.parse(fs.readFileSync(englishFile, 'utf-8'))

// Danh sách các ngôn ngữ cần dịch (mã ngôn ngữ ISO 639-1)
const targetLanguages = ['vi'] // Ví dụ: Việt, Pháp, Tây Ban Nha, Đức

function translateToLanguage(text, targetLanguage) {
  return new Promise((resolve, reject) => {
    translate(
      {
        text,
        source: 'en',
        target: targetLanguage,
      },
      function (result) {
        resolve(result.translation)
      },
    )
  })
}

async function generateTranslations() {
  for (const lang of targetLanguages) {
    const translations = {}

    for (const [key, value] of Object.entries(englishTranslations)) {
      translations[key] = await translateToLanguage(value, lang)
    }

    // Tạo thư mục nếu chưa tồn tại
    const outputDir = path.join('src/dictionaries')
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true })
    }

    // Ghi file JSON cho ngôn ngữ đích
    const outputFile = path.join(outputDir, `${lang}.json`)
    fs.writeFileSync(outputFile, JSON.stringify(translations, null, 2))

    console.log(`Translations for ${lang} generated successfully.`)
  }
}

generateTranslations().catch(console.error)
