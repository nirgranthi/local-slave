import { Lightning } from "./svg/Lightning"

export function ChatArea() {
  return (
    <div id="chat-box" className="flex-1 overflow-y-auto p-4 pb-40 space-y-4 h-full">
      <div id="welcome-message" className="flex flex-col items-center justify-center h-full text-gray-500 space-y-4">
        <div className="p-4 bg-gray-800 rounded-full animate-bounce">
          <Lightning />
        </div>
        <div className="text-center">
          <h3 className="text-lg font-medium text-white">How can I help you today?</h3>
          <p className="text-xs mt-1">Checking for downloaded models...</p>
        </div>
      </div>
    </div>
  )
}