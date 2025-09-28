



const { GoogleGenAI } = require("@google/genai");

// No need to pass API key explicitly if GEMINI_API_KEY is set in env, per docs.
// The client will pick it up automatically.
const ai = new GoogleGenAI({});

async function generateResponse(chathistory) {
  console.log("Generating response for prompt:", chathistory); 

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: chathistory,

    // config: {
    //   systemInstruction:"you are a medical assistant. you are helpful and always provide accurate information. if you don't know the answer, say 'i don't know' also if the user ask any question which is not related to medical or about health you have to say 'i can't help you with this i can only asist you with medical questions'.",
    // }
  });

 
  console.log("AI response:", response.text);
  return response.text;
}

module.exports = generateResponse;
