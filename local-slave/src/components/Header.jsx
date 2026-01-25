import { useState } from "react";
import 'tailwindcss';

export function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="h-14 border-b border-gray-700 flex items-center px-4 justify-between bg-gray-800 z-10">
      <div className="flex items-center gap-3">
        <button onClick={() => setIsSidebarOpen(true)} className="md:hidden text-gray-400 p-1 hover:text-white">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16">
            </path>
          </svg>
        </button>
        <div className="flex flex-col">
          <span id="header-status" className="font-bold text-sm text-gray-200">
            Local AI
          </span>
          <span id="active-model-name" className="text-[10px] text-gray-500 truncate max-w-[150px]">
            No Model Loaded
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div id="engine-state"
          className="text-[10px] px-2 py-1 rounded bg-black/40 text-gray-400 font-mono hidden md:block">OFFLINE
        </div>
        {/*onClick={startNewChat}*/}
        <button
          className="bg-blue-600 hover:bg-blue-500 text-white text-xs px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors"
        >
          <svg
            className="w-3 h-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 4v16m8-8H4">
            </path>
          </svg>
          New Chat
        </button>
      </div>
    </div>
  )
}