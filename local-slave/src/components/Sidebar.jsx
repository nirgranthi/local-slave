import { TabModelsButton } from "./buttons/TabModelsButton"
import { TabHistoryButton } from "./buttons/TabHistoryButton"
import { ModelsList } from "./sidebar/modelsTab/ModelsList"
import { useState } from "react"
import { HistoryTab } from "./sidebar/historyTab/HistoryTab"
import { ManualUpload } from "./sidebar/modelsTab/ManualUpload"
import { DownloadProgressBar } from "./sidebar/DownloadProgressBar"


export function Sidebar({ setUploadedModel, dlPercent, dlDetails, setSelectedModelUrl }) {
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
              <DownloadProgressBar dlPercent={dlPercent} dlDetails={dlDetails} />
            </div>
          </>
        }

        {selectedTab === 'history' && <HistoryTab />}
      </div>

      <div className="p-2 text-center text-[10px] text-gray-600 bg-gray-800 border-t border-gray-700">
        v2.0.0 Alpha (Moving project to react)
      </div>
    </div>
  )
}