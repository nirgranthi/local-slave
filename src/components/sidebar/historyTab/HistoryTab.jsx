import { ClearAllHistoryButton } from '../../buttons/ClearAllHistoryButton.jsx';

export function HistoryTab() {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center mb-2">
        <div className="text-xs text-gray-400 uppercase font-bold">Recent Chats</div>
        <ClearAllHistoryButton />
      </div>
      <div className="space-y-1">
        {/* History Items Injected Here */}
      </div>
    </div>
  )
}