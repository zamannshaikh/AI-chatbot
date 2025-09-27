// const { GoogleGenAI } = require("@google/genai");

// const ai = new GoogleGenAI({});

// async function generateResponse(prompt) {
//   const response = await ai.models.generateContent({
//     model: "gemini-2.5-flash",
//     contents: prompt,
//   });
//     return response.text;
// }

// module.exports =  generateResponse ;



const { GoogleGenAI } = require("@google/genai");

// No need to pass API key explicitly if GEMINI_API_KEY is set in env, per docs.
// The client will pick it up automatically.
const ai = new GoogleGenAI({});

async function generateResponse(prompt) {
  console.log("Generating response for prompt:", prompt); 
  if (!prompt || typeof prompt !== "string") {
    throw new Error("Prompt (contents) must be a nonempty string");
  }

  // Using the docs’ pattern
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  // In docs, `response.text` is used
  console.log("AI response:", response.text);
  return response.text;
}

module.exports = generateResponse;
