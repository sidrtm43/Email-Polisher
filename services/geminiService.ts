
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

interface GenerateEmailParams {
  rawContent: string;
  tone: string;
  replyToEmail?: string;
}

export const generateEmail = async ({
  rawContent,
  tone,
  replyToEmail,
}: GenerateEmailParams): Promise<string> => {
  try {
    const prompt = `
      You are an expert email writing assistant. Your task is to rewrite the user's raw thoughts into a professional, polished email with a specific tone.

      **Tone:** ${tone}

      **User's Raw Thoughts:**
      ${rawContent}

      ${replyToEmail ? `**The user is replying to this email, use it for context:**\n${replyToEmail}\n` : ''}

      Rewrite the user's thoughts into a complete email. Only output the final email content, without any introductory phrases like "Here is the rewritten email:" or any other commentary. Do not wrap the output in markdown code blocks.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    return response.text.trim();
  } catch (error) {
    console.error("Error generating email:", error);
    throw new Error("Failed to generate email. Please check your API key and try again.");
  }
};
