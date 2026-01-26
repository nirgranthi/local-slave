import { TabModelsButton } from "./buttons/TabModelsButton"
import { TabHistoryButton } from "./buttons/TabHistoryButton"

export function Sidebar() {
return (
  <div id="sidebar"
    className="fixed inset-y-0 left-0 w-80 bg-gray-800 border-r border-gray-700 z-50 transform -translate-x-full md:translate-x-0 md:relative sidebar-transition flex flex-col shadow-2xl shrink-0">
    {/* Tabs */}
    <div className="flex border-b border-gray-700">
      <TabModelsButton />
      <TabHistoryButton />
    </div>

    <div className="p-4 flex-1 overflow-y-auto space-y-6 no-scrollbar">
      {/* MODELS TAB */}
      <div id="view-models" className="space-y-6">
        {/* CSV Models Section */}
        {/* Manual Upload */}
      </div>

      {/* HISTORY TAB */}
      {/* Download Progress */}
    </div>

    <div className="p-2 text-center text-[10px] text-gray-600 bg-gray-800 border-t border-gray-700">v2.0.0 Alpha (Moving project to react)</div>
  </div>
)
}