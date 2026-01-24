import './App.css'

function App() {
  
  return (
    <>
      {/* Mobile Overlay */}
      

      {/* SIDEBAR */}
      

      {/* MAIN CHAT */}
      <div className="flex-1 flex flex-col relative w-full bg-gray-900 min-w-0">
        {/* Header */}
        <div className="h-14 border-b border-gray-700 flex items-center px-4 justify-between bg-gray-800 z-10">
          <div className="flex items-center gap-3">
            <button onClick={openSidebar} className="md:hidden text-gray-400 p-1 hover:text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
            <div className="flex flex-col">
              <span id="header-status" className="font-bold text-sm text-gray-200">Local AI</span>
              <span id="active-model-name" className="text-[10px] text-gray-500 truncate max-w-[150px]">No Model
                Loaded</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div id="engine-state"
              className="text-[10px] px-2 py-1 rounded bg-black/40 text-gray-400 font-mono hidden md:block">OFFLINE
            </div>
            <button onClick={startNewChat}
              className="bg-blue-600 hover:bg-blue-500 text-white text-xs px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
              </svg>
              New Chat
            </button>
          </div>
        </div>

        {/* Chat Area */}
        <div id="chat-box" className="flex-1 overflow-y-auto p-4 pb-40 space-y-4">
          <div id="welcome-message" className="flex flex-col items-center justify-center h-full text-gray-500 space-y-4">
            <div className="p-4 bg-gray-800 rounded-full animate-bounce">
              <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-medium text-white">How can I help you today?</h3>
              <p className="text-xs mt-1">Checking for downloaded models...</p>
            </div>
          </div>
        </div>

        {/* Input */}
        <div className="absolute bottom-0 w-full bg-gray-900 pt-4 pb-4 px-4 border-t border-gray-800">
          <div className="max-w-3xl mx-auto relative flex gap-2">
            <input id="user-input" type="text"
              className="flex-1 bg-gray-800 text-white rounded-lg px-4 py-3 border border-gray-700 focus:outline-none focus:border-blue-500 transition-all"
              placeholder="Load a model to start..." disabled />
            <button id="send-btn" onClick={sendMessage}
              className="bg-blue-600 px-6 rounded-lg text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
              disabled>Send</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
