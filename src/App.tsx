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

import type { chatMessagesProps, progressDetail } from './components/types.js'
import type { promptConfigDefaultProps, modelConfigDefaultProps } from './components/model/configValues.jsx'

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [uploadedModel, setUploadedModel] = useState<File | null>(null)
  const [userPrompt, setUserPrompt] = useState<string>('')
  const [chatMessages, setChatMessages] = useState<chatMessagesProps[]>([])
  const [liveToken, setLiveToken] = useState<string>('')
  const [isLiveTokenLive, setIsLiveTokenLive] = useState<boolean>(false)
  const [modelStatus, setModelStatus] = useState<string>('OFFLINE')
  const [selectedModelUrl, setSelectedModelUrl] = useState<URL | null>(null)
  const [isModelDownloading, setIsModelDownloading] = useState<boolean>(false)
  const [loadedModelName, setLoadedModelName] = useState<string>('No Model Loaded')
  const stopModelReplyRef = useRef<AbortController>(null)
  const [isModelConfigOpen, setIsModelConfigOpen] = useState<boolean>(false)
  const [promptConfig, setPromptConfig] = useState<promptConfigDefaultProps>(promptConfigDefault)
  const [modelConfig, setModelConfig] = useState<modelConfigDefaultProps>(modelConfigDefault)
  const [activeDownloads, setActiveDownloads] = useState<Record<string, progressDetail>>({})
  const [isRecommended, setIsRecommended] = useState<boolean>(false)
  const [reloadModel, setReloadModel] = useState<number>(1)
  const [systemPrompt, setSystemPrompt] = useState<string>(friendlyPrompt)
  const [currentSessionId, setCurrentSessionId] = useState<number | null>(null)

  useEffect(() => {
    if (chatMessages.length === 0) {
      setCurrentSessionId(null)
      return
    }

    const sessions = JSON.parse(localStorage.getItem('sessions')) || []
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
