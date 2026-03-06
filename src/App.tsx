import { Header } from './components/Header.jsx'
import { ChatArea } from './components/ChatArea.jsx'
import { InputArea } from './components/InputArea.jsx'
import { Sidebar } from './components/Sidebar.jsx'
import { MobileOverlay } from './components/MobileOverlay.jsx'
import { WllamaChat } from "./components/model/wllama";
import { useEffect } from 'react'
import { ModelConfig } from './components/ModelConfig.jsx'
import { useStates } from './components/Context.js'

import type { sessionProps } from './components/types.js'

function App() {
  const { chatMessages, currentSessionId, setCurrentSessionId, isSidebarOpen, isModelConfigOpen } = useStates()

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
      <div className='flex h-screen w-full'>
        {/* Mobile Overlay */}
        {isSidebarOpen && <MobileOverlay />}

        {/* SIDEBAR */}
        <div className={isSidebarOpen ? '' : 'hidden'} >
          <Sidebar />
        </div>

        {/* MAIN CHAT */}
        <div className="flex-1 flex flex-col relative w-full h-full bg-gray-900 min-w-0">
          {/* Header */}
          <Header />

          {/* Chat Area */}
          <ChatArea />

          {/* Model Configuration Window */}
          {isModelConfigOpen && <ModelConfig /> }

          {/* Input */}
          <InputArea />

          <WllamaChat />
        </div>
      </div>
  )
}

export default App
