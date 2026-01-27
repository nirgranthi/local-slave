export function RefreshAvailableModelsButton ({ setRefresh }) {
    return (
        <button onClick={() => {setRefresh('refreshing...')}}
            className="text-[10px] text-blue-400 hover:underline">
            Refresh
        </button>
    )
}