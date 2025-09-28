"use client"

import { useState } from "react"

function Sidebar({ sessions, currentSessionId, onSessionSelect, isOpen, onToggle }) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredSessions = sessions.filter((session) => session.title.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <div className="sidebar-header">
        <h2>Chat History</h2>
        <button className="new-chat-btn">+ New Chat</button>
      </div>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search chats..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="sessions-list">
        {filteredSessions.map((session) => (
          <div
            key={session.id}
            className={`session-item ${currentSessionId === session.id ? "active" : ""}`}
            onClick={() => onSessionSelect(session.id)}
          >
            <div className="session-title">{session.title}</div>
            <div className="session-preview">{session.lastMessage}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Sidebar
