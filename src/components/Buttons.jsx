import { HamburgerSvg } from "./SVGs.jsx";
import { PlusSvg } from "./SVGs.jsx"

export function ClearAllHistoryButton() {
    return (
        <button onClick={() => {console.log('cleared all history');}} className="text-[10px] text-red-400 hover:underline">
            Clear All
        </button>
    )
}

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

export function RefreshAvailableModelsButton ({ setRefresh }) {
    return (
        <button onClick={() => {setRefresh('refreshing...')}}
            className="text-[10px] text-blue-400 hover:underline">
            Refresh
        </button>
    )
}

export function SendButton({ inputValue, sendMessage, modelStatus, isLiveTokenLive }) {
    return (
        <button
            id="send-btn"
            onClick={() => sendMessage(inputValue)}
            disabled={modelStatus==='OFFLINE'}
            className={`px-6 rounded-lg text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 transition-colors duration-500
                ${!isLiveTokenLive
                    ? 'bg-blue-600 hover:bg-blue-700'
                    : 'bg-red-600 hover:bg-red-700'
                }`}
        >
            {!isLiveTokenLive
            ? 'Send'
            : 'Stop'
        }
        </button>
    )
}



export function SidebarToggleButton({isSidebarOpen, setIsSidebarOpen}) {
    return (
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-gray-400 p-1 hover:text-white">
            <HamburgerSvg />
        </button>
    )
}

export function TabHistoryButton({ setSelectedTab, className }) {
    return (
        <button
            onClick={() => { setSelectedTab('history') }}
            className={className}
        >
            HISTORY
        </button>
    );
}

export function TabModelConfigButton({ setSelectedTab, className }) {
    return (
        <button
            onClick={() => { setSelectedTab('modelConfigTab') }}
            className={className}
        >
            Model Configs
        </button >
    )
}

export function TabModelsButton({ setSelectedTab, className }) {
    return (
        <button
            onClick={() => { setSelectedTab('models') }}
            className={className}
        >
            MODELS
        </button >
    )
}

export function TabPromptConfigButton({ setSelectedTab, className }) {
    return (
        <button
            onClick={() => { setSelectedTab('promptConfigTab') }}
            className={className}
        >
            Prompt Configs
        </button >
    )
}