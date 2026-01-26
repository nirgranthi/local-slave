export const TabHistoryButton = () => {
    return (
        <button onClick={console.log("switchTab('history')")} id="tab-history"
            className="flex-1 py-3 text-xs font-bold text-gray-500 hover:text-gray-300">
            HISTORY
        </button>
    );
}

