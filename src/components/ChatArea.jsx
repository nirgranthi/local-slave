import { useEffect, useRef } from "react";
import { LightningSvg } from "./SVGs.jsx"
import { ChatInterface } from "./model/ChatInterface.jsx"

export function ChatArea({ chatMessages, liveToken, isLiveTokenLive, userPrompt }) {
  const scrollRef = useRef(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages]);
  return (
    <div id="chat-box" className="flex-1 overflow-y-auto p-4 pb-40 space-y-4 h-full">
      <div id="welcome-message" className="flex flex-col items-center h-full text-gray-500 space-y-4">
        {!chatMessages &&
          <>
            <div className="p-4 bg-gray-800 rounded-full animate-bounce">
              <LightningSvg />
            </div>
            <div className="text-center">
              <h3 className="text-lg font-medium text-white">How can I help you today?</h3>
              <p className="text-xs mt-1">Checking for downloaded models...</p>
            </div>
          </>}
        {chatMessages &&
          chatMessages.map((msg) => (
            <ChatInterface
              sender={msg.sender}
              message={msg.message}
              liveToken={liveToken}
              isLiveTokenLive={false}
              key={msg.id} />
          ))

        }
        {isLiveTokenLive &&
          <>
            <ChatInterface
              sender='user'
              message={userPrompt}
              isLiveTokenLive={false}
            />

            <ChatInterface
              sender='ai'
              message=''
              liveToken={liveToken}
              isLiveTokenLive={true} />
          </>
        }
        <div ref={scrollRef} />
      </div>
    </div>
  )
}