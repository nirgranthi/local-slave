import { SidebarToggleButton } from "./Buttons.jsx";
import { NewChatButton } from "./Buttons.jsx";

export function Header({ isSidebarOpen, setIsSidebarOpen, modelStatus, loadedModelName, setChatMessages, setCurrentSessionId }) {

  return (
    <div className="h-14 border-b border-gray-700 flex items-center px-4 justify-between bg-gray-800 z-10">
      <div className="flex items-center gap-3 min-w-0 flex-1">

        <SidebarToggleButton isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

        <div className="flex flex-col min-w-31">
          <span className="font-bold text-sm text-gray-200">
            Local AI
          </span>

          <span className="text-[10px] text-gray-500 truncate">
            {loadedModelName}
          </span>
        </div>

      </div>

      <div className="flex items-center gap-2">

        <div className={`text-[10px] px-2 py-1 rounded 
          ${modelStatus === 'ONLINE'
            ? 'bg-green-900/50 text-green-400'
            : modelStatus === 'THINKING...'
              ? 'bg-yellow-900/50 text-yellow-400'
              : 'bg-black/40 text-gray-400'
          } font-mono`}
        >
          {modelStatus}
        </div>
        <NewChatButton setCurrentSessionId={setCurrentSessionId} setChatMessages={setChatMessages} />
      </div>
    </div>
  )
}