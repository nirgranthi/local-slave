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