require("dotenv").config();
const { text } = require("stream/consumers");
const app = require("./src/app");
const generateResponse = require("./src/services/ai.service");

const { createServer } = require("http");
const { Server } = require("socket.io");

const httpServer = createServer(app);
const io = new Server(httpServer, { 
  cors:{
    origin:"http://localhost:5173",
  }
 });

 const chathistory = []; // In-memory chat history

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on("message", async (msg) => {
    
    console.log("Message received:", msg?.prompt || msg);
    chathistory.push({
      role: "user",
      parts:[{text:msg.prompt || msg}]
    })

    if (!msg || (typeof msg === "object" && !msg.prompt)) {
      console.error("No valid message received from client!");
      return;
    }

    try {
      // Pass the actual prompt string to generateResponse
      const prompt = typeof msg === "object" ? msg.prompt : msg;
      const aiResponse = await generateResponse(chathistory);
      chathistory.push({
        role:"model",
        parts:[{text:aiResponse}]
      })
      socket.emit("response", aiResponse);
    } catch (err) {
      console.error("AI Error:", err);
      socket.emit("response", { error: "Failed to get AI response" });
    }
  });
});

httpServer.listen(3000, () => {
  console.log("Server is running on port 3000");
});
