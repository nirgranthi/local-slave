import { Header } from './components/Header'
import { ChatArea } from './components/ChatArea'
import { InputArea } from './components/InputArea'
import { Sidebar } from './components/Sidebar'
import { MobileOverlay } from './components/MobileOverlay'
import { WllamaChat } from "./components/js/wllama/wllama";
import { useState } from 'react'

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [uploadedModel, setUploadedModel] = useState(null)
  const [userPrompt, setUserPrompt] = useState('')
  const [chatMessages, setChatMessages] = useState('')
  const [liveToken, setLiveToken] = useState('')
  const [isLiveTokenLive, setIsLiveTokenLive] = useState(false)
  
  return (
    <div className='flex h-screen w-full'>
      {/* Mobile Overlay */}
      {isSidebarOpen && <MobileOverlay setIsSidebarOpen={setIsSidebarOpen} />}

      {/* SIDEBAR */}
      {isSidebarOpen && <Sidebar uploadedModel={uploadedModel} setUploadedModel={setUploadedModel} />}

      {/* MAIN CHAT */}
      <div className="flex-1 flex flex-col relative w-full h-full bg-gray-900 min-w-0">
        {/* Header */}
        <Header isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

        {/* Chat Area */}
        <ChatArea chatMessages={chatMessages} liveToken={liveToken} isLiveTokenLive={isLiveTokenLive} />

        {/* Input */}
        <InputArea setUserPrompt={setUserPrompt} />
        <WllamaChat userPrompt={userPrompt} uploadedModel={uploadedModel} chatMessages={chatMessages} setChatMessages={setChatMessages} setLiveToken={setLiveToken} setIsLiveTokenLive={setIsLiveTokenLive} />
        
      </div>
    </div>
  )
}

export default App
