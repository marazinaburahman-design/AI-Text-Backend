import "dotenv/config";
import OpenAI from "openai";

const client = process.env.XAI_API_KEY
  ? new OpenAI({
      apiKey: process.env.XAI_API_KEY,
      baseURL: process.env.XAI_BASE_URL,
    })
  : null;

function createPrompt({ mode, text, tone, target }) {
 if (mode === "summarize") {
  return `Summarize the following text as 3-5 concise bullet points.

Rules:
- Start every bullet with "• "
- One short sentence per bullet
- Put each bullet on a new line
- Return only the bullets, with no introduction or conclusion

TEXT:
${text}`;
}

  if (mode === "rewrite") {
    return `Rewrite the following text in a ${tone} tone. Keep the original meaning and important information. Improve clarity, grammar, and natural flow. Return only the rewritten text, with no introduction or explanation.\n\nTEXT:\n${text}`;
  }

  return `Translate the following text into ${target}. Preserve the meaning, context, and natural tone. Return only the translation, with no introduction or explanation.\n\nTEXT:\n${text}`;
}

export async function transformText({ mode, text, tone, target }) {
  if (!client) {
    const error = new Error("XAI_API_KEY is missing. Add your Groq API key to backend/.env.");
    error.status = 500;
    throw error;
  }

  const prompt = createPrompt({ mode, text, tone, target });

// this is where the ai is responding 
  const response = await client.responses.create({
    model: process.env.XAI_MODEL,
    input: prompt,
    temperature: 0.2,
    store: false,
  });

  const output = response.output_text?.trim();

  if (!output) {
    const error = new Error("Groq returned an empty response.");
    error.status = 502;
    throw error;
  }

  return output;
}
