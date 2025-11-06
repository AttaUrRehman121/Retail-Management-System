
import { GoogleGenAI } from "@google/genai";

// FIX: Initialize GoogleGenAI client directly with the API key from environment variables.
// The API key is injected via process.env.API_KEY and is a hard requirement.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

export const generateProductDescription = async (productName: string): Promise<string> => {
  // The API key check was removed from here as it's redundant.
  // The client initialization above handles the API key requirement.

  try {
    const prompt = `Generate a short, appealing product description for a retail store POS system. The product is named "${productName}". The description should be one or two sentences long, perfect for a product catalog.`;
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    // FIX: Use response.text which is the correct way to get text from the response.
    return response.text;
  } catch (error) {
    console.error("Error generating product description:", error);
    return "Failed to generate description due to an API error.";
  }
};
