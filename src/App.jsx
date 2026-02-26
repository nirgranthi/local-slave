import { Header } from './components/Header.jsx'
import { ChatArea } from './components/ChatArea.jsx'
import { InputArea } from './components/InputArea.jsx'
import { Sidebar } from './components/Sidebar.jsx'
import { MobileOverlay } from './components/MobileOverlay.jsx'
import { WllamaChat } from "./components/model/wllama";
import { useState, useRef } from 'react'
import { ModelConfig } from './components/ModelConfig.jsx'
import { promptConfigDefault, modelConfigDefault } from './components/model/configValues.jsx'

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [uploadedModel, setUploadedModel] = useState(null)
  const [userPrompt, setUserPrompt] = useState('')
  const [chatMessages, setChatMessages] = useState([])
  const [liveToken, setLiveToken] = useState('')
  const [isLiveTokenLive, setIsLiveTokenLive] = useState(false)
  const [modelStatus, setModelStatus] = useState('OFFLINE')
  const [selectedModelUrl, setSelectedModelUrl] = useState(null)
  const [isModelDownloading, setIsModelDownloading] = useState(null)
  const [loadedModelName, setLoadedModelName] = useState('No Model Loaded')
  const stopModelReplyRef = useRef(null)
  const [isModelConfigOpen, setIsModelConfigOpen] = useState(false)
  const [promptConfig, setPromptConfig] = useState(promptConfigDefault)
  const [modelConfig, setModelConfig] = useState(modelConfigDefault)
  const [activeDownloads, setActiveDownloads] = useState({})

  return (
    <div className='flex h-screen w-full'>
      {/* Mobile Overlay */}
      {isSidebarOpen &&
        <MobileOverlay
          setIsSidebarOpen={setIsSidebarOpen} />
      }

      {/* SIDEBAR */}
      <div className={isSidebarOpen ? '' : 'hidden'} >
        <Sidebar
          setUploadedModel={setUploadedModel}
          setSelectedModelUrl={setSelectedModelUrl}
          isModelDownloading={isModelDownloading}
          setIsModelConfigOpen={setIsModelConfigOpen}
          setChatMessages={setChatMessages}
          activeDownloads={activeDownloads}
        />
      </div>

      {/* MAIN CHAT */}
      <div className="flex-1 flex flex-col relative w-full h-full bg-gray-900 min-w-0">
        {/* Header */}
        <Header
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          modelStatus={modelStatus}
          loadedModelName={loadedModelName}
          setChatMessages={setChatMessages}
          chatMessages={chatMessages}
        />

        {/* Chat Area */}
        <ChatArea
          chatMessages={chatMessages}
          liveToken={liveToken}
          isLiveTokenLive={isLiveTokenLive}
          userPrompt={userPrompt}
        />

        {/* Model Configuration Window */}
        {isModelConfigOpen &&
          <ModelConfig
            setIsModelConfigOpen={setIsModelConfigOpen}
            setPromptConfig={setPromptConfig}
            promptConfig={promptConfig}
            modelConfig={modelConfig}
            setModelConfig={setModelConfig}
          />
        }

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
          setIsModelDownloading={setIsModelDownloading}
          setLoadedModelName={setLoadedModelName}
          stopModelReplyRef={stopModelReplyRef}
          setUserPrompt={setUserPrompt}
          setUploadedModel={setUploadedModel}
          promptConfig={promptConfig}
          modelConfig={modelConfig}
          setActiveDownloads={setActiveDownloads}
        />
      </div>
    </div>
  )
}

export default App
