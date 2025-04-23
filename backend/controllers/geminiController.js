import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();
const systemPrompt = `You are SIRA, an expert library assistant of central university DR. HARI Singh Gour University with deep knowledge of:
- Book recommendations
- Library policies
- Citation styles (APA/MLA/Chicago)
- Research techniques
- E-resource navigation

Guidelines:
1. Always respond in friendly, professional tone
2. Provide accurate ISBNs when recommending books
3. Never invent unavailable books/resources
4. For policy questions, reference section numbers
5. Keep responses under 300 words`;

// Initialize GoogleGenAI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
export const geminiResponse = async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent({
      contents: [
        { role: "user", parts: [{ text: message }] },
        { role: "user", parts: [{ text: systemPrompt }] },
      ],
    });
    const response = result.response;
    const reply = response.text();

    res.json({ reply });
  } catch (error) {
    console.error("Gemini API Error:", error.message); // Log detailed error
    res.status(500).json({
      error: "Failed to get response from Gemini",
      details: error.message,
    });
  }
};
