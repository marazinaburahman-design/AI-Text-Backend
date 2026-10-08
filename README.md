# AI Text Transformer Backend

Simple Node.js + Express backend for the React/Tailwind AI Text Transformer.

## Features

- Summarize text
- Rewrite text with Simple, Professional, Friendly, or Funny tone
- Translate text to Tamil or English
- Uses Grok through the Groq API
- No database
- CORS configured for the Vite frontend

## Setup

1. Open the `backend` folder in a terminal.
2. Install packages:

```bash
npm install
```

3. Copy `.env.example` to `.env`.
4. Put your Groq API key in `XAI_API_KEY`.
5. Start the backend:

```bash
npm run dev
```

The API runs on `http://localhost:5000`.

## API

`POST /api/transform`

Example body:

```json
{
  "mode": "rewrite",
  "tone": "Professional",
  "target": "Tamil",
  "text": "This is the text to transform."
}
```

The response is:

```json
{
  "success": true,
  "mode": "rewrite",
  "output": "..."
}
```
