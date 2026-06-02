// Print the raw Gemini response (incl. quota details) for one call.
import fs from 'fs'
import CONFIG from '../src/config.js'
const key = (fs.readFileSync('.env', 'utf8').match(/^GEMINI_API_KEY=(.+)$/m)?.[1] || '').trim()
const r = await fetch(
  `https://generativelanguage.googleapis.com/v1beta/models/${CONFIG.chatbot.model}:generateContent`,
  {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-goog-api-key': key },
    body: JSON.stringify({ contents: [{ role: 'user', parts: [{ text: 'hi' }] }] }),
  },
)
console.log('STATUS', r.status)
console.log(await r.text())
