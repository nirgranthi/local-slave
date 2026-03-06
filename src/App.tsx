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
import { StateProvider, useStates } from './components/Context.js'

import type { chatMessagesProps, progressDetail } from './components/types.js'
import type { modelConfigDefaultProps, promptConfigDefaultProps, sessionProps } from './components/types.js'

function App() {
  const { chatMessages, currentSessionId, setCurrentSessionId, isSidebarOpen } = useStates()

  useEffect(() => {
    if (chatMessages.length === 0) {
      setCurrentSessionId(null)
      return
    }
    const data = localStorage.getItem('sessions') || '[]'
    const sessions: sessionProps[] = JSON.parse(data)
    let sessionId = currentSessionId

    if (!sessionId) {
      sessionId = Date.now()
      setCurrentSessionId(sessionId)
      const newSession: sessionProps = {
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
    <StateProvider>
      <div className='flex h-screen w-full'>
        {/* Mobile Overlay */}
        {isSidebarOpen &&
          <MobileOverlay />
        }

        {/* SIDEBAR */}
        <div className={isSidebarOpen ? '' : 'hidden'} >
          <Sidebar />
        </div>

        {/* MAIN CHAT */}
        <div className="flex-1 flex flex-col relative w-full h-full bg-gray-900 min-w-0">
          {/* Header */}
          <Header />

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
    </StateProvider>
  )
}

export default App
