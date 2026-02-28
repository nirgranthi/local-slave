import { useState, useRef, useEffect } from "react";
import { SendButton } from "./Buttons.jsx";

export function InputArea({ setUserPrompt, modelStatus, isLiveTokenLive, stopModelReplyRef }) {
  const [inputValue, setInputValue] = useState('')
  const textAreaRef = useRef(null)

  useEffect(() => {
    if (textAreaRef) {
      textAreaRef.current.style.height = 'auto'
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`
    }
  }, [inputValue])

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      if (!isLiveTokenLive) sendMessage()
    }
  }

  const sendMessage = () => {
    if (!isLiveTokenLive) {
      if (inputValue.trim() === '') return;
      setUserPrompt(inputValue)
      setInputValue('')
    } else {
      /* console.log('Stopping model reply...') */
      stopModelReplyRef.current.abort()
    }
  };
  return (
    <div className="w-full bg-gray-900 pt-4 pb-4 px-4 border-t border-gray-800">
      <div className="max-w-3xl mx-auto relative flex gap-2">
        <textarea
          ref={textAreaRef}
          type="text"
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
          onKeyDown={handleKeyDown}
          disabled={modelStatus === 'OFFLINE'}
          className="flex-1 bg-gray-800 text-white rounded-lg px-4 py-3 border border-gray-700 focus:outline-none focus:border-blue-500 transition-all resize-none max-h-60 overflow-y-auto"
          placeholder={isLiveTokenLive
            ? 'Thinking...'
            : (modelStatus === 'ONLINE')
              ? 'Ask Local Slave AI'
              : 'Load a model to start chatting...'

          }
          style={{ minHeight: '44px' }}
        />

        <SendButton
          inputValue={inputValue}
          sendMessage={sendMessage}
          modelStatus={modelStatus}
          isLiveTokenLive={isLiveTokenLive}
        />
      </div>
    </div>
  )
}