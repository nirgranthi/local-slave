export function Sidebar() {
  return (
    <div id="sidebar"
      className="fixed inset-y-0 left-0 w-80 bg-gray-800 border-r border-gray-700 z-50 transform -translate-x-full md:translate-x-0 md:relative sidebar-transition flex flex-col shadow-2xl shrink-0">
      {/* Tabs */}
      <div className="flex border-b border-gray-700">
        <button onClick={switchTab('models')} id="tab-models"
          className="flex-1 py-3 text-xs font-bold text-blue-400 border-b-2 border-blue-400 bg-gray-700/50">MODELS</button>
        <button onClick={switchTab('history')} id="tab-history"
          className="flex-1 py-3 text-xs font-bold text-gray-500 hover:text-gray-300">HISTORY</button>
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