import { PlusSvg } from "../svg/PlusSvg.jsx"

export function NewChatButton({setChatMessages}) {
    return (
        <button
            onClick={() => setChatMessages([])}
            className="bg-blue-600 hover:bg-blue-500 text-white text-xs px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors"
        >
            <PlusSvg />
            New Chat
        </button>
    )
}