import { TabModelsButton } from "./Buttons.jsx"
import { TabHistoryButton } from "./Buttons.jsx"
import { ModelsList } from "./sidebar/modelsTab/ModelsList.jsx"
import { useState } from "react"
import { HistoryTab } from "./sidebar/historyTab/HistoryTab.jsx"
import { ManualUpload } from "./sidebar/modelsTab/ManualUpload.jsx"
import { DownloadProgressBar } from "./sidebar/DownloadProgressBar.jsx"


export function Sidebar({ setUploadedModel, dlPercent, dlDetails, setSelectedModelUrl, isModelDownloading, setIsModelConfigOpen, setChatMessages, activeDownloads }) {
  const [selectedTab, setSelectedTab] = useState('models')
  const tabClassname = (modelsTab) =>
    modelsTab
      ? "flex-1 py-3 text-xs font-bold text-blue-400 border-b-2 border-blue-400 bg-gray-700/50"
      : "flex-1 py-3 text-xs font-bold text-gray-500 hover:text-gray-300"

  return (
    <div className="fixed inset-y-0 left-0 w-80 bg-gray-800 border-r border-gray-700 z-50 transform md:translate-x-0 md:relative sidebar-transition flex flex-col shadow-2xl shrink-0">
      <div className="flex border-b border-gray-700">
        <TabModelsButton
          setSelectedTab={setSelectedTab}
          className={tabClassname(selectedTab === 'models')} />

        <TabHistoryButton
          setSelectedTab={setSelectedTab}
          className={tabClassname(selectedTab === 'history')} />
      </div>

      <div className="p-4 flex-1 overflow-y-auto space-y-6 no-scrollbar">
        {selectedTab === 'models' &&
          <>
            <div className="space-y-6">
              <ModelsList setSelectedModelUrl={setSelectedModelUrl} />
              <ManualUpload setUploadedModel={setUploadedModel} />

              {isModelDownloading && <DownloadProgressBar dlPercent={dlPercent} dlDetails={dlDetails} activeDownloads={activeDownloads} />}
            </div>
          </>
        }

        {selectedTab === 'history' && <HistoryTab setChatMessages={setChatMessages} />}
      </div>

      <div className="p-2 text-center text-[10px] rounded-lg bg-green-900/50 text-green-400 border-t border-gray-700 hover:text-white hover:bg-green-900/60">
        <button className="active:scale-95 h-full w-full" onClick={() => setIsModelConfigOpen(true)} >
          Configure Model
        </button>
      </div>
      <div className="p-2 text-center text-[10px] text-gray-600 bg-gray-800 border-t border-gray-700">
        v2.2.5 (Basically Ready)
      </div>
    </div>
  )
}