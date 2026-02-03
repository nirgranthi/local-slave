export function SendButton({ inputValue, sendMessage, modelStatus }) {

    return (
        <button
            id="send-btn"
            onClick={() => sendMessage(inputValue)}
            disabled={modelStatus==='OFFLINE'}
            className="bg-blue-600 px-6 rounded-lg text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
        >
            Send
        </button>
    )
}