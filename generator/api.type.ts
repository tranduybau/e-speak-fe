const { execSync } = require('child_process')
require('dotenv').config()

const apiUrl = process.env.NEXT_PUBLIC_API_URL
const command = `pnpm dlx swagger-typescript-api -p ${apiUrl}/swagger/doc.json -o ./src -n /@types/api.type.ts`

execSync(command, { stdio: 'inherit' })
