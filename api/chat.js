// Vercel Serverless Function — POST /api/chat
// The Gemini API key lives ONLY here (env var), never in the browser.
// If the key is missing or Gemini errors, we return 200 with { fallback: true }
// so the client can answer locally instead of showing an error.

import CONFIG from '../src/config.js'
import { buildSystemPrompt } from '../src/lib/rag.js'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const apiKey = process.env.GEMINI_API_KEY
  const model = CONFIG.chatbot?.model || 'gemini-2.0-flash'

  // body may arrive parsed (Vercel) or as a string (some runtimes)
  let body = req.body
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body)
    } catch {
      body = {}
    }
  }
  const message = (body?.message || '').toString().slice(0, 1000)
  if (!message) return res.status(400).json({ error: 'message required' })

  // No key configured → tell client to use its local fallback.
  if (!apiKey) {
    return res.status(200).json({ fallback: true, reason: 'no_key' })
  }

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`
    const r = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-goog-api-key': apiKey },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: buildSystemPrompt(CONFIG) }] },
        contents: [{ role: 'user', parts: [{ text: message }] }],
        generationConfig: {
          temperature: 0.5,
          maxOutputTokens: 220, // keep answers short → less token waste, snappier replies
          topP: 0.9,
          thinkingConfig: { thinkingBudget: 0 }, // disable "thinking" → faster + complete answers
        },
      }),
    })

    if (!r.ok) {
      return res.status(200).json({ fallback: true, reason: `gemini_${r.status}` })
    }

    const data = await r.json()
    const reply =
      data?.candidates?.[0]?.content?.parts?.map((p) => p.text).join('').trim() || ''

    if (!reply) return res.status(200).json({ fallback: true, reason: 'empty' })
    return res.status(200).json({ reply })
  } catch (err) {
    return res.status(200).json({ fallback: true, reason: 'exception' })
  }
}
