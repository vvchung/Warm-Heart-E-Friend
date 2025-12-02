import { GoogleGenAI, Chat } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";

// Initialize Gemini with the environment variable API Key
const apiKey = process.env.API_KEY;
const genAI = new GoogleGenAI({ apiKey: apiKey || '' });

let chatSession: Chat | null = null;

export const getChatSession = async (): Promise<Chat> => {
  if (!apiKey) {
    console.error("API_KEY is missing from environment variables");
    throw new Error("API Key missing");
  }

  if (!chatSession) {
    chatSession = genAI.chats.create({
        model: "gemini-2.5-flash",
        config: {
            systemInstruction: SYSTEM_INSTRUCTION,
            temperature: 0.7, // Warm and creative but stable
            maxOutputTokens: 1000,
        }
    });
  }
  return chatSession;
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  try {
    const session = await getChatSession();
    const result = await session.sendMessage({ message });
    return result.text || "抱歉，我現在有點累（連線問題），請稍後再試。";
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};

export const resetSession = () => {
    chatSession = null;
};