export function TabPromptConfigButton({ setSelectedTab, className }) {
    return (
        <button
            onClick={() => { setSelectedTab('promptConfig') }}
            className={className}
        >
            Prompt Configs
        </button >
    )
}