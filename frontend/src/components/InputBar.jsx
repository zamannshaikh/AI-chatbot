"use client"

import { useState } from "react"

function InputBar({ onSendMessage }) {
  const [inputValue, setInputValue] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    if (inputValue.trim()) {
      onSendMessage(inputValue.trim())
      setInputValue("")
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <div className="input-bar">
      <form onSubmit={handleSubmit} className="input-form">
        <textarea
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message here..."
          className="message-input"
          rows="1"
        />
        <button type="submit" className="send-button" disabled={!inputValue.trim()}>
          Send
        </button>
      </form>
    </div>
  )
}

export default InputBar
