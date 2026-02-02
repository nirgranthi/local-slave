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

