import { Header } from './components/Header'
import { ChatArea } from './components/ChatArea'
import { InputArea } from './components/InputArea'
import { Sidebar } from './components/Sidebar'
import { MobileOverlay } from './components/MobileOverlay'
import { useState } from 'react'

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  return (
    <div className='flex h-screen w-full'>
      {/* Mobile Overlay */}
      {isSidebarOpen && <MobileOverlay setIsSidebarOpen={setIsSidebarOpen} />}

      {/* SIDEBAR */}
      {isSidebarOpen && <Sidebar />}

      {/* MAIN CHAT */}
      <div className="flex-1 flex flex-col relative w-full h-full bg-gray-900 min-w-0">
        {/* Header */}
        <Header isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

        {/* Chat Area */}
        <ChatArea />

        {/* Input */}
        <InputArea />
        
      </div>
    </div>
  )
}

export default App
