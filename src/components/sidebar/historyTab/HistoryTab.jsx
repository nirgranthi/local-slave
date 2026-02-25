import { ClearAllHistoryButton } from '../../Buttons.jsx';

export function HistoryTab({ setChatMessages }) {
  const sessions = JSON.parse(localStorage.getItem('sessions') || [])
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center mb-2">
        <div className="text-xs text-gray-400 uppercase font-bold">Recent Chats</div>
        <ClearAllHistoryButton />
      </div>
      <div className="space-y-1">
        {sessions.map((session) =>
        (<button key={session.sessionId}
          className="w-full text-left p-2.5 rounded-lg border transition-all group relative mb-1 bg-gray-700/30 border-gray-700/50 hover:bg-gray-700"
          onClick={() => (setChatMessages(session.history))}
        >
          <div className="flex justify-between items-center">
            <span className="font-medium text-xs text-gray-300 group-hover:text-white truncate">{session.title}</span>
          </div>
        </button>)
        )}
      </div>
    </div>
  )
}