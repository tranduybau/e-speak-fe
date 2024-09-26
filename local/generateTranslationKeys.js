const fs = require('fs');
const path = require('path');
const glob = require('glob');

const sourceFiles = glob.sync('src/**/*.{ts,tsx}');

const translationKeys = {};

const regex = /dictionary(?:\.(\w+)|(?:\[(["'`])((?:(?!\2)[^\\]|\\.)*?)\2\])|(?:\s*\[\s*(["'`])([^]*?)\4\s*\]\s*))/gs;

sourceFiles.forEach((file) => {
  const content = fs.readFileSync(file, 'utf-8');
  let match;
  while ((match = regex.exec(content)) !== null) {
    const key = match[1] || match[3] || match[5];
    if (key) {
      const cleanedKey = key
        .replace(/\\(['"`])/g, '$1')
        .replace(/\s+/g, ' ')
        .trim();
      if (cleanedKey && !cleanedKey.startsWith('/')) {
        translationKeys[cleanedKey] = cleanedKey;
      }
    }
  }
});

// Language-specific output directories
const outputDirs = {
  // vi: 'src/dictionaries', // Adjust the output directory for Vietnamese
  en: 'src/dictionaries', // Adjust the output directory for English
  // Add more languages as needed
};

Object.keys(outputDirs).forEach((lang) => {
  const outputDir = outputDirs[lang];

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const output = path.join(outputDir, `${lang}.json`);
  fs.writeFileSync(output, JSON.stringify(translationKeys, null, 2));
});
