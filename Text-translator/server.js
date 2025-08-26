// server.js
import express from 'express'
import fetch from 'node-fetch'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const app = express()
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.post('/api/translate', async (req, res) => {
  try {
    const { text, target } = req.body
    const url = process.env.VITE_RAPIDAPI_URL
    const apiKey = process.env.VITE_RAPIDAPI_KEY
    const host = process.env.VITE_RAPIDAPI_HOST

    const body = new URLSearchParams({
      source_language: 'en',
      target_language: target,
      text,
    })

    const r = await fetch(url, {
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'X-RapidAPI-Key': apiKey,
        'X-RapidAPI-Host': host,
      },
      body,
    })

    const raw = await r.text()
    let json = {}
    try { json = JSON.parse(raw) } catch {}
    if (!r.ok) {
      return res.status(r.status).json({ error: json?.message || raw })
    }
    res.json(json)
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

const PORT = 5174
app.listen(PORT, () => console.log(`Proxy on http://localhost:${PORT}`))
