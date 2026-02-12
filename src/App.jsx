import { Header } from './components/Header.jsx'
import { ChatArea } from './components/ChatArea.jsx'
import { InputArea } from './components/InputArea.jsx'
import { Sidebar } from './components/Sidebar.jsx'
import { MobileOverlay } from './components/MobileOverlay.jsx'
import { WllamaChat } from "./components/model/wllama";
import { useState, useRef } from 'react'

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [uploadedModel, setUploadedModel] = useState(null)
  const [userPrompt, setUserPrompt] = useState('')
  const [chatMessages, setChatMessages] = useState([])
  const [liveToken, setLiveToken] = useState('')
  const [isLiveTokenLive, setIsLiveTokenLive] = useState(false)
  const [modelStatus, setModelStatus] = useState('OFFLINE')
  const [dlPercent, setDlPercent] = useState(0)
  const [dlDetails, setDlDetails] = useState('0MB / 0MB')
  const [selectedModelUrl, setSelectedModelUrl] = useState(null)
  const [isModelDownloading, setIsModelDownloading] = useState(null)
  const [loadedModelName, setLoadedModelName] = useState('No Model Loaded')
  const stopModelReplyRef = useRef(null)

  return (
    <div className='flex h-screen w-full'>
      {/* Mobile Overlay */}
      {isSidebarOpen &&
        <MobileOverlay
          setIsSidebarOpen={setIsSidebarOpen} />
      }

      {/* SIDEBAR */}
      {isSidebarOpen &&
        <Sidebar
          setUploadedModel={setUploadedModel}
          dlPercent={dlPercent}
          dlDetails={dlDetails}
          setSelectedModelUrl={setSelectedModelUrl}
          isModelDownloading={isModelDownloading}
        />
      }

      {/* MAIN CHAT */}
      <div className="flex-1 flex flex-col relative w-full h-full bg-gray-900 min-w-0">
        {/* Header */}
        <Header
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          modelStatus={modelStatus}
          loadedModelName={loadedModelName}
        />

        {/* Chat Area */}
        <ChatArea
          chatMessages={chatMessages}
          liveToken={liveToken}
          isLiveTokenLive={isLiveTokenLive}
          userPrompt={userPrompt}
        />

        {/* Input */}
        <InputArea
          setUserPrompt={setUserPrompt}
          modelStatus={modelStatus}
          isLiveTokenLive={isLiveTokenLive}
          stopModelReplyRef={stopModelReplyRef}
        />

        <WllamaChat
          userPrompt={userPrompt}
          uploadedModel={uploadedModel}
          chatMessages={chatMessages}
          setChatMessages={setChatMessages}
          setLiveToken={setLiveToken}
          setIsLiveTokenLive={setIsLiveTokenLive}
          selectedModelUrl={selectedModelUrl}
          setModelStatus={setModelStatus}
          setDlPercent={setDlPercent}
          setDlDetails={setDlDetails}
          setIsModelDownloading={setIsModelDownloading}
          setLoadedModelName={setLoadedModelName}
          stopModelReplyRef={stopModelReplyRef}
          setUserPrompt={setUserPrompt}
          setUploadedModel={setUploadedModel}
        />
      </div>
    </div>
  )
}

export default App
