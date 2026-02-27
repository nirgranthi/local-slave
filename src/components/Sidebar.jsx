import { ModelConfigMenuButton, TabModelsButton } from "./Buttons.jsx"
import { TabHistoryButton } from "./Buttons.jsx"
import { ModelsList } from "./sidebar/modelsTab/ModelsList.jsx"
import { useState } from "react"
import { HistoryTab } from "./sidebar/historyTab/HistoryTab.jsx"
import { ManualUpload } from "./sidebar/modelsTab/ManualUpload.jsx"
import { DownloadProgressBar } from "./sidebar/DownloadProgressBar.jsx"
import  coderPrompt  from "/systemPrompts/coderPrompt.txt?raw" /* import from public folder */
import  friendlyPrompt  from "/systemPrompts/friendlyPrompt.txt?raw"


export function Sidebar({ setUploadedModel, setSelectedModelUrl, isModelDownloading, setIsModelConfigOpen, setChatMessages, activeDownloads, setSystemPrompt }) {
  const [selectedTab, setSelectedTab] = useState('models')
  const [systemPromptType, setSystemPromptType] = useState('');
  const [customPrompt, setCustomPrompt] = useState('');
  const tabClassname = (modelsTab) =>
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
          <ModelsList setSelectedModelUrl={setSelectedModelUrl} />
          <ManualUpload setUploadedModel={setUploadedModel} />

          {isModelDownloading && <DownloadProgressBar activeDownloads={activeDownloads} />}
        </div>

        <div className={selectedTab === 'history' ? '' : 'hidden'} >
          <HistoryTab setChatMessages={setChatMessages} />
        </div>
      </div>

      <div className="p-3 bg-gray-900 border-t border-gray-700 flex flex-col gap-2">
        <div className="flex gap-2">
          <ModelConfigMenuButton setIsModelConfigOpen={setIsModelConfigOpen} />

          <select
            value={systemPromptType}
            onChange={(e) => {
              const val = e.target.value;
              setSystemPromptType(val);
              if (val === 'friendly') setSystemPrompt(friendlyPrompt);
              if (val === 'coder') setSystemPrompt(coderPrompt);
            }}
            className="flex-1 p-2 bg-gray-800 hover:bg-gray-700 text-purple-400 rounded-lg text-xs font-bold border border-gray-700 outline-none cursor-pointer text-center"
          >
            <option value="" disabled>Prompts</option>
            <option value="friendly">Friendly AI</option>
            <option value="coder">Coder AI</option>
            <option value="custom">Custom</option>
          </select>
        </div>

        {systemPromptType === 'custom' && (
          <div className="flex flex-col gap-2 animate-in fade-in slide-in-from-top-2 duration-200">
            <textarea 
              className="w-full p-2 bg-gray-800 text-gray-300 rounded-lg text-xs border border-gray-700 outline-none resize-none h-20 focus:border-purple-500 transition-colors"
              placeholder="Write your custom system prompt here..."
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
            />
            <button 
              onClick={() => {
                setSystemPrompt(customPrompt);
                console.log('Saved custom prompt:', customPrompt);
              }}
              className="w-full p-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-xs font-bold transition-all active:scale-95"
            >
              Save Prompt
            </button>
          </div>
        )}
      </div>
      <div className="p-2 text-center text-[10px] text-gray-600 bg-gray-800 border-t border-gray-700">
        v2.3.4 (Experimental)
      </div>
    </div>
  )
}