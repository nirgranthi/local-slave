import { SidebarToggleButton } from "./buttons/SidebarToggleButton.jsx";
import { NewChatButton } from "./buttons/NewChatButton.jsx";

export function Header({ isSidebarOpen, setIsSidebarOpen, modelStatus, loadedModelName }) {

  return (
    <div className="h-14 border-b border-gray-700 flex items-center px-4 justify-between bg-gray-800 z-10">
      <div className="flex items-center gap-3">

        <SidebarToggleButton isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

        <div className="flex flex-col">
          <span id="header-status" className="font-bold text-sm text-gray-200">
            Local AI
          </span>
          
          <span id="active-model-name" className="text-[10px] text-gray-500 max-w-50">
            {loadedModelName}
          </span>
        </div>

      </div>

      <div className="flex items-center gap-2">
        
        <div className={`text-[10px] px-2 py-1 rounded ${modelStatus==='ONLINE' ? 'bg-green-900/50 text-green-400': 'bg-black/40 text-gray-400'} font-mono hidden md:block`}>
          {modelStatus}
        </div>
        {/*onClick={startNewChat}*/}
        <NewChatButton />
      </div>
    </div>
  )
}