import dotenv from 'dotenv'
dotenv.config()
export const HTTP_ENDPOINT = process.env.HTTP_ENDPOINT || 'https://api.misiki.in'
export const WWW_URL = process.env.WWW_URL || 'https://homefood.tech'
