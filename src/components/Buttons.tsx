import { AutoFixSvg, HamburgerSvg } from "./SVGs.jsx";
import { PlusSvg } from "./SVGs.jsx"
import { useState } from "react";

export function ClearAllHistoryButton() {
    return (
        <button onClick={() => { localStorage.removeItem('sessions') }} className="text-[10px] text-red-400 hover:underline">
            Clear All
        </button>
    )
}

export function NewChatButton({ setCurrentSessionId, setChatMessages }) {
    return (
        <button
            onClick={() => {
                setChatMessages([])
                setCurrentSessionId(null)
            }}
            className="bg-blue-600 hover:bg-blue-500 text-white text-xs px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors"
        >
            <PlusSvg />
            New Chat
        </button>
    )
}

export function RefreshAvailableModelsButton({ setRefresh }) {
    return (
        <button onClick={() => { setRefresh('refreshing...') }}
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
            disabled={modelStatus === 'OFFLINE'}
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

export function SidebarToggleButton({ isSidebarOpen, setIsSidebarOpen }) {
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

export function ModelConfigDoneButton({ selectedTab, setIsModelConfigOpen, setReloadModel }) {
    /* modelConfigTab, promptConfigTab */
    function handleClick() {
        if (selectedTab === 'promptConfigTab') { setIsModelConfigOpen(false) }
        if (selectedTab === 'modelConfigTab') { setReloadModel(prev => prev + 1) }
    }
    return (
        <button
            onClick={handleClick}
            className={`w-full mt-6 text-white py-2 rounded-lg font-semibold transition-colors
                ${selectedTab === 'promptConfigTab'
                    ? 'bg-blue-600 hover:bg-blue-500'
                    : 'bg-red-600 hover:bg-red-400'
                }`}
        >
            {selectedTab === 'promptConfigTab'
                ? "Done"
                : "Reload Model"
            }
        </button>
    )
}

export function ModelConfigCloseButton({ setIsModelConfigOpen }) {
    return (
        <button
            onClick={() => setIsModelConfigOpen(false)}
            className="absolute p-2 top-4 right-4 text-gray-400 hover:text-white"
        >
            X
        </button>
    )
}

export function ModelConfigMenuButton({ setIsModelConfigOpen }) {
    return (
        <button
            className="flex-1 p-2 bg-gray-800 hover:bg-gray-700 text-blue-400 rounded-lg text-xs font-bold border border-gray-700 transition-all active:scale-95"
            onClick={() => setIsModelConfigOpen(true)}
        >
            ⚙️ Configure
        </button>
    )
}

export function CopyCodeBlockButton({ value }) {
    const [copied, setCopied] = useState(false)

    const handleCopy = () => {
        navigator.clipboard.writeText(value)
        /* console.log('code block copied') */
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }
    return (
        <button
            onClick={handleCopy}
            className="hover:text-white transition-colors flex items-center gap-1"
        >
            {copied ? (
                <span className="text-green-400">Copied!</span>
            ) : (
                <span>Copy</span>
            )}
        </button>
    )
}

export function ShowThinkingButton({ setIsThinkingBlockOpen, isThinkingBlockOpen }) {
    return (
        <button
            className="text-xs font-semibold text-gray-400 hover:text-white flex items-center gap-1 mb-1"
            onClick={() => setIsThinkingBlockOpen(!isThinkingBlockOpen)}
        >
            {isThinkingBlockOpen
                ? '▼ Hide thinking'
                : '▶ Show thinking'
            }
        </button>
    )
}

export function RenderHistoryButton({ setCurrentSessionId, session, setChatMessages }) {
    /* key={session.sessionId} */
    return (
        <button
            className="w-full text-left p-2.5 rounded-lg border transition-all group relative mb-1 bg-gray-700/30 border-gray-700/50 hover:bg-gray-700"
            onClick={() => {
                setCurrentSessionId(session.sessionId)
                setChatMessages(session.history)
            }}
        >
            <div className="flex justify-between items-center">
                <span className="font-medium text-xs text-gray-300 group-hover:text-white truncate">{session.title}</span>
            </div>
        </button>
    )
}

export function UploadedModelFilesButton({ setUploadedModel, file }) {
    return (
        <button
            className='w-full text-left p-2.5 rounded-lg border transition-all group relative mb-1 bg-green-900/20 border-green-800 hover:bg-green-900/40'
            onClick={() => (setUploadedModel(file))}
        >
            <div className="flex justify-between items-center">
                <div className="flex flex-col min-w-0 flex-1">
                    <span className="font-medium text-xs text-gray-300 group-hover:text-white truncate">{file.name}</span>
                </div>
            </div>
        </button>
    )
}

export function UploadedModelUrlsButton({ url, setSelectedModelUrl }) {
    return (
        <button
            className='w-full text-left p-2.5 rounded-lg border transition-all group relative mb-1 bg-green-900/20 border-green-800 hover:bg-green-900/40'
            onClick={() => (setSelectedModelUrl(url))}
        >
            <div className="flex justify-between items-center">
                <div className="flex flex-col min-w-0 flex-1">
                    <span className="font-medium text-xs text-gray-300 group-hover:text-white truncate">{url.split('/').pop()}</span>
                </div>
            </div>
        </button>
    )
}

export function RenderCsvModelsButton({ model, setSelectedModelUrl }) {
    const getModelName = (url) => {
        return url.split('/').pop()
    }
    const downloadedModelList = localStorage.getItem('downloadedModels') || '[]'

    function checkIfDownloaded(url) {
        if (downloadedModelList.includes(url)) return true
        else return false
    }
    return (
        <button
            className={`w-full text-left p-2.5 rounded-lg border transition-all group relative mb-1 
                ${checkIfDownloaded(model[0])
                    ? 'bg-green-900/20 border-green-800 hover:bg-green-900/40'
                    : 'bg-gray-700/30 border-gray-700/50 hover:bg-gray-700'}`}
            onClick={() => (setSelectedModelUrl(model[0]))}
        >
            <div className="flex justify-between items-center">
                <div className="flex flex-col min-w-0 flex-1">
                    <span className="font-medium text-xs text-gray-300 group-hover:text-white truncate">{getModelName(model[0])}</span>
                    {checkIfDownloaded(model[0]) &&
                        <span className="text-[9px] text-green-400">
                            Available offline
                        </span>
                    }
                </div>
                <span className="text-[10px] text-gray-500 bg-black/20 px-1.5 py-0.5 rounded whitespace-nowrap">{model[1]} MB</span>
            </div>
        </button>
    )
}

export function RecommendedButton({ setIsRecommended }) {
    return (
        <button
            className="flex w-full items-center justify-between p-4 bg-blue-500/5 border border-blue-500/10 rounded-2xl group hover:border-blue-500/30 transition-all duration-300"
            onClick={() => setIsRecommended(true)}
        >
            <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400 group-hover:scale-110 transition-transform duration-300">
                    <AutoFixSvg />
                </div>
                <div>
                    <h4 className="text-xs font-bold text-white leading-none">Recommended Mode</h4>
                    <p className="text-[10px] text-gray-500 mt-1 pl-6">For Most optimal Context Length</p>
                </div>
            </div>
        </button>
    )
}