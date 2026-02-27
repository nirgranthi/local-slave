import { ClearAllHistoryButton, RenderHistoryButton } from '../../Buttons.jsx';

export function HistoryTab({ setChatMessages }) {
  let sessions = JSON.parse(localStorage.getItem('sessions'))
  sessions = sessions ? sessions : []
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center mb-2">
        <div className="text-xs text-gray-400 uppercase font-bold">Recent Chats</div>
        <ClearAllHistoryButton />
      </div>
      <div className="space-y-1">
        {sessions.length > 0 &&
          sessions.map((session, i) =>
            (<RenderHistoryButton key={i} session={session} setChatMessages={setChatMessages} />)
          )}
      </div>
    </div>
  )
}