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