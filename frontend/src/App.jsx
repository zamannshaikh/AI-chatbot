import io from "socket.io-client";
import { useEffect, useState } from "react"
import Sidebar from "./components/Sidebar"
import ChatWindow from "./components/ChatWindow"
import InputBar from "./components/InputBar"
import "./App.css"



// Dummy initial messages for the current chat
const initialMessages = [
  { id: 1, text: "Hello! How can I help you today?", sender: "ai", timestamp: new Date() },
  { id: 2, text: "I need help with React components", sender: "user", timestamp: new Date() },
  {
    id: 3,
    text: "I'd be happy to help you with React components! What specific aspect would you like to learn about?",
    sender: "ai",
    timestamp: new Date(),
  },
]



function App() {
  const [messages, setMessages] = useState(initialMessages)
  const [isTyping, setIsTyping] = useState(false)
  const [socket, setSocket] = useState(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)


  useEffect(()=>{
    const newSocket = io("http://localhost:3000");
    setSocket(newSocket);
    newSocket.on("response",(data)=>{
      const aiMessage = {
        id: Date.now(),
        text: data,
        sender: "ai",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiMessage])
      setIsTyping(false)
    })
  },[])


  const handleSendMessage = (messageText) => {
    // Add user message immediately
    const userMessage = {
      id: Date.now(),
      text: messageText,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setIsTyping(true)
    socket.emit("message", messageText);

   
  }

  const generateAIResponse = (userMessage) => {
    const responses = [
      "That's a great question! Let me help you with that.",
      "I understand what you're looking for. Here's what I think...",
      "Based on your question, I'd recommend the following approach...",
      "That's an interesting point. Let me break it down for you.",
      "I can definitely help you with that. Here's my suggestion...",
    ]
    return responses[Math.floor(Math.random() * responses.length)]
  }

  const handleSessionSelect = (sessionId) => {
    setCurrentSessionId(sessionId)
    // In a real app, you'd load messages for this session
    // For now, we'll just keep the current messages
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }


  return (
    <div className="chatbot-app">
      
      <div className={`main-content ${isSidebarOpen ? "sidebar-open" : "sidebar-closed"}`}>
        <ChatWindow messages={messages} isTyping={isTyping} onToggleSidebar={toggleSidebar} />
        <InputBar onSendMessage={handleSendMessage} />
      </div>
    </div>
  )
}

export default App
