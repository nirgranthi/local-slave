import { Header } from './components/Header'
import { ChatArea } from './components/ChatArea'
import { InputArea } from './components/InputArea'


function App() {
  
  return (
    <div className='flex h-screen w-full'>
      {/* Mobile Overlay */}
      

      {/* SIDEBAR */}
      

      {/* MAIN CHAT */}
      <div className="flex-1 flex flex-col relative w-full h-full bg-gray-900 min-w-0">
        {/* Header */}
        <Header />

        {/* Chat Area */}
        <ChatArea />

        {/* Input */}
        <InputArea />
        
      </div>
    </div>
  )
}

export default App
