import { Header } from './components/Header.jsx'
import { ChatArea } from './components/ChatArea.jsx'
import { InputArea } from './components/InputArea.jsx'
import { Sidebar } from './components/Sidebar.jsx'
import { MobileOverlay } from './components/MobileOverlay.jsx'
import { WllamaChat } from "./components/model/wllama";
import { useState, useRef, useEffect } from 'react'
import { ModelConfig } from './components/ModelConfig.jsx'
import { promptConfigDefault, modelConfigDefault } from './components/model/configValues.jsx'
import friendlyPrompt from '/systemPrompts/friendlyPrompt.txt?raw'

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
  const [isRecommended, setIsRecommended] = useState(false)
  const [reloadModel, setReloadModel] = useState(1)
  const [systemPrompt, setSystemPrompt] = useState(friendlyPrompt)
  const [currentSessionId, setCurrentSessionId] = useState(null)

  useEffect(() => {
    if (chatMessages.length === 0) {
      setCurrentSessionId(null)
      return
    }

    let sessions = JSON.parse(localStorage.getItem('sessions')) || []
    let sessionId = currentSessionId

    if (!sessionId) {
      sessionId = Date.now()
      setCurrentSessionId(sessionId)
      const newSession = {
        title: chatMessages[0].message,
        sessionId: sessionId,
        history: chatMessages
      }
      localStorage.setItem('sessions', JSON.stringify([newSession, ...sessions]))
    } else {
      const updatedSessions = sessions.map(session =>
        session.sessionId === sessionId
          ? { ...session, history: chatMessages, title: chatMessages[0].message }
          : session
      )
      localStorage.setItem('sessions', JSON.stringify(updatedSessions))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatMessages])

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
          setSystemPrompt={setSystemPrompt}
          setCurrentSessionId={setCurrentSessionId}
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
          setCurrentSessionId={setCurrentSessionId}
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
            setIsRecommended={setIsRecommended}
            setReloadModel={setReloadModel}
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
          systemPrompt={systemPrompt}
          isRecommended={isRecommended}
          setIsRecommended={setIsRecommended}
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
          setModelConfig={setModelConfig}
          reloadModel={reloadModel}
          setIsModelConfigOpen={setIsModelConfigOpen}
        />
      </div>
    </div>
  )
}

export default App
