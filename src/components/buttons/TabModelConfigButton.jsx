export function TabModelConfigButton({ setSelectedTab, className }) {
    return (
        <button
            onClick={() => { setSelectedTab('modelConfig') }}
            className={className}
        >
            Model Configs
        </button >
    )
}