import { transformText } from "../services/aiService.js";

const allowedModes = ["summarize", "rewrite", "translate"];
const allowedTones = ["Simple", "Professional", "Friendly", "Funny"];
const allowedTargets = ["Tamil", "English"];
const maxTextLength = 20000;

export async function transform(req, res, next) {
  try {
    const { mode, text, tone, target } = req.body;

    if (!mode || !allowedModes.includes(mode)) {
      return res.status(400).json({ message: "A valid mode is required." });
    }

    if (typeof text !== "string" || !text.trim()) {
      return res.status(400).json({ message: "Please provide some text to transform." });
    }

    if (text.length > maxTextLength) {
      return res.status(400).json({ message: `Text is too long. Please keep it under ${maxTextLength} characters.` });
    }

    if (mode === "rewrite" && !allowedTones.includes(tone)) {
      return res.status(400).json({ message: "A valid rewrite tone is required." });
    }

    if (mode === "translate" && !allowedTargets.includes(target)) {
      return res.status(400).json({ message: "A valid translation target is required." });
    }

    const output = await transformText({
      mode,
      text: text.trim(),
      tone,
      target,
    });

    return res.json({
      success: true,
      mode,
      output,
    });
  } catch (error) {
    next(error);
  }
}
