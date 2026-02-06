import { useState } from "react";
import { SendButton } from "./buttons/SendButton.jsx";

export function InputArea({ setUserPrompt, modelStatus, isLiveTokenLive, stopModelReplyRef }) {
  const [inputValue, setInputValue] = useState('')

  const sendMessage = () => {
    if (!isLiveTokenLive) {
      setUserPrompt(inputValue)
      setInputValue('')
    } else {
      console.log('stopping model reply...')
      stopModelReplyRef.current.abort()
    }
  };
  return (
    <div className="w-full bg-gray-900 pt-4 pb-4 px-4 border-t border-gray-800">
      <div className="max-w-3xl mx-auto relative flex gap-2">
        <input
          id="user-input"
          type="text"
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
          onKeyDown={(e) => { if (e.key == 'Enter') (sendMessage()) }}
          disabled={modelStatus === 'OFFLINE'}
          className="flex-1 bg-gray-800 text-white rounded-lg px-4 py-3 border border-gray-700 focus:outline-none focus:border-blue-500 transition-all"
          placeholder="Load a model to start..." />

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