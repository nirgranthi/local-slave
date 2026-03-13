import { ModelConfigMenuButton, TabModelsButton } from "./Buttons.tsx"
import { TabHistoryButton } from "./Buttons.tsx"
import { ModelsList } from "./sidebar/modelsTab/ModelsList.tsx"
import { useState } from "react"
import { HistoryTab } from "./sidebar/historyTab/HistoryTab.tsx"
import { ManualUpload } from "./sidebar/modelsTab/ManualUpload.tsx"
import { DownloadProgressBar } from "./sidebar/DownloadProgressBar.tsx"
import coderPrompt from "/systemPrompts/coderPrompt.txt?raw"
import friendlyPrompt from "/systemPrompts/friendlyPrompt.txt?raw"
import { useStates } from "./Context.tsx"


export function Sidebar() {
  const { isModelDownloading, setSystemPrompt } = useStates()

  const [selectedTab, setSelectedTab] = useState<string>('models')
  const [systemPromptType, setSystemPromptType] = useState<string>('');
  const [customPrompt, setCustomPrompt] = useState<string>('');
  const tabClassname = (modelsTab: boolean) =>
    modelsTab
      ? "flex-1 py-3 text-xs font-bold text-blue-400 border-b-2 border-blue-400 bg-gray-700/50"
      : "flex-1 py-3 text-xs font-bold text-gray-500 hover:text-gray-300"

  return (
    <div className="fixed inset-y-0 h-full left-0 w-80 bg-gray-800 border-r border-gray-700 z-50 transform md:translate-x-0 md:relative sidebar-transition flex flex-col shadow-2xl shrink-0">
      <div className="flex border-b border-gray-700">
        <TabModelsButton
          setSelectedTab={setSelectedTab}
          className={tabClassname(selectedTab === 'models')} />

        <TabHistoryButton
          setSelectedTab={setSelectedTab}
          className={tabClassname(selectedTab === 'history')} />
      </div>

      <div className="p-4 flex-1 overflow-y-auto space-y-6 no-scrollbar">
        <div className={`space-y-6 ${selectedTab === 'models' ? '' : 'hidden'}`}>
          <ModelsList />
          <ManualUpload />

          {isModelDownloading && <DownloadProgressBar />}
        </div>

        <div className={selectedTab === 'history' ? '' : 'hidden'} >
          <HistoryTab />
        </div>
      </div>

      <div className="p-4 bg-gray-900/50 border-t border-gray-700/50 backdrop-blur-md flex flex-col gap-3">

        <div className="grid grid-cols-2 gap-2">
          <ModelConfigMenuButton />

          <div className="relative group">
            <select
              value={systemPromptType}
              onChange={(e) => {
                const val = e.target.value;
                setSystemPromptType(val);
                if (val === 'friendly') setSystemPrompt(friendlyPrompt);
                if (val === 'coder') setSystemPrompt(coderPrompt);
              }}
              className="w-full p-2.5 bg-gray-800/60 hover:bg-gray-700 text-purple-400 rounded-xl text-[11px] font-black border border-gray-700/50 outline-none cursor-pointer transition-all text-center appearance-none"
            >
              <option value="" disabled>🎭 Persona</option>
              <option value="friendly">Friendly</option>
              <option value="coder">Coder</option>
              <option value="custom">Custom</option>
            </select>
          </div>
        </div>

        {systemPromptType === 'custom' && (
          <div className="space-y-2 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <textarea
              className="w-full p-3 bg-gray-800/80 text-gray-300 rounded-xl text-xs border border-gray-700/50 outline-none resize-none h-24 focus:border-purple-500/50 transition-all placeholder:text-gray-600"
              placeholder="Define the AI's soul here..."
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
            />
            <button
              onClick={() => {
                setSystemPrompt(customPrompt)
                /* console.log('Saved prompt:', customPrompt) */
                setSystemPromptType('')
              }}
              className="w-full p-2.5 bg-purple-600/20 hover:bg-purple-600/40 text-purple-300 border border-purple-500/30 rounded-xl text-[11px] font-black uppercase tracking-tighter transition-all active:scale-95"
            >
              Deploy Persona
            </button>
          </div>
        )}
      </div>
      <div className="p-2 text-center text-[10px] text-gray-600 bg-gray-800 border-t border-gray-700">
        v3.0.1 (Stable, with TypeScript) 13032026
      </div>
    </div>
  )
}