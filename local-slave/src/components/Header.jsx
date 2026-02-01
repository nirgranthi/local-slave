import { SidebarToggleButton } from "./buttons/SidebarToggleButton";
import { NewChatButton } from "./buttons/NewChatButton";

export function Header({ isSidebarOpen, setIsSidebarOpen }) {

  return (
    <div className="h-14 border-b border-gray-700 flex items-center px-4 justify-between bg-gray-800 z-10">
      <div className="flex items-center gap-3">

        <SidebarToggleButton isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

        <div className="flex flex-col">
          <span id="header-status" className="font-bold text-sm text-gray-200">
            Local AI
          </span>
          
          <span id="active-model-name" className="text-[10px] text-gray-500 truncate max-w-37.5">
            No Model Loaded
          </span>
        </div>

      </div>

      <div className="flex items-center gap-2">
        <div id="engine-state" className="text-[10px] px-2 py-1 rounded bg-black/40 text-gray-400 font-mono hidden md:block">
          OFFLINE
        </div>
        {/*onClick={startNewChat}*/}
        <NewChatButton />
      </div>
    </div>
  )
}