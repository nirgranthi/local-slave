export function ClearAllHistoryButton() {
    return (
        <button onClick={() => {console.log('cleared all history');}} className="text-[10px] text-red-400 hover:underline">
            Clear All
        </button>
    )
}