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