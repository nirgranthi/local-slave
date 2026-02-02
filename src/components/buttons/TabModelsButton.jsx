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