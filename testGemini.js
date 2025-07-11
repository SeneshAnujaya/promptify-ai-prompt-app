import { GoogleGenAI } from "@google/genai";

async function main() {
  const ai = new GoogleGenAI({});  // No need to pass apiKey if GEMINI_API_KEY is set

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: "Explain how AI works in a few words",
      config: {
        thinkingConfig: {
          thinkingBudget: 0, // disables "thinking" feature to speed up
        },
      },
    });

    console.log("Gemini API response:", response.text);
  } catch (err) {
    console.error("Error calling Gemini API:", err);
  }
}

main();
