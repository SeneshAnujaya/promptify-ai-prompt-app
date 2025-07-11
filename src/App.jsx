import { useState } from "react";
import PromptForm from "./components/PromptForm";
import axios from "axios";
import { GoogleGenAI } from "@google/genai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

function App() {
  const [prompt, setPrompt] = useState("");

  // const generatePrompt = (topic) => {
  //   const staticPrompt = `Write a creative story about ${topic} in the style of a fantasy novel.`;
  //   setPrompt(staticPrompt);
  // };

  const generatePrompt = async (topic) => {
    try {
      const ai = new GoogleGenAI({
        apiKey: import.meta.env.VITE_GEMINI_API_KEY,
      });

      async function listModels() {
        const models = await ai.models.list();
        console.log("Available models:", models);
      }

      // Directly call models.generateContent with model name and contents
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [
          {
            role: "user",
            parts: [
              { text: `Generate a creative prompt for a story about ${topic}` },
            ],
          },
        ],
        // optional config to disable thinking if you want
        config: {
          thinkingConfig: {
            thinkingBudget: 0,
          },
        },
      });

      // The response text is here:
      const text = response.candidates[0]?.content?.parts[0]?.text;

      setPrompt(text || "No response from Gemini.");
    } catch (error) {
      console.error("Gemini API Error:", error);
      setPrompt("Something went wrong while generating the prompt.");
    }
  };

  return (
    <div className="w-full  mx-auto p-6 h-screen flex flex-col flex-wrap justify-center items-center bg-indigo-950">
      <h1 className="text-3xl font-medium mb-8 text-blue-400">
        Promptify AI Prompt Generator
      </h1>
      <PromptForm onGenerate={generatePrompt} />
      {prompt && (
        <div className="mt-6 p-4 bg-indigo-900 rounded">
          <h2 className="font-semibold mb-2 text-blue-400">
            Generated Prompt:
          </h2>
          <p className="text-slate-300">{prompt}</p>
        </div>
      )}
    </div>
  );
}

export default App;
