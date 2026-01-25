import { Header } from './components/Header'
import { ChatArea } from './components/ChatArea'
import { InputArea } from './components/InputArea'


function App() {
  
  return (
    <>
      {/* Mobile Overlay */}
      

      {/* SIDEBAR */}
      

      {/* MAIN CHAT */}
      <div className="flex-1 flex flex-col relative w-full bg-gray-900 min-w-0">
        {/* Header */}
        <Header />

        {/* Chat Area */}
        <ChatArea />

        {/* Input */}
        <InputArea />
        
      </div>
    </>
  )
}

export default App
