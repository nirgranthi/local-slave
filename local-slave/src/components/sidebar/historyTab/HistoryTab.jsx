import { useState } from 'react';
import { clearAllHistory } from './../../../assets/js/clearAllHistory'

export function HistoryTab() {
  const [session, setSession] = useState({})
  return (
    <div id="view-history" className="hidden space-y-2">
      <div className="flex justify-between items-center mb-2">
        <div className="text-xs text-gray-400 uppercase font-bold">Recent Chats</div>
        <button onClick={clearAllHistory} className="text-[10px] text-red-400 hover:underline">Clear
          All</button>
      </div>
      <div id="history-list" className="space-y-1">
        {/* History Items Injected Here */}
      </div>
    </div>
  )
}